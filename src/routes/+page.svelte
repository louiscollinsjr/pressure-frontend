<svelte:head>
	<title>Pressure - Speed Word Game</title>
	<meta name="description" content="Find as many words as you can in 2 minutes. Pressure is a fast, mobile-first word game." />
</svelte:head>

<main class="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
	<section class="max-w-2xl w-full space-y-10 text-center">
		<div class="space-y-4">
			<p class="text-sm uppercase tracking-[0.3em] text-sky-400">Pressure</p>
			<h1 class="text-4xl sm:text-5xl font-semibold leading-tight">2-minute speed word game</h1>
			<p class="text-slate-300">Tap tiles, form words, race the clock. Built for 60 FPS on mobile.</p>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			<a href="/game" class="inline-flex items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-lg font-semibold shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-400">
				Play /game
			</a>
			<a href="https://supabase.com" class="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-lg font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20">View backend (Supabase)</a>
		</div>

		<div class="rounded-2xl border border-white/5 bg-white/5 p-6 text-left shadow-xl">
			<h2 class="mb-3 text-lg font-semibold">What’s inside</h2>
			<ul class="space-y-2 text-sm text-slate-300">
				<li>⚡ SvelteKit + Tailwind scaffold</li>
				<li>🧩 Puzzles + dictionary preloaded</li>
				<li>🌐 API stubs for validation & leaderboard</li>
				<li>📱 PWA-ready manifest + meta tags</li>
			</ul>
		</div>
	</section>
</main>
