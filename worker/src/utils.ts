export function getEnvValue(env: { [key: string]: any }, key: string) {
	if (env[key]) {
		return env[key];
	}
	if (env[key.toUpperCase()]) {
		return env[key.toUpperCase()];
	}
	return null;
}
