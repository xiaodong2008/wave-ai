import { ServerPage, generateResponse } from '../request';

export default {
	main(data, request, env, ctx) {
		return generateResponse(200, {
			data: data,
			message: 'pong',
		});
	},
	methods: 'get',
	path: '/ping',
	params: {
		token: 'string!',
	},
} as ServerPage;
