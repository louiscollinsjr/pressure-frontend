<script lang="ts">
	export let entries: { id: number; puzzle_id: number; score: number; words_found: number; time_remaining: number; created_at: string; rank?: number }[] = [];
</script>

<div class="card">
	<header>
		<h2>Leaderboard</h2>
	</header>
	<div class="table">
		<div class="row head">
			<span>#</span>
			<span>Score</span>
			<span>Words</span>
			<span>Time</span>
			<span>When</span>
		</div>
		{#if entries.length === 0}
			<div class="empty">No scores yet</div>
		{:else}
			{#each entries as entry, i}
				<div class="row">
					<span>{entry.rank ?? i + 1}</span>
					<span>{entry.score}</span>
					<span>{entry.words_found}</span>
					<span>{entry.time_remaining}s</span>
					<span class="time">{new Date(entry.created_at).toLocaleString()}</span>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.card {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		padding: 12px;
		max-height: 320px;
		overflow: auto;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}
	.table {
		display: grid;
		gap: 6px;
	}
	.row {
		display: grid;
		grid-template-columns: 0.6fr 1fr 1fr 1fr 2fr;
		gap: 6px;
		padding: 8px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.04);
		font-size: 14px;
	}
	.head {
		font-weight: 700;
		color: rgba(255, 255, 255, 0.7);
		background: transparent;
		border-color: transparent;
	}
	.empty {
		text-align: center;
		color: rgba(255, 255, 255, 0.6);
		padding: 12px 0;
	}
	.time {
		color: rgba(255, 255, 255, 0.7);
		font-size: 12px;
	}

	@media (max-width: 640px) {
		.row {
			grid-template-columns: 0.6fr 1fr 1fr 1fr;
		}
		.row span:last-child {
			display: none;
		}
	}
</style>
