export const theoryHTML = `
<section class="theory-section" id="what-is-recursion">
	<h2>1. What is Recursion?</h2>
	<div class="definition-box">
		<strong>Definition:</strong> <strong>Recursion</strong> is a technique where a function calls <strong>itself</strong> to solve a smaller sub-problem of the same type. Every recursive function must have:
		<ol class="list-decimal pl-6 mt-2">
			<li><strong>Base Case</strong> — the condition that stops the recursion (prevents infinite calls)</li>
			<li><strong>Recursive Case</strong> — the function calls itself with a <em>smaller/simpler</em> input</li>
		</ol>
	</div>

	<h3>The Mental Model</h3>
<pre><code>// Recursion is like Russian nesting dolls
// Each doll opens to reveal a smaller doll inside
// The smallest doll (base case) has nothing inside — you stop there

void printCountdown(int n) {
    if (n == 0) {           // BASE CASE — stop here
        cout &lt;&lt; "Done!" &lt;&lt; endl;
        return;
    }
    cout &lt;&lt; n &lt;&lt; " ";      // do some work
    printCountdown(n - 1);  // RECURSIVE CASE — call with smaller input
}

// printCountdown(5) prints: 5 4 3 2 1 Done!</code></pre>

	<h3>How Recursion Works — The Call Stack</h3>
	<p>Every function call creates a <strong>stack frame</strong> containing local variables and return address. Recursive calls stack on top of each other until the base case is reached, then they <strong>unwind</strong> (return) in reverse order.</p>
<pre><code>// Tracing factorial(4):
factorial(4)                    // Stack: [4]
  → 4 * factorial(3)           // Stack: [4, 3]
    → 3 * factorial(2)         // Stack: [4, 3, 2]
      → 2 * factorial(1)       // Stack: [4, 3, 2, 1]
        → return 1             // BASE CASE hit! Start unwinding
      → return 2 * 1 = 2       // Stack: [4, 3, 2]
    → return 3 * 2 = 6         // Stack: [4, 3]
  → return 4 * 6 = 24          // Stack: [4]
→ 24                            // Stack: [] — done!</code></pre>

	<div class="important-box">
		<strong>Key Insight:</strong> Recursion uses the <strong>system call stack</strong> implicitly. Every recursive solution can be converted to an iterative one using an explicit stack. Recursion trades code simplicity for stack space.
	</div>
</section>

<section class="theory-section" id="tracing-recursion">
	<h2>2. Tracing Recursion</h2>
	<div class="definition-box">
		<strong>Tracing</strong> means following the execution step by step to understand what the function does. This is the #1 skill for mastering recursion. Use a <strong>recursion tree</strong> or <strong>stack trace</strong> to visualize.
	</div>

	<h3>Tracing — Ascending vs Descending</h3>
<pre><code>// CALLING phase (descending) — work BEFORE the recursive call
void printDescending(int n) {
    if (n == 0) return;
    cout &lt;&lt; n &lt;&lt; " ";         // prints BEFORE recursion
    printDescending(n - 1);
}
// Output: 5 4 3 2 1 (work is done on the way DOWN)

// RETURNING phase (ascending) — work AFTER the recursive call
void printAscending(int n) {
    if (n == 0) return;
    printAscending(n - 1);
    cout &lt;&lt; n &lt;&lt; " ";         // prints AFTER recursion returns
}
// Output: 1 2 3 4 5 (work is done on the way UP/back)</code></pre>

	<div class="important-box">
		<strong>Critical Rule:</strong>
		<ul class="list-disc pl-6 mt-2">
			<li>Code <strong>before</strong> the recursive call executes during the <strong>calling/winding phase</strong></li>
			<li>Code <strong>after</strong> the recursive call executes during the <strong>returning/unwinding phase</strong></li>
		</ul>
		This distinction is what makes recursion powerful — you can do work in both directions!
	</div>

	<h3>Tracing Example: Sum of Natural Numbers</h3>
<pre><code>int sum(int n) {
    if (n == 0) return 0;        // base case
    return n + sum(n - 1);       // recursive case
}

// Tracing sum(5):
// sum(5) = 5 + sum(4)
//            = 5 + (4 + sum(3))
//            = 5 + (4 + (3 + sum(2)))
//            = 5 + (4 + (3 + (2 + sum(1))))
//            = 5 + (4 + (3 + (2 + (1 + sum(0)))))
//            = 5 + (4 + (3 + (2 + (1 + 0))))
//            = 5 + (4 + (3 + (2 + 1)))
//            = 5 + (4 + (3 + 3))
//            = 5 + (4 + 6)
//            = 5 + 10
//            = 15</code></pre>

	<h3>Recursion Tree</h3>
	<p>For functions with <strong>multiple recursive calls</strong>, draw a tree where each node is a function call and children are the sub-calls.</p>
<pre><code>// Fibonacci: fib(n) = fib(n-1) + fib(n-2)
//
//                    fib(5)
//                  /        \\
//              fib(4)       fib(3)
//             /     \\       /    \\
//          fib(3)  fib(2) fib(2) fib(1)
//          /   \\   / \\    / \\
//      fib(2) fib(1) ...  ...
//       / \\
//   fib(1) fib(0)
//
// Notice: fib(3) is computed TWICE, fib(2) THREE times!
// This is why naive Fibonacci is O(2^n) — exponential waste!</code></pre>
</section>

<section class="theory-section" id="types-of-recursion">
	<h2>3. Types of Recursion</h2>

	<h3>3.1 Tail Recursion</h3>
	<div class="definition-box">
		<strong>Tail Recursion:</strong> The recursive call is the <strong>LAST operation</strong> in the function. Nothing happens after the recursive call returns. Tail recursion can be optimized by the compiler into a loop (Tail Call Optimization — TCO).
	</div>
<pre><code>// TAIL recursive — recursive call is the LAST thing
void tailPrint(int n) {
    if (n == 0) return;
    cout &lt;&lt; n &lt;&lt; " ";      // work done FIRST
    tailPrint(n - 1);       // recursive call is LAST — nothing after it
}

// Equivalent iterative version (compiler can do this automatically):
void tailPrintIterative(int n) {
    while (n &gt; 0) {
        cout &lt;&lt; n &lt;&lt; " ";
        n--;
    }
}</code></pre>

	<h3>3.2 Head Recursion</h3>
	<div class="definition-box">
		<strong>Head Recursion:</strong> The recursive call is the <strong>FIRST operation</strong>. All processing happens after the recursive call returns. Cannot be easily converted to a loop.
	</div>
<pre><code>// HEAD recursive — recursive call is FIRST
void headPrint(int n) {
    if (n == 0) return;
    headPrint(n - 1);       // recursive call is FIRST
    cout &lt;&lt; n &lt;&lt; " ";      // work done AFTER return
}
// Output: 1 2 3 4 5 (prints in ascending order on the way back up)</code></pre>

	<h3>3.3 Linear Recursion</h3>
	<div class="definition-box">
		<strong>Linear Recursion:</strong> The function makes <strong>exactly one</strong> recursive call per invocation. The call trace forms a straight line. Time: O(n), Space: O(n).
	</div>
<pre><code>// Linear: one recursive call per invocation
int factorial(int n) {
    if (n &lt;= 1) return 1;
    return n * factorial(n - 1);  // ONE recursive call
}
// Call chain: fact(5) → fact(4) → fact(3) → fact(2) → fact(1)
// Linear chain — O(n) calls</code></pre>

	<h3>3.4 Tree Recursion</h3>
	<div class="definition-box">
		<strong>Tree Recursion:</strong> The function makes <strong>TWO or more</strong> recursive calls per invocation. The call trace forms a tree. Often leads to exponential time complexity.
	</div>
<pre><code>// Tree recursion: TWO recursive calls
int fib(int n) {
    if (n &lt;= 1) return n;
    return fib(n-1) + fib(n-2);  // TWO calls → tree structure
}
// Time: O(2^n) — each call spawns two more
// Space: O(n) — max depth of the tree (only one branch active at a time)</code></pre>

	<h3>3.5 Indirect Recursion</h3>
	<div class="definition-box">
		<strong>Indirect Recursion:</strong> Function A calls function B, and function B calls function A (or through a longer chain). Also called <strong>mutual recursion</strong>.
	</div>
<pre><code>// A calls B, B calls A
void funcB(int n);  // forward declaration

void funcA(int n) {
    if (n &lt;= 0) return;
    cout &lt;&lt; n &lt;&lt; " ";
    funcB(n - 1);       // A calls B
}

void funcB(int n) {
    if (n &lt;= 1) return;
    cout &lt;&lt; n &lt;&lt; " ";
    funcA(n / 2);       // B calls A
}</code></pre>

	<h3>3.6 Nested Recursion</h3>
	<div class="definition-box">
		<strong>Nested Recursion:</strong> A recursive call is passed as an <strong>argument</strong> to another recursive call. The inner call must resolve before the outer call can proceed.
	</div>
<pre><code>// The argument to the recursive call is itself a recursive call
int nested(int n) {
    if (n &gt; 100) return n - 10;
    return nested(nested(n + 11));   // nested call as argument!
}
// This is the McCarthy 91 function
// For n &lt;= 100, it always returns 91</code></pre>

	<h3>Summary Table</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Type</th>
				<th class="text-left p-2 text-gray-400">Key Feature</th>
				<th class="text-left p-2 text-gray-400">Time</th>
				<th class="text-left p-2 text-gray-400">Space</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Tail</td><td class="p-2">Recursive call is LAST</td><td class="p-2">O(n)</td><td class="p-2">O(1) with TCO</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Head</td><td class="p-2">Recursive call is FIRST</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Linear</td><td class="p-2">One call per invocation</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Tree</td><td class="p-2">Two+ calls per invocation</td><td class="p-2">O(2^n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Indirect</td><td class="p-2">A→B→A cycle</td><td class="p-2">Varies</td><td class="p-2">Varies</td></tr>
			<tr><td class="p-2">Nested</td><td class="p-2">Recursive call as argument</td><td class="p-2">Varies</td><td class="p-2">Varies</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="classic-problems">
	<h2>4. Classic Recursion Problems</h2>

	<h3>4.1 Factorial</h3>
<pre><code>// n! = n × (n-1) × (n-2) × ... × 1
// 0! = 1 (base case)
// n! = n × (n-1)!

int factorial(int n) {
    if (n &lt;= 0) return 1;     // base case
    return n * factorial(n-1);  // n * (n-1)!
}
// Time: O(n)  Space: O(n) — n stack frames</code></pre>

	<h3>4.2 Power / Exponentiation</h3>
<pre><code>// Naive: x^n = x × x × x ... (n times) → O(n)
int power(int x, int n) {
    if (n == 0) return 1;
    return x * power(x, n-1);
}

// Efficient: x^n = (x^(n/2))^2     → O(log n)
// If n is even: x^n = x^(n/2) × x^(n/2)
// If n is odd:  x^n = x × x^(n/2) × x^(n/2)
int fastPower(int x, int n) {
    if (n == 0) return 1;
    int half = fastPower(x, n / 2);
    if (n % 2 == 0)
        return half * half;           // even
    else
        return x * half * half;       // odd
}
// fastPower(2, 10): only 4 calls instead of 10!
// Time: O(log n)  Space: O(log n)</code></pre>

	<h3>4.3 Fibonacci</h3>
<pre><code>// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
// fib(0) = 0, fib(1) = 1
// fib(n) = fib(n-1) + fib(n-2)

// Naive — O(2^n) time, O(n) space
int fib(int n) {
    if (n &lt;= 1) return n;
    return fib(n-1) + fib(n-2);
}

// Iterative — O(n) time, O(1) space
int fibIterative(int n) {
    if (n &lt;= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i &lt;= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}</code></pre>

	<h3>4.4 nCr — Combinations (Pascal's Triangle)</h3>
<pre><code>// nCr = n! / (r! × (n-r)!)
// Recursive formula (Pascal's): C(n,r) = C(n-1,r-1) + C(n-1,r)
// Base: C(n,0) = C(n,n) = 1

int nCr(int n, int r) {
    if (r == 0 || r == n) return 1;        // base case
    return nCr(n-1, r-1) + nCr(n-1, r);   // Pascal's identity
}

// nCr(5,2) = 10
// This is tree recursion → O(2^n) without memoization</code></pre>

	<h3>4.5 Tower of Hanoi</h3>
	<div class="definition-box">
		<strong>Problem:</strong> Move n disks from source peg to destination peg using an auxiliary peg. Rules: (1) Only one disk at a time. (2) Never place a larger disk on a smaller one.
	</div>
<pre><code>// Strategy:
// 1. Move (n-1) disks from source → auxiliary (using destination as helper)
// 2. Move disk n from source → destination
// 3. Move (n-1) disks from auxiliary → destination (using source as helper)

void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    towerOfHanoi(n-1, from, aux, to);       // step 1
    cout &lt;&lt; "Move disk " &lt;&lt; n &lt;&lt; " from " &lt;&lt; from &lt;&lt; " to " &lt;&lt; to &lt;&lt; endl;  // step 2
    towerOfHanoi(n-1, aux, to, from);       // step 3
}

// towerOfHanoi(3, 'A', 'C', 'B');
// Total moves = 2^n - 1
// For n=3: 7 moves, n=4: 15 moves, n=10: 1023 moves
// Time: O(2^n)  Space: O(n)</code></pre>

	<h3>4.6 Taylor Series (e^x)</h3>
<pre><code>// e^x = 1 + x/1! + x²/2! + x³/3! + ... + x^n/n!
// Each term: x^i / i!

// Naive recursive — O(n^2)
double taylorSeries(int x, int n) {
    static double p = 1, f = 1;   // p = x^i, f = i!
    if (n == 0) return 1;
    double result = taylorSeries(x, n-1);
    p *= x;
    f *= n;
    return result + p/f;
}

// Using Horner's Rule — O(n) — much more efficient
// e^x = 1 + x/1(1 + x/2(1 + x/3(...)))
double taylorHorner(int x, int n) {
    static double result = 1;
    if (n == 0) return result;
    result = 1 + (double)x/n * result;
    return taylorHorner(x, n-1);
}</code></pre>
</section>

<section class="theory-section" id="memoization">
	<h2>5. Memoization (Top-Down DP)</h2>
	<div class="definition-box">
		<strong>Memoization:</strong> An optimization technique where you <strong>cache/store</strong> the results of expensive recursive calls so they are computed only ONCE. When the same sub-problem is encountered again, return the cached result instead of recomputing. This is the foundation of <strong>Dynamic Programming</strong>.
	</div>

	<h3>The Problem: Overlapping Sub-problems</h3>
<pre><code>// Naive Fibonacci recomputes the same values many times:
// fib(5) calls fib(4) and fib(3)
// fib(4) calls fib(3) and fib(2)  ← fib(3) computed AGAIN!
// fib(3) calls fib(2) and fib(1)  ← fib(2) computed AGAIN!
// Total calls for fib(5): 15
// Total calls for fib(40): ~330 million!
// Total calls for fib(50): ~40 BILLION!</code></pre>

	<h3>The Fix: Memoize!</h3>
<pre><code>// Memoized Fibonacci — O(n) time, O(n) space
int memo[1000] = {0};  // cache array, initialized to 0

int fibMemo(int n) {
    if (n &lt;= 1) return n;
    if (memo[n] != 0) return memo[n];   // already computed? return it!
    memo[n] = fibMemo(n-1) + fibMemo(n-2);  // compute and STORE
    return memo[n];
}

// fibMemo(50) now takes ~50 calls instead of 40 billion!
// Each sub-problem computed exactly ONCE → O(n) total</code></pre>

	<h3>Before vs After Memoization</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Metric</th>
				<th class="text-left p-2 text-gray-400">Naive Recursion</th>
				<th class="text-left p-2 text-gray-400">Memoized</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Time</td><td class="p-2">O(2^n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Space</td><td class="p-2">O(n) stack</td><td class="p-2">O(n) stack + O(n) cache</td></tr>
			<tr><td class="p-2">fib(50) calls</td><td class="p-2">~40 billion</td><td class="p-2">~50</td></tr>
		</tbody>
	</table>

	<div class="important-box">
		<strong>Google Interview Insight:</strong> Memoization is the bridge between recursion and Dynamic Programming. In interviews, you'll often:
		<ol class="list-decimal pl-6 mt-2">
			<li>Write the naive recursive solution first</li>
			<li>Identify overlapping sub-problems</li>
			<li>Add memoization → instant optimization</li>
			<li>Optionally convert to bottom-up DP (tabulation)</li>
		</ol>
	</div>
</section>

<section class="theory-section" id="recursion-vs-iteration">
	<h2>6. Recursion vs Iteration</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Recursion</th>
				<th class="text-left p-2 text-gray-400">Iteration</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Uses</td><td class="p-2">System call stack</td><td class="p-2">Loop (for/while)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Space</td><td class="p-2">O(n) stack frames</td><td class="p-2">O(1) typically</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Readability</td><td class="p-2">Often cleaner for tree/divide problems</td><td class="p-2">Simpler for linear tasks</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Risk</td><td class="p-2">Stack overflow</td><td class="p-2">Infinite loop</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Performance</td><td class="p-2">Overhead per call</td><td class="p-2">Faster (no call overhead)</td></tr>
			<tr><td class="p-2">Best for</td><td class="p-2">Trees, graphs, backtracking, divide & conquer</td><td class="p-2">Simple loops, array traversal</td></tr>
		</tbody>
	</table>

	<div class="important-box">
		<strong>When to use Recursion:</strong>
		<ul class="list-disc pl-6 mt-2">
			<li>Problem has a natural recursive structure (trees, graphs, fractals)</li>
			<li>Backtracking (N-Queens, Sudoku, permutations)</li>
			<li>Divide and Conquer (Merge Sort, Quick Sort, Binary Search)</li>
			<li>When the iterative version is much harder to write</li>
		</ul>
		<strong>When to use Iteration:</strong>
		<ul class="list-disc pl-6 mt-2">
			<li>Simple repetitive tasks (summing array, linear search)</li>
			<li>When space is critical (no stack frame overhead)</li>
			<li>Tail-recursive functions → always convert to iteration</li>
		</ul>
	</div>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Recursion</strong> = function calling itself. Must have base case + recursive case.</li>
			<li>• <strong>Tracing</strong> — code before recursive call runs on the way DOWN, code after runs on the way UP.</li>
			<li>• <strong>Tail recursion</strong> — recursive call is LAST statement. Can be optimized to O(1) space.</li>
			<li>• <strong>Tree recursion</strong> — 2+ recursive calls → exponential time O(2^n).</li>
			<li>• <strong>Tower of Hanoi</strong> — move n-1 to aux, move nth to dest, move n-1 to dest. O(2^n) moves.</li>
			<li>• <strong>Memoization</strong> — cache results of sub-problems. Transforms O(2^n) → O(n).</li>
			<li>• <strong>Fibonacci</strong> — naive O(2^n), memoized O(n), iterative O(n) with O(1) space.</li>
			<li>• <strong>Fast power</strong> — x^n in O(log n) by squaring halves.</li>
			<li>• <strong>nCr</strong> — Pascal's identity: C(n,r) = C(n-1,r-1) + C(n-1,r).</li>
			<li>• <strong>Taylor Series</strong> — Horner's rule reduces from O(n²) to O(n).</li>
			<li>• Recursion is essential for trees, graphs, backtracking, divide & conquer.</li>
		</ul>
	</div>
</section>
`;
