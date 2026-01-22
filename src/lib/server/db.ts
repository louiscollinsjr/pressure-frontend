import { Pool } from 'pg';
import { DATABASE_URL } from '$env/static/private';

let pool: Pool | undefined;

export function getDb() {
	if (!pool) {
		// Some environments still inject `sslrootcert=system` which pg tries to open as a file named "system".
		// Strip it and enforce TLS with default trust store.
		const cleanUrl = DATABASE_URL.replace(/([?&])sslrootcert=system&?/, '$1').replace(/[?&]$/, '');
		pool = new Pool({
			connectionString: cleanUrl,
			ssl: { rejectUnauthorized: false }
		});
	}
	return pool;
}
