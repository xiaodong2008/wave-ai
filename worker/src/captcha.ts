import config from './config';

interface APIResponse {
	success: boolean;
	hostname?: string;
	'error-codes'?: string[];
	challenge_ts?: string;
}

export async function verifyCaptcha(ip: string, captcha: string, env: any): Promise<boolean> {
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: JSON.stringify({
			secret: config.turnstile_secret,
			response: captcha,
			remoteip: ip,
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const outcome: APIResponse = await result.json();
	if (outcome.success) {
		return true;
	}
	if (outcome['error-codes']) {
		console.error('Captcha verification failed:', outcome['error-codes']);
	}
	return false;
}
