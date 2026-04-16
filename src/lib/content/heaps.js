import Theory from './heaps-theory.svelte';
import Practice from './heaps-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'A heap is a:',
		options: [
			'Complete binary tree with the heap property',
			'Balanced BST',
			'Sorted array',
			'Full binary tree'
		],
		correct: 0,
		explanation: 'A heap is a COMPLETE binary tree (all levels filled except possibly last, filled left-to-right) that satisfies the heap property (max-heap: parent ≥ children, min-heap: parent ≤ children).'
	},
	{
		question: 'In a max-heap, the root contains:',
		options: ['The minimum element', 'The maximum element', 'The median', 'A random element'],
		correct: 1,
		explanation: 'In a max-heap, every parent ≥ its children. The root has no parent, so it must be the largest element in the entire heap.'
	},
	{
		question: 'For a 0-indexed array representation of a heap, the left child of node at index i is at:',
		options: ['2i', '2i + 1', '2i + 2', 'i + 1'],
		correct: 1,
		explanation: 'For 0-indexed: left child = 2i+1, right child = 2i+2, parent = (i-1)/2. These formulas enable storing a complete binary tree as an array with no wasted space.'
	},
	{
		question: 'The parent of a node at index i (0-indexed) is at:',
		options: ['i / 2', '(i - 1) / 2', 'i - 1', '2i'],
		correct: 1,
		explanation: 'Parent index = (i-1)/2 (integer division). For index 5: parent = (5-1)/2 = 2. For index 6: parent = (6-1)/2 = 2. Both 5 and 6 are children of 2.'
	},
	{
		question: 'Heap insertion works by:',
		options: [
			'Adding at the root and sifting down',
			'Adding at the end and bubbling up',
			'Adding at a random position',
			'Rebuilding the entire heap'
		],
		correct: 1,
		explanation: 'Insert at the END (next available position to maintain completeness), then BUBBLE UP: compare with parent, swap if heap property violated. Repeat until fixed or reach root. O(log n).'
	},
	{
		question: 'The time complexity of heap insertion is:',
		options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
		correct: 1,
		explanation: 'Insertion adds at the bottom and bubbles up at most h levels, where h = log n for a complete binary tree. So insertion is O(log n).'
	},
	{
		question: 'Extracting the max from a max-heap works by:',
		options: [
			'Simply removing the root',
			'Replacing root with last element, then heapifying down',
			'Removing the last element',
			'Swapping root with its largest child'
		],
		correct: 1,
		explanation: 'Replace root with the LAST element (maintains completeness), then HEAPIFY DOWN: compare with children, swap with the larger child. Repeat until heap property restored. O(log n).'
	},
	{
		question: 'Building a heap from an unsorted array using bottom-up heapify takes:',
		options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
		correct: 1,
		explanation: 'Bottom-up heapify starts from the last internal node and heapifies down. Most nodes are near the bottom and need few swaps. The math works out to O(n) — a decreasing geometric series.'
	},
	{
		question: 'Why is bottom-up heapify O(n) and not O(n log n)?',
		options: [
			'It skips half the elements',
			'Most nodes are near the bottom and need very few swaps',
			'It uses a different data structure',
			'It only works on sorted arrays'
		],
		correct: 1,
		explanation: 'n/2 leaves need 0 swaps, n/4 nodes need ≤1 swap, n/8 need ≤2, etc. Sum = n/4·1 + n/8·2 + n/16·3 + ... = O(n). The nodes that need the most work (root) are fewest in number.'
	},
	{
		question: 'Heap sort has which time and space complexity?',
		options: [
			'O(n log n) time, O(n) space',
			'O(n log n) time, O(1) space',
			'O(n²) time, O(1) space',
			'O(n) time, O(n) space'
		],
		correct: 1,
		explanation: 'Heap sort: build heap O(n) + extract n elements O(n log n) = O(n log n). It sorts in-place using the array itself → O(1) extra space. But it\'s NOT stable.'
	},
	{
		question: 'Heap sort is NOT stable. What does "stable" mean?',
		options: [
			'The algorithm always completes',
			'Equal elements maintain their original relative order',
			'The algorithm uses constant space',
			'The running time is always the same'
		],
		correct: 1,
		explanation: 'A stable sort preserves the relative order of equal elements. Heap sort swaps elements across large distances in the array, which can change the relative order of equals.'
	},
	{
		question: 'C++ priority_queue<int> is by default a:',
		options: ['Min-heap', 'Max-heap', 'BST', 'Sorted array'],
		correct: 1,
		explanation: 'C++ priority_queue<int> is a MAX-heap by default. top() returns the largest element. For min-heap, use: priority_queue<int, vector<int>, greater<int>>.'
	},
	{
		question: 'To create a min-heap in C++ STL, you use:',
		options: [
			'priority_queue<int, min>',
			'priority_queue<int, vector<int>, greater<int>>',
			'priority_queue<int, vector<int>, less<int>>',
			'min_priority_queue<int>'
		],
		correct: 1,
		explanation: 'priority_queue<int, vector<int>, greater<int>> creates a min-heap. The third template parameter is the comparator — greater<int> makes smaller values have higher priority.'
	},
	{
		question: 'To find the Kth largest element efficiently, use:',
		options: [
			'Sort the array and pick index n-k',
			'Max-heap of size n, extract k times',
			'Min-heap of size k — top is the kth largest',
			'Binary search'
		],
		correct: 2,
		explanation: 'Min-heap of size k: insert elements, if size > k pop the minimum. After processing all elements, the k largest remain and the top (minimum of those) is the kth largest. O(n log k).'
	},
	{
		question: 'The "median of a stream" problem uses:',
		options: [
			'One max-heap',
			'One sorted array',
			'Two heaps: max-heap for lower half, min-heap for upper half',
			'A BST'
		],
		correct: 2,
		explanation: 'Max-heap stores the smaller half (top = largest of small). Min-heap stores the larger half (top = smallest of large). Median is the average of both tops or the top of the larger heap.'
	},
	{
		question: 'In a max-heap with n elements, the minimum element is:',
		options: [
			'Always at the root',
			'Always at index n-1',
			'Somewhere among the leaves (no guaranteed position)',
			'Always the second-to-last element'
		],
		correct: 2,
		explanation: 'In a max-heap, the minimum has no children smaller than it, so it must be a leaf. But it could be ANY leaf — there\'s no ordering among siblings. Finding the min in a max-heap is O(n/2) = O(n).'
	},
	{
		question: 'Which sorting algorithm is the best choice when you need O(n log n) guaranteed with O(1) extra space?',
		options: ['Merge sort', 'Quick sort', 'Heap sort', 'Insertion sort'],
		correct: 2,
		explanation: 'Heap sort: always O(n log n) (no worst case), O(1) space (in-place). Merge sort needs O(n) space. Quick sort has O(n²) worst case. Heap sort is ideal when space is critical.'
	},
	{
		question: 'A priority queue is different from a regular queue because:',
		options: [
			'It is faster',
			'Elements are served by priority, not by arrival order (FIFO)',
			'It can store more elements',
			'It uses less memory'
		],
		correct: 1,
		explanation: 'A regular queue is FIFO (first in, first out). A priority queue serves the HIGHEST PRIORITY element first, regardless of insertion order. Heaps implement this efficiently with O(log n) insert and extract.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
