import { json, type RequestHandler } from '@sveltejs/kit';
import dictionary from '$lib/data/dictionary.json';

const dictionarySet = new Set(dictionary.map((w) => w.toUpperCase()));

export const POST: RequestHandler = async ({ request }) => {
	const { word } = await request.json();
	const normalized = typeof word === 'string' ? word.toUpperCase().trim() : '';
	const valid = normalized.length >= 2 && dictionarySet.has(normalized);

	return json({ valid });
};
