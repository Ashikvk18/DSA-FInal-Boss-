import Theory from './arrays-theory.svelte';
import Practice from './arrays-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'In an Array ADT, what is the difference between "size" and "length"?',
		options: [
			'They are the same thing',
			'Size = total capacity, Length = number of elements currently stored',
			'Size = number of elements, Length = total capacity',
			'Size is for static arrays, Length is for dynamic'
		],
		correct: 1,
		explanation: 'Size is the total allocated capacity (how many elements CAN fit). Length is how many elements are currently stored. Always: length <= size.'
	},
	{
		question: 'What is the time complexity of appending an element to the end of an array?',
		options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
		correct: 2,
		explanation: 'Appending at the end simply places the element at index "length" and increments length. No shifting needed → O(1).'
	},
	{
		question: 'What is the time complexity of inserting at index 0 in an array of n elements?',
		options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
		correct: 2,
		explanation: 'Inserting at index 0 requires shifting ALL n elements one position to the right → O(n).'
	},
	{
		question: 'Binary search requires the array to be:',
		options: ['Unsorted', 'Sorted', 'Of even length', 'On the heap'],
		correct: 1,
		explanation: 'Binary search only works on sorted arrays because it relies on comparing the middle element to determine which half to search.'
	},
	{
		question: 'What is the time complexity of binary search?',
		options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
		correct: 2,
		explanation: 'Binary search halves the search space each step. For n elements, it takes at most log₂(n) comparisons → O(log n).'
	},
	{
		question: 'In a 2D array stored in row-major order, the formula for address of A[i][j] is:',
		options: [
			'Base + (j * rows + i) * sizeof(type)',
			'Base + (i * cols + j) * sizeof(type)',
			'Base + (i + j) * sizeof(type)',
			'Base + (i * j) * sizeof(type)'
		],
		correct: 1,
		explanation: 'Row-major stores rows sequentially. Address = Base + (i * numCols + j) * sizeof(type). C/C++ uses row-major order.'
	},
	{
		question: 'What is the linear search "transposition" optimization?',
		options: [
			'Sort the array before searching',
			'Move the found element one position toward the front',
			'Move the found element to the end',
			'Use binary search instead'
		],
		correct: 1,
		explanation: 'Transposition swaps the found element with its predecessor (one position toward index 0). Frequently searched elements gradually move to the front, improving future searches.'
	},
	{
		question: 'To reverse an array in O(1) extra space, you should:',
		options: [
			'Create a copy and reverse it',
			'Use a stack',
			'Swap elements from both ends moving toward the center',
			'Sort it in reverse order'
		],
		correct: 2,
		explanation: 'Two-pointer swap: i starts at 0, j at n-1. Swap A[i] and A[j], then i++ and j-- until they meet. O(n) time, O(1) space.'
	},
	{
		question: 'Merging two sorted arrays of size m and n takes:',
		options: ['O(m × n)', 'O(m + n)', 'O(n log n)', 'O(max(m, n))'],
		correct: 1,
		explanation: 'Merge uses two pointers, each advancing through its respective array. Every element is visited exactly once → O(m + n).'
	},
	{
		question: 'Set Union of two sorted arrays [2,5,8] and [3,5,9] is:',
		options: [
			'[5]',
			'[2,3,5,5,8,9]',
			'[2,3,5,8,9]',
			'[2,8]'
		],
		correct: 2,
		explanation: 'Union contains all unique elements from both arrays. 5 appears in both but is included only once → [2,3,5,8,9].'
	},
	{
		question: 'Set Intersection of [2,5,8,12] and [3,5,8,15] is:',
		options: ['[2,3,5,8,12,15]', '[5,8]', '[2,12]', '[3,15]'],
		correct: 1,
		explanation: 'Intersection contains only elements common to BOTH arrays. 5 and 8 appear in both → [5,8].'
	},
	{
		question: 'To find a single missing number from 1 to n (given n-1 elements), the most efficient approach is:',
		options: [
			'Sort and scan — O(n log n)',
			'Use sum formula: n(n+1)/2 minus array sum — O(n)',
			'Use nested loops — O(n²)',
			'Use binary search — O(log n)'
		],
		correct: 1,
		explanation: 'Expected sum = n(n+1)/2. Actual sum = sum of array elements. Missing = expected - actual. O(n) time, O(1) space.'
	},
	{
		question: 'A dynamic array (like std::vector) resizes by:',
		options: [
			'Adding one more slot each time',
			'Creating a new larger array, copying elements, deleting the old one',
			'Using linked list nodes',
			'Expanding the existing memory block in place'
		],
		correct: 1,
		explanation: 'Dynamic arrays allocate a new array (typically 2x the size), copy all elements, and delete the old array. This gives amortized O(1) appends.'
	},
	{
		question: 'Left rotation of [1,2,3,4,5] by 2 gives:',
		options: ['[3,4,5,1,2]', '[4,5,1,2,3]', '[2,3,4,5,1]', '[5,4,3,2,1]'],
		correct: 0,
		explanation: 'Left rotation by 2: first 2 elements move to the end. [1,2,3,4,5] → [3,4,5,1,2].'
	},
	{
		question: 'How can you left-rotate an array by k positions in O(n) time and O(1) space?',
		options: [
			'Use a temporary array',
			'Reverse first k, reverse rest, reverse entire array',
			'Shift one position at a time, k times',
			'Use recursion'
		],
		correct: 1,
		explanation: 'The three-reverse trick: reverse(0,k-1), reverse(k,n-1), reverse(0,n-1). Each reverse is O(n) with O(1) space. Total: O(n) time, O(1) space.'
	},
	{
		question: 'To find duplicates in an unsorted array efficiently, the best approach is:',
		options: [
			'Nested loops — O(n²)',
			'Sort first, then scan — O(n log n)',
			'Hash table / count array — O(n)',
			'Binary search each element'
		],
		correct: 2,
		explanation: 'A hash/count array marks how many times each element appears. One pass to count, one to find duplicates → O(n) time.'
	},
	{
		question: 'What is the worst-case comparison count for binary search on 1,000,000 elements?',
		options: ['1,000,000', '500,000', '~20', '~1000'],
		correct: 2,
		explanation: 'Binary search makes at most ⌈log₂(1,000,000)⌉ ≈ 20 comparisons. This is the power of O(log n).'
	},
	{
		question: 'Which array operation is O(1) in ALL cases?',
		options: ['Insert at beginning', 'Delete at beginning', 'Access by index', 'Search for an element'],
		correct: 2,
		explanation: 'Array access by index is always O(1) — the address is computed directly: base + index × sizeof(type). No iteration needed.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
