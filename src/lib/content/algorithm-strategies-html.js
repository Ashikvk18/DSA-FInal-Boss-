export const theoryHTML = `
<section class="theory-section" id="recurrence">
	<h2>1. Recurrence Relations & Asymptotic Notations</h2>
	<div class="definition-box">
		<strong>Recurrence Relation:</strong> An equation that defines a function in terms of its value on smaller inputs. Used to express the time complexity of recursive algorithms.<br><br>
		<strong>Asymptotic Notations:</strong> Describe growth rate of functions as input grows large.
	</div>

<pre><code>// Big-O (upper bound): f(n) = O(g(n)) means f grows at MOST as fast as g
// Big-Ω (lower bound): f(n) = Ω(g(n)) means f grows at LEAST as fast as g
// Big-Θ (tight bound): f(n) = Θ(g(n)) means f grows at the SAME rate as g

// Common growth rates (slowest to fastest):
// O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(n³) &lt; O(2ⁿ) &lt; O(n!)

// Common recurrences:
// T(n) = T(n-1) + O(1)      → O(n)        [linear scan]
// T(n) = T(n-1) + O(n)      → O(n²)       [bubble sort]
// T(n) = T(n/2) + O(1)      → O(log n)    [binary search]
// T(n) = 2T(n/2) + O(n)     → O(n log n)  [merge sort]
// T(n) = 2T(n/2) + O(1)     → O(n)        [tree traversal]
// T(n) = T(n-1) + T(n-2)    → O(2ⁿ)       [naive fibonacci]</code></pre>

	<h3>Master Theorem</h3>
<pre><code>// For recurrences of the form: T(n) = aT(n/b) + O(n^d)
// a = number of subproblems
// b = factor by which input shrinks
// d = exponent of work outside recursion

// Case 1: d &lt; log_b(a) → T(n) = O(n^(log_b(a)))
// Case 2: d = log_b(a) → T(n) = O(n^d × log n)
// Case 3: d &gt; log_b(a) → T(n) = O(n^d)

// Examples:
// Merge sort: T(n) = 2T(n/2) + O(n) → a=2, b=2, d=1
//   log_2(2) = 1 = d → Case 2 → O(n log n) ✓
// Binary search: T(n) = T(n/2) + O(1) → a=1, b=2, d=0
//   log_2(1) = 0 = d → Case 2 → O(log n) ✓
// Strassen: T(n) = 7T(n/2) + O(n²) → a=7, b=2, d=2
//   log_2(7) ≈ 2.81 &gt; 2 → Case 1 → O(n^2.81) ✓</code></pre>
</section>

<section class="theory-section" id="divide-conquer">
	<h2>2. Divide & Conquer</h2>
	<div class="definition-box">
		<strong>Strategy:</strong> <strong>Divide</strong> the problem into smaller subproblems, <strong>Conquer</strong> each subproblem recursively, <strong>Combine</strong> the results. Works when subproblems are independent.
	</div>

<pre><code>// Template:
solve(problem):
    if problem is small enough:
        return base_case_solution
    
    subproblems = divide(problem)
    solutions = [solve(sub) for sub in subproblems]
    return combine(solutions)

// Classic D&amp;C algorithms:
// Merge Sort:   divide array, sort halves, merge — O(n log n)
// Quick Sort:   partition around pivot, sort partitions — O(n log n) avg
// Binary Search: check middle, search one half — O(log n)
// Strassen:     matrix multiply with 7 sub-multiplications — O(n^2.81)
// Closest Pair: divide points, find closest in each half — O(n log n)
// Karatsuba:    multiply large numbers with 3 sub-multiplications

// When to use D&amp;C:
// ✓ Problem can be split into INDEPENDENT subproblems
// ✓ Subproblems are the same type as original
// ✓ Combining solutions is efficient
// ✗ NOT when subproblems overlap (use DP instead)</code></pre>

<pre><code>// Example: Maximum subarray sum (D&amp;C approach)
int maxCrossingSum(int arr[], int l, int m, int r) {
    int leftSum = INT_MIN, sum = 0;
    for (int i = m; i &gt;= l; i--) {
        sum += arr[i];
        leftSum = max(leftSum, sum);
    }
    int rightSum = INT_MIN; sum = 0;
    for (int i = m + 1; i &lt;= r; i++) {
        sum += arr[i];
        rightSum = max(rightSum, sum);
    }
    return leftSum + rightSum;
}

int maxSubarrayDC(int arr[], int l, int r) {
    if (l == r) return arr[l];
    int m = (l + r) / 2;
    return max({maxSubarrayDC(arr, l, m),
                maxSubarrayDC(arr, m + 1, r),
                maxCrossingSum(arr, l, m, r)});
}
// T(n) = 2T(n/2) + O(n) → O(n log n)
// (Kadane's algorithm does this in O(n) using DP!)</code></pre>
</section>

<section class="theory-section" id="greedy">
	<h2>3. Greedy Algorithms</h2>
	<div class="definition-box">
		<strong>Strategy:</strong> At each step, make the <strong>locally optimal choice</strong> hoping it leads to a globally optimal solution. Greedy works when the problem has the <strong>greedy choice property</strong> and <strong>optimal substructure</strong>.
	</div>

<pre><code>// Greedy choice property: a locally optimal choice leads to a global optimum
// Optimal substructure: optimal solution contains optimal sub-solutions

// Classic greedy algorithms:
// Activity Selection:    pick earliest-finishing activity
// Huffman Coding:        merge two lowest-frequency nodes
// Dijkstra's:            pick closest unvisited vertex
// Kruskal's MST:         pick lightest edge that doesn't form cycle
// Prim's MST:            grow tree by adding lightest edge
// Fractional Knapsack:   take items by value/weight ratio
// Coin Change (greedy):  take largest denomination first (not always optimal!)

// When greedy WORKS:
// ✓ Activity selection, interval scheduling
// ✓ Huffman coding
// ✓ Shortest path (Dijkstra — non-negative weights)
// ✓ MST (Kruskal, Prim)

// When greedy FAILS:
// ✗ 0/1 Knapsack (must use DP)
// ✗ Coin change with arbitrary denominations
// ✗ Traveling Salesman Problem</code></pre>

<pre><code>// Activity Selection: pick maximum non-overlapping activities
// Greedy: always pick the activity that FINISHES earliest

struct Activity { int start, end; };

int activitySelection(Activity acts[], int n) {
    // Sort by end time
    sort(acts, acts + n, [](Activity &amp;a, Activity &amp;b) {
        return a.end &lt; b.end;
    });
    
    int count = 1, lastEnd = acts[0].end;
    for (int i = 1; i &lt; n; i++) {
        if (acts[i].start &gt;= lastEnd) {
            count++;
            lastEnd = acts[i].end;
        }
    }
    return count;
}

// Fractional Knapsack: take fractions of items
// Sort by value/weight ratio, take greedily
// O(n log n) — always optimal for fractional version</code></pre>
</section>

<section class="theory-section" id="dp">
	<h2>4. Dynamic Programming (DP)</h2>
	<div class="definition-box">
		<strong>Strategy:</strong> Break problem into <strong>overlapping subproblems</strong>, solve each <strong>once</strong>, and <strong>store results</strong> (memoization/tabulation) to avoid redundant computation. The most powerful technique for optimization problems.
	</div>

<pre><code>// Two approaches:
// Top-Down (Memoization): recursive + cache results
// Bottom-Up (Tabulation): iterative, fill table from base cases

// DP works when:
// 1. Optimal Substructure: solution built from sub-solutions
// 2. Overlapping Subproblems: same subproblems solved repeatedly

// Steps to solve DP problems:
// 1. Define STATE: what variables describe a subproblem?
// 2. Define TRANSITION: how does current state relate to smaller states?
// 3. Define BASE CASE: smallest subproblem with known answer
// 4. Define ANSWER: which state gives the final result?</code></pre>

<pre><code>// Example 1: Fibonacci
// Naive recursion: O(2^n) — exponential!
// DP: O(n)

// Top-Down (Memoization)
int memo[1000] = {0};
int fib(int n) {
    if (n &lt;= 1) return n;
    if (memo[n]) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}

// Bottom-Up (Tabulation)
int fibBU(int n) {
    int dp[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i &lt;= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}</code></pre>

<pre><code>// Example 2: 0/1 Knapsack
// Given n items with weight[] and value[], capacity W
// Maximize total value without exceeding capacity

int knapsack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];
    for (int i = 0; i &lt;= n; i++) {
        for (int w = 0; w &lt;= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] &lt;= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]],
                               dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}
// Time: O(nW), Space: O(nW)</code></pre>

<pre><code>// Example 3: Longest Common Subsequence (LCS)
int lcs(string a, string b) {
    int m = a.size(), n = b.size();
    int dp[m + 1][n + 1];
    for (int i = 0; i &lt;= m; i++)
        for (int j = 0; j &lt;= n; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    return dp[m][n];
}

// Classic DP problems to know:
// Fibonacci, Knapsack, LCS, LIS, Coin Change,
// Edit Distance, Matrix Chain, Subset Sum, Rod Cutting</code></pre>
</section>

<section class="theory-section" id="backtracking">
	<h2>5. Backtracking</h2>
	<div class="definition-box">
		<strong>Strategy:</strong> Build solutions <strong>incrementally</strong>, abandoning ("backtracking") a path as soon as it's determined that it <strong>cannot lead to a valid solution</strong>. Systematic trial-and-error with pruning.
	</div>

<pre><code>// Template:
void backtrack(state, choices):
    if state is a valid solution:
        record solution
        return
    
    for each choice in choices:
        if choice is valid (PRUNING):
            make choice (modify state)
            backtrack(new state, remaining choices)
            undo choice (BACKTRACK)

// Key: PRUNE invalid paths early to avoid exploring entire search space

// Classic backtracking problems:
// N-Queens:        place N queens on NxN board, no attacks
// Sudoku Solver:   fill 9x9 grid following rules
// Permutations:    generate all orderings
// Subsets/Combos:  generate all subsets
// Maze/Path:       find path from start to end
// Graph Coloring:  color graph with k colors</code></pre>

<pre><code>// Example: N-Queens
bool isSafe(int board[][20], int row, int col, int n) {
    for (int i = 0; i &lt; row; i++)
        if (board[i][col]) return false;
    for (int i = row-1, j = col-1; i &gt;= 0 &amp;&amp; j &gt;= 0; i--, j--)
        if (board[i][j]) return false;
    for (int i = row-1, j = col+1; i &gt;= 0 &amp;&amp; j &lt; n; i--, j++)
        if (board[i][j]) return false;
    return true;
}

void solveNQueens(int board[][20], int row, int n, int &amp;count) {
    if (row == n) { count++; return; }
    for (int col = 0; col &lt; n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 1;        // place queen
            solveNQueens(board, row + 1, n, count);
            board[row][col] = 0;        // BACKTRACK
        }
    }
}
// 4-Queens: 2 solutions. 8-Queens: 92 solutions.</code></pre>
</section>

<section class="theory-section" id="strategy-comparison">
	<h2>6. When to Use Which Strategy?</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Strategy</th>
				<th class="text-left p-2 text-gray-400">Key Idea</th>
				<th class="text-left p-2 text-gray-400">When to Use</th>
				<th class="text-left p-2 text-gray-400">Examples</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">D&amp;C</td><td class="p-2">Split → Solve → Combine</td><td class="p-2">Independent subproblems</td><td class="p-2">Merge sort, Binary search</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">Greedy</td><td class="p-2">Local best → Global best</td><td class="p-2">Greedy choice property holds</td><td class="p-2">Activity selection, Dijkstra</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">DP</td><td class="p-2">Solve once, store, reuse</td><td class="p-2">Overlapping subproblems + optimal substructure</td><td class="p-2">Knapsack, LCS, Fibonacci</td></tr>
			<tr><td class="p-2 font-bold">Backtracking</td><td class="p-2">Try, prune, undo</td><td class="p-2">Search all valid configurations</td><td class="p-2">N-Queens, Sudoku, Permutations</td></tr>
		</tbody>
	</table>

	<div class="important-box">
		<strong>Decision flow:</strong><br>
		1. Can you make a local choice that's always optimal? → <strong>Greedy</strong><br>
		2. Can you split into independent subproblems? → <strong>Divide &amp; Conquer</strong><br>
		3. Are subproblems overlapping? → <strong>Dynamic Programming</strong><br>
		4. Need to explore all valid configurations? → <strong>Backtracking</strong>
	</div>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Recurrences</strong>: express recursive algorithm complexity. Use Master Theorem for T(n) = aT(n/b) + O(n^d).</li>
			<li>• <strong>Divide &amp; Conquer</strong>: split into independent subproblems, solve recursively, combine. Merge sort, binary search.</li>
			<li>• <strong>Greedy</strong>: local optimum → global optimum. Works for activity selection, MST, Dijkstra. Fails for 0/1 knapsack.</li>
			<li>• <strong>DP</strong>: overlapping subproblems + optimal substructure. Memoization (top-down) or tabulation (bottom-up). Most powerful optimization technique.</li>
			<li>• <strong>DP steps</strong>: define state → transition → base case → answer.</li>
			<li>• <strong>Backtracking</strong>: build incrementally, prune invalid paths, undo choices. N-Queens, Sudoku, permutations.</li>
			<li>• <strong>Greedy vs DP</strong>: greedy makes one choice per step; DP considers all choices and picks the best.</li>
			<li>• <strong>D&amp;C vs DP</strong>: D&amp;C subproblems are independent; DP subproblems overlap.</li>
		</ul>
	</div>
</section>
`;
