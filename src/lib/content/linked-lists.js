import Theory from './linked-lists-theory.svelte';
import Practice from './linked-lists-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'What is the main advantage of a linked list over an array?',
		options: [
			'Faster access by index',
			'Dynamic size and O(1) insert/delete at the beginning',
			'Better cache performance',
			'Uses less memory per element'
		],
		correct: 1,
		explanation: 'Linked lists grow/shrink dynamically and can insert/delete at the head in O(1). Arrays require shifting for insert/delete and may need expensive resizing.'
	},
	{
		question: 'What is the time complexity of accessing the kth element in a singly linked list?',
		options: ['O(1)', 'O(log n)', 'O(k)', 'O(n)'],
		correct: 3,
		explanation: 'Linked lists have no random access. You must traverse from the head, visiting up to n nodes. Worst case is O(n).'
	},
	{
		question: 'In a singly linked list, each node contains:',
		options: [
			'Data only',
			'Data and a pointer to the next node',
			'Data and pointers to next and previous nodes',
			'Data and an index'
		],
		correct: 1,
		explanation: 'A singly linked list node has two fields: data (the value) and next (pointer to the next node). The last node\'s next is NULL.'
	},
	{
		question: 'Inserting a node at the beginning of a singly linked list is:',
		options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
		correct: 2,
		explanation: 'Create new node, point its next to current head, update head to new node. Three pointer operations → O(1).'
	},
	{
		question: 'Deleting a node at the beginning of a singly linked list is:',
		options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'],
		correct: 1,
		explanation: 'Save head, move head to head->next, delete old head. Constant time operations → O(1).'
	},
	{
		question: 'To reverse a singly linked list iteratively, you need how many pointers?',
		options: ['1 (current)', '2 (current, next)', '3 (prev, current, next)', '4'],
		correct: 2,
		explanation: 'You need prev (starts NULL), curr (starts at head), and next (saved before reversing). At each step: save next, reverse link, advance prev and curr.'
	},
	{
		question: 'Floyd\'s cycle detection algorithm uses:',
		options: [
			'A hash set to track visited nodes',
			'Two pointers moving at different speeds (slow and fast)',
			'Recursion to detect repeated nodes',
			'Sorting the node addresses'
		],
		correct: 1,
		explanation: 'Floyd\'s algorithm uses slow (1 step) and fast (2 steps) pointers. If there\'s a cycle, they will eventually meet inside the cycle. O(n) time, O(1) space.'
	},
	{
		question: 'To find the middle node of a linked list in one pass, you use:',
		options: [
			'Count nodes first, then traverse to n/2',
			'Slow pointer (1 step) and fast pointer (2 steps)',
			'Binary search',
			'Reverse the list and check'
		],
		correct: 1,
		explanation: 'When the fast pointer reaches the end, the slow pointer is at the middle. One pass, O(n) time, O(1) space.'
	},
	{
		question: 'In a circular linked list, the last node\'s next pointer points to:',
		options: ['NULL', 'The head node', 'The previous node', 'Itself'],
		correct: 1,
		explanation: 'In a circular linked list, the last node points back to the head, forming a cycle. There is no NULL — you detect full traversal when you return to the head.'
	},
	{
		question: 'A doubly linked list node contains:',
		options: [
			'Data and one pointer',
			'Data and two pointers (prev and next)',
			'Data, prev, next, and a parent pointer',
			'Only two pointers'
		],
		correct: 1,
		explanation: 'Each node in a DLL has: data, a prev pointer (to the previous node), and a next pointer (to the next node). This allows bidirectional traversal.'
	},
	{
		question: 'The main advantage of a doubly linked list over a singly linked list is:',
		options: [
			'Uses less memory',
			'Faster access by index',
			'Can delete a node in O(1) given just a pointer to it',
			'Easier to implement'
		],
		correct: 2,
		explanation: 'In a singly LL, deleting a node requires finding the previous node (O(n)). In a DLL, you have the prev pointer directly → O(1) delete given the node pointer.'
	},
	{
		question: 'Merging two sorted linked lists takes:',
		options: ['O(n²)', 'O(n log n)', 'O(m + n)', 'O(max(m, n))'],
		correct: 2,
		explanation: 'Use two pointers, one for each list. Compare current nodes and link the smaller one. Each node is visited once → O(m + n).'
	},
	{
		question: 'To find the Nth node from the end in one pass, you:',
		options: [
			'Reverse the list first',
			'Count total nodes, then traverse to length - N',
			'Advance a fast pointer by N, then move both slow and fast together',
			'Use binary search'
		],
		correct: 2,
		explanation: 'Advance fast by N positions. Then move both slow (from head) and fast together. When fast reaches the end, slow is at the Nth from end. One pass, O(n).'
	},
	{
		question: 'To check if a linked list is a palindrome, the approach is:',
		options: [
			'Sort the list and check',
			'Find middle, reverse second half, compare with first half',
			'Use a 2D array',
			'Compare first and last elements only'
		],
		correct: 1,
		explanation: 'Find middle (slow/fast), reverse second half, compare node by node. Uses O(n) time, O(1) space. Combines three techniques: middle finding, reversal, and comparison.'
	},
	{
		question: 'What happens if you insert into a sorted linked list?',
		options: [
			'It becomes unsorted',
			'You traverse to find the correct position and insert — O(n)',
			'You insert at the head — O(1)',
			'You need to sort after inserting'
		],
		correct: 1,
		explanation: 'Walk the list until you find a node larger than the new value, then insert before it. Maintains sorted order. O(n) to find position, O(1) to insert.'
	},
	{
		question: 'Removing duplicates from a SORTED linked list is:',
		options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
		correct: 2,
		explanation: 'In a sorted list, duplicates are adjacent. Traverse once: if current == next, delete next. O(n) time since each node is visited once.'
	},
	{
		question: 'The space overhead of a singly linked list compared to an array (for n integers) is:',
		options: [
			'No extra space',
			'n extra pointers (one per node)',
			'log n extra pointers',
			'n² extra pointers'
		],
		correct: 1,
		explanation: 'Each node stores data + one next pointer. For n nodes, that\'s n extra pointers (4 or 8 bytes each). Arrays have zero overhead per element.'
	},
	{
		question: 'When should you prefer an array over a linked list?',
		options: [
			'Frequent insertions at the beginning',
			'Unknown number of elements',
			'Frequent random access by index',
			'Frequent deletions from the middle'
		],
		correct: 2,
		explanation: 'Arrays provide O(1) random access by index. Linked lists require O(n) traversal. If your primary operation is accessing elements by index, arrays are far superior.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
