<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Sorting Algorithms</h2>
		<p class="text-gray-400">Implement every major sorting algorithm, trace their execution, and compare performance.</p>
	</div>

	<div>
		<h3>Practice 1: Bubble Sort</h3>
		<p class="text-gray-400 text-sm mb-3">Watch elements bubble to the end with the early-termination optimization.</p>
		<CodePlayground
			title="Bubble Sort with Trace"
			initialCode={`#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        cout << "Pass " << i + 1 << ": ";
        for (int k = 0; k < n; k++) cout << arr[k] << " ";
        cout << (swapped ? "" : "(no swaps - done!)") << endl;
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    cout << "Original: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\\n" << endl;
    bubbleSort(arr, n);
    cout << "\\nSorted: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Selection Sort & Insertion Sort</h3>
		<p class="text-gray-400 text-sm mb-3">Compare the two O(n²) approaches side by side.</p>
		<CodePlayground
			title="Selection Sort & Insertion Sort"
			initialCode={`#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    cout << "=== Selection Sort ===" << endl;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        if (minIdx != i) {
            cout << "Swap " << arr[i] << " <-> " << arr[minIdx] << endl;
            swap(arr[i], arr[minIdx]);
        }
        cout << "  ";
        for (int k = 0; k < n; k++) cout << arr[k] << " ";
        cout << endl;
    }
}

void insertionSort(int arr[], int n) {
    cout << "\\n=== Insertion Sort ===" << endl;
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        cout << "Insert " << key << ": ";
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        for (int k = 0; k < n; k++) cout << arr[k] << " ";
        cout << endl;
    }
}

