import { RequestMethod } from './enums';

const serverPages: ServerPage[] = [require('./api/ping').default];

export interface ServerPage {
	methods: RequestMethod | RequestMethod[];
	main: (data: { [key: string]: any }, request: Request, env: Env, ctx: ExecutionContext) => Promise<Response> | Response;
	path: string;
	params: RequestParams;
}

interface RequestParams {
	[key: string]: RequestParams | DataType;
}

type DataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'string!' | 'number!' | 'boolean!' | 'object!' | 'array!';

export async function handleRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	const url = new URL(request.url);
	const path = url.pathname;
	const method = `${request.method}`.toLowerCase();

	const serverPage = serverPages.find((page) => {
		return page.path === path;
	});
	if (!serverPage) {
		return generateResponse(404, 'Cannot find API endpoint');
	}

	// check request method allowed
	const allowedMethods = Array.isArray(serverPage.methods) ? serverPage.methods : [serverPage.methods];
	if (!allowedMethods.includes(method as RequestMethod)) {
		return generateResponse(405, `Method ${method} not allowed`);
	}

	// check request params
	let data: any;
	if (method === RequestMethod.GET) {
		data = Object.fromEntries(url.searchParams.entries());
	} else {
		data = await request.json();
	}

	// check missing params or invalid types
	// Object.entries(serverPage.params).forEach(([key, value]) => {
	// });
	function checkParams(params: RequestParams, data: any) {
		for (const [key, value] of Object.entries(params)) {
			if (typeof data[key] === 'undefined') {
				if ((typeof value === 'string' && value.endsWith('!')) || typeof value === 'object') {
					return generateResponse(400, `Missing required parameter ${key}`);
				}
			} else {
				if (typeof value === 'object') {
					if (typeof data[key] !== 'object') {
						return generateResponse(400, `Invalid type for parameter ${key}`);
					}
					checkParams(value, data[key]);
				} else if (typeof data[key] !== value && !value.endsWith('!')) {
					return generateResponse(400, `Invalid type for parameter ${key}`);
				}
			}
		}
	}
	const checkParamsResult = checkParams(serverPage.params, data);
	if (checkParamsResult) {
		return checkParamsResult;
	}

	return new Promise((resolve, reject) => {
		let response: Response | Promise<Response>;
		try {
			response = serverPage.main(data, request, env, ctx);
		} catch (error: Error | any) {
			console.error(error);
			return generateResponse(500, 'Internal server error: ' + error.message || error);
		}
		if (response instanceof Promise) {
			response
				.then((res) => {
					resolve(res || generateResponse(204, 'No Content'));
				})
				.catch((error) => {
					console.error(error);
					resolve(generateResponse(500, 'Internal server error: ' + error.message));
				});
		}
		if (response instanceof Response) {
			resolve(response);
		}
		resolve(generateResponse(204, 'No Content'));
	});
}

export function generateResponse(code: number, data: string | { [key: string]: any }): Response {
	if (typeof data === 'string') {
		data = { message: data };
	}
	return new Response(JSON.stringify({ code, success: code >= 200 && code < 300, ...data }), {
		status: code,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
}
