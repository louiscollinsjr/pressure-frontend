<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Timer from '$lib/components/Timer.svelte';
	import TileGrid from '$lib/components/TileGrid.svelte';
	import WordPreview from '$lib/components/WordPreview.svelte';
	import ActionButtons from '$lib/components/ActionButtons.svelte';
import puzzlesAll from '$lib/data/puzzles.json';

	type Puzzle = { id: number; tiles: string[] };
	type LeaderboardEntry = {
		id: number;
		puzzle_id: number;
		score: number;
		words_found: number;
		time_remaining: number;
		created_at: string;
		rank?: number;
	};

	export let data: { puzzle: Puzzle; leaderboard: LeaderboardEntry[] };

	let timeLeft = 120;
	let score = 0;
	let wordsFound = 0;
	let foundWords: string[] = [];
	let leaderboard = data.leaderboard;
	let gameActive = false;
	let gameOver = false;

	let tiles = data.puzzle.tiles;
	let selectedTileIndices: number[] = [];
	let foundQuartiles: number[][] = []; // Array of tile index arrays for found 4-tile words
	let timer: ReturnType<typeof setInterval> | undefined;

	// Quartiles scoring: 1pt (1-tile), 2pts (2-tile), 4pts (3-tile), 8pts (4-tile/Quartile)
	const scoring = (len: number) => {
		const table: Record<number, number> = { 1: 1, 2: 2, 3: 4, 4: 8 };
		return table[len] ?? 8;
	};

	onMount(() => {
		startGame();
		return () => stopTimer();
	});

	onDestroy(() => stopTimer());

	function stopTimer() {
		if (timer) clearInterval(timer);
	}

	function startGame() {
		gameActive = true;
		timer = setInterval(() => {
			timeLeft -= 1;
			if (timeLeft <= 0) {
				timeLeft = 0;
				endGame();
			}
		}, 1000);
	}

	function toggleTile(index: number) {
		console.log('🔘 toggleTile called:', { index, tile: tiles[index], gameActive, selectedTileIndices });
		if (!gameActive) {
			console.warn('⚠️ Game not active, ignoring tile click');
			return;
		}
		const wasSelected = selectedTileIndices.includes(index);
		selectedTileIndices = wasSelected
			? selectedTileIndices.filter((i) => i !== index)
			: [...selectedTileIndices, index];
		console.log('✅ Tile toggled:', { wasSelected, newSelection: selectedTileIndices });
	}

	async function handleSubmit() {
		console.log('📤 handleSubmit called:', { selectedTileIndices, selectedTiles: selectedTileIndices.map(i => tiles[i]) });
		if (selectedTileIndices.length === 0) return;
		const word = selectedTileIndices.map((i) => tiles[i]).join('').toUpperCase();
		console.log('🔤 Word formed:', word);
		
		if (foundWords.includes(word)) {
			console.log('⚠️ Word already found');
			selectedTileIndices = [];
			return;
		}

		const valid = await validateWord(word);
		console.log('✓ Word validation result:', valid);
		if (!valid) {
			selectedTileIndices = [];
			return;
		}

		const points = scoring(word.length);
		const totalWithBonus = timeLeft > 60 ? Math.floor(points * 1.5) : points;
		score += totalWithBonus;
		wordsFound += 1;
		foundWords = [...foundWords, word];
		console.log('✅ Word accepted:', { word, points, totalWithBonus, wordsFound });
		
		// If it's a Quartile (4-tile word), track it for visual grouping
		if (selectedTileIndices.length === 4) {
			foundQuartiles = [...foundQuartiles, [...selectedTileIndices]];
			console.log('🎯 Quartile found!', { quartileCount: foundQuartiles.length, tiles: selectedTileIndices, foundQuartiles });
			// Bonus: 40 points for finding all 5 Quartiles
			if (foundQuartiles.length === 5) {
				score += 40;
				console.log('🏆 All 5 Quartiles found! Bonus awarded.');
			}
		}
		
		selectedTileIndices = [];
		console.log('📊 Game state after submit:', { score, wordsFound, foundWords, foundQuartiles, gameActive });
	}

	async function validateWord(word: string) {
		try {
			const res = await fetch('/api/validate-word', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ word })
			});
			const json = await res.json();
			return Boolean(json.valid);
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	async function endGame() {
		if (gameOver) return;
		stopTimer();
		gameActive = false;
		gameOver = true;
		await submitScore();
	}

	async function submitScore() {
		try {
			await fetch('/api/submit-score', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					puzzle_id: data.puzzle.id,
					score,
					words_found: wordsFound,
					time_remaining: timeLeft,
					words_list: foundWords
				})
			});
			await refreshLeaderboard();
		} catch (e) {
			console.error('submit failed', e);
		}
	}

	async function refreshLeaderboard() {
		try {
			const res = await fetch('/api/leaderboard');
			if (res.ok) {
				const json = await res.json();
				leaderboard = json.entries ?? leaderboard;
			}
		} catch (e) {
			console.error('leaderboard refresh failed', e);
		}
	}

	function newGame() {
		stopTimer();
		timeLeft = 120;
		score = 0;
		wordsFound = 0;
		foundWords = [];
		foundQuartiles = [];
		selectedTileIndices = [];
		gameOver = false;
		const randomIndex = Math.floor(Math.random() * puzzlesAll.length);
		tiles = puzzlesAll[randomIndex].tiles;
		startGame();
	}

	const currentWord = () => selectedTileIndices.map((i) => tiles[i]).join('').toUpperCase();

	function shuffleTiles() {
		if (!tiles?.length) return;
		const shuffled = [...tiles];
		for (let i = shuffled.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		tiles = shuffled;
		selectedTileIndices = [];
	}
</script>

<svelte:head>
	<title>Pressure - Game</title>
	<meta name="description" content="Race the clock to find words." />
</svelte:head>

<main class="page">
	<section class="layout">
		<div class="main">
			<div class="panel">
				<div class="panel-top">
					<Timer {timeLeft} />
				</div>
				<div class="panel-body">
					<WordPreview
						selectedTiles={selectedTileIndices.map((i) => tiles[i])}
						onClear={() => (selectedTileIndices = [])}
					/>
					<div class="tile-grid-wrapper">
						<TileGrid
							{tiles}
							selectedTiles={selectedTileIndices}
							{foundQuartiles}
							onTileClick={toggleTile}
						/>
					</div>
				</div>
				<div class="panel-footer">
					<ActionButtons onSubmit={handleSubmit} onShuffle={shuffleTiles} isSubmitDisabled={!selectedTileIndices.length} />
					<div class="found">
						<div class="found-head">
							<span>Found ({foundWords.length})</span>
							<button type="button" class="text" on:click={newGame}>New Game</button>
						</div>
						<div class="found-list">
							{#if foundWords.length === 0}
								<span class="muted">No words yet</span>
							{:else}
								{#each foundWords as w}
									<span>{w}</span>
								{/each}
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	:global(body) {
		background: radial-gradient(circle at 20% 20%, #1f2a3a, #0f1625 60%);
	}
	.page {
		min-height: 100vh;
		color: white;
		display: flex;
		flex-direction: column;
		padding: 16px;
		max-width: 1200px;
		margin: 0 auto;
		gap: 12px;
	}
	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}
	.main {
		min-width: 0;
	}
	.panel {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 16px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.panel-top {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 12px;
		align-items: center;
	}
	.panel-body {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.tile-grid-wrapper {
		position: relative;
		min-height: 360px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.panel-footer {
		margin-top: auto;
	}
	.found {
		margin-top: 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.found-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 700;
	}
	.text {
		background: transparent;
		border: none;
		color: #3b82f6;
		font-weight: 700;
		cursor: pointer;
	}
	.found-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		font-size: 13px;
	}
	.found-list span {
		background: rgba(255, 255, 255, 0.08);
		padding: 6px 8px;
		border-radius: 10px;
	}
	.muted {
		color: rgba(255, 255, 255, 0.6);
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 520px) {
		.page {
			padding: 12px;
		}
		.panel {
			padding: 12px;
		}
	}
</style>
