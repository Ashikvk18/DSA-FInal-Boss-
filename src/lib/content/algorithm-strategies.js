import Theory from './algorithm-strategies-theory.svelte';
import Practice from './algorithm-strategies-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'Big-O notation O(g(n)) represents:',
		options: [
			'The exact running time',
			'An upper bound — f(n) grows at MOST as fast as g(n)',
			'A lower bound',
			'The average case'
		],
		correct: 1,
		explanation: 'Big-O gives an upper bound on growth rate. f(n) = O(g(n)) means there exist constants c and n₀ such that f(n) ≤ c·g(n) for all n ≥ n₀. It describes the worst-case growth.'
	},
	{
		question: 'The Master Theorem solves recurrences of the form:',
		options: [
			'T(n) = T(n-1) + O(1)',
			'T(n) = aT(n/b) + O(n^d)',
			'T(n) = T(n-1) + T(n-2)',
			'Any recurrence'
		],
		correct: 1,
		explanation: 'The Master Theorem applies to T(n) = aT(n/b) + O(n^d) where a = subproblems, b = shrink factor, d = work exponent. Compare d with log_b(a) to determine the case.'
	},
	{
		question: 'For merge sort T(n) = 2T(n/2) + O(n), the Master Theorem gives:',
		options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
		correct: 1,
		explanation: 'a=2, b=2, d=1. log_b(a) = log₂(2) = 1 = d. This is Case 2 of the Master Theorem → T(n) = O(n^d × log n) = O(n log n).'
	},
	{
		question: 'Divide & Conquer works best when:',
		options: [
			'Subproblems overlap heavily',
			'Subproblems are independent and combining is efficient',
			'You need to explore all possibilities',
			'A local optimal choice works globally'
		],
		correct: 1,
		explanation: 'D&C splits into independent subproblems, solves recursively, combines results. If subproblems overlap, use DP instead. If combining is expensive, D&C loses its advantage.'
	},
	{
		question: 'The greedy approach makes decisions by:',
		options: [
			'Trying all possibilities',
			'Choosing the locally optimal option at each step',
			'Solving subproblems and storing results',
			'Backtracking when a choice fails'
		],
		correct: 1,
		explanation: 'Greedy makes the best-looking choice at each step without reconsidering. It works only when the greedy choice property holds — local optimum leads to global optimum.'
	},
	{
		question: 'Greedy works for Activity Selection because:',
		options: [
			'Activities are sorted by start time',
			'Picking the earliest-finishing activity always leaves room for the most remaining activities',
			'It tries all combinations',
			'It uses dynamic programming'
		],
		correct: 1,
		explanation: 'By always picking the activity that finishes earliest, you free up the most time for remaining activities. This greedy choice can be proven to be part of an optimal solution.'
	},
	{
		question: 'Greedy FAILS for the 0/1 Knapsack problem because:',
		options: [
			'Items are too heavy',
			'Taking the best value/weight ratio item may exclude a better combination',
			'The problem is too easy for greedy',
			'Greedy can\'t handle weights'
		],
		correct: 1,
		explanation: 'In 0/1 knapsack, you can\'t take fractions. The highest ratio item might use capacity that could be better used by a combination of other items. You need DP to consider all combinations.'
	},
	{
		question: 'Dynamic Programming requires two properties:',
		options: [
			'Greedy choice + independence',
			'Optimal substructure + overlapping subproblems',
			'Divide + combine',
			'Pruning + backtracking'
		],
		correct: 1,
		explanation: 'DP needs: (1) Optimal substructure — optimal solution uses optimal sub-solutions, and (2) Overlapping subproblems — same subproblems are solved multiple times. Store results to avoid recomputation.'
	},
	{
		question: 'The difference between memoization and tabulation is:',
		options: [
			'They produce different results',
			'Memoization is top-down (recursive + cache), tabulation is bottom-up (iterative + table)',
			'Memoization is faster',
			'Tabulation uses more memory'
		],
		correct: 1,
		explanation: 'Memoization: start from the original problem, recurse down, cache results. Tabulation: start from base cases, fill table iteratively upward. Both achieve the same O(n) for Fibonacci vs O(2^n) naive.'
	},
	{
		question: 'The 0/1 Knapsack DP has time complexity:',
		options: ['O(n)', 'O(nW)', 'O(n²)', 'O(2^n)'],
		correct: 1,
		explanation: 'DP table is n×W where n = items, W = capacity. Each cell computed in O(1). Total: O(nW). This is pseudo-polynomial — polynomial in the value of W, not its bit-length.'
	},
	{
		question: 'The Longest Common Subsequence (LCS) of "ABCBDAB" and "BDCAB" is:',
		options: ['"BCAB" (length 4)', '"BDB" (length 3)', '"AB" (length 2)', '"BDAB" (length 4)'],
		correct: 0,
		explanation: 'LCS = "BCAB" with length 4. The DP table compares characters: if they match, extend the diagonal; otherwise take the max of left or top cell.'
	},
	{
		question: 'Backtracking is essentially:',
		options: [
			'A greedy approach',
			'Systematic trial-and-error with pruning of invalid paths',
			'Dynamic programming with recursion',
			'Binary search on solutions'
		],
		correct: 1,
		explanation: 'Backtracking builds solutions incrementally, checks constraints (prune), and undoes choices that lead to dead ends. It explores the search tree but skips branches that can\'t lead to valid solutions.'
	},
	{
		question: 'In backtracking, "pruning" means:',
		options: [
			'Removing nodes from the graph',
			'Skipping branches that cannot possibly lead to a valid solution',
			'Sorting the choices',
			'Caching results'
		],
		correct: 1,
		explanation: 'Pruning cuts off parts of the search tree early. In N-Queens, if placing a queen creates a conflict, we don\'t explore further down that path. This dramatically reduces the search space.'
	},
	{
		question: 'The N-Queens problem for N=8 has how many solutions?',
		options: ['1', '12', '92', '724'],
		correct: 2,
		explanation: '8-Queens has 92 distinct solutions. Backtracking finds all of them by trying each column in each row and pruning conflicts. Without pruning, we\'d check 8^8 = 16 million possibilities!'
	},
	{
		question: 'The key difference between D&C and DP is:',
		options: [
			'D&C is recursive, DP is not',
			'D&C has independent subproblems, DP has overlapping subproblems',
			'D&C is faster',
			'DP can\'t be recursive'
		],
		correct: 1,
		explanation: 'D&C subproblems are independent (merge sort: left half doesn\'t affect right half). DP subproblems overlap (Fibonacci: fib(5) and fib(4) both need fib(3)). DP stores results to avoid recomputation.'
	},
	{
		question: 'The key difference between Greedy and DP is:',
		options: [
			'Greedy is always faster',
			'Greedy makes one choice per step; DP considers all choices and picks the best',
			'DP can\'t solve optimization problems',
			'They are identical'
		],
		correct: 1,
		explanation: 'Greedy commits to the locally best choice without looking back. DP explores all options for each subproblem and combines the best. DP is more general but often slower than greedy.'
	},
	{
		question: 'Kadane\'s algorithm for maximum subarray sum uses which strategy?',
		options: ['Divide & Conquer', 'Greedy', 'Dynamic Programming', 'Backtracking'],
		correct: 2,
		explanation: 'Kadane\'s is DP: dp[i] = max(arr[i], dp[i-1] + arr[i]). At each position, either start a new subarray or extend the previous one. O(n) time vs O(n log n) for D&C approach.'
	},
	{
		question: 'To decide which strategy to use for a problem, the first question to ask is:',
		options: [
			'How large is the input?',
			'Can a locally optimal choice always lead to a global optimum? (If yes → Greedy)',
			'Is the problem NP-hard?',
			'How much memory is available?'
		],
		correct: 1,
		explanation: 'Start with Greedy (simplest). If greedy choice property holds → Greedy. If subproblems are independent → D&C. If subproblems overlap → DP. If you need to explore all configs → Backtracking.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
