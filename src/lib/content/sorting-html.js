export const theoryHTML = `
<section class="theory-section" id="sorting-intro">
	<h2>1. Why Study Sorting?</h2>
	<div class="definition-box">
		<strong>Sorting</strong> = arranging elements in a specific order (ascending/descending). It's the most fundamental operation in CS — used as a subroutine in searching, merging, databases, and countless algorithms. Understanding sort algorithms teaches you <strong>divide &amp; conquer, recursion, stability, and complexity trade-offs</strong>.
	</div>

<pre><code>// Classification:
// By complexity: O(n²) vs O(n log n) vs O(n)
// By space: In-place (O(1)) vs Not in-place (O(n))
// By stability: Stable (equal elements keep order) vs Unstable
// By method: Comparison-based vs Non-comparison (counting, radix)

// Lower bound for comparison-based sorting: Ω(n log n)
// You CANNOT sort faster than n log n using comparisons alone!
// Non-comparison sorts (counting, radix) can achieve O(n)</code></pre>
</section>

<section class="theory-section" id="bubble-sort">
	<h2>2. Bubble Sort — O(n²)</h2>
<pre><code>// Repeatedly swap adjacent elements if they're in wrong order
// After each pass, the largest unsorted element "bubbles" to its correct position

void bubbleSort(int arr[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j &lt; n - 1 - i; j++) {
            if (arr[j] &gt; arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // optimization: already sorted
    }
}

// Trace: [5, 3, 4, 1, 2]
// Pass 1: [3,4,1,2,5]  — 5 bubbles to end
// Pass 2: [3,1,2,4,5]  — 4 in place
// Pass 3: [1,2,3,4,5]  — sorted, next pass detects no swaps → stop

// Best: O(n) — already sorted (with optimization)
// Worst/Avg: O(n²)
// Space: O(1), Stable: YES</code></pre>
</section>

<section class="theory-section" id="selection-sort">
	<h2>3. Selection Sort — O(n²)</h2>
<pre><code>// Find the MINIMUM in the unsorted portion, swap it to the front
// After each pass, one more element is in its final position

void selectionSort(int arr[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j &lt; n; j++) {
            if (arr[j] &lt; arr[minIdx])
                minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}

// Trace: [29, 10, 14, 37, 13]
// Pass 1: min=10 at idx 1 → swap(29,10) → [10, 29, 14, 37, 13]
// Pass 2: min=13 at idx 4 → swap(29,13) → [10, 13, 14, 37, 29]
// Pass 3: min=14 at idx 2 → no swap → [10, 13, 14, 37, 29]
// Pass 4: min=29 at idx 4 → swap(37,29) → [10, 13, 14, 29, 37]

// Always O(n²) — no best case optimization
// Space: O(1), Stable: NO (swaps can change relative order)
// Minimum number of swaps: O(n) — useful when swaps are expensive</code></pre>
</section>

<section class="theory-section" id="insertion-sort">
	<h2>4. Insertion Sort — O(n²)</h2>
<pre><code>// Pick each element and INSERT it into its correct position
// in the already-sorted left portion (like sorting cards in hand)

void insertionSort(int arr[], int n) {
    for (int i = 1; i &lt; n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j &gt;= 0 &amp;&amp; arr[j] &gt; key) {
            arr[j + 1] = arr[j];  // shift right
            j--;
        }
        arr[j + 1] = key;
    }
}

// Trace: [5, 3, 4, 1, 2]
// i=1: key=3, shift 5 right → [3, 5, 4, 1, 2]
// i=2: key=4, shift 5 right → [3, 4, 5, 1, 2]
// i=3: key=1, shift 5,4,3 → [1, 3, 4, 5, 2]
// i=4: key=2, shift 5,4,3 → [1, 2, 3, 4, 5]

// Best: O(n) — already sorted (inner loop never runs)
// Worst: O(n²) — reverse sorted
// Space: O(1), Stable: YES
// Best for: small arrays, nearly sorted data, online sorting</code></pre>
</section>

<section class="theory-section" id="merge-sort">
	<h2>5. Merge Sort — O(n log n)</h2>
	<div class="definition-box">
		<strong>Divide &amp; Conquer:</strong> Split array in half, recursively sort each half, then <strong>merge</strong> the two sorted halves. The merge step does the real work.
	</div>

<pre><code>void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int L[n1], R[n2];
    
    for (int i = 0; i &lt; n1; i++) L[i] = arr[left + i];
    for (int i = 0; i &lt; n2; i++) R[i] = arr[mid + 1 + i];
    
    int i = 0, j = 0, k = left;
    while (i &lt; n1 &amp;&amp; j &lt; n2) {
        if (L[i] &lt;= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i &lt; n1) arr[k++] = L[i++];
    while (j &lt; n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left &gt;= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// [38, 27, 43, 3, 9, 82, 10]
// Split: [38,27,43,3] [9,82,10]
// Split: [38,27] [43,3] [9,82] [10]
// Split: [38] [27] [43] [3] [9] [82] [10]
// Merge: [27,38] [3,43] [9,82] [10]
// Merge: [3,27,38,43] [9,10,82]
// Merge: [3,9,10,27,38,43,82]

// Time: O(n log n) — ALWAYS (best, avg, worst)
// Space: O(n) — needs temporary arrays for merging
// Stable: YES
// Best for: linked lists, external sorting, when stability needed</code></pre>
</section>

<section class="theory-section" id="quick-sort">
	<h2>6. Quick Sort — O(n log n) avg</h2>
	<div class="definition-box">
		<strong>Divide &amp; Conquer:</strong> Pick a <strong>pivot</strong>, partition array so elements &lt; pivot go left and &gt; pivot go right. Recursively sort partitions. No merge step needed!
	</div>

<pre><code>int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // last element as pivot
    int i = low - 1;        // index of smaller element boundary
    
    for (int j = low; j &lt; high; j++) {
        if (arr[j] &lt;= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;  // pivot's final position
}

void quickSort(int arr[], int low, int high) {
    if (low &lt; high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Partition trace: [10, 80, 30, 90, 40, 50, 70] pivot=70
// j=0: 10≤70 → swap, i=0 → [10, 80, 30, 90, 40, 50, 70]
// j=1: 80&gt;70 → skip
// j=2: 30≤70 → swap(80,30), i=1 → [10, 30, 80, 90, 40, 50, 70]
// j=4: 40≤70 → swap(80,40), i=2 → [10, 30, 40, 90, 80, 50, 70]
// j=5: 50≤70 → swap(90,50), i=3 → [10, 30, 40, 50, 80, 90, 70]
// Final: swap(80,70), i=4 → [10, 30, 40, 50, 70, 90, 80]
// Pivot 70 is at index 4 — everything left is ≤70, right is &gt;70

// Best/Avg: O(n log n)
// Worst: O(n²) — when pivot is always min or max (sorted input!)
// Space: O(log n) — recursion stack
// Stable: NO
// Fastest in practice for most inputs (cache-friendly)</code></pre>
</section>

<section class="theory-section" id="counting-sort">
	<h2>7. Counting Sort — O(n + k)</h2>
<pre><code>// Non-comparison sort! Works by COUNTING occurrences.
// Only works for integers in a known range [0, k]

void countingSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr + n);
    int count[maxVal + 1] = {0};
    
    // Count occurrences
    for (int i = 0; i &lt; n; i++)
        count[arr[i]]++;
    
    // Overwrite array with sorted values
    int idx = 0;
    for (int i = 0; i &lt;= maxVal; i++)
        while (count[i]-- &gt; 0)
            arr[idx++] = i;
}

// [4, 2, 2, 8, 3, 3, 1]
// Count: [0,1,2,2,1,0,0,0,1]  (index = value, value = count)
// Output: [1, 2, 2, 3, 3, 4, 8]

// Time: O(n + k) where k = range of values
// Space: O(k)
// Stable: YES (with proper implementation)
// Limitation: only integers, impractical if k &gt;&gt; n</code></pre>
</section>

<section class="theory-section" id="radix-sort">
	<h2>8. Radix Sort — O(d × (n + k))</h2>
<pre><code>// Sort digit by digit, from least significant to most significant
// Uses a STABLE sort (counting sort) as subroutine for each digit

void countingSortByDigit(int arr[], int n, int exp) {
    int output[n], count[10] = {0};
    
    for (int i = 0; i &lt; n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i &lt; 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i &gt;= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    for (int i = 0; i &lt; n; i++)
        arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr + n);
    for (int exp = 1; maxVal / exp &gt; 0; exp *= 10)
        countingSortByDigit(arr, n, exp);
}

// [170, 45, 75, 90, 802, 24, 2, 66]
// Sort by 1s:  [170, 90, 802, 2, 24, 45, 75, 66]
// Sort by 10s: [802, 2, 24, 45, 66, 170, 75, 90]
// Sort by 100s:[2, 24, 45, 66, 75, 90, 170, 802]

// Time: O(d × (n + k)) where d = digits, k = base (10)
// Space: O(n + k)
// Stable: YES</code></pre>
</section>

<section class="theory-section" id="shell-sort">
	<h2>9. Shell Sort & Bucket Sort</h2>

	<h3>Shell Sort — Improved Insertion Sort</h3>
<pre><code>// Insertion sort on elements that are 'gap' apart
// Reduce gap each iteration until gap = 1 (regular insertion sort)
// Elements move to correct position faster via large gaps

void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap &gt; 0; gap /= 2) {
        for (int i = gap; i &lt; n; i++) {
            int temp = arr[i];
            int j = i;
            while (j &gt;= gap &amp;&amp; arr[j - gap] &gt; temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}

// Time: O(n^1.5) to O(n^(4/3)) depending on gap sequence
// Space: O(1), Stable: NO</code></pre>

	<h3>Bucket Sort — O(n + k)</h3>
<pre><code>// Distribute elements into buckets, sort each bucket, concatenate
// Works best when input is uniformly distributed over a range

// 1. Create k empty buckets
// 2. Put each element in appropriate bucket
// 3. Sort individual buckets (using insertion sort)
// 4. Concatenate all buckets

// Time: O(n + k) average, O(n²) worst (all in one bucket)
// Space: O(n + k)
// Best for: floating point numbers in [0, 1)</code></pre>
</section>

<section class="theory-section" id="comparison-table">
	<h2>10. Complete Comparison Table</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Algorithm</th>
				<th class="text-left p-2 text-gray-400">Best</th>
				<th class="text-left p-2 text-gray-400">Average</th>
				<th class="text-left p-2 text-gray-400">Worst</th>
				<th class="text-left p-2 text-gray-400">Space</th>
				<th class="text-left p-2 text-gray-400">Stable</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Bubble</td><td class="p-2">O(n)</td><td class="p-2">O(n²)</td><td class="p-2">O(n²)</td><td class="p-2">O(1)</td><td class="p-2">Yes</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Selection</td><td class="p-2">O(n²)</td><td class="p-2">O(n²)</td><td class="p-2">O(n²)</td><td class="p-2">O(1)</td><td class="p-2">No</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insertion</td><td class="p-2">O(n)</td><td class="p-2">O(n²)</td><td class="p-2">O(n²)</td><td class="p-2">O(1)</td><td class="p-2">Yes</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Merge</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n)</td><td class="p-2">Yes</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Quick</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n²)</td><td class="p-2">O(log n)</td><td class="p-2">No</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Heap</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(n log n)</td><td class="p-2">O(1)</td><td class="p-2">No</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Counting</td><td class="p-2">O(n+k)</td><td class="p-2">O(n+k)</td><td class="p-2">O(n+k)</td><td class="p-2">O(k)</td><td class="p-2">Yes</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Radix</td><td class="p-2">O(dn)</td><td class="p-2">O(dn)</td><td class="p-2">O(dn)</td><td class="p-2">O(n+k)</td><td class="p-2">Yes</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Bucket</td><td class="p-2">O(n+k)</td><td class="p-2">O(n+k)</td><td class="p-2">O(n²)</td><td class="p-2">O(n+k)</td><td class="p-2">Yes</td></tr>
			<tr><td class="p-2">Shell</td><td class="p-2">O(n log n)</td><td class="p-2">O(n^1.5)</td><td class="p-2">O(n²)</td><td class="p-2">O(1)</td><td class="p-2">No</td></tr>
		</tbody>
	</table>

	<div class="important-box">
		<strong>When to use what:</strong><br>
		• Small n or nearly sorted → <strong>Insertion sort</strong><br>
		• Need stable O(n log n) → <strong>Merge sort</strong><br>
		• Fastest average case → <strong>Quick sort</strong><br>
		• O(n log n) guaranteed + O(1) space → <strong>Heap sort</strong><br>
		• Integer keys in small range → <strong>Counting sort</strong><br>
		• Large integers with fixed digits → <strong>Radix sort</strong>
	</div>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>O(n²) sorts</strong>: Bubble (swap adjacent), Selection (find min), Insertion (shift &amp; place). Good for small n.</li>
			<li>• <strong>Merge sort</strong>: divide, sort halves, merge. O(n log n) always, O(n) space, stable.</li>
			<li>• <strong>Quick sort</strong>: pick pivot, partition, recurse. O(n log n) avg, O(n²) worst, fastest in practice.</li>
			<li>• <strong>Heap sort</strong>: build heap + extract. O(n log n) always, O(1) space, not stable.</li>
			<li>• <strong>Counting sort</strong>: count occurrences. O(n+k), only for integers in range.</li>
			<li>• <strong>Radix sort</strong>: sort by each digit. O(dn), uses counting sort as subroutine.</li>
			<li>• <strong>Comparison lower bound</strong>: Ω(n log n). Non-comparison sorts break this.</li>
			<li>• <strong>Stability</strong>: Merge, Insertion, Counting, Radix = stable. Quick, Heap, Selection = NOT stable.</li>
		</ul>
	</div>
</section>
`;
