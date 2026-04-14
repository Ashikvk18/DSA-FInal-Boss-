import Theory from './recursion-theory.svelte';
import Practice from './recursion-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'Every recursive function must have:',
		options: [
			'A loop and a counter',
			'A base case and a recursive case',
			'Two recursive calls',
			'A global variable'
		],
		correct: 1,
		explanation: 'Every recursive function needs a base case (stopping condition) and a recursive case (where it calls itself with a smaller input).'
	},
	{
		question: 'What happens if a recursive function has no base case?',
		options: [
			'It returns 0',
			'It runs once and stops',
			'Infinite recursion → stack overflow',
			'Compilation error'
		],
		correct: 2,
		explanation: 'Without a base case, the function calls itself forever, consuming stack frames until the stack overflows (segmentation fault).'
	},
	{
		question: 'In tail recursion, the recursive call is:',
		options: [
			'The first statement',
			'The last statement — nothing happens after it returns',
			'Inside a loop',
			'Called twice'
		],
		correct: 1,
		explanation: 'In tail recursion, the recursive call is the LAST operation. The function does all its work before the recursive call, so nothing needs to happen after it returns.'
	},
	{
		question: 'What is the time complexity of naive recursive Fibonacci?',
		options: ['O(n)', 'O(n²)', 'O(2^n)', 'O(log n)'],
		correct: 2,
		explanation: 'Naive Fibonacci makes 2 recursive calls per invocation, creating a binary tree of calls. Total calls ≈ 2^n, so time is O(2^n).'
	},
	{
		question: 'Memoization transforms Fibonacci from O(2^n) to:',
		options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
		correct: 2,
		explanation: 'Memoization caches each sub-problem result. Since there are only n unique sub-problems (fib(0) to fib(n)), each computed once, the total time is O(n).'
	},
	{
		question: 'How many moves does Tower of Hanoi require for n disks?',
		options: ['n²', 'n!', '2^n - 1', 'n log n'],
		correct: 2,
		explanation: 'Tower of Hanoi requires 2^n - 1 moves. For n=3: 7 moves, n=4: 15 moves, n=10: 1023 moves.'
	},
	{
		question: 'In tree recursion, the function makes:',
		options: [
			'Exactly one recursive call',
			'Two or more recursive calls per invocation',
			'No recursive calls',
			'A call inside a loop only'
		],
		correct: 1,
		explanation: 'Tree recursion means 2+ recursive calls per invocation (like Fibonacci calling fib(n-1) and fib(n-2)). The call structure forms a tree.'
	},
	{
		question: 'What does this print?\n`void f(int n) { if(n==0) return; f(n-1); cout<<n<<" "; }\nf(3);`',
		options: ['3 2 1', '1 2 3', '3 2 1 0', '1 2 3 0'],
		correct: 1,
		explanation: 'This is HEAD recursion — the recursive call happens FIRST, then printing. So it prints on the way BACK UP: 1 2 3 (ascending).'
	},
	{
		question: 'What does this print?\n`void f(int n) { if(n==0) return; cout<<n<<" "; f(n-1); }\nf(3);`',
		options: ['3 2 1', '1 2 3', '0 1 2 3', '3 2 1 0'],
		correct: 0,
		explanation: 'This is TAIL recursion — printing happens FIRST, then the recursive call. So it prints on the way DOWN: 3 2 1 (descending).'
	},
	{
		question: 'The space complexity of a linear recursive function with n calls is:',
		options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
		correct: 2,
		explanation: 'Each recursive call adds a stack frame. With n calls deep, there are n frames on the stack simultaneously → O(n) space.'
	},
	{
		question: 'Fast power computes x^n in:',
		options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
		correct: 2,
		explanation: 'Fast power halves n each step: x^n = (x^(n/2))^2. Halving takes log₂(n) steps → O(log n).'
	},
	{
		question: 'The recursive formula for nCr (Pascal\'s identity) is:',
		options: [
			'C(n,r) = C(n-1,r) × C(n-1,r-1)',
			'C(n,r) = C(n-1,r-1) + C(n-1,r)',
			'C(n,r) = C(n,r-1) + C(n-1,r)',
			'C(n,r) = n × C(n-1,r-1)'
		],
		correct: 1,
		explanation: 'Pascal\'s identity: C(n,r) = C(n-1,r-1) + C(n-1,r). Each entry in Pascal\'s triangle is the sum of the two entries above it.'
	},
	{
		question: 'Which type of recursion can be optimized by the compiler into a loop?',
		options: ['Head recursion', 'Tree recursion', 'Tail recursion', 'Nested recursion'],
		correct: 2,
		explanation: 'Tail Call Optimization (TCO) converts tail recursion into iteration because no work needs to be done after the recursive call returns — the stack frame can be reused.'
	},
	{
		question: 'Indirect recursion means:',
		options: [
			'The function calls itself directly',
			'Function A calls B, and B calls A (or through a chain)',
			'The function uses a loop instead of recursion',
			'The function has multiple base cases'
		],
		correct: 1,
		explanation: 'Indirect (mutual) recursion: A calls B, B calls A. The recursion cycle involves multiple functions rather than a single function calling itself.'
	},
	{
		question: 'What is the key idea behind memoization?',
		options: [
			'Use more recursive calls to speed up',
			'Store results of sub-problems to avoid recomputation',
			'Convert recursion to iteration',
			'Reduce the number of base cases'
		],
		correct: 1,
		explanation: 'Memoization stores (caches) the result of each unique sub-problem. When the same sub-problem is encountered again, the cached result is returned instead of recomputing.'
	},
	{
		question: 'The sum of first n natural numbers recursively: sum(n) = ?',
		options: [
			'n + sum(n)',
			'n × sum(n-1)',
			'n + sum(n-1), base: sum(0)=0',
			'sum(n-1) + sum(n-2)'
		],
		correct: 2,
		explanation: 'sum(n) = n + sum(n-1), with base case sum(0) = 0. This gives: sum(5) = 5 + 4 + 3 + 2 + 1 + 0 = 15.'
	},
	{
		question: 'Horner\'s Rule for Taylor Series reduces complexity from:',
		options: ['O(2^n) to O(n)', 'O(n²) to O(n)', 'O(n) to O(log n)', 'O(n³) to O(n²)'],
		correct: 1,
		explanation: 'The naive Taylor series computes each term separately (computing x^i and i! each time) leading to O(n²). Horner\'s Rule factors the expression to avoid redundant multiplication → O(n).'
	},
	{
		question: 'Which problem is NOT naturally suited for recursion?',
		options: [
			'Tree traversal',
			'Finding max in an array',
			'Tower of Hanoi',
			'Generating all permutations'
		],
		correct: 1,
		explanation: 'Finding max in an array is a simple linear scan — a for loop is cleaner and more efficient. Trees, Tower of Hanoi, and permutations have natural recursive structure.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
