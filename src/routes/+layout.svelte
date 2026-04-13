<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { modules } from '$lib/modules.js';
	import { progress } from '$lib/stores/progress.js';

	let sidebarOpen = true;
	let currentPath;
	$: currentPath = $page.url.pathname;
</script>

<div class="flex h-screen overflow-hidden">
	<!-- Sidebar -->
	<aside
		class="flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-200 {sidebarOpen ? 'w-72' : 'w-0'} overflow-hidden"
	>
		<div class="p-4 border-b border-gray-800 flex-shrink-0">
			<a href="/" class="block">
				<h1 class="text-lg font-bold text-white m-0">DSA Master</h1>
				<p class="text-xs text-gray-500 mt-1">C++ · From Zero to Google SWE</p>
			</a>
		</div>
		<nav class="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
			{#each modules as mod}
				{@const modProgress = $progress[mod.id]}
				{@const isActive = currentPath.startsWith(`/module/${mod.id}`)}
				<a
					href="/module/{mod.id}"
					class="nav-link flex items-start gap-2 {isActive ? 'active' : ''}"
				>
					<span class="flex-shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center mt-0.5 {modProgress?.quizScore ? 'bg-emerald-600 text-white' : isActive ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-500'}">
						{mod.number}
					</span>
					<span class="leading-tight">{mod.title}</span>
				</a>
			{/each}
		</nav>
		<div class="p-3 border-t border-gray-800 flex-shrink-0">
			<button
				on:click={() => { if(confirm('Reset all progress?')) progress.reset(); }}
				class="text-xs text-gray-600 hover:text-red-400 transition-colors"
			>
				Reset Progress
			</button>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="flex-1 flex flex-col overflow-hidden">
		<!-- Top bar -->
		<header class="h-12 flex items-center px-4 border-b border-gray-800 bg-gray-900/50 flex-shrink-0">
			<button
				on:click={() => sidebarOpen = !sidebarOpen}
				class="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors mr-3"
			>
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<span class="text-sm text-gray-400">
				{#if currentPath === '/'}
					Dashboard
				{:else}
					{@const mod = modules.find(m => currentPath.includes(m.id))}
					{#if mod}
						Module {mod.number}: {mod.title}
					{/if}
				{/if}
			</span>
		</header>

		<!-- Content -->
		<main class="flex-1 overflow-y-auto scrollbar-thin">
			<slot />
		</main>
	</div>
</div>
