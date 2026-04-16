<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Heaps</h2>
		<p class="text-gray-400">Build heaps, extract elements, implement heap sort, and solve priority queue problems.</p>
	</div>

	<div>
		<h3>Practice 1: Max-Heap Insert & Extract</h3>
		<p class="text-gray-400 text-sm mb-3">Build a max-heap by inserting elements, then extract the maximum repeatedly.</p>
		<CodePlayground
			title="Max-Heap Insert & Extract Max"
			initialCode={`#include <iostream>
using namespace std;

int heap[100];
int heapSize = 0;

void insert(int val) {
    heap[heapSize] = val;
    int i = heapSize;
    heapSize++;
    // Bubble up
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (heap[i] > heap[parent]) {
            swap(heap[i], heap[parent]);
            i = parent;
        } else break;
    }
}

void heapifyDown(int i) {
    while (true) {
        int largest = i;
        int left = 2 * i + 1, right = 2 * i + 2;
        if (left < heapSize && heap[left] > heap[largest]) largest = left;
        if (right < heapSize && heap[right] > heap[largest]) largest = right;
        if (largest == i) break;
        swap(heap[i], heap[largest]);
        i = largest;
    }
}

int extractMax() {
    int maxVal = heap[0];
    heap[0] = heap[heapSize - 1];
    heapSize--;
    heapifyDown(0);
    return maxVal;
}

void printHeap() {
    cout << "[";
    for (int i = 0; i < heapSize; i++) {
        if (i > 0) cout << ", ";
        cout << heap[i];
    }
    cout << "]" << endl;
}

int main() {
    int vals[] = {10, 40, 20, 50, 30, 60};
    for (int v : vals) {
        insert(v);
        cout << "Insert " << v << ": "; printHeap();
    }

    cout << "\\nExtracting max repeatedly:" << endl;
    while (heapSize > 0) {
        int mx = extractMax();
        cout << "Extracted " << mx << ", heap: "; printHeap();
    }
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Min-Heap Implementation</h3>
		<p class="text-gray-400 text-sm mb-3">Build a min-heap — just flip the comparison from max-heap.</p>
		<CodePlayground
			title="Min-Heap — Smallest on Top"
			initialCode={`#include <iostream>
using namespace std;

int heap[100];
int sz = 0;

void insert(int val) {
    heap[sz] = val;
    int i = sz++;
    while (i > 0) {
        int p = (i - 1) / 2;
        if (heap[i] < heap[p]) { swap(heap[i], heap[p]); i = p; }
        else break;
    }
}

int extractMin() {
    int minVal = heap[0];
    heap[0] = heap[--sz];
    int i = 0;
    while (true) {
        int smallest = i, l = 2*i+1, r = 2*i+2;
        if (l < sz && heap[l] < heap[smallest]) smallest = l;
        if (r < sz && heap[r] < heap[smallest]) smallest = r;
        if (smallest == i) break;
        swap(heap[i], heap[smallest]); i = smallest;
    }
    return minVal;
}

int main() {
    int vals[] = {50, 30, 70, 10, 40, 20, 60};
    for (int v : vals) insert(v);

    cout << "Min-heap root (minimum): " << heap[0] << endl;
    cout << "Heap array: ";
    for (int i = 0; i < sz; i++) cout << heap[i] << " ";
    cout << endl;

    cout << "\\nExtract all in sorted order:" << endl;
    while (sz > 0) cout << extractMin() << " ";
    cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Build Heap (Bottom-Up Heapify) — O(n)</h3>
		<p class="text-gray-400 text-sm mb-3">Build a max-heap from an unsorted array in O(n) using bottom-up heapify.</p>
		<CodePlayground
			title="Bottom-Up Heapify — O(n)"
			initialCode={`#include <iostream>
using namespace std;

void heapifyDown(int arr[], int n, int i) {
    while (true) {
        int largest = i, l = 2*i+1, r = 2*i+2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (largest == i) break;
        swap(arr[i], arr[largest]);
        i = largest;
    }
}

void buildMaxHeap(int arr[], int n) {
    // Start from last internal node
    for (int i = n/2 - 1; i >= 0; i--) {
        cout << "Heapify at index " << i << " (value " << arr[i] << ")" << endl;
        heapifyDown(arr, n, i);
        cout << "  Result: ";
        for (int j = 0; j < n; j++) cout << arr[j] << " ";
        cout << endl;
    }
}

bool isMaxHeap(int arr[], int n) {
    for (int i = 0; i < n/2; i++) {
        int l = 2*i+1, r = 2*i+2;
        if (l < n && arr[l] > arr[i]) return false;
        if (r < n && arr[r] > arr[i]) return false;
    }
    return true;
}

int main() {
    int arr[] = {10, 20, 30, 40, 50, 60, 70};
    int n = 7;

    cout << "Original: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl << endl;

    buildMaxHeap(arr, n);

    cout << "\\nFinal max-heap: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    cout << "Valid max-heap? " << (isMaxHeap(arr, n) ? "YES" : "NO") << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Heap Sort</h3>
		<p class="text-gray-400 text-sm mb-3">Sort an array using heap sort — build heap then extract max repeatedly.</p>
		<CodePlayground
			title="Heap Sort — O(n log n), In-Place"
			initialCode={`#include <iostream>
using namespace std;

void heapifyDown(int arr[], int n, int i) {
    while (true) {
        int largest = i, l = 2*i+1, r = 2*i+2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (largest == i) break;
        swap(arr[i], arr[largest]);
        i = largest;
    }
}

void heapSort(int arr[], int n) {
    // Step 1: Build max-heap
    cout << "Building max-heap..." << endl;
    for (int i = n/2 - 1; i >= 0; i--)
        heapifyDown(arr, n, i);
    cout << "Max-heap: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    // Step 2: Extract max repeatedly
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);  // max to end
        heapifyDown(arr, i, 0); // restore heap
        cout << "Extract " << arr[i] << ": ";
        for (int j = 0; j < n; j++) {
            if (j == i) cout << "| ";
            cout << arr[j] << " ";
        }
        cout << endl;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90, 45};
    int n = 8;

    cout << "Original: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\\n" << endl;

    heapSort(arr, n);

    cout << "\\nSorted: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: C++ STL Priority Queue</h3>
		<p class="text-gray-400 text-sm mb-3">Use C++ priority_queue — max-heap and min-heap with the STL.</p>
		<CodePlayground
			title="STL priority_queue — Max & Min Heap"
			initialCode={`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    // Max-heap (default)
    priority_queue<int> maxPQ;
    int vals[] = {30, 10, 50, 20, 40};
    for (int v : vals) maxPQ.push(v);

    cout << "Max-heap (priority_queue<int>):" << endl;
    cout << "Top: " << maxPQ.top() << endl;
    cout << "Extract all: ";
    while (!maxPQ.empty()) {
        cout << maxPQ.top() << " ";
        maxPQ.pop();
    }
    cout << endl;

    // Min-heap
    priority_queue<int, vector<int>, greater<int>> minPQ;
    for (int v : vals) minPQ.push(v);

    cout << "\\nMin-heap (with greater<int>):" << endl;
    cout << "Top: " << minPQ.top() << endl;
    cout << "Extract all: ";
    while (!minPQ.empty()) {
        cout << minPQ.top() << " ";
        minPQ.pop();
    }
    cout << endl;

    // Custom: pair with priority
    priority_queue<pair<int,string>> taskPQ;
    taskPQ.push({3, "Low priority task"});
    taskPQ.push({10, "HIGH priority task"});
    taskPQ.push({5, "Medium task"});

    cout << "\\nTask scheduler (higher number = higher priority):" << endl;
    while (!taskPQ.empty()) {
        auto [pri, task] = taskPQ.top(); taskPQ.pop();
        cout << "  [" << pri << "] " << task << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Kth Largest Element</h3>
		<p class="text-gray-400 text-sm mb-3">Find the kth largest using a min-heap of size k — O(n log k).</p>
		<CodePlayground
			title="Kth Largest Element"
			initialCode={`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int kthLargest(int arr[], int n, int k) {
    // Min-heap of size k: keeps the k largest elements
    priority_queue<int, vector<int>, greater<int>> minPQ;

    for (int i = 0; i < n; i++) {
        minPQ.push(arr[i]);
        if ((int)minPQ.size() > k)
            minPQ.pop();  // remove smallest, keep k largest
    }
    return minPQ.top();  // smallest of k largest = kth largest
}

int main() {
    int arr[] = {7, 10, 4, 3, 20, 15, 8, 12};
    int n = 8;

    cout << "Array: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    for (int k = 1; k <= 5; k++)
        cout << "K=" << k << " largest: " << kthLargest(arr, n, k) << endl;

    // Also works for kth smallest — use max-heap of size k!
    cout << "\\nKth smallest (using max-heap of size k):" << endl;
    for (int k = 1; k <= 5; k++) {
        priority_queue<int> maxPQ;
        for (int i = 0; i < n; i++) {
            maxPQ.push(arr[i]);
            if ((int)maxPQ.size() > k) maxPQ.pop();
        }
        cout << "K=" << k << " smallest: " << maxPQ.top() << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Median of a Stream</h3>
		<p class="text-gray-400 text-sm mb-3">Maintain the running median as numbers arrive one by one. Use two heaps: a max-heap for the lower half and a min-heap for the upper half.</p>
		<CodePlayground
			title="Running Median — Try It Yourself"
			initialCode={`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

// TODO: Implement running median using two heaps
// maxHeap: stores the smaller half (top = largest of small half)
// minHeap: stores the larger half (top = smallest of large half)
//
// Rules:
// 1. New element goes to maxHeap if ≤ maxHeap.top(), else minHeap
// 2. Balance: |maxHeap.size() - minHeap.size()| ≤ 1
// 3. Median: if equal size → average of both tops
//            if unequal → top of the larger heap

priority_queue<int> maxHeap;  // lower half
priority_queue<int, vector<int>, greater<int>> minHeap;  // upper half

void addNumber(int num) {
    // YOUR CODE HERE
}

double getMedian() {
    // YOUR CODE HERE
    return 0.0;
}

int main() {
    int stream[] = {5, 15, 1, 3, 8, 7, 9, 10, 6, 11};
    int n = 10;

    for (int i = 0; i < n; i++) {
        addNumber(stream[i]);
        cout << "Add " << stream[i] << " -> Median: " << getMedian() << endl;
    }
    // Expected medians: 5, 10, 5, 4, 5, 6, 7, 7.5, 7, 7.5

    return 0;
}`}
		/>
	</div>
</div>
