import type { PageLoad } from './$types';
import puzzles from '$lib/data/puzzles.json';

export const load: PageLoad = async ({ fetch }) => {
	const randomIndex = Math.floor(Math.random() * puzzles.length);
	const puzzle = puzzles[randomIndex];

	const res = await fetch('/api/leaderboard');
	const leaderboard = res.ok ? await res.json() : { entries: [] };

	return {
		puzzle,
		leaderboard: leaderboard.entries ?? []
	};
};
