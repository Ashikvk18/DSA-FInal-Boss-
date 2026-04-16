export const theoryHTML = `
<section class="theory-section" id="heap-intro">
	<h2>1. What is a Heap?</h2>
	<div class="definition-box">
		<strong>Heap:</strong> A <strong>complete binary tree</strong> that satisfies the <strong>heap property</strong>:<br>
		- <strong>Max-Heap:</strong> Every parent ≥ its children (root = maximum)<br>
		- <strong>Min-Heap:</strong> Every parent ≤ its children (root = minimum)<br><br>
		Heaps are stored as <strong>arrays</strong> (no pointers needed!) and are the backbone of <strong>priority queues</strong> and <strong>heap sort</strong>.
	</div>

<pre><code>// Max-Heap:          Min-Heap:
//       90                 5
//      /  \\              /  \\
//    70    80           10    15
//   / \\   /            / \\   /
//  40 50 60           20 30  40

// Array representation (0-indexed):
// Max-Heap: [90, 70, 80, 40, 50, 60]
// Min-Heap: [5, 10, 15, 20, 30, 40]

// Index formulas (0-indexed):
// Parent of i:      (i - 1) / 2
// Left child of i:  2 * i + 1
// Right child of i: 2 * i + 2

// Complete binary tree = all levels filled except possibly
// the last, which is filled LEFT to RIGHT (no gaps)
// This is why array storage works perfectly!</code></pre>

	<h3>Why Heaps?</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Operation</th>
				<th class="text-left p-2 text-gray-400">Sorted Array</th>
				<th class="text-left p-2 text-gray-400">Unsorted Array</th>
				<th class="text-left p-2 text-gray-400">Heap</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Get min/max</td><td class="p-2">O(1)</td><td class="p-2">O(n)</td><td class="p-2 font-bold text-green-400">O(1)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert</td><td class="p-2">O(n)</td><td class="p-2">O(1)</td><td class="p-2 font-bold text-green-400">O(log n)</td></tr>
			<tr><td class="p-2">Delete min/max</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td><td class="p-2 font-bold text-green-400">O(log n)</td></tr>
		</tbody>
	</table>
	<p class="text-sm text-gray-500 mt-1">Heap = best of both worlds for priority-based operations.</p>
</section>

<section class="theory-section" id="heap-insert">
	<h2>2. Heap Insert — O(log n)</h2>
<pre><code>// Steps:
// 1. Add element at the END of the array (next available position)
// 2. "Bubble up" (sift up): compare with parent, swap if needed
// 3. Repeat until heap property is restored or reach root

// Insert 85 into Max-Heap [90, 70, 80, 40, 50, 60]:
//
// Step 1: Add at end → [90, 70, 80, 40, 50, 60, 85]
//       90
//      /  \\
//    70    80
//   / \\   / \\
//  40 50 60  85  ← new element
//
// Step 2: 85 &gt; parent(80)? YES → swap
//       90
//      /  \\
//    70    85
//   / \\   / \\
//  40 50 60  80
//
// Step 3: 85 &gt; parent(90)? NO → DONE!
// Result: [90, 70, 85, 40, 50, 60, 80]

void insert(int heap[], int &amp;size, int val) {
    // Step 1: Add at end
    heap[size] = val;
    int i = size;
    size++;
    
    // Step 2: Bubble up
    while (i &gt; 0) {
        int parent = (i - 1) / 2;
        if (heap[i] &gt; heap[parent]) {  // Max-heap: child &gt; parent
            swap(heap[i], heap[parent]);
            i = parent;
        } else {
            break;  // heap property restored
        }
    }
}</code></pre>
</section>

<section class="theory-section" id="heap-delete">
	<h2>3. Delete Max/Min (Extract Root) — O(log n)</h2>
<pre><code>// Steps:
// 1. Save root value (the max/min)
// 2. Replace root with LAST element
// 3. Reduce size
// 4. "Heapify down" (sift down): compare with children, swap with larger child
// 5. Repeat until heap property restored

// Delete max from [90, 70, 85, 40, 50, 60, 80]:
//
// Step 1-3: Replace root with last → [80, 70, 85, 40, 50, 60]
//       80       ← last element placed at root
//      /  \\
//    70    85
//   / \\   /
//  40 50 60
//
// Step 4: 80 vs children(70, 85). 85 is larger and 85 &gt; 80 → swap
//       85
//      /  \\
//    70    80
//   / \\   /
//  40 50 60
//
// Step 5: 80 vs children(60). 80 &gt; 60 → DONE!
// Result: [85, 70, 80, 40, 50, 60]

int extractMax(int heap[], int &amp;size) {
    int maxVal = heap[0];       // Step 1
    heap[0] = heap[size - 1];   // Step 2
    size--;                     // Step 3
    heapifyDown(heap, size, 0); // Step 4-5
    return maxVal;
}

void heapifyDown(int heap[], int size, int i) {
    while (true) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left &lt; size &amp;&amp; heap[left] &gt; heap[largest])
            largest = left;
        if (right &lt; size &amp;&amp; heap[right] &gt; heap[largest])
            largest = right;
        
        if (largest == i) break;  // heap property OK
        swap(heap[i], heap[largest]);
        i = largest;
    }
}</code></pre>
</section>

<section class="theory-section" id="heapify">
	<h2>4. Build Heap (Heapify) — O(n)</h2>
	<div class="definition-box">
		<strong>Key Insight:</strong> Building a heap by inserting n elements one-by-one is O(n log n). But <strong>bottom-up heapify</strong> builds a heap from an arbitrary array in <strong>O(n)</strong> — much faster!
	</div>

<pre><code>// Bottom-up approach:
// Start from the LAST INTERNAL node (parent of last element)
// Heapify down each node, moving backward to root
// Leaves are already valid heaps (size 1)!

// Last internal node index = (n/2) - 1

void buildMaxHeap(int arr[], int n) {
    // Start from last internal node, go to root
    for (int i = n / 2 - 1; i &gt;= 0; i--) {
        heapifyDown(arr, n, i);
    }
}

// Example: Build max-heap from [10, 20, 30, 40, 50]
//
//       10           Step 1: heapify at index 1 (parent of 40,50)
//      /  \\          20 vs (40,50) → swap 20 &amp; 50
//    20    30              10
//   / \\                  /  \\
//  40  50              50    30
//                     / \\
//                    40  20
//
//                   Step 2: heapify at index 0 (root)
//                   10 vs (50,30) → swap 10 &amp; 50
//                        50
//                       /  \\
//                     10    30    then 10 vs (40,20) → swap 10 &amp; 40
//                    / \\
//                   40  20         50
//                                 /  \\
//                               40    30
//                              / \\
//                             10  20
//
// Result: [50, 40, 30, 10, 20] ✓ Max-Heap!

// WHY O(n)?
// Leaves (n/2 nodes): 0 swaps each
// Height 1 (n/4 nodes): at most 1 swap each
// Height 2 (n/8 nodes): at most 2 swaps each
// ...
// Total: n/4*1 + n/8*2 + n/16*3 + ... = O(n)
// (This is a decreasing geometric series!)</code></pre>
</section>

<section class="theory-section" id="heap-sort">
	<h2>5. Heap Sort — O(n log n)</h2>
<pre><code>// Steps:
// 1. Build max-heap from array: O(n)
// 2. Repeatedly extract max and place at end:
//    - Swap root (max) with last element
//    - Reduce heap size by 1
//    - Heapify down at root
//    - Repeat n-1 times: O(n log n)

void heapSort(int arr[], int n) {
    // Step 1: Build max-heap
    buildMaxHeap(arr, n);
    
    // Step 2: Extract max repeatedly
    for (int i = n - 1; i &gt; 0; i--) {
        swap(arr[0], arr[i]);      // max goes to end
        heapifyDown(arr, i, 0);    // restore heap (size = i)
    }
}

// Trace: [10, 20, 30, 40, 50]
// Build heap: [50, 40, 30, 10, 20]
// Extract 50: [40, 20, 30, 10, | 50]
// Extract 40: [30, 20, 10, | 40, 50]
// Extract 30: [20, 10, | 30, 40, 50]
// Extract 20: [10, | 20, 30, 40, 50]
// Result:     [10, 20, 30, 40, 50] ✓ Sorted!

// Properties:
// Time: O(n log n) — always, no worst case degradation
// Space: O(1) — in-place! (unlike merge sort)
// NOT stable (relative order of equal elements may change)
// Used when: guaranteed O(n log n) needed + O(1) space</code></pre>

	<h3>Sorting Algorithm Comparison</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Algorithm</th>
				<th class="text-left p-2 text-gray-400">Best</th>
				<th class="text-left p-2 text-gray-400">Average</th>
				<th class="text-left p-2 text-gray-400">Worst</th>
				<th class="text-left p-2 text-gray-400">Space</th>
				<th class="text-left p-2 text-gray-400">Stable?</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Heap Sort</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(1)</td><td class="p-2">No</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Merge Sort</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n)</td><td class="p-2">Yes</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Quick Sort</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n²)</td><td class="p-2">O(log n)</td><td class="p-2">No</td></tr>
			<tr><td class="p-2">Insertion Sort</td><td class="p-2">O(n)</td><td class="p-2">O(n²)</td><td class="p-2">O(n²)</td><td class="p-2">O(1)</td><td class="p-2">Yes</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="priority-queue">
	<h2>6. Priority Queue — Heap Application</h2>
	<div class="definition-box">
		<strong>Priority Queue:</strong> An abstract data structure where each element has a <strong>priority</strong>. The highest-priority element is served first (not FIFO like a regular queue). Heaps are the <strong>standard implementation</strong>.
	</div>

<pre><code>// C++ STL priority_queue (MAX-heap by default):
#include &lt;queue&gt;

priority_queue&lt;int&gt; maxPQ;           // max-heap
priority_queue&lt;int, vector&lt;int&gt;,     // min-heap
               greater&lt;int&gt;&gt; minPQ;

maxPQ.push(30);  maxPQ.push(10);  maxPQ.push(20);
cout &lt;&lt; maxPQ.top();  // 30 (maximum)
maxPQ.pop();          // removes 30
cout &lt;&lt; maxPQ.top();  // 20

// Priority Queue use cases:
// 1. Dijkstra's shortest path algorithm
// 2. Huffman encoding
// 3. Job scheduling (OS process scheduling)
// 4. Finding Kth largest/smallest element
// 5. Merge K sorted lists
// 6. Median of a stream (two heaps technique)</code></pre>
</section>

<section class="theory-section" id="heap-problems">
	<h2>7. Classic Heap Problems</h2>

	<h3>Kth Largest Element</h3>
<pre><code>// Method 1: Max-heap, extract k times → O(n + k log n)
// Method 2: Min-heap of size k → O(n log k) — better for large n!

int kthLargest(int arr[], int n, int k) {
    // Min-heap of size k
    priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minPQ;
    
    for (int i = 0; i &lt; n; i++) {
        minPQ.push(arr[i]);
        if (minPQ.size() &gt; k)
            minPQ.pop();  // remove smallest, keep k largest
    }
    return minPQ.top();  // kth largest
}
// [3, 1, 5, 2, 4], k=2 → min-heap keeps {4, 5} → top = 4</code></pre>

	<h3>Merge K Sorted Arrays</h3>
<pre><code>// Use min-heap with (value, arrayIndex, elementIndex)
// Always extract minimum, push next element from same array
// Time: O(N log k) where N = total elements, k = number of arrays

// Kth smallest in sorted matrix — same technique!</code></pre>

	<h3>Median of a Stream</h3>
<pre><code>// Maintain TWO heaps:
// maxHeap (left half) — stores smaller half
// minHeap (right half) — stores larger half

// maxHeap.top() = largest of small half
// minHeap.top() = smallest of large half
// median = average of both tops (even count)
//        = maxHeap.top() (odd count)

// Keep heaps balanced: |sizes differ by at most 1|</code></pre>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Heap = complete binary tree + heap property</strong>. Stored as array (no pointers).</li>
			<li>• <strong>Index formulas</strong>: parent = (i-1)/2, left = 2i+1, right = 2i+2.</li>
			<li>• <strong>Insert</strong>: add at end, bubble up. O(log n).</li>
			<li>• <strong>Extract root</strong>: swap root with last, heapify down. O(log n).</li>
			<li>• <strong>Build heap</strong>: bottom-up heapify from last internal node. <strong>O(n)</strong>, not O(n log n)!</li>
			<li>• <strong>Heap sort</strong>: build heap + extract n times. O(n log n), in-place, not stable.</li>
			<li>• <strong>Priority Queue</strong>: C++ priority_queue = max-heap. Use greater&lt;int&gt; for min-heap.</li>
			<li>• <strong>Classic problems</strong>: Kth largest (min-heap of size k), merge K sorted, median of stream (two heaps).</li>
		</ul>
	</div>
</section>
`;
