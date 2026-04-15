export const theoryHTML = `
<section class="theory-section" id="array-adt">
	<h2>1. Array as an ADT (Abstract Data Type)</h2>
	<div class="definition-box">
		<strong>Definition:</strong> An <strong>Array ADT</strong> is an abstract data type that defines a collection of elements stored in contiguous memory, along with a set of <strong>operations</strong>: Display, Add/Append, Insert, Delete, Search (Linear &amp; Binary), Get, Set, Max, Min, Sum, Average, Reverse, Shift, Rotate, Merge, and Set Operations.
	</div>

	<h3>Array ADT Representation</h3>
<pre><code>// Our Array ADT struct:
struct Array {
    int *A;       // pointer to heap-allocated array
    int size;     // total capacity
    int length;   // number of elements currently in the array
};

// Example: Array of capacity 10 with 5 elements
// A = [3, 7, 9, 12, 6, _, _, _, _, _]
// size = 10, length = 5
// Valid indices: 0 to length-1</code></pre>

	<div class="important-box">
		<strong>Key Distinction:</strong>
		<ul class="list-disc pl-6 mt-2">
			<li><strong>size</strong> = total allocated capacity (how many elements CAN fit)</li>
			<li><strong>length</strong> = how many elements are currently stored</li>
			<li>Always: length &lt;= size</li>
		</ul>
	</div>
</section>

<section class="theory-section" id="static-dynamic">
	<h2>2. Static vs Dynamic Arrays</h2>
	
	<h3>Static Array (Stack)</h3>
	<div class="definition-box">
		<strong>Static Array:</strong> Size is fixed at <strong>compile time</strong>. Stored on the <strong>stack</strong>. Cannot grow or shrink.
	</div>
<pre><code>int A[10];           // 10 ints on stack — size fixed forever
int B[] = {1,2,3};   // size = 3, fixed

// Problem: what if you need more than 10 elements?
// You CANNOT resize a static array!</code></pre>

	<h3>Dynamic Array (Heap)</h3>
	<div class="definition-box">
		<strong>Dynamic Array:</strong> Size is decided at <strong>runtime</strong>. Stored on the <strong>heap</strong>. Can be resized by creating a new larger array and copying elements.
	</div>
<pre><code>int n;
cin &gt;&gt; n;
int *A = new int[n];  // n ints on heap — size decided at runtime

// To "resize": create bigger array, copy, delete old
int *B = new int[n * 2];  // double the size
for (int i = 0; i &lt; n; i++)
    B[i] = A[i];           // copy elements
delete[] A;                 // free old array
A = B;                      // point to new array

// This is exactly how std::vector works internally!</code></pre>

	<h3>Comparison</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Static</th>
				<th class="text-left p-2 text-gray-400">Dynamic</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Memory</td><td class="p-2">Stack</td><td class="p-2">Heap</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Size</td><td class="p-2">Fixed at compile time</td><td class="p-2">Set at runtime, resizable</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Speed</td><td class="p-2">Faster (no allocation overhead)</td><td class="p-2">Slightly slower</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Flexibility</td><td class="p-2">None</td><td class="p-2">Can grow/shrink</td></tr>
			<tr><td class="p-2">Risk</td><td class="p-2">Stack overflow if too large</td><td class="p-2">Memory leak if not freed</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="2d-arrays">
	<h2>3. 2D Arrays</h2>
	<div class="definition-box">
		<strong>2D Array:</strong> An array of arrays — a table/matrix with rows and columns. Element at row i, column j is accessed as <code>A[i][j]</code>. Stored in memory in <strong>row-major order</strong> (C/C++) — entire row 0 first, then row 1, etc.
	</div>

<pre><code>// Declaration
int A[3][4];  // 3 rows, 4 columns = 12 elements

// Initialization
int M[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access: M[row][col]
// M[0][0] = 1, M[1][2] = 6, M[2][1] = 8

// Memory layout (row-major):
// [1, 2, 3, 4, 5, 6, 7, 8, 9]  — row 0, row 1, row 2 sequentially</code></pre>

	<h3>Row-Major vs Column-Major</h3>
<pre><code>// Row-Major (C/C++, Java): rows stored sequentially
// Address of A[i][j] = Base + (i * numCols + j) * sizeof(type)

// Column-Major (Fortran, MATLAB): columns stored sequentially
// Address of A[i][j] = Base + (j * numRows + i) * sizeof(type)

// Example: 3x4 matrix, base address = 1000, int = 4 bytes
// Row-Major: A[1][2] = 1000 + (1*4 + 2)*4 = 1000 + 24 = 1024
// Col-Major: A[1][2] = 1000 + (2*3 + 1)*4 = 1000 + 28 = 1028</code></pre>

	<h3>Dynamic 2D Array</h3>
<pre><code>// Method 1: Array of pointers
int **A = new int*[rows];
for (int i = 0; i &lt; rows; i++)
    A[i] = new int[cols];

// Use: A[i][j] works normally

// Free:
for (int i = 0; i &lt; rows; i++)
    delete[] A[i];
delete[] A;</code></pre>
</section>

<section class="theory-section" id="array-operations">
	<h2>4. Array Operations — Insert, Delete, Search</h2>

	<h3>4.1 Display — O(n)</h3>
<pre><code>void display(struct Array arr) {
    for (int i = 0; i &lt; arr.length; i++)
        cout &lt;&lt; arr.A[i] &lt;&lt; " ";
    cout &lt;&lt; endl;
}</code></pre>

	<h3>4.2 Append (Add at End) — O(1)</h3>
<pre><code>void append(struct Array *arr, int x) {
    if (arr-&gt;length &lt; arr-&gt;size) {
        arr-&gt;A[arr-&gt;length] = x;
        arr-&gt;length++;
    }
}
// Simply place at index 'length' and increment
// No shifting needed → O(1)</code></pre>

	<h3>4.3 Insert at Index — O(n)</h3>
<pre><code>void insert(struct Array *arr, int index, int x) {
    if (index &gt;= 0 &amp;&amp; index &lt;= arr-&gt;length &amp;&amp; arr-&gt;length &lt; arr-&gt;size) {
        // Shift elements RIGHT to make room
        for (int i = arr-&gt;length; i &gt; index; i--)
            arr-&gt;A[i] = arr-&gt;A[i-1];
        arr-&gt;A[index] = x;
        arr-&gt;length++;
    }
}
// Worst case: insert at index 0 → shift ALL n elements → O(n)
// Best case: insert at end → O(1)</code></pre>

	<h3>4.4 Delete at Index — O(n)</h3>
<pre><code>int deleteAt(struct Array *arr, int index) {
    if (index &gt;= 0 &amp;&amp; index &lt; arr-&gt;length) {
        int deleted = arr-&gt;A[index];
        // Shift elements LEFT to fill the gap
        for (int i = index; i &lt; arr-&gt;length - 1; i++)
            arr-&gt;A[i] = arr-&gt;A[i+1];
        arr-&gt;length--;
        return deleted;
    }
    return -1;
}
// Worst case: delete at index 0 → shift ALL n elements → O(n)
// Best case: delete last element → O(1)</code></pre>

	<h3>4.5 Linear Search — O(n)</h3>
<pre><code>// Check every element one by one
int linearSearch(struct Array arr, int key) {
    for (int i = 0; i &lt; arr.length; i++) {
        if (arr.A[i] == key)
            return i;  // found at index i
    }
    return -1;  // not found
}
// Best: O(1) — first element
// Worst: O(n) — last element or not found
// Average: O(n/2) = O(n)</code></pre>

	<h4>Optimization: Transposition</h4>
<pre><code>// Move found element one position forward (toward index 0)
// Frequently searched elements "bubble" to the front
int linearSearchTranspose(struct Array *arr, int key) {
    for (int i = 0; i &lt; arr-&gt;length; i++) {
        if (arr-&gt;A[i] == key) {
            if (i &gt; 0) swap(arr-&gt;A[i], arr-&gt;A[i-1]);
            return (i &gt; 0) ? i-1 : 0;
        }
    }
    return -1;
}</code></pre>

	<h4>Optimization: Move to Front</h4>
<pre><code>// Move found element to index 0 immediately
int linearSearchMoveToFront(struct Array *arr, int key) {
    for (int i = 0; i &lt; arr-&gt;length; i++) {
        if (arr-&gt;A[i] == key) {
            swap(arr-&gt;A[i], arr-&gt;A[0]);
            return 0;
        }
    }
    return -1;
}</code></pre>

	<h3>4.6 Binary Search — O(log n)</h3>
	<div class="definition-box">
		<strong>Prerequisite:</strong> Array must be <strong>SORTED</strong>. Binary search repeatedly divides the search space in half.
	</div>
<pre><code>// Iterative Binary Search
int binarySearch(struct Array arr, int key) {
    int low = 0, high = arr.length - 1;
    while (low &lt;= high) {
        int mid = (low + high) / 2;
        if (key == arr.A[mid])
            return mid;
        else if (key &lt; arr.A[mid])
            high = mid - 1;   // search left half
        else
            low = mid + 1;    // search right half
    }
    return -1;
}

// Recursive Binary Search
int binarySearchRec(int A[], int low, int high, int key) {
    if (low &gt; high) return -1;
    int mid = (low + high) / 2;
    if (key == A[mid]) return mid;
    if (key &lt; A[mid]) return binarySearchRec(A, low, mid-1, key);
    return binarySearchRec(A, mid+1, high, key);
}

// Time: O(log n) — halves search space each step
// n=1,000,000 → max 20 comparisons!</code></pre>
</section>

<section class="theory-section" id="array-utility">
	<h2>5. Utility Operations — Get, Set, Max, Min, Sum, Avg, Reverse</h2>

<pre><code>// Get element at index — O(1)
int get(struct Array arr, int index) {
    if (index &gt;= 0 &amp;&amp; index &lt; arr.length)
        return arr.A[index];
    return -1;
}

// Set element at index — O(1)
void set(struct Array *arr, int index, int x) {
    if (index &gt;= 0 &amp;&amp; index &lt; arr.length)
        arr-&gt;A[index] = x;
}

// Max — O(n)
int maxElement(struct Array arr) {
    int mx = arr.A[0];
    for (int i = 1; i &lt; arr.length; i++)
        if (arr.A[i] &gt; mx) mx = arr.A[i];
    return mx;
}

// Min — O(n)
int minElement(struct Array arr) {
    int mn = arr.A[0];
    for (int i = 1; i &lt; arr.length; i++)
        if (arr.A[i] &lt; mn) mn = arr.A[i];
    return mn;
}

// Sum — O(n)
int sum(struct Array arr) {
    int total = 0;
    for (int i = 0; i &lt; arr.length; i++)
        total += arr.A[i];
    return total;
}

// Average — O(n)
float avg(struct Array arr) {
    return (float)sum(arr) / arr.length;
}</code></pre>

	<h3>Reverse</h3>
<pre><code>// Method 1: Using auxiliary array — O(n) time, O(n) space
void reverseAux(struct Array *arr) {
    int *B = new int[arr-&gt;length];
    for (int i = arr-&gt;length-1, j = 0; i &gt;= 0; i--, j++)
        B[j] = arr-&gt;A[i];
    for (int i = 0; i &lt; arr-&gt;length; i++)
        arr-&gt;A[i] = B[i];
    delete[] B;
}

// Method 2: Swap from both ends — O(n) time, O(1) space ✓
void reverse(struct Array *arr) {
    int i = 0, j = arr-&gt;length - 1;
    while (i &lt; j) {
        swap(arr-&gt;A[i], arr-&gt;A[j]);
        i++; j--;
    }
}</code></pre>

	<h3>Shift and Rotate</h3>
<pre><code>// Left Shift — first element is lost
// [1, 2, 3, 4, 5] → [2, 3, 4, 5, 0]
void leftShift(struct Array *arr) {
    for (int i = 0; i &lt; arr-&gt;length - 1; i++)
        arr-&gt;A[i] = arr-&gt;A[i+1];
    arr-&gt;A[arr-&gt;length - 1] = 0;
}

// Left Rotate — first element goes to end (no data lost)
// [1, 2, 3, 4, 5] → [2, 3, 4, 5, 1]
void leftRotate(struct Array *arr) {
    int first = arr-&gt;A[0];
    for (int i = 0; i &lt; arr-&gt;length - 1; i++)
        arr-&gt;A[i] = arr-&gt;A[i+1];
    arr-&gt;A[arr-&gt;length - 1] = first;
}

// Right Rotate — last element goes to front
// [1, 2, 3, 4, 5] → [5, 1, 2, 3, 4]
void rightRotate(struct Array *arr) {
    int last = arr-&gt;A[arr-&gt;length - 1];
    for (int i = arr-&gt;length - 1; i &gt; 0; i--)
        arr-&gt;A[i] = arr-&gt;A[i-1];
    arr-&gt;A[0] = last;
}</code></pre>
</section>

<section class="theory-section" id="merge-set-ops">
	<h2>6. Merging Sorted Arrays &amp; Set Operations</h2>

	<h3>Merge Two Sorted Arrays — O(m + n)</h3>
	<div class="definition-box">
		<strong>Merge:</strong> Given two <strong>sorted</strong> arrays, combine them into a single sorted array. Use two pointers — compare elements from both arrays and pick the smaller one.
	</div>
<pre><code>// A = [2, 5, 8, 12]  (m = 4)
// B = [3, 6, 7, 15]  (n = 4)
// Result = [2, 3, 5, 6, 7, 8, 12, 15]

int* merge(int A[], int m, int B[], int n) {
    int *C = new int[m + n];
    int i = 0, j = 0, k = 0;
    
    while (i &lt; m &amp;&amp; j &lt; n) {
        if (A[i] &lt;= B[j])
            C[k++] = A[i++];
        else
            C[k++] = B[j++];
    }
    // Copy remaining elements
    while (i &lt; m) C[k++] = A[i++];
    while (j &lt; n) C[k++] = B[j++];
    
    return C;
}
// Time: O(m + n)  Space: O(m + n)</code></pre>

	<h3>Set Operations on Sorted Arrays</h3>
	<h4>Union — O(m + n)</h4>
<pre><code>// Union: all unique elements from both arrays
// A = [2, 5, 8, 12]  B = [3, 5, 8, 15]
// Union = [2, 3, 5, 8, 12, 15]  (no duplicates)

int* setUnion(int A[], int m, int B[], int n, int &amp;resultLen) {
    int *C = new int[m + n];
    int i = 0, j = 0, k = 0;
    
    while (i &lt; m &amp;&amp; j &lt; n) {
        if (A[i] &lt; B[j])
            C[k++] = A[i++];
        else if (B[j] &lt; A[i])
            C[k++] = B[j++];
        else {  // equal — take one, skip both
            C[k++] = A[i++];
            j++;
        }
    }
    while (i &lt; m) C[k++] = A[i++];
    while (j &lt; n) C[k++] = B[j++];
    resultLen = k;
    return C;
}</code></pre>

	<h4>Intersection — O(m + n)</h4>
<pre><code>// Intersection: elements common to BOTH arrays
// A = [2, 5, 8, 12]  B = [3, 5, 8, 15]
// Intersection = [5, 8]

int* setIntersection(int A[], int m, int B[], int n, int &amp;resultLen) {
    int *C = new int[min(m, n)];
    int i = 0, j = 0, k = 0;
    
    while (i &lt; m &amp;&amp; j &lt; n) {
        if (A[i] &lt; B[j])
            i++;
        else if (B[j] &lt; A[i])
            j++;
        else {  // equal — common element
            C[k++] = A[i++];
            j++;
        }
    }
    resultLen = k;
    return C;
}</code></pre>

	<h4>Difference (A - B) — O(m + n)</h4>
<pre><code>// Difference: elements in A but NOT in B
// A = [2, 5, 8, 12]  B = [3, 5, 8, 15]
// A - B = [2, 12]

int* setDifference(int A[], int m, int B[], int n, int &amp;resultLen) {
    int *C = new int[m];
    int i = 0, j = 0, k = 0;
    
    while (i &lt; m &amp;&amp; j &lt; n) {
        if (A[i] &lt; B[j])
            C[k++] = A[i++];   // in A but not in B
        else if (B[j] &lt; A[i])
            j++;
        else {  // equal — skip (in both)
            i++; j++;
        }
    }
    while (i &lt; m) C[k++] = A[i++];
    resultLen = k;
    return C;
}</code></pre>
</section>

<section class="theory-section" id="missing-duplicates">
	<h2>7. Finding Missing Elements &amp; Duplicates</h2>

	<h3>Find Single Missing Element (Sorted, 1 to n)</h3>
<pre><code>// Array has n-1 elements from 1 to n, one is missing
// Method 1: Sum formula — O(n) time, O(1) space
int findMissing(int A[], int n) {
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int i = 0; i &lt; n - 1; i++)
        actualSum += A[i];
    return expectedSum - actualSum;
}
// A = [1, 2, 3, 5, 6], n = 6
// Expected = 21, Actual = 17, Missing = 4</code></pre>

	<h3>Find Multiple Missing Elements (Sorted)</h3>
<pre><code>// Use difference between element and index
// In a sorted array 1..n, A[i] should equal i+1
void findMultipleMissing(int A[], int n, int totalN) {
    int diff = A[0] - 0;  // expected offset
    for (int i = 0; i &lt; n; i++) {
        if (A[i] - i != diff) {
            // Missing elements between expected and actual
            while (diff &lt; A[i] - i) {
                cout &lt;&lt; "Missing: " &lt;&lt; (i + diff) &lt;&lt; endl;
                diff++;
            }
        }
    }
}</code></pre>

	<h3>Find Duplicates in Sorted Array</h3>
<pre><code>// Method: Compare adjacent elements — O(n)
void findDuplicatesSorted(int A[], int n) {
    for (int i = 0; i &lt; n - 1; i++) {
        if (A[i] == A[i+1]) {
            int count = 1;
            while (i &lt; n-1 &amp;&amp; A[i] == A[i+1]) {
                count++;
                i++;
            }
            cout &lt;&lt; A[i] &lt;&lt; " appears " &lt;&lt; count &lt;&lt; " times" &lt;&lt; endl;
        }
    }
}</code></pre>

	<h3>Find Duplicates in Unsorted Array</h3>
<pre><code>// Method 1: Hash Table / Counting — O(n) time, O(max) space
void findDuplicatesHash(int A[], int n) {
    int maxVal = *max_element(A, A + n);
    int *count = new int[maxVal + 1]();  // zero-initialized
    
    for (int i = 0; i &lt; n; i++)
        count[A[i]]++;
    
    for (int i = 0; i &lt;= maxVal; i++)
        if (count[i] &gt; 1)
            cout &lt;&lt; i &lt;&lt; " appears " &lt;&lt; count[i] &lt;&lt; " times" &lt;&lt; endl;
    
    delete[] count;
}</code></pre>

	<h3>Check if Array is Sorted — O(n)</h3>
<pre><code>bool isSorted(int A[], int n) {
    for (int i = 0; i &lt; n - 1; i++)
        if (A[i] &gt; A[i+1])
            return false;
    return true;
}</code></pre>
</section>

<section class="theory-section" id="complexity-summary">
	<h2>8. Time Complexity Summary</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Operation</th>
				<th class="text-left p-2 text-gray-400">Best</th>
				<th class="text-left p-2 text-gray-400">Average</th>
				<th class="text-left p-2 text-gray-400">Worst</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Access by index</td><td class="p-2">O(1)</td><td class="p-2">O(1)</td><td class="p-2">O(1)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Append (end)</td><td class="p-2">O(1)</td><td class="p-2">O(1)</td><td class="p-2">O(1)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert at index</td><td class="p-2">O(1)</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Delete at index</td><td class="p-2">O(1)</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Linear Search</td><td class="p-2">O(1)</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Binary Search</td><td class="p-2">O(1)</td><td class="p-2">O(log n)</td><td class="p-2">O(log n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Max / Min / Sum</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Reverse</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Merge (sorted)</td><td class="p-2">O(m+n)</td><td class="p-2">O(m+n)</td><td class="p-2">O(m+n)</td></tr>
			<tr><td class="p-2">Set Ops (sorted)</td><td class="p-2">O(m+n)</td><td class="p-2">O(m+n)</td><td class="p-2">O(m+n)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Array ADT</strong> — stores elements + size + length. Defines operations (insert, delete, search, etc.).</li>
			<li>• <strong>Static</strong> = stack, fixed size. <strong>Dynamic</strong> = heap, resizable (how vector works).</li>
			<li>• <strong>2D arrays</strong> — row-major in C++. Address = Base + (i*cols + j) * sizeof(type).</li>
			<li>• <strong>Insert/Delete</strong> at arbitrary index is O(n) due to shifting. At end is O(1).</li>
			<li>• <strong>Linear Search</strong> O(n). Optimizations: transposition, move-to-front.</li>
			<li>• <strong>Binary Search</strong> O(log n) — requires sorted array. Halves search space each step.</li>
			<li>• <strong>Reverse</strong> — use two-pointer swap for O(1) space.</li>
			<li>• <strong>Merge sorted arrays</strong> — two-pointer technique, O(m+n).</li>
			<li>• <strong>Set operations</strong> (union, intersection, difference) on sorted arrays — all O(m+n).</li>
			<li>• <strong>Missing element</strong> — use sum formula. <strong>Duplicates</strong> — use hash/count array.</li>
		</ul>
	</div>
</section>
`;