int main() {
    int a1[] = {29, 10, 14, 37, 13};
    int a2[] = {29, 10, 14, 37, 13};
    int n = 5;

    selectionSort(a1, n);
    insertionSort(a2, n);
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Merge Sort</h3>
		<p class="text-gray-400 text-sm mb-3">Divide and conquer — split, sort halves, merge. See the recursion tree unfold.</p>
		<CodePlayground
			title="Merge Sort with Trace"
			initialCode={`#include <iostream>
using namespace std;

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int i = 0; i < n2; i++) R[i] = arr[m + 1 + i];

    cout << "  Merge [";
    for (int i = 0; i < n1; i++) cout << L[i] << (i<n1-1?",":"");
    cout << "] + [";
    for (int i = 0; i < n2; i++) cout << R[i] << (i<n2-1?",":"");
    cout << "] = ";

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    cout << "[";
    for (int x = l; x <= r; x++) cout << arr[x] << (x<r?",":"");
    cout << "]" << endl;
}

void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = 7;
    cout << "Original: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\\n" << endl;

    mergeSort(arr, 0, n - 1);

    cout << "\\nSorted: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Quick Sort</h3>
		<p class="text-gray-400 text-sm mb-3">Partition around a pivot and watch elements fall into place.</p>
		<CodePlayground
			title="Quick Sort with Partition Trace"
			initialCode={`#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    cout << "  Pivot=" << pivot << ": [";
    for (int k = low; k <= high; k++) cout << arr[k] << (k<high?",":"");
    cout << "]";

    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);

    cout << " -> [";
    for (int k = low; k <= high; k++) cout << arr[k] << (k<high?",":"");
    cout << "] pivot at idx " << i + 1 << endl;

    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = 7;
    cout << "Original: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\\n" << endl;

    quickSort(arr, 0, n - 1);

    cout << "\\nSorted: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Counting Sort & Radix Sort</h3>
		<p class="text-gray-400 text-sm mb-3">Non-comparison sorts that break the O(n log n) barrier.</p>
		<CodePlayground
			title="Counting Sort & Radix Sort"
			initialCode={`#include <iostream>
#include <algorithm>
using namespace std;

void countingSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr + n);
    int count[maxVal + 1] = {};
    for (int i = 0; i < n; i++) count[arr[i]]++;

    cout << "Counts: ";
    for (int i = 0; i <= maxVal; i++)
        if (count[i] > 0) cout << i << "x" << count[i] << " ";
    cout << endl;

    int idx = 0;
    for (int i = 0; i <= maxVal; i++)
        while (count[i]-- > 0) arr[idx++] = i;
}

void radixCountSort(int arr[], int n, int exp) {
    int output[n], count[10] = {};
    for (int i = 0; i < n; i++) count[(arr[i]/exp)%10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i-1];
    for (int i = n-1; i >= 0; i--) {
        output[count[(arr[i]/exp)%10] - 1] = arr[i];
        count[(arr[i]/exp)%10]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr + n);
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        radixCountSort(arr, n, exp);
        cout << "After digit " << exp << ": ";
        for (int i = 0; i < n; i++) cout << arr[i] << " ";
        cout << endl;
    }
}

int main() {
    // Counting Sort
    int a1[] = {4, 2, 2, 8, 3, 3, 1, 7, 5};
    int n1 = 9;
    cout << "=== Counting Sort ===" << endl;
    cout << "Input: "; for (int i = 0; i < n1; i++) cout << a1[i] << " "; cout << endl;
    countingSort(a1, n1);
    cout << "Sorted: "; for (int i = 0; i < n1; i++) cout << a1[i] << " "; cout << endl;

    // Radix Sort
    int a2[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n2 = 8;
    cout << "\\n=== Radix Sort ===" << endl;
    cout << "Input: "; for (int i = 0; i < n2; i++) cout << a2[i] << " "; cout << endl;
    radixSort(a2, n2);
    cout << "Sorted: "; for (int i = 0; i < n2; i++) cout << a2[i] << " "; cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Shell Sort</h3>
		<p class="text-gray-400 text-sm mb-3">Insertion sort with decreasing gaps — elements reach their position faster.</p>
		<CodePlayground
			title="Shell Sort with Gap Trace"
			initialCode={`#include <iostream>
using namespace std;

void shellSort(int arr[], int n) {
    for (int gap = n/2; gap > 0; gap /= 2) {
        cout << "Gap = " << gap << ":" << endl;
        for (int i = gap; i < n; i++) {
            int temp = arr[i], j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        cout << "  ";
        for (int k = 0; k < n; k++) cout << arr[k] << " ";
        cout << endl;
    }
}

int main() {
    int arr[] = {35, 33, 42, 10, 14, 19, 27, 44, 26, 31};
    int n = 10;
    cout << "Original: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\\n" << endl;

    shellSort(arr, n);

    cout << "\\nSorted: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Compare All Sorts on Same Data</h3>
		<p class="text-gray-400 text-sm mb-3">Run every sorting algorithm on the same array and count comparisons/swaps.</p>
		<CodePlayground
			title="Sort Comparison — Try It Yourself"
			initialCode={`#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;

int comps, swps;

void bubbleSort(int a[], int n) {
    comps = swps = 0;
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-1-i; j++) {
            comps++;
            if (a[j] > a[j+1]) { swap(a[j],a[j+1]); swps++; }
        }
    cout << "Bubble:    comps=" << comps << " swaps=" << swps << endl;
}

void selectionSort(int a[], int n) {
    comps = swps = 0;
    for (int i = 0; i < n-1; i++) {
        int m = i;
        for (int j = i+1; j < n; j++) { comps++; if (a[j]<a[m]) m=j; }
        if (m != i) { swap(a[i],a[m]); swps++; }
    }
    cout << "Selection: comps=" << comps << " swaps=" << swps << endl;
}

void insertionSort(int a[], int n) {
    comps = swps = 0;
    for (int i = 1; i < n; i++) {
        int k = a[i], j = i-1;
        while (j >= 0 && (comps++, a[j] > k)) { a[j+1]=a[j]; j--; swps++; }
        a[j+1] = k;
    }
    cout << "Insertion: comps=" << comps << " shifts=" << swps << endl;
}

// TODO: Add merge sort and quick sort counting
// Compare all on the same array!

int main() {
    int orig[] = {64, 25, 12, 22, 11, 90, 34, 55, 77, 8};
    int n = 10, a[10];

    cout << "Array: ";
    for (int i = 0; i < n; i++) cout << orig[i] << " ";
    cout << "\\n" << endl;

    memcpy(a, orig, sizeof(orig)); bubbleSort(a, n);
    memcpy(a, orig, sizeof(orig)); selectionSort(a, n);
    memcpy(a, orig, sizeof(orig)); insertionSort(a, n);

    return 0;
}`}
		/>
	</div>
</div>
