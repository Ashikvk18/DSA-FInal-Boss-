<script>
	import { modules } from '$lib/modules.js';
	import { progress } from '$lib/stores/progress.js';

	export let data;

	let activeTab = 'theory';
	let currentModule;
	let moduleContent;

	$: currentModule = modules.find((m) => m.id === data.moduleId);

	$: {
		loadModule(data.moduleId);
	}

	async function loadModule(id) {
		try {
			const mod = await import(`../../../lib/content/${id}.js`);
			moduleContent = mod.default;
		} catch (e) {
			moduleContent = null;
		}
	}

	function getNextModule() {
		if (!currentModule) return null;
		const idx = modules.findIndex((m) => m.id === currentModule.id);
		return idx < modules.length - 1 ? modules[idx + 1] : null;
	}

	function getPrevModule() {
		if (!currentModule) return null;
		const idx = modules.findIndex((m) => m.id === currentModule.id);
		return idx > 0 ? modules[idx - 1] : null;
	}
</script>

{#if !currentModule}
	<div class="p-8 text-center">
		<h1 class="text-2xl text-white">Module not found</h1>
		<a href="/" class="text-blue-400 hover:underline mt-4 inline-block">← Back to Dashboard</a>
	</div>
{:else if !moduleContent}
	<div class="max-w-4xl mx-auto p-8">
		<h1 class="text-3xl font-bold text-white mb-2">Module {currentModule.number}: {currentModule.title}</h1>
		<p class="text-gray-400 mb-8">{currentModule.description}</p>
		<div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
			<p class="text-gray-500 text-lg">🚧 This module is coming soon.</p>
			<p class="text-gray-600 text-sm mt-2">We build one topic at a time. Complete previous modules first!</p>
		</div>
	</div>
{:else}
	<div class="max-w-4xl mx-auto p-8">
		<!-- Module Header -->
		<div class="mb-6">
			<h1 class="text-3xl font-bold text-white mb-1">Module {currentModule.number}: {currentModule.title}</h1>
			<p class="text-gray-400">{currentModule.description}</p>
		</div>

		<!-- Tabs -->
		<div class="flex border-b border-gray-800 mb-8">
			<button class="tab-btn {activeTab === 'theory' ? 'active' : ''}" on:click={() => activeTab = 'theory'}>
				Theory
			</button>
			<button class="tab-btn {activeTab === 'practice' ? 'active' : ''}" on:click={() => activeTab = 'practice'}>
				Practice
			</button>
			<button class="tab-btn {activeTab === 'quiz' ? 'active' : ''}" on:click={() => activeTab = 'quiz'}>
				Quiz ({moduleContent.quiz?.length || 0} Qs)
			</button>
		</div>

		<!-- Tab Content -->
		{#if activeTab === 'theory'}
			<svelte:component this={moduleContent.theory} />
		{:else if activeTab === 'practice'}
			<svelte:component this={moduleContent.practice} />
		{:else if activeTab === 'quiz'}
			{#key data.moduleId}
				<svelte:component this={moduleContent.quizComponent} moduleId={data.moduleId} questions={moduleContent.quiz} />
			{/key}
		{/if}

		<!-- Navigation -->
		<div class="flex justify-between mt-12 pt-6 border-t border-gray-800">
			{#if getPrevModule()}
				<a href="/module/{getPrevModule().id}" class="text-sm text-gray-400 hover:text-white transition-colors">
					← {getPrevModule().title}
				</a>
			{:else}
				<span></span>
			{/if}
			{#if getNextModule()}
				<a href="/module/{getNextModule().id}" class="text-sm text-gray-400 hover:text-white transition-colors">
					{getNextModule().title} →
				</a>
			{/if}
		</div>
	</div>
{/if}
