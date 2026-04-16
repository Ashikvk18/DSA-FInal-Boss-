import Theory from './sorting-theory.svelte';
import Practice from './sorting-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'The lower bound for comparison-based sorting is:',
		options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
		correct: 1,
		explanation: 'Any comparison-based sort must make at least Ω(n log n) comparisons in the worst case. This is proven via decision tree analysis. Non-comparison sorts (counting, radix) can beat this.'
	},
	{
		question: 'Bubble sort\'s best case is O(n) when:',
		options: [
			'The array has duplicates',
			'The array is already sorted (with the swapped flag optimization)',
			'The array is reverse sorted',
			'The array has only 2 elements'
		],
		correct: 1,
		explanation: 'With the "swapped" flag, if no swaps occur in a pass, the array is already sorted and we stop. For a sorted array, the first pass does 0 swaps → O(n).'
	},
	{
		question: 'Selection sort always performs:',
		options: [
			'O(n) comparisons',
			'O(n²) comparisons regardless of input',
			'O(n log n) comparisons',
			'O(1) comparisons'
		],
		correct: 1,
		explanation: 'Selection sort always scans the remaining unsorted portion to find the minimum. It makes n(n-1)/2 comparisons regardless of whether the input is sorted, reverse sorted, or random.'
	},
	{
		question: 'Insertion sort is the best O(n²) sort for nearly sorted data because:',
		options: [
			'It uses less memory',
			'The inner loop barely runs when elements are close to their sorted position',
			'It makes fewer comparisons than merge sort',
			'It is always O(n)'
		],
		correct: 1,
		explanation: 'For nearly sorted data, each element needs only a few shifts. The inner while loop runs very few times, making it close to O(n). It\'s also the sort used by std::sort for small subarrays.'
	},
	{
		question: 'Merge sort guarantees O(n log n) because:',
		options: [
			'It uses a pivot',
			'It always splits in half (balanced recursion) and merge is O(n)',
			'It skips sorted portions',
			'It uses counting'
		],
		correct: 1,
		explanation: 'Merge sort always divides exactly in half → log n levels. Each level does O(n) work merging. Total: O(n log n). No worst case — the split is always balanced, unlike quick sort.'
	},
	{
		question: 'The main disadvantage of merge sort is:',
		options: [
			'O(n²) worst case',
			'O(n) extra space for the temporary arrays',
			'It is not stable',
			'It is slower than bubble sort'
		],
		correct: 1,
		explanation: 'Merge sort needs O(n) extra space for temporary arrays during merging. This is its main drawback compared to heap sort (O(1) space) and quick sort (O(log n) space).'
	},
	{
		question: 'Quick sort\'s worst case O(n²) happens when:',
		options: [
			'The array has duplicates',
			'The pivot is always the smallest or largest element (e.g., sorted input with last element pivot)',
			'The array is random',
			'The array has negative numbers'
		],
		correct: 1,
		explanation: 'If the pivot is always the extreme (min or max), one partition has n-1 elements and the other has 0. This gives n levels instead of log n → O(n²). Fix: use random pivot or median-of-3.'
	},
	{
		question: 'Quick sort is generally faster than merge sort in practice because:',
		options: [
			'It has better worst-case complexity',
			'It is cache-friendly (works on contiguous memory) and has low constant factors',
			'It uses less recursion',
			'It is stable'
		],
		correct: 1,
		explanation: 'Quick sort operates on contiguous array memory (cache-friendly), has small constant factors, and doesn\'t need extra array allocation. In practice, it outperforms merge sort for in-memory data.'
	},
	{
		question: 'In quick sort\'s Lomuto partition scheme, the pivot is placed:',
		options: [
			'At the beginning',
			'At its correct sorted position',
			'At a random position',
			'At the median position'
		],
		correct: 1,
		explanation: 'After partitioning, the pivot is at its FINAL sorted position. All elements left are ≤ pivot, all right are > pivot. The pivot never moves again — this is the key invariant.'
	},
	{
		question: 'Heap sort combines which two ideas?',
		options: [
			'Divide and conquer + merging',
			'Build a max-heap + repeatedly extract max',
			'Counting + bucketing',
			'Insertion + binary search'
		],
		correct: 1,
		explanation: 'Heap sort: (1) Build max-heap in O(n), (2) Swap root (max) with last, reduce size, heapify down — repeat n-1 times. O(n log n) guaranteed, O(1) space, not stable.'
	},
	{
		question: 'Counting sort works in O(n + k) but has the limitation:',
		options: [
			'It only works on strings',
			'It only works on non-negative integers with a known range k',
			'It requires O(n²) space',
			'It is not stable'
		],
		correct: 1,
		explanation: 'Counting sort needs an array of size k (the range of values). If k >> n (e.g., sorting 10 numbers in range 0-1000000), it wastes space and time. Only practical when k ≈ O(n).'
	},
	{
		question: 'Radix sort processes digits in which order?',
		options: [
			'Most significant digit first',
			'Least significant digit first (LSD)',
			'Random order',
			'Middle digit first'
		],
		correct: 1,
		explanation: 'LSD Radix sort processes from least significant to most significant digit. It uses a STABLE sort (counting sort) at each digit so that previous ordering is preserved.'
	},
	{
		question: 'Why must the subroutine sort in radix sort be stable?',
		options: [
			'For performance',
			'So that sorting by digit d preserves the order established by digits 0..d-1',
			'To reduce memory usage',
			'Stability is optional'
		],
		correct: 1,
		explanation: 'If the subroutine sort is unstable, sorting by a higher digit could scramble the order from lower digits. Stability ensures that equal elements in the current digit retain their relative order from previous passes.'
	},
	{
		question: 'Shell sort improves insertion sort by:',
		options: [
			'Using binary search',
			'Sorting elements far apart first (gap sequences), then decreasing the gap',
			'Using a heap',
			'Using merge'
		],
		correct: 1,
		explanation: 'Shell sort does insertion sort on elements separated by a gap. Large gaps move elements close to their final position quickly. As gap shrinks to 1, the final insertion sort pass is nearly O(n).'
	},
	{
		question: 'Which sorting algorithm makes the minimum number of swaps?',
		options: ['Bubble sort', 'Selection sort', 'Insertion sort', 'Quick sort'],
		correct: 1,
		explanation: 'Selection sort makes at most n-1 swaps (one per pass). Bubble sort can make O(n²) swaps. If swaps are expensive (large records), selection sort is preferred.'
	},
	{
		question: 'Which of these sorts are STABLE?',
		options: [
			'Quick sort and heap sort',
			'Merge sort and insertion sort',
			'Selection sort and shell sort',
			'Heap sort and radix sort'
		],
		correct: 1,
		explanation: 'Stable sorts preserve relative order of equal elements. Merge sort (careful merge), insertion sort (shift, don\'t swap), counting sort, and radix sort are stable. Quick, heap, selection, shell are NOT.'
	},
	{
		question: 'For sorting 10 million 32-bit integers, the best practical choice is:',
		options: [
			'Bubble sort',
			'Quick sort (with random pivot)',
			'Insertion sort',
			'Selection sort'
		],
		correct: 1,
		explanation: 'Quick sort with random pivot is the fastest in practice for large in-memory datasets. It\'s cache-friendly, has O(n log n) average, and randomization avoids the O(n²) worst case.'
	},
	{
		question: 'Bucket sort achieves O(n) average time when:',
		options: [
			'The array is already sorted',
			'Input is uniformly distributed across buckets',
			'All elements are equal',
			'The array is small'
		],
		correct: 1,
		explanation: 'When input is uniformly distributed, each bucket gets ~O(1) elements. Sorting each bucket (e.g., with insertion sort) is O(1). Total: O(n) for distributing + O(n) for sorting all buckets = O(n).'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
