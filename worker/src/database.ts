import { getClientIP, getEnvValue } from './utils';

import config from './config';
import { generateResponse } from './request';

export async function execDatabase(
	request: Request,
	data: { [key: string]: any },
	env: Env,
	query: string,
	error_action: string = 'excuting query'
): Promise<any> {
	const db = getEnvValue(env, 'DB');
	try {
		const result = await db.exec(query);
		return result;
	} catch (error: Error | any) {
		console.error('Database query error:', error);
		return generateResponse(request, 500, {
			message: `Error when ${error_action}: ${error.message | error}`,
		});
	}
}
