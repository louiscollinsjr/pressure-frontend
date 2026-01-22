import { json, type RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const pool = getDb();

	try {
		const { rows } = await pool.query(
			`SELECT id, puzzle_id, score, words_found, time_remaining, created_at,
				ROW_NUMBER() OVER (ORDER BY score DESC, words_found DESC, time_remaining DESC) as rank
			 FROM scores
			 ORDER BY score DESC, words_found DESC, time_remaining DESC
			 LIMIT 20`
		);

		return json({ entries: rows });
	} catch (error) {
		console.error('Failed to fetch leaderboard', error);
		return json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
	}
};
