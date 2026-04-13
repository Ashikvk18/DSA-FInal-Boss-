<script>
	import { progress } from '$lib/stores/progress.js';

	export let questions = [];
	export let moduleId = '';

	let currentQ = 0;
	let selected = null;
	let answered = false;
	let score = 0;
	let finished = false;
	let answers = [];

	function select(idx) {
		if (answered) return;
		selected = idx;
	}

	function submit() {
		if (selected === null) return;
		answered = true;
		const correct = questions[currentQ].correct === selected;
		if (correct) score++;
		answers = [...answers, { question: currentQ, selected, correct }];
	}

	function next() {
		if (currentQ < questions.length - 1) {
			currentQ++;
			selected = null;
			answered = false;
		} else {
			finished = true;
			progress.saveQuizScore(moduleId, score, questions.length);
		}
	}

	function restart() {
		currentQ = 0;
		selected = null;
		answered = false;
		score = 0;
		finished = false;
		answers = [];
	}
</script>

{#if finished}
	<div class="text-center py-10">
		<div class="text-6xl font-bold mb-4 {score >= questions.length * 0.7 ? 'text-emerald-400' : score >= questions.length * 0.5 ? 'text-amber-400' : 'text-red-400'}">
			{score}/{questions.length}
		</div>
		<p class="text-gray-400 mb-2">
			{#if score === questions.length}
				Perfect! You've mastered this module.
			{:else if score >= questions.length * 0.7}
				Solid understanding. Review the ones you missed.
			{:else if score >= questions.length * 0.5}
				Decent, but revisit the theory before moving on.
			{:else}
				Go back and study the theory carefully, then retry.
			{/if}
		</p>

		<!-- Review wrong answers -->
		{#if score < questions.length}
			<div class="mt-8 text-left max-w-2xl mx-auto space-y-4">
				<h3 class="text-lg font-semibold text-white">Review Incorrect Answers:</h3>
				{#each answers.filter(a => !a.correct) as a}
					{@const q = questions[a.question]}
					<div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
						<p class="text-sm text-white font-medium mb-2">Q{a.question + 1}: {q.question}</p>
						<p class="text-sm text-red-400">Your answer: {q.options[a.selected]}</p>
						<p class="text-sm text-emerald-400">Correct: {q.options[q.correct]}</p>
						{#if q.explanation}
							<p class="text-sm text-gray-400 mt-2 italic">{q.explanation}</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<button on:click={restart} class="mt-6 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
			Retry Quiz
		</button>
	</div>
{:else}
	<div class="max-w-2xl mx-auto">
		<!-- Progress bar -->
		<div class="flex items-center justify-between mb-4">
			<span class="text-sm text-gray-500">Question {currentQ + 1} of {questions.length}</span>
			<span class="text-sm text-gray-500">Score: {score}</span>
		</div>
		<div class="w-full bg-gray-800 rounded-full h-1.5 mb-6">
			<div class="bg-emerald-500 h-1.5 rounded-full transition-all" style="width: {((currentQ) / questions.length) * 100}%"></div>
		</div>

		<!-- Question -->
		<div class="mb-6">
			<p class="text-lg text-white font-medium mb-1">{questions[currentQ].question}</p>
			{#if questions[currentQ].code}
				<pre class="mt-3 text-sm"><code>{questions[currentQ].code}</code></pre>
			{/if}
		</div>

		<!-- Options -->
		<div class="space-y-2 mb-6">
			{#each questions[currentQ].options as option, idx}
				<button
					on:click={() => select(idx)}
					class="quiz-option {selected === idx ? 'selected' : ''} {answered && idx === questions[currentQ].correct ? 'correct' : ''} {answered && selected === idx && idx !== questions[currentQ].correct ? 'incorrect' : ''}"
				>
					<span class="font-mono text-sm mr-2 text-gray-500">{String.fromCharCode(65 + idx)}.</span>
					{option}
				</button>
			{/each}
		</div>

		<!-- Explanation after answering -->
		{#if answered && questions[currentQ].explanation}
			<div class="mb-4 p-3 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300">
				<span class="font-semibold text-white">Explanation:</span> {questions[currentQ].explanation}
			</div>
		{/if}

		<!-- Actions -->
		<div class="flex gap-3">
			{#if !answered}
				<button
					on:click={submit}
					disabled={selected === null}
					class="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors"
				>
					Check Answer
				</button>
			{:else}
				<button
					on:click={next}
					class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
				>
					{currentQ < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
				</button>
			{/if}
		</div>
	</div>
{/if}
