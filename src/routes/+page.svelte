<script>
	import { modules } from '$lib/modules.js';
	import { progress } from '$lib/stores/progress.js';
</script>

<div class="max-w-5xl mx-auto p-8">
	<div class="mb-10">
		<h1 class="text-4xl font-bold text-white mb-2">DSA Master — C++</h1>
		<p class="text-gray-400 text-lg">From zero to Google SWE. One topic at a time. Deep theory, real code, tough quizzes.</p>
	</div>

	<!-- Progress Overview -->
	<div class="grid grid-cols-3 gap-4 mb-10">
		<div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
			<div class="text-3xl font-bold text-white">{modules.length}</div>
			<div class="text-sm text-gray-500 mt-1">Total Modules</div>
		</div>
		<div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
			<div class="text-3xl font-bold text-emerald-400">
				{Object.keys($progress).filter(k => $progress[k]?.quizScore).length}
			</div>
			<div class="text-sm text-gray-500 mt-1">Quizzes Taken</div>
		</div>
		<div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
			<div class="text-3xl font-bold text-blue-400">
				{Object.values($progress).reduce((acc, m) => acc + Object.keys(m?.topics || {}).length, 0)}
			</div>
			<div class="text-sm text-gray-500 mt-1">Topics Read</div>
		</div>
	</div>

	<!-- Module Grid -->
	<h2 class="text-xl font-semibold text-white mb-4">Modules</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each modules as mod}
			{@const modProgress = $progress[mod.id]}
			<a
				href="/module/{mod.id}"
				class="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors group"
			>
				<div class="flex items-start gap-3">
					<span class="flex-shrink-0 w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center {modProgress?.quizScore ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 group-hover:text-white'}">
						{mod.number}
					</span>
					<div>
						<div class="font-semibold text-white group-hover:text-emerald-400 transition-colors">
							{mod.title}
						</div>
						<div class="text-sm text-gray-500 mt-1">{mod.description}</div>
						{#if modProgress?.quizScore}
							<div class="text-xs text-emerald-500 mt-2">
								Quiz: {modProgress.quizScore.score}/{modProgress.quizScore.total}
							</div>
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
