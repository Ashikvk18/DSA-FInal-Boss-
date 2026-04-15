<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Arrays</h2>
		<p class="text-gray-400">Implement and experiment with array ADT operations, searching, merging, and set operations.</p>
	</div>

	<div>
		<h3>Practice 1: Array ADT — Insert, Delete, Display</h3>
		<p class="text-gray-400 text-sm mb-3">Build the core Array ADT with insert, delete, and display operations.</p>
		<CodePlayground
			title="Array ADT Core Operations"
			initialCode={`#include <iostream>
using namespace std;

struct Array {
    int *A;
    int size;
    int length;
};

void display(Array arr) {
    cout << "Array: ";
    for (int i = 0; i < arr.length; i++)
        cout << arr.A[i] << " ";
    cout << "(length=" << arr.length << ")" << endl;
}

void append(Array *arr, int x) {
    if (arr->length < arr->size) {
        arr->A[arr->length] = x;
        arr->length++;
    }
}

void insertAt(Array *arr, int index, int x) {
    if (index >= 0 && index <= arr->length && arr->length < arr->size) {
        for (int i = arr->length; i > index; i--)
            arr->A[i] = arr->A[i-1];
        arr->A[index] = x;
        arr->length++;
    }
}

int deleteAt(Array *arr, int index) {
    if (index >= 0 && index < arr->length) {
        int val = arr->A[index];
        for (int i = index; i < arr->length - 1; i++)
            arr->A[i] = arr->A[i+1];
        arr->length--;
        return val;
    }
    return -1;
}

int main() {
    Array arr;
    arr.size = 20;
    arr.length = 0;
    arr.A = new int[arr.size];

    // Append elements
    append(&arr, 10); append(&arr, 20); append(&arr, 30);
    append(&arr, 40); append(&arr, 50);
    display(arr);

    // Insert 15 at index 1
    insertAt(&arr, 1, 15);
    cout << "After insert 15 at index 1: ";
    display(arr);

    // Delete at index 3
    int deleted = deleteAt(&arr, 3);
    cout << "Deleted: " << deleted << endl;
    display(arr);

    delete[] arr.A;
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Linear Search with Optimizations</h3>
		<p class="text-gray-400 text-sm mb-3">Compare plain linear search vs transposition vs move-to-front.</p>
		<CodePlayground
			title="Linear Search Optimizations"
			initialCode={`#include <iostream>
using namespace std;

void display(int A[], int n) {
    for (int i = 0; i < n; i++) cout << A[i] << " ";
    cout << endl;
}

int linearSearch(int A[], int n, int key) {
    for (int i = 0; i < n; i++)
        if (A[i] == key) return i;
    return -1;
}

int searchTranspose(int A[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (A[i] == key) {
            if (i > 0) swap(A[i], A[i-1]);
            return (i > 0) ? i-1 : 0;
        }
    }
    return -1;
}

int searchMoveToFront(int A[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (A[i] == key) {
            swap(A[i], A[0]);
            return 0;
        }
    }
    return -1;
}

int main() {
    int A[] = {10, 20, 30, 40, 50, 60, 70};
    int n = 7;

    cout << "Original: "; display(A, n);

    // Transposition: search for 50 multiple times
    cout << "\\n--- Transposition ---" << endl;
    int B[] = {10, 20, 30, 40, 50, 60, 70};
    for (int i = 0; i < 4; i++) {
        int idx = searchTranspose(B, n, 50);
        cout << "Search 50 -> index " << idx << "  Array: ";
        display(B, n);
    }

    // Move to front
    cout << "\\n--- Move to Front ---" << endl;
    int C[] = {10, 20, 30, 40, 50, 60, 70};
    int idx = searchMoveToFront(C, n, 50);
    cout << "Search 50 -> index " << idx << "  Array: ";
    display(C, n);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Binary Search</h3>
		<p class="text-gray-400 text-sm mb-3">Implement both iterative and recursive binary search on a sorted array.</p>
		<CodePlayground
			title="Binary Search — Iterative & Recursive"
			initialCode={`#include <iostream>
using namespace std;

int binarySearchIterative(int A[], int n, int key) {
    int low = 0, high = n - 1;
    int comparisons = 0;
    while (low <= high) {
        comparisons++;
        int mid = (low + high) / 2;
        if (key == A[mid]) {
            cout << "  Found at index " << mid << " in " << comparisons << " comparisons" << endl;
            return mid;
        }
        else if (key < A[mid]) high = mid - 1;
        else low = mid + 1;
    }
    cout << "  Not found after " << comparisons << " comparisons" << endl;
    return -1;
}

int binarySearchRecursive(int A[], int low, int high, int key) {
    if (low > high) return -1;
    int mid = (low + high) / 2;
    if (key == A[mid]) return mid;
    if (key < A[mid]) return binarySearchRecursive(A, low, mid-1, key);
    return binarySearchRecursive(A, mid+1, high, key);
}

int main() {
    int A[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91};
    int n = 11;

    cout << "Array: ";
    for (int i = 0; i < n; i++) cout << A[i] << " ";
    cout << endl;

    cout << "\\nIterative search for 23:" << endl;
    binarySearchIterative(A, n, 23);

    cout << "Iterative search for 50:" << endl;
    binarySearchIterative(A, n, 50);

    cout << "\\nRecursive search for 72: index = "
         << binarySearchRecursive(A, 0, n-1, 72) << endl;

    // Compare with linear search
    cout << "\\nLinear search for 91 would need " << n << " comparisons" << endl;
    cout << "Binary search max comparisons: ~" << (int)(log2(n)+1) << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Merge Sorted Arrays</h3>
		<p class="text-gray-400 text-sm mb-3">Merge two sorted arrays into one sorted result using two pointers.</p>
		<CodePlayground
			title="Merge Two Sorted Arrays"
			initialCode={`#include <iostream>
using namespace std;

void display(int A[], int n) {
    for (int i = 0; i < n; i++) cout << A[i] << " ";
    cout << endl;
}

int* merge(int A[], int m, int B[], int n, int &resultLen) {
    int *C = new int[m + n];
    int i = 0, j = 0, k = 0;

    while (i < m && j < n) {
        if (A[i] <= B[j])
            C[k++] = A[i++];
        else
            C[k++] = B[j++];
    }
    while (i < m) C[k++] = A[i++];
    while (j < n) C[k++] = B[j++];

    resultLen = k;
    return C;
}

int main() {
    int A[] = {2, 5, 8, 12, 20};
    int B[] = {3, 6, 7, 15, 18, 25};
    int m = 5, n = 6;

    cout << "Array A: "; display(A, m);
    cout << "Array B: "; display(B, n);

    int resultLen;
    int *C = merge(A, m, B, n, resultLen);
    cout << "Merged:  "; display(C, resultLen);

    delete[] C;
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Set Operations on Sorted Arrays</h3>
		<p class="text-gray-400 text-sm mb-3">Implement Union, Intersection, and Difference using the two-pointer technique.</p>
		<CodePlayground
			title="Set Operations — Union, Intersection, Difference"
			initialCode={`#include <iostream>
using namespace std;

void display(int A[], int n) {
    cout << "{ ";
    for (int i = 0; i < n; i++) cout << A[i] << " ";
    cout << "}" << endl;
}

int* setUnion(int A[], int m, int B[], int n, int &k) {
    int *C = new int[m+n]; k = 0;
    int i = 0, j = 0;
    while (i < m && j < n) {
        if (A[i] < B[j]) C[k++] = A[i++];
        else if (B[j] < A[i]) C[k++] = B[j++];
        else { C[k++] = A[i++]; j++; }
    }
    while (i < m) C[k++] = A[i++];
    while (j < n) C[k++] = B[j++];
    return C;
}

int* setIntersection(int A[], int m, int B[], int n, int &k) {
    int *C = new int[min(m,n)]; k = 0;
    int i = 0, j = 0;
    while (i < m && j < n) {
        if (A[i] < B[j]) i++;
        else if (B[j] < A[i]) j++;
        else { C[k++] = A[i++]; j++; }
    }
    return C;
}

int* setDifference(int A[], int m, int B[], int n, int &k) {
    int *C = new int[m]; k = 0;
    int i = 0, j = 0;
    while (i < m && j < n) {
        if (A[i] < B[j]) C[k++] = A[i++];
        else if (B[j] < A[i]) j++;
        else { i++; j++; }
    }
    while (i < m) C[k++] = A[i++];
    return C;
}

int main() {
    int A[] = {2, 5, 8, 12, 15};
    int B[] = {3, 5, 8, 18, 20};
    int m = 5, n = 5;

    cout << "A = "; display(A, m);
    cout << "B = "; display(B, n);

    int k;
    int *u = setUnion(A, m, B, n, k);
    cout << "\\nA ∪ B = "; display(u, k); delete[] u;

    int *inter = setIntersection(A, m, B, n, k);
    cout << "A ∩ B = "; display(inter, k); delete[] inter;

    int *diff = setDifference(A, m, B, n, k);
    cout << "A - B = "; display(diff, k); delete[] diff;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Finding Missing Elements & Duplicates</h3>
		<p class="text-gray-400 text-sm mb-3">Find missing numbers and duplicate elements in arrays.</p>
		<CodePlayground
			title="Missing Elements & Duplicates"
			initialCode={`#include <iostream>
#include <algorithm>
using namespace std;

// Find single missing element (1 to n)
int findMissing(int A[], int len, int n) {
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int i = 0; i < len; i++) actual += A[i];
    return expected - actual;
}

// Find duplicates using hash/count
void findDuplicates(int A[], int n) {
    int maxVal = *max_element(A, A + n);
    int *count = new int[maxVal + 1]();
    for (int i = 0; i < n; i++) count[A[i]]++;
    cout << "Duplicates: ";
    bool found = false;
    for (int i = 0; i <= maxVal; i++) {
        if (count[i] > 1) {
            cout << i << "(x" << count[i] << ") ";
            found = true;
        }
    }
    if (!found) cout << "None";
    cout << endl;
    delete[] count;
}

int main() {
    // Missing element
    int A[] = {1, 2, 3, 5, 6, 7, 8};
    cout << "Array: 1 2 3 5 6 7 8 (from 1-8)" << endl;
    cout << "Missing: " << findMissing(A, 7, 8) << endl;

    // Duplicates
    int B[] = {3, 6, 8, 8, 10, 12, 15, 15, 15, 20};
    int n = 10;
    cout << "\\nArray: ";
    for (int i = 0; i < n; i++) cout << B[i] << " ";
    cout << endl;
    findDuplicates(B, n);

    // Unsorted duplicates
    int C[] = {8, 3, 6, 4, 6, 5, 6, 8, 2, 7};
    n = 10;
    cout << "\\nUnsorted: ";
    for (int i = 0; i < n; i++) cout << C[i] << " ";
    cout << endl;
    findDuplicates(C, n);

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Reverse & Rotate</h3>
		<p class="text-gray-400 text-sm mb-3">Implement reverse, left rotate, and right rotate. Bonus: rotate by k positions using reverse.</p>
		<CodePlayground
			title="Reverse & Rotate — Try It Yourself"
			initialCode={`#include <iostream>
using namespace std;

void display(int A[], int n) {
    for (int i = 0; i < n; i++) cout << A[i] << " ";
    cout << endl;
}

// TODO: Implement reverse using two-pointer swap
void reverse(int A[], int start, int end) {
    // YOUR CODE HERE

}

// TODO: Left rotate by k positions using 3 reverses
// Hint: reverse(0, k-1), reverse(k, n-1), reverse(0, n-1)
void leftRotateK(int A[], int n, int k) {
    // YOUR CODE HERE

}

int main() {
    int A[] = {1, 2, 3, 4, 5, 6, 7};
    int n = 7;

    cout << "Original:       "; display(A, n);

    reverse(A, 0, n-1);
    cout << "Reversed:       "; display(A, n);  // 7 6 5 4 3 2 1

    // Reset
    int B[] = {1, 2, 3, 4, 5, 6, 7};
    leftRotateK(B, 7, 2);
    cout << "Left rotate 2:  "; display(B, 7);  // expected: 3 4 5 6 7 1 2

    int C[] = {1, 2, 3, 4, 5, 6, 7};
    leftRotateK(C, 7, 4);
    cout << "Left rotate 4:  "; display(C, 7);  // expected: 5 6 7 1 2 3 4

    return 0;
}`}
		/>
	</div>
</div>
