import Theory from './queues-theory.svelte';
import Practice from './queues-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'A queue follows which principle?',
		options: ['LIFO (Last In, First Out)', 'FIFO (First In, First Out)', 'Random access', 'Priority-based'],
		correct: 1,
		explanation: 'Queue = FIFO. The first element enqueued is the first to be dequeued. Like a line at a counter — first person in line gets served first.'
	},
	{
		question: 'In a queue, elements are added at the ___ and removed from the ___.',
		options: ['Front, Rear', 'Rear, Front', 'Top, Bottom', 'Bottom, Top'],
		correct: 1,
		explanation: 'Enqueue adds at the rear (back of the line). Dequeue removes from the front (first in line). This maintains FIFO order.'
	},
	{
		question: 'What is the time complexity of enqueue and dequeue?',
		options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
		correct: 2,
		explanation: 'Both enqueue (increment rear, place element) and dequeue (read front, increment front) are constant-time O(1) operations.'
	},
	{
		question: 'The main problem with a simple (non-circular) array queue is:',
		options: [
			'Slow enqueue',
			'Wasted space — front moves forward leaving unused slots behind',
			'Cannot store more than 10 elements',
			'Requires sorting'
		],
		correct: 1,
		explanation: 'As elements are dequeued, front advances. The slots at the beginning become permanently unused. Even with empty slots, rear may hit the end → "full". Circular queue fixes this.'
	},
	{
		question: 'In a circular queue, the formula to advance an index is:',
		options: [
			'index++',
			'index = (index + 1) % capacity',
			'index = index * 2',
			'index = capacity - index'
		],
		correct: 1,
		explanation: 'Modulo (%) wraps the index back to 0 when it reaches capacity. Index 4 in a size-5 array: (4+1)%5 = 0. This is what makes it "circular".'
	},
	{
		question: 'How does a circular queue detect "full" vs "empty"?',
		options: [
			'front == rear means both full and empty',
			'Use a separate count variable, or leave one slot empty',
			'Check if rear > front',
			'It cannot distinguish them'
		],
		correct: 1,
		explanation: 'Without extra info, front==rear could mean full or empty. Solutions: (1) keep a count variable, (2) waste one slot — full when (rear+1)%cap == front, empty when front==rear.'
	},
	{
		question: 'In a linked list queue, enqueue inserts at:',
		options: ['The head (front)', 'The tail (rear)', 'The middle', 'A sorted position'],
		correct: 1,
		explanation: 'Enqueue adds to the rear. With a rear pointer, this is O(1). Dequeue removes from the front (head), also O(1). Two pointers = efficient queue.'
	},
	{
		question: 'A DEQueue (Double-Ended Queue) supports:',
		options: [
			'Insert and delete at front only',
			'Insert and delete at rear only',
			'Insert and delete at BOTH front and rear',
			'Insert at front, delete at rear only'
		],
		correct: 2,
		explanation: 'A deque supports all four operations: enqueueFront, enqueueRear, dequeueFront, dequeueRear. It generalizes both stack (same-end ops) and queue (opposite-end ops).'
	},
	{
		question: 'A deque can simulate which data structures?',
		options: [
			'Only a queue',
			'Only a stack',
			'Both a stack and a queue',
			'Neither'
		],
		correct: 2,
		explanation: 'As a stack: push/pop from the same end (e.g., rear). As a queue: enqueue at rear, dequeue from front. A deque is more general than either.'
	},
	{
		question: 'In a priority queue, elements are dequeued based on:',
		options: [
			'Insertion order (FIFO)',
			'Reverse insertion order (LIFO)',
			'Priority value (highest or lowest first)',
			'Random order'
		],
		correct: 2,
		explanation: 'Priority queue dequeues by priority, not insertion order. Min-PQ removes smallest first. Max-PQ removes largest first. Used in Dijkstra\'s, Huffman coding, etc.'
	},
	{
		question: 'The most efficient implementation of a priority queue is:',
		options: [
			'Unsorted array — O(1) insert, O(n) delete',
			'Sorted array — O(n) insert, O(1) delete',
			'Heap — O(log n) insert, O(log n) delete',
			'Linked list — O(1) for both'
		],
		correct: 2,
		explanation: 'A heap (binary heap) provides O(log n) for both insert and delete-min/max. Arrays require O(n) for one operation. Heaps are the standard PQ implementation.'
	},
	{
		question: 'BFS (Breadth-First Search) uses which data structure?',
		options: ['Stack', 'Queue', 'Priority Queue', 'Array'],
		correct: 1,
		explanation: 'BFS explores level by level. A queue (FIFO) ensures we visit all nodes at distance d before distance d+1. DFS uses a stack (or recursion).'
	},
	{
		question: 'To implement a stack using two queues, the expensive operation is:',
		options: [
			'Push — must rearrange to keep LIFO order',
			'Pop — must search for the last element',
			'Both are O(1)',
			'Neither — it\'s impossible'
		],
		correct: 0,
		explanation: 'Push is O(n): move all elements to q2, push new to q1 (now at front = top), move back. Pop is O(1): just dequeue from q1. The rearrangement simulates LIFO.'
	},
	{
		question: 'To implement a queue using two stacks, dequeue works by:',
		options: [
			'Popping from stack 1 directly',
			'Moving all elements from s1 to s2 (reversing order), then popping s2',
			'Using recursion',
			'Sorting the stack'
		],
		correct: 1,
		explanation: 'Push to s1 (LIFO). For dequeue: if s2 is empty, pop all from s1 and push to s2 — this reverses order to FIFO. Then pop s2. Amortized O(1) per dequeue.'
	},
	{
		question: 'Generating binary numbers 1 to N using a queue works because:',
		options: [
			'Queue sorts the numbers',
			'Each binary number generates its two children (append 0 and 1)',
			'Queue reverses binary digits',
			'Binary numbers are always in FIFO order'
		],
		correct: 1,
		explanation: 'Start with "1". Each dequeued number s generates s+"0" and s+"1" (enqueued). This creates a level-order traversal of the binary tree: 1, 10, 11, 100, 101, ...'
	},
	{
		question: 'The C++ STL container for a deque is:',
		options: ['std::queue', 'std::deque', 'std::list', 'std::vector'],
		correct: 1,
		explanation: 'std::deque supports push/pop at both front and back in O(1) amortized. std::queue is an adapter that only exposes FIFO operations (built on top of deque by default).'
	},
	{
		question: 'What is the key difference between Stack and Queue for graph traversal?',
		options: [
			'Stack gives BFS, Queue gives DFS',
			'Stack gives DFS (deep first), Queue gives BFS (wide first)',
			'Both give the same traversal',
			'Neither is used for graphs'
		],
		correct: 1,
		explanation: 'Stack (LIFO) → DFS: go as deep as possible before backtracking. Queue (FIFO) → BFS: explore all neighbors at current depth before going deeper. Fundamental distinction!'
	},
	{
		question: 'An input-restricted deque allows:',
		options: [
			'Insert at both ends, delete from one end only',
			'Insert at one end only, delete from both ends',
			'Insert and delete from the front only',
			'No restrictions'
		],
		correct: 1,
		explanation: 'Input-restricted: input (insert) limited to one end, but delete from both ends. Output-restricted: delete limited to one end, but insert at both ends.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
