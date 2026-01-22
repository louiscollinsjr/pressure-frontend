<script lang="ts">
	export let onSubmit: () => void = () => {};
	export let onShuffle: () => void = () => {};
	export let isSubmitDisabled = false;
</script>

<div class="actions">
	<button type="button" class="icon ghost" on:click={onShuffle} aria-label="Shuffle tiles">⟳</button>
	<div class="center">
		<button type="button" class="icon primary primary-large" on:click={onSubmit} disabled={isSubmitDisabled} aria-label="Submit word">✓</button>
	</div>
	<div class="spacer" aria-hidden="true"></div>
</div>

<style>
	.actions {
		display: grid;
		grid-template-columns: 52px 1fr 52px;
		align-items: center;
		gap: 16px;
		width: 100%;
	}
	.center {
		display: flex;
		justify-content: center;
	}
	.icon {
		border-radius: 999px;
		width: 52px;
		height: 52px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		font-size: 22px;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all 140ms ease;
	}
	.primary-large {
		width: 64px;
		height: 64px;
		font-size: 26px;
	}
	.primary {
		background: #3b82f6;
		color: white;
		box-shadow: 0 10px 30px rgba(59, 130, 246, 0.35);
		border-color: #3b82f6;
	}
	.primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		box-shadow: none;
	}
	.ghost {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.12);
		color: white;
	}
	.icon:not(:disabled):hover {
		transform: translateY(-2px);
		filter: brightness(1.05);
	}
	.spacer {
		width: 52px;
		height: 52px;
	}
</style>
