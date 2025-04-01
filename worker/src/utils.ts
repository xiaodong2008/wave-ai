import { randomBytes } from 'crypto';
import { utils } from 'jsfast';

export function getEnvValue(env: { [key: string]: any }, key: string) {
	if (env[key]) {
		return env[key];
	}
	if (env[key.toUpperCase()]) {
		return env[key.toUpperCase()];
	}
	return null;
}

export function getClientIP(request: Request) {
	const ip = request.headers.get('CF-Connecting-IP');
	if (ip) {
		return ip;
	}
	const forwarded = request.headers.get('X-Forwarded-For');
	if (forwarded) {
		return forwarded.split(',')[0];
	}
	return null;
}
