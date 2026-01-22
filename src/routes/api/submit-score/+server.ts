import { json, type RequestHandler } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
	const { puzzle_id, score, words_found, time_remaining, words_list } = await request.json();

	if (
		typeof puzzle_id !== 'number' ||
		typeof score !== 'number' ||
		typeof words_found !== 'number' ||
		typeof time_remaining !== 'number' ||
		!Array.isArray(words_list)
	) {
		return json({ error: 'Invalid payload' }, { status: 400 });
	}

	const pool = getDb();

	try {
		const { rows } = await pool.query(
			`INSERT INTO scores (puzzle_id, score, words_found, time_remaining, words_list)
			 VALUES ($1, $2, $3, $4, $5)
			 RETURNING id, created_at`,
			[puzzle_id, score, words_found, time_remaining, words_list]
		);

		return json({ success: true, id: rows[0]?.id, created_at: rows[0]?.created_at });
	} catch (error) {
		console.error('Failed to insert score', error);
		return json({ error: 'Failed to submit score' }, { status: 500 });
	}
};
