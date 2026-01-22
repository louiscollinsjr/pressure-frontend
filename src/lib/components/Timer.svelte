<script lang="ts">
	export let timeLeft = 120;

	$: timerColor = timeLeft > 60 ? '#3B82F6' : timeLeft > 30 ? '#F97316' : '#EF4444';
	$: minutes = Math.floor(timeLeft / 60);
	$: seconds = Math.floor(timeLeft % 60);
</script>

<div class="timer" style={`color:${timerColor}`}>
	{minutes}:{seconds.toString().padStart(2, '0')}
</div>

<style>
	.timer {
		font-size: 48px;
		font-weight: 700;
		font-family: 'SF Mono', 'Courier New', monospace;
		text-align: center;
		letter-spacing: 2px;
		padding: 12px;
		border-radius: 12px;
		transition: color 150ms ease;
	}

	@media (max-width: 480px) {
		.timer {
			font-size: 36px;
		}
	}
</style>
