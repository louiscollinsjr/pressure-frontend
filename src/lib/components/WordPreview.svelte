<script lang="ts">
	export let selectedTiles: string[] = [];
	export let onClear: () => void = () => {};
</script>

<div class="preview">
	<div class="tiles-row">
		<div class="tiles">
			{#each selectedTiles as tile}
				<span class="tile">{tile}</span>
			{/each}
		</div>
		{#if selectedTiles.length}
			<button class="clear" type="button" on:click={onClear} aria-label="Clear selection">×</button>
		{/if}
	</div>
</div>

<style>
	.preview {
		background: transparent;
		border-radius: 12px;
		padding: 10px 12px;
		min-height: 64px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}
	.tiles-row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
	.tiles {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
		min-height: 40px;
	}
	.tile {
		background: #3b82f6;
		color: white;
		padding: 8px 12px;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 700;
		text-transform: uppercase;
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
	}
	.clear {
		background: #2563eb;
		color: #fff;
		border: none;
		border-radius: 50%;
		width: 22px;
		height: 22px;
		font-size: 15px;
		cursor: pointer;
		transition: all 120ms ease;
		flex-shrink: 0;
	}
	.clear:hover {
		background: #1d4ed8;
	}
</style>
