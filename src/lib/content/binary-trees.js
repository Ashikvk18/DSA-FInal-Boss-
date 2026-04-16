import Theory from './binary-trees-theory.svelte';
import Practice from './binary-trees-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'A tree with n nodes has how many edges?',
		options: ['n', 'n + 1', 'n - 1', 'n²'],
		correct: 2,
		explanation: 'Every node except the root has exactly one edge connecting it to its parent. So n nodes → n-1 edges.'
	},
	{
		question: 'In a binary tree, each node has at most:',
		options: ['1 child', '2 children', '3 children', 'Unlimited children'],
		correct: 1,
		explanation: 'Binary = two. Each node can have at most a left child and a right child. Nodes with 0 children are leaves.'
	},
	{
		question: 'A perfect binary tree of height 3 has how many nodes?',
		options: ['7', '8', '15', '16'],
		correct: 2,
		explanation: 'Perfect binary tree of height h has 2^(h+1) - 1 nodes. Height 3: 2^4 - 1 = 15 nodes. It has 8 leaves and 7 internal nodes.'
	},
	{
		question: 'Preorder traversal visits nodes in which order?',
		options: ['Left, Root, Right', 'Root, Left, Right', 'Left, Right, Root', 'Right, Root, Left'],
		correct: 1,
		explanation: 'Preorder = Root first, then Left subtree, then Right subtree. "Pre" means the root comes before (pre) the subtrees.'
	},
	{
		question: 'Inorder traversal of a BST gives:',
		options: ['Random order', 'Sorted ascending order', 'Reverse sorted order', 'Level order'],
		correct: 1,
		explanation: 'Inorder (Left-Root-Right) on a BST visits nodes in ascending sorted order. This is a fundamental BST property.'
	},
	{
		question: 'Postorder traversal visits the root:',
		options: ['First', 'In the middle', 'Last', 'It depends on the tree'],
		correct: 2,
		explanation: 'Postorder = Left, Right, Root. The root is visited LAST ("post" = after). Used for deleting trees — delete children before parent.'
	},
	{
		question: 'Level order traversal uses which data structure?',
		options: ['Stack', 'Queue', 'Array', 'Linked List'],
		correct: 1,
		explanation: 'Level order = BFS. A queue (FIFO) ensures we visit all nodes at level d before level d+1. Enqueue children as you dequeue parents.'
	},
	{
		question: 'Iterative preorder traversal uses:',
		options: ['A queue', 'A stack', 'Two queues', 'No extra data structure'],
		correct: 1,
		explanation: 'Iterative preorder uses a stack. Push root, then loop: pop → visit → push right child → push left child. Left is pushed last so it\'s processed first (LIFO).'
	},
	{
		question: 'The height of a tree with a single node is:',
		options: ['-1', '0', '1', '2'],
		correct: 1,
		explanation: 'A single node has no edges below it, so its height is 0. An empty tree has height -1. Height = longest path from node to a leaf.'
	},
	{
		question: 'The recursive formula for tree height is:',
		options: [
			'1 + left height + right height',
			'1 + max(left height, right height)',
			'max(left height, right height)',
			'left height + right height'
		],
		correct: 1,
		explanation: 'height(node) = 1 + max(height(left), height(right)). We take the maximum because height is the LONGEST path down. Base case: height(null) = -1.'
	},
	{
		question: 'To count all nodes in a binary tree recursively:',
		options: [
			'1 + count(left)',
			'count(left) + count(right)',
			'1 + count(left) + count(right)',
			'2 * count(left)'
		],
		correct: 2,
		explanation: 'Count current node (1) plus all nodes in left subtree plus all nodes in right subtree. Base case: count(null) = 0.'
	},
	{
		question: 'A leaf node is a node with:',
		options: ['No parent', 'No children (both left and right are NULL)', 'One child', 'Two children'],
		correct: 1,
		explanation: 'A leaf has no children — both left and right pointers are NULL. Leaves are the "bottom" of the tree.'
	},
	{
		question: 'To uniquely reconstruct a binary tree, you need:',
		options: [
			'Preorder only',
			'Inorder only',
			'Inorder + one other traversal (preorder or postorder)',
			'All three traversals'
		],
		correct: 2,
		explanation: 'You need TWO traversals, and one must be inorder. Inorder tells you what\'s in the left vs right subtree. Preorder/postorder tells you the root.'
	},
	{
		question: 'In the array representation of a binary tree, the left child of node at index i is at:',
		options: ['i + 1', '2 * i', '2 * i + 1', '2 * i + 2'],
		correct: 2,
		explanation: 'For 0-indexed arrays: left child = 2i + 1, right child = 2i + 2, parent = (i-1)/2. This is how heaps store trees in arrays.'
	},
	{
		question: 'A complete binary tree is one where:',
		options: [
			'Every node has exactly 2 children',
			'All levels are full except possibly the last, which is filled left to right',
			'All leaves are at the same level',
			'Every node has 0 or 2 children'
		],
		correct: 1,
		explanation: 'Complete = all levels filled except possibly the last, which must be filled from left to right (no gaps). Heaps are always complete binary trees.'
	},
	{
		question: 'A degenerate (skewed) binary tree behaves like:',
		options: ['An array', 'A linked list', 'A hash table', 'A complete tree'],
		correct: 1,
		explanation: 'A degenerate tree has every node with only one child — it\'s essentially a linked list. Height = n-1, making all operations O(n) instead of O(log n).'
	},
	{
		question: 'The time complexity of all tree traversals (pre, in, post, level) is:',
		options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'],
		correct: 1,
		explanation: 'Every traversal visits each node exactly once → O(n). Space is O(h) for recursive traversals (stack depth) or O(w) for level order (max width).'
	},
	{
		question: 'Mirroring (inverting) a binary tree means:',
		options: [
			'Reversing the inorder traversal',
			'Swapping left and right children at every node',
			'Rotating the tree',
			'Deleting all leaves'
		],
		correct: 1,
		explanation: 'Mirror/invert swaps the left and right subtrees at every node recursively. The result is the tree\'s mirror image. Classic Google interview question!'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
