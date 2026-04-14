import Theory from './essential-concepts-theory.svelte';
import Practice from './essential-concepts-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'Where are local variables stored in a C++ program?',
		options: ['Heap', 'Stack', 'Code segment', 'Global segment'],
		correct: 1,
		explanation: 'Local variables are stored on the stack. They are automatically allocated when a function is called and deallocated when it returns.'
	},
	{
		question: 'What happens when you use `new` to allocate memory?',
		options: [
			'Memory is allocated on the stack',
			'Memory is allocated on the heap',
			'Memory is allocated in the code segment',
			'Memory is allocated in the global segment'
		],
		correct: 1,
		explanation: 'The `new` operator allocates memory on the heap (free store). This memory persists until explicitly freed with `delete`.'
	},
	{
		question: 'What is a memory leak?',
		options: [
			'Accessing memory that was already freed',
			'Stack overflow due to deep recursion',
			'Heap memory that was allocated but never freed',
			'Using uninitialized variables'
		],
		correct: 2,
		explanation: 'A memory leak occurs when heap memory is allocated (via new/malloc) but never freed (via delete/free). The memory remains occupied but inaccessible.'
	},
	{
		question: 'Which of the following is a Physical Data Structure?',
		options: ['Stack', 'Queue', 'Array', 'Graph'],
		correct: 2,
		explanation: 'Array and Linked List are the only two physical data structures. They define HOW data is stored in memory. Stack, Queue, Graph are logical — they define how data is organized.'
	},
	{
		question: 'Which is a Logical Data Structure?',
		options: ['Array', 'Linked List', 'Tree', 'None of the above'],
		correct: 2,
		explanation: 'Tree is a logical data structure that defines a hierarchical organization. It is typically implemented using a linked list (nodes with pointers) internally.'
	},
	{
		question: 'What does ADT stand for?',
		options: [
			'Advanced Data Type',
			'Abstract Data Type',
			'Automated Data Transfer',
			'Array Data Table'
		],
		correct: 1,
		explanation: 'ADT = Abstract Data Type. It defines a data type by its behavior (operations) without specifying the implementation.'
	},
	{
		question: 'An ADT defines:',
		options: [
			'Only the data representation',
			'Only the implementation in C++',
			'The operations (WHAT) without implementation details (HOW)',
			'The memory layout of the data structure'
		],
		correct: 2,
		explanation: 'An ADT specifies WHAT operations can be performed (push, pop, etc.) without specifying HOW they are implemented (array vs linked list).'
	},
	{
		question: 'What is the time complexity of accessing an element in an array by index?',
		options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
		correct: 2,
		explanation: 'Array access by index is O(1) — constant time. The address is calculated directly: base + index × sizeof(type).'
	},
	{
		question: 'What is the time complexity of this code?\n`for(int i=0; i<n; i++) for(int j=0; j<n; j++) sum++;`',
		options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2n)'],
		correct: 2,
		explanation: 'Two nested loops each running n times: n × n = O(n²).'
	},
	{
		question: 'What is the time complexity of `for(int i=1; i<n; i=i*2) cout<<i;`?',
		options: ['O(n)', 'O(n²)', 'O(log n)', 'O(sqrt(n))'],
		correct: 2,
		explanation: 'i doubles each iteration (1, 2, 4, 8, ..., n). It takes log₂(n) steps to reach n. Therefore O(log n).'
	},
	{
		question: 'Two sequential (non-nested) loops each running n times gives:',
		options: ['O(n²)', 'O(n)', 'O(2n²)', 'O(n log n)'],
		correct: 1,
		explanation: 'Sequential loops are ADDED: O(n) + O(n) = O(2n) = O(n). We drop the constant.'
	},
	{
		question: 'What is the space complexity of a recursive function that calls itself n times?',
		options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
		correct: 2,
		explanation: 'Each recursive call adds a stack frame. If there are n calls deep, the recursion stack uses O(n) space.'
	},
	{
		question: 'Which time complexity is the BEST possible for comparison-based sorting?',
		options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
		correct: 1,
		explanation: 'O(n log n) is the theoretical lower bound for comparison-based sorting. Merge Sort, Heap Sort, and Quick Sort (average) achieve this.'
	},
	{
		question: 'Stack memory grows in which direction?',
		options: ['Upward (low to high address)', 'Downward (high to low address)', 'Random', 'Depends on the OS'],
		correct: 1,
		explanation: 'Stack grows downward (from high to low addresses). Heap grows upward. They grow toward each other.'
	},
	{
		question: 'What causes a Stack Overflow?',
		options: [
			'Allocating too much heap memory',
			'Deep or infinite recursion consuming all stack space',
			'Forgetting to free memory',
			'Accessing an array out of bounds'
		],
		correct: 1,
		explanation: 'Stack overflow occurs when the stack space is exhausted, typically from deep/infinite recursion where each call adds a new stack frame.'
	},
	{
		question: 'O(n² + n + 1) simplifies to:',
		options: ['O(n² + n + 1)', 'O(n² + n)', 'O(n²)', 'O(n)'],
		correct: 2,
		explanation: 'Drop lower-order terms and constants: n² dominates n and 1 for large n. So O(n² + n + 1) = O(n²).'
	},
	{
		question: 'What is the typical size limit of stack memory?',
		options: ['1-8 MB', '1-8 GB', 'Unlimited', '64 KB'],
		correct: 0,
		explanation: 'Stack is typically 1-8 MB (OS dependent). This is why large arrays or deep recursion can cause stack overflow. Heap is much larger (limited by RAM).'
	},
	{
		question: 'A Hash Table is a:',
		options: [
			'Physical data structure',
			'Logical data structure implemented using arrays',
			'A type of linked list',
			'A sorting algorithm'
		],
		correct: 1,
		explanation: 'Hash Table is a logical data structure (defines key-value operations). It is implemented using an array internally (the hash table array with buckets).'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
