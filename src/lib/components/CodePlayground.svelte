<script>
	export let initialCode = '// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}';
	export let title = 'Code Playground';

	let code = initialCode;
	let copied = false;

	function copyCode() {
		navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function resetCode() {
		code = initialCode;
	}
</script>

<div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
	<div class="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900">
		<span class="text-sm font-medium text-gray-400">{title}</span>
		<div class="flex gap-2">
			<button on:click={copyCode} class="text-xs px-2 py-1 text-gray-500 hover:text-white transition-colors">
				{copied ? '✓ Copied' : 'Copy'}
			</button>
			<button on:click={resetCode} class="text-xs px-2 py-1 text-gray-500 hover:text-white transition-colors">
				Reset
			</button>
		</div>
	</div>
	<textarea
		bind:value={code}
		class="w-full bg-gray-950 text-gray-200 font-mono text-sm p-4 border-0 outline-none resize-y min-h-[200px] leading-relaxed"
		spellcheck="false"
	/>
	<div class="px-4 py-2 border-t border-gray-800 bg-gray-900">
		<p class="text-xs text-gray-600">
			Tip: Copy this code and run it in your local IDE (VS Code, CodeBlocks, or <a href="https://www.onlinegdb.com/online_c++_compiler" target="_blank" class="text-blue-500 hover:underline">OnlineGDB</a>)
		</p>
	</div>
</div>
