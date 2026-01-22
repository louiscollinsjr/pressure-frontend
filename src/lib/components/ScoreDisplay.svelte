<script lang="ts">
	export let score = 0;
	export let wordsFound = 0;
	export let multiplier = 1;
</script>

<div class="score-card">
	<div class="row">
		<span class="label">Score</span>
		<span class="value">{score}</span>
	</div>
	<div class="row">
		<span class="label">Words</span>
		<span class="value">{wordsFound}</span>
	</div>
	<div class="row">
		<span class="label">Multiplier</span>
		<span class="value">×{multiplier.toFixed(1)}</span>
	</div>
</div>

<style>
	.score-card {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		padding: 10px 12px;
	}
	.row {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}
	.label {
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.6);
	}
	.value {
		font-size: 18px;
		font-weight: 700;
	}
</style>
