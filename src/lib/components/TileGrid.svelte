<script lang="ts">
	export let tiles: string[] = [];
	export let selectedTiles: number[] = [];
	export let foundQuartiles: number[][] = [];
	export let onTileClick: (index: number) => void = () => {};

	const isSelected = (i: number) => selectedTiles.includes(i);
	const isInQuartile = (i: number) => foundQuartiles.some((q) => q.includes(i));
	
	function handleClick(index: number) {
		console.log('🖱️ TileGrid click:', { 
			index, 
			tile: tiles[index], 
			isSelected: isSelected(index), 
			isInQuartile: isInQuartile(index),
			selectedTiles,
			foundQuartiles
		});
		onTileClick(index);
	}
</script>

<div class="tile-grid">
	{#each tiles as tile, index}
		<button
			type="button"
			class={`tile ${isInQuartile(index) ? 'quartile' : ''} ${isSelected(index) ? 'selected' : ''}`}
			on:click={() => handleClick(index)}
		>
			{tile.toLowerCase()}
		</button>
	{/each}
</div>

<style>
	.tile-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-template-rows: repeat(5, minmax(0, 1fr));
		gap: 8px;
		padding: 12px;
		aspect-ratio: 4 / 5;
		max-width: 420px;
		margin: 0 auto;
	}

	.tile {
		background: #2d3748;
		border: 2px solid rgba(255, 255, 255, 0.12);
		border-radius: 10px;
		color: white;
		font-size: 16px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: none;
		cursor: pointer;
		transition: all 150ms ease;
		padding: 6px 8px;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tile:hover:not(:disabled) {
		background: #3d4758;
		border-color: rgba(59, 130, 246, 0.6);
		transform: translateY(-1px);
	}

	.tile.selected {
		background: #3b82f6;
		border-color: #3b82f6;
		box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
	}

	.tile.quartile {
		background: #ffffff !important;
		color: #1a202c !important;
		border: 2px solid #ffffff !important;
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.4), inset 0 1px 3px rgba(0, 0, 0, 0.1);
		font-weight: 800;
	}

	.tile.quartile:hover:not(.selected) {
		background: #f0f0f0 !important;
		transform: translateY(-1px);
	}

	.tile.quartile.selected {
		background: #3b82f6 !important;
		color: white !important;
		border-color: #3b82f6 !important;
		box-shadow: 0 0 16px rgba(59, 130, 246, 0.6);
	}

	@media (max-width: 480px) {
		.tile {
			font-size: 14px;
		}
		.tile-grid {
			gap: 6px;
		}
	}
</style>
