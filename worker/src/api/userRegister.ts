import { ServerPage, generateResponse } from '../request';

import { getClientIP } from '../utils';
import { verifyCaptcha } from '../captcha';

export default {
	main(data, request, env, ctx) {
		const ip = getClientIP(request);
		if (!ip) {
			return generateResponse(request, 403, 'We are unable to verify your IP address');
		}
		if (!verifyCaptcha(ip, data.captcha, env)) {
			return generateResponse(request, 400, 'Captcha verification failed');
		}

		const { username, password, email } = data;
	},
	methods: 'post',
	path: '/user/register',
	params: {
		username: 'string!',
		password: 'string!',
		email: 'string!',
		captcha: 'string!',
	},
} as ServerPage;
