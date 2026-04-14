export const theoryHTML = `
<section class="theory-section" id="stack-vs-heap">
	<h2>1. Stack vs Heap Memory</h2>
	<div class="definition-box">
		<strong>Definition:</strong> In C/C++, memory is divided into several segments. The two most important for a programmer are the <strong>Stack</strong> and the <strong>Heap</strong>. Understanding them is critical for writing efficient, bug-free code — and this is a <strong>Google interview favorite</strong>.
	</div>

	<h3>The Memory Layout of a C++ Program</h3>
<pre><code>+------------------+  High Address
|      Stack       |  ← grows downward
|        ↓         |
|                  |
|        ↑         |
|       Heap       |  ← grows upward
+------------------+
|   Global/Static  |
+------------------+
|    Code (Text)   |
+------------------+  Low Address</code></pre>

	<h3>Stack Memory</h3>
	<div class="definition-box">
		<strong>Stack:</strong> A region of memory that stores <strong>local variables</strong>, <strong>function parameters</strong>, and <strong>return addresses</strong>. It operates in a <strong>LIFO (Last In, First Out)</strong> manner. Memory is automatically allocated when a function is called and deallocated when the function returns.
	</div>
	<h4>Characteristics of Stack:</h4>
	<ul class="list-disc pl-6 space-y-1 text-gray-300">
		<li><strong>Automatic allocation/deallocation</strong> — managed by the compiler</li>
		<li><strong>Fast access</strong> — just moving the stack pointer (one CPU instruction)</li>
		<li><strong>Limited size</strong> — typically 1–8 MB (OS dependent)</li>
		<li><strong>LIFO order</strong> — last function called is first to return</li>
		<li><strong>Contiguous</strong> — grows/shrinks from one end</li>
		<li><strong>No fragmentation</strong></li>
	</ul>
<pre><code>void foo() {
    int x = 10;     // x is on the STACK
    float y = 3.14; // y is on the STACK
    int A[5];       // array A is on the STACK (5*4 = 20 bytes)
}  // x, y, A are ALL automatically destroyed here</code></pre>

	<h3>Heap Memory</h3>
	<div class="definition-box">
		<strong>Heap:</strong> A region of memory used for <strong>dynamic memory allocation</strong>. Memory is allocated manually by the programmer using <code>new</code> (C++) or <code>malloc</code> (C), and must be freed manually using <code>delete</code> or <code>free</code>. Also called the <strong>free store</strong> in C++.
	</div>
	<h4>Characteristics of Heap:</h4>
	<ul class="list-disc pl-6 space-y-1 text-gray-300">
		<li><strong>Manual allocation/deallocation</strong> — programmer's responsibility</li>
		<li><strong>Slower access</strong> — involves OS system calls, pointer dereferencing</li>
		<li><strong>Large size</strong> — limited only by available RAM (gigabytes)</li>
		<li><strong>No order</strong> — memory can be allocated/freed in any order</li>
		<li><strong>Can fragment</strong> — holes develop as blocks are freed in random order</li>
		<li><strong>Accessible globally</strong> — via pointers, data persists across function calls</li>
	</ul>
<pre><code>void bar() {
    int *p = new int(42);     // 42 is on the HEAP, p (the pointer) is on STACK
    int *arr = new int[100];  // array of 100 ints on HEAP

    // Use them...
    delete p;        // free single int
    delete[] arr;    // free array — MUST use delete[]
}
// If you forget delete → MEMORY LEAK
// p and arr (pointers) are destroyed, but heap memory would remain allocated</code></pre>

	<h3>Stack vs Heap — Comparison Table</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Stack</th>
				<th class="text-left p-2 text-gray-400">Heap</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Allocation</td><td class="p-2">Automatic</td><td class="p-2">Manual (new/delete)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Speed</td><td class="p-2">Very fast</td><td class="p-2">Slower</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Size</td><td class="p-2">Small (1-8 MB)</td><td class="p-2">Large (GBs)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Lifetime</td><td class="p-2">Function scope</td><td class="p-2">Until manually freed</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Fragmentation</td><td class="p-2">None</td><td class="p-2">Possible</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Access</td><td class="p-2">Local only</td><td class="p-2">Global via pointers</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Risk</td><td class="p-2">Stack overflow</td><td class="p-2">Memory leak, dangling ptr</td></tr>
			<tr><td class="p-2">Growth</td><td class="p-2">Downward</td><td class="p-2">Upward</td></tr>
		</tbody>
	</table>

	<div class="important-box">
		<strong>When to use which?</strong>
		<ul class="list-disc pl-6 mt-2">
			<li><strong>Stack:</strong> Small, short-lived data. Local variables, function params. Default choice.</li>
			<li><strong>Heap:</strong> Large data, data that must outlive the function, dynamic-sized data (size unknown at compile time).</li>
		</ul>
	</div>

	<h3>Stack Overflow</h3>
<pre><code>// This causes STACK OVERFLOW — infinite recursion eats up stack
void infinite() {
    int arr[1000];  // 4000 bytes per call
    infinite();     // each call adds a new stack frame
}
// Eventually: "Segmentation fault" or "Stack Overflow"</code></pre>

	<h3>Memory Leak</h3>
<pre><code>void leak() {
    int *p = new int[1000000];  // allocate 4MB on heap
    // forgot to delete[] p!
}
// Every call to leak() loses 4MB that can never be recovered
// until the program terminates</code></pre>
</section>

<section class="theory-section" id="physical-vs-logical">
	<h2>2. Physical vs Logical Data Structures</h2>
	<div class="definition-box">
		<strong>Physical Data Structures:</strong> These define <em>how</em> and <em>where</em> data is stored in memory. There are only two: <strong>Arrays</strong> and <strong>Linked Lists</strong>. Everything else is built on top of these.
	</div>
	<div class="definition-box">
		<strong>Logical Data Structures:</strong> These define <em>how</em> data is utilized/organized — the rules and operations. They are <em>implemented using</em> physical data structures. Examples: Stack, Queue, Tree, Graph, Hash Table.
	</div>

	<h3>The Hierarchy</h3>
<pre><code>Physical (how data is stored in memory):
├── Array      → contiguous memory, fixed size
└── Linked List → scattered nodes connected by pointers

Logical (how data is organized/accessed):
├── Stack      → LIFO (can use Array or Linked List)
├── Queue      → FIFO (can use Array or Linked List)
├── Tree       → hierarchical (uses Linked List internally)
├── Graph      → network (uses Array + Linked List)
└── Hash Table → key-value mapping (uses Array)</code></pre>

	<h3>Array vs Linked List — Physical Comparison</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Array</th>
				<th class="text-left p-2 text-gray-400">Linked List</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Memory</td><td class="p-2">Contiguous</td><td class="p-2">Scattered (nodes)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Size</td><td class="p-2">Fixed at creation</td><td class="p-2">Dynamic (grows/shrinks)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Access</td><td class="p-2">O(1) random access</td><td class="p-2">O(n) sequential</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert/Delete</td><td class="p-2">O(n) — shift elements</td><td class="p-2">O(1) at known position</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Extra space</td><td class="p-2">None</td><td class="p-2">Pointer per node</td></tr>
			<tr><td class="p-2">Cache</td><td class="p-2">Cache-friendly</td><td class="p-2">Cache-unfriendly</td></tr>
		</tbody>
	</table>

	<div class="important-box">
		<strong>Key Insight:</strong> Every data structure you will ever learn (Stack, Queue, BST, AVL Tree, Hash Table, Heap, Graph) is ultimately stored using either an <strong>Array</strong> or a <strong>Linked List</strong> (or both). Understanding this distinction is foundational.
	</div>
</section>

<section class="theory-section" id="adt">
	<h2>3. Abstract Data Type (ADT)</h2>
	<div class="definition-box">
		<strong>Definition:</strong> An <strong>Abstract Data Type (ADT)</strong> is a mathematical model for a data type where the data type is defined by its <strong>behavior (operations)</strong> from the point of view of a user — specifically what operations can be performed, what are the inputs, and what are the outputs — <strong>without specifying how those operations are implemented</strong>.
	</div>

	<h3>ADT = Data + Operations (no implementation details)</h3>
	<p>An ADT defines WHAT, not HOW. It's like a contract or interface.</p>

<pre><code>ADT: List
────────────
Data:
  - A collection of elements of a given type
  - Has a current size (length)

Operations:
  - add(element)      → adds element to the list
  - remove(index)     → removes element at index
  - get(index)        → returns element at index
  - set(index, elem)  → replaces element at index
  - length()          → returns current size
  - search(element)   → returns index or -1
  - display()         → prints all elements

Implementation?
  - Could be Array → ArrayList
  - Could be Linked List → LinkedList
  - ADT doesn't care! Same operations, different internals.</code></pre>

	<h3>Common ADTs</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">ADT</th>
				<th class="text-left p-2 text-gray-400">Key Operations</th>
				<th class="text-left p-2 text-gray-400">Common Implementations</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">List</td><td class="p-2">add, remove, get, set, search</td><td class="p-2">Array, Linked List</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Stack</td><td class="p-2">push, pop, peek, isEmpty</td><td class="p-2">Array, Linked List</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Queue</td><td class="p-2">enqueue, dequeue, front, isEmpty</td><td class="p-2">Array, Linked List</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Priority Queue</td><td class="p-2">insert, deleteMax/Min</td><td class="p-2">Heap (Array)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Dictionary/Map</td><td class="p-2">put, get, remove, containsKey</td><td class="p-2">Hash Table, BST</td></tr>
			<tr><td class="p-2">Set</td><td class="p-2">add, remove, contains, union, intersect</td><td class="p-2">Hash Table, BST</td></tr>
		</tbody>
	</table>

	<div class="example-box">
		<strong>Real-world analogy:</strong> Think of an ADT like a TV remote. You know the buttons (operations): power, volume up/down, channel change. You don't know (or need to know) the circuits inside. The ADT is the remote's interface; the implementation is the circuit board.
	</div>

	<h3>ADT in C++ — The Class Connection</h3>
<pre><code>// ADT for Stack
class Stack {
private:
    // Implementation hidden (could be array or linked list)
    int *arr;
    int top;
    int capacity;
public:
    // Only operations are visible
    Stack(int cap);
    void push(int val);
    int pop();
    int peek();
    bool isEmpty();
    bool isFull();
};

// The user only knows push, pop, peek, isEmpty, isFull
// They don't know or care if it uses array or linked list internally
// THIS IS ABSTRACTION — the core principle of ADT</code></pre>

	<div class="important-box">
		<strong>Why ADTs matter at Google:</strong> In system design and coding interviews, you're expected to think in terms of ADTs first — "I need a data structure that supports O(1) insert and O(log n) search" — then choose the right implementation. Separating WHAT from HOW is fundamental to good software engineering.
	</div>
</section>

<section class="theory-section" id="time-space-complexity">
	<h2>4. Time and Space Complexity</h2>
	<div class="definition-box">
		<strong>Definition:</strong> <strong>Time Complexity</strong> measures how the running time of an algorithm grows as the input size grows. <strong>Space Complexity</strong> measures how the memory usage grows. Both are expressed using <strong>Big-O notation</strong>, which describes the <strong>upper bound</strong> (worst case) of growth.
	</div>

	<h3>Why Complexity Analysis?</h3>
	<p>You can't just "time" your code — it depends on hardware, OS, language, etc. Complexity analysis gives a <strong>hardware-independent</strong> measure of algorithm efficiency. Google processes billions of requests — an O(n²) algorithm that works for 100 items will <strong>fail catastrophically</strong> for 1 million items.</p>

	<h3>Big-O Notation</h3>
	<div class="definition-box">
		<strong>Big-O O(f(n)):</strong> An algorithm is O(f(n)) if its running time grows <strong>at most</strong> as fast as f(n) for large n. It's the <strong>worst-case upper bound</strong>.
	</div>

	<h3>Common Time Complexities (Ranked)</h3>
<pre><code>Best ←────────────────────────────────────────→ Worst

O(1)  &lt;  O(log n)  &lt;  O(n)  &lt;  O(n log n)  &lt;  O(n²)  &lt;  O(n³)  &lt;  O(2ⁿ)  &lt;  O(n!)

For n = 1,000,000:
O(1)       = 1 operation
O(log n)   = ~20 operations
O(n)       = 1,000,000 operations
O(n log n) = ~20,000,000 operations
O(n²)      = 1,000,000,000,000 operations  ← TOO SLOW
O(2ⁿ)      = heat death of universe        ← IMPOSSIBLE</code></pre>

	<h3>Identifying Time Complexity from Code</h3>

	<h4>O(1) — Constant Time</h4>
<pre><code>int getFirst(int A[], int n) {
    return A[0];    // always 1 operation, regardless of n
}

// Accessing array by index, push/pop on stack, hash table lookup
// All O(1)</code></pre>

	<h4>O(log n) — Logarithmic Time</h4>
<pre><code>// Binary Search — halves the search space each step
int binarySearch(int A[], int n, int key) {
    int low = 0, high = n - 1;
    while (low &lt;= high) {        // runs log₂(n) times
        int mid = (low + high) / 2;
        if (A[mid] == key) return mid;
        else if (A[mid] &lt; key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
// n=1024 → 10 iterations. n=1,000,000 → 20 iterations!</code></pre>

	<h4>O(n) — Linear Time</h4>
<pre><code>// Linear Search — checks every element
int linearSearch(int A[], int n, int key) {
    for (int i = 0; i &lt; n; i++) {   // runs n times
        if (A[i] == key) return i;
    }
    return -1;
}

// Sum of array, finding max/min, printing all elements
// All O(n)</code></pre>

	<h4>O(n log n) — Linearithmic Time</h4>
<pre><code>// Merge Sort, Quick Sort (average), Heap Sort
// These divide the problem (log n levels) and do O(n) work per level
// Total: O(n log n)
// This is the BEST possible for comparison-based sorting</code></pre>

	<h4>O(n²) — Quadratic Time</h4>
<pre><code>// Nested loops — each element compared with every other
void bubbleSort(int A[], int n) {
    for (int i = 0; i &lt; n; i++) {          // n times
        for (int j = 0; j &lt; n-1; j++) {    // n times
            if (A[j] &gt; A[j+1])
                swap(A[j], A[j+1]);
        }
    }
}
// n=10,000 → 100,000,000 operations. Getting slow!</code></pre>

	<h4>O(2ⁿ) — Exponential Time</h4>
<pre><code>// Recursive Fibonacci (naive)
int fib(int n) {
    if (n &lt;= 1) return n;
    return fib(n-1) + fib(n-2);  // TWO recursive calls each time
}
// n=40 → ~1 billion calls. n=50 → your computer gives up.</code></pre>

	<h3>How to Analyze Code — Rules</h3>
	<div class="important-box">
		<strong>Rules for determining Big-O:</strong>
		<ol class="list-decimal pl-6 mt-2 space-y-1">
			<li><strong>Sequential statements:</strong> Add them. O(n) + O(n) = O(n)</li>
			<li><strong>Nested loops:</strong> Multiply them. O(n) × O(n) = O(n²)</li>
			<li><strong>Drop constants:</strong> O(2n) = O(n), O(500) = O(1)</li>
			<li><strong>Drop lower-order terms:</strong> O(n² + n) = O(n²)</li>
			<li><strong>Different inputs, different variables:</strong> O(a + b), not O(n)</li>
			<li><strong>Logarithmic:</strong> When input is halved/divided each step → O(log n)</li>
		</ol>
	</div>

	<h3>Examples of Analysis</h3>
<pre><code>// Example 1: O(n)
for (int i = 0; i &lt; n; i++) {    // n iterations
    cout &lt;&lt; A[i];                 // O(1) per iteration
}
// Total: n × 1 = O(n)

// Example 2: O(n²)
for (int i = 0; i &lt; n; i++) {        // n
    for (int j = 0; j &lt; n; j++) {    // n
        cout &lt;&lt; i * j;               // O(1)
    }
}
// Total: n × n × 1 = O(n²)

// Example 3: O(n) — NOT O(n²)!
for (int i = 0; i &lt; n; i++) {    // n
    // ...
}
for (int j = 0; j &lt; n; j++) {    // n
    // ...
}
// Total: n + n = 2n = O(n)  (sequential, not nested!)

// Example 4: O(log n)
for (int i = 1; i &lt; n; i = i * 2) {   // i doubles: 1,2,4,8,...n
    cout &lt;&lt; i;                          // runs log₂(n) times
}

// Example 5: O(n log n)
for (int i = 0; i &lt; n; i++) {          // n
    for (int j = 1; j &lt; n; j = j*2) {  // log n
        cout &lt;&lt; i + j;
    }
}
// Total: n × log n = O(n log n)

// Example 6: O(sqrt(n))
for (int i = 1; i*i &lt; n; i++) {   // runs sqrt(n) times
    cout &lt;&lt; i;
}</code></pre>

	<h3>Space Complexity</h3>
	<div class="definition-box">
		<strong>Space Complexity</strong> = memory used by the algorithm (excluding input). It includes:
		<ul class="list-disc pl-6 mt-2">
			<li><strong>Variables</strong> (int, float, pointers)</li>
			<li><strong>Data structures</strong> (arrays, linked lists created)</li>
			<li><strong>Recursion stack</strong> (each recursive call adds a frame)</li>
		</ul>
	</div>
<pre><code>// O(1) space — only uses a fixed number of variables
int sum(int A[], int n) {
    int total = 0;    // 1 variable
    for (int i = 0; i &lt; n; i++)
        total += A[i];
    return total;
}

// O(n) space — creates new array proportional to input
int* copyArray(int A[], int n) {
    int *B = new int[n];   // n extra space
    for (int i = 0; i &lt; n; i++)
        B[i] = A[i];
    return B;
}

// O(n) space due to recursion stack
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n-1);  // n stack frames
}

// O(log n) space — binary search recursion
int binarySearch(int A[], int low, int high, int key) {
    if (low &gt; high) return -1;
    int mid = (low + high) / 2;
    if (A[mid] == key) return mid;
    if (A[mid] &lt; key) return binarySearch(A, mid+1, high, key);
    return binarySearch(A, low, mid-1, key);
    // Recursion depth = log n → O(log n) stack space
}</code></pre>

	<h3>Best, Average, and Worst Case</h3>
<pre><code>// Linear Search Example:
// Best Case:  O(1)   — element is at index 0
// Average:    O(n/2) = O(n)  — element is in the middle on average
// Worst Case: O(n)   — element is last or not present

// Quick Sort:
// Best Case:  O(n log n) — perfect partitioning
// Average:    O(n log n)
// Worst Case: O(n²) — already sorted array with bad pivot

// Binary Search:
// Best:    O(1)     — middle element is the key
// Average: O(log n)
// Worst:   O(log n) — element not found</code></pre>

	<div class="complexity-box">
		<strong>Google Interview Tip:</strong> Always state the time AND space complexity of your solution. Interviewers expect you to analyze both. If your solution is O(n²), they'll ask "Can you do better?" — knowing complexity hierarchy lets you aim for O(n log n) or O(n).
	</div>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Stack memory</strong> — automatic, fast, small, LIFO, for local vars. Risk: stack overflow.</li>
			<li>• <strong>Heap memory</strong> — manual (new/delete), slow, large, for dynamic data. Risk: memory leak.</li>
			<li>• <strong>Physical DS</strong> — Array (contiguous, fixed) and Linked List (scattered, dynamic). Everything else is built on these.</li>
			<li>• <strong>Logical DS</strong> — Stack, Queue, Tree, Graph, Hash Table. Defined by operations, implemented using physical DS.</li>
			<li>• <strong>ADT</strong> — defines WHAT (operations) not HOW (implementation). Class in C++ = ADT implementation.</li>
			<li>• <strong>Big-O</strong> — worst-case upper bound. Drop constants and lower terms.</li>
			<li>• <strong>O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ)</strong></li>
			<li>• <strong>Nested loops</strong> → multiply. <strong>Sequential loops</strong> → add.</li>
			<li>• <strong>Halving/doubling</strong> per step → O(log n).</li>
			<li>• <strong>Space complexity</strong> — count extra memory + recursion stack depth.</li>
		</ul>
	</div>
</section>
`;
