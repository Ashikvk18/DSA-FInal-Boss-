import Theory from './bst-theory.svelte';
import Practice from './bst-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'The BST property states that for every node:',
		options: [
			'Left child is greater, right child is smaller',
			'All left subtree values < node < all right subtree values',
			'Children are always leaves',
			'Left and right subtrees have equal height'
		],
		correct: 1,
		explanation: 'BST property: ALL values in the left subtree are less than the node, and ALL values in the right subtree are greater. This must hold at every node, not just immediate children.'
	},
	{
		question: 'Inorder traversal of a BST produces:',
		options: ['Random order', 'Sorted ascending order', 'Sorted descending order', 'Level order'],
		correct: 1,
		explanation: 'Inorder (Left-Root-Right) visits left subtree (smaller values) first, then root, then right subtree (larger values). This gives ascending sorted order.'
	},
	{
		question: 'The time complexity of search in a balanced BST is:',
		options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
		correct: 1,
		explanation: 'In a balanced BST, height = O(log n). Search compares at each level and goes left or right, visiting at most h+1 nodes → O(log n).'
	},
	{
		question: 'The worst-case search time in a skewed BST is:',
		options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
		correct: 2,
		explanation: 'A skewed BST (e.g., inserting sorted data) has height n-1, behaving like a linked list. Search must traverse all n nodes → O(n).'
	},
	{
		question: 'New nodes in a BST are always inserted as:',
		options: ['The root', 'Internal nodes', 'Leaves', 'The leftmost node'],
		correct: 2,
		explanation: 'BST insertion follows the search path until reaching NULL, then creates the new node there. New nodes are always leaves — they never have children initially.'
	},
	{
		question: 'When deleting a node with TWO children from a BST, you replace it with:',
		options: [
			'Its parent node',
			'Its left child',
			'Its inorder successor (or predecessor)',
			'The root node'
		],
		correct: 2,
		explanation: 'Replace with inorder successor (smallest in right subtree) or inorder predecessor (largest in left subtree). Both maintain the BST property after replacement.'
	},
	{
		question: 'The inorder successor of a node is:',
		options: [
			'The node\'s right child',
			'The smallest node in the right subtree (leftmost node in right subtree)',
			'The node\'s parent',
			'The largest node in the left subtree'
		],
		correct: 1,
		explanation: 'Inorder successor = next node in sorted order = smallest value greater than the node = leftmost node in the right subtree. Go right once, then go left as far as possible.'
	},
	{
		question: 'The minimum value in a BST is found at:',
		options: ['The root', 'The rightmost node', 'The leftmost node', 'Any leaf'],
		correct: 2,
		explanation: 'In a BST, smaller values are always to the left. The minimum is the leftmost node — keep going left until you hit NULL.'
	},
	{
		question: 'The maximum value in a BST is found at:',
		options: ['The root', 'The rightmost node', 'The leftmost node', 'The deepest node'],
		correct: 1,
		explanation: 'In a BST, larger values are always to the right. The maximum is the rightmost node — keep going right until you hit NULL.'
	},
	{
		question: 'To validate if a binary tree is a BST, the best approach is:',
		options: [
			'Check if left child < root < right child at every node',
			'Check if ALL left subtree values < root < ALL right subtree values using min/max bounds',
			'Check if the tree is balanced',
			'Do a level order traversal'
		],
		correct: 1,
		explanation: 'Just checking immediate children is NOT enough (a deeper node could violate BST). You must pass min/max bounds down: left subtree must be in (min, node) and right in (node, max).'
	},
	{
		question: 'The Lowest Common Ancestor (LCA) of two nodes in a BST is found at:',
		options: [
			'The root always',
			'The node where the two values split into different subtrees',
			'The deeper of the two nodes',
			'The minimum of the two values'
		],
		correct: 1,
		explanation: 'Start at root. If both values < node, go left. If both > node, go right. When they split (one left, one right), that node is the LCA. O(h) time.'
	},
	{
		question: 'Floor of key=27 in BST with values [10, 20, 25, 30, 35, 40] is:',
		options: ['20', '25', '30', '27'],
		correct: 1,
		explanation: 'Floor = largest value ≤ key. Values ≤ 27: 10, 20, 25. Largest is 25. So floor(27) = 25.'
	},
	{
		question: 'Ceil of key=27 in BST with values [10, 20, 25, 30, 35, 40] is:',
		options: ['25', '27', '30', '35'],
		correct: 2,
		explanation: 'Ceil = smallest value ≥ key. Values ≥ 27: 30, 35, 40. Smallest is 30. So ceil(27) = 30.'
	},
	{
		question: 'A BST can be uniquely reconstructed from:',
		options: [
			'Inorder traversal alone',
			'Preorder traversal alone',
			'Postorder traversal alone',
			'Both B and C'
		],
		correct: 3,
		explanation: 'For a BST, either preorder or postorder alone is sufficient — the BST property provides the additional constraint (what goes left vs right). For general binary trees, you need two traversals.'
	},
	{
		question: 'Inserting elements [1, 2, 3, 4, 5] in order into an empty BST creates:',
		options: [
			'A balanced BST',
			'A right-skewed tree (like a linked list)',
			'A perfect binary tree',
			'A left-skewed tree'
		],
		correct: 1,
		explanation: 'Each new element is larger than all previous, so it always goes to the right. Result: 1→2→3→4→5, a right-skewed chain with height 4.'
	},
	{
		question: 'To find the kth smallest element in a BST, the optimal approach is:',
		options: [
			'Sort all elements and pick kth',
			'Inorder traversal, count to k',
			'Level order traversal',
			'Binary search on values 1 to max'
		],
		correct: 1,
		explanation: 'Inorder traversal visits nodes in sorted order. Simply count during inorder — when count reaches k, that\'s the kth smallest. O(k) time if you stop early.'
	},
	{
		question: 'Self-balancing BSTs (AVL, Red-Black) guarantee:',
		options: [
			'O(1) search',
			'Height = O(log n), so all operations are O(log n)',
			'No rotations needed',
			'Perfect balance at all times'
		],
		correct: 1,
		explanation: 'Self-balancing BSTs maintain height O(log n) through rotations after insert/delete. This guarantees O(log n) for search, insert, and delete — even with sorted input.'
	},
	{
		question: 'Deleting a leaf node from a BST requires:',
		options: [
			'Finding a replacement node',
			'Simply removing it (set parent\'s pointer to NULL)',
			'Rebuilding the entire tree',
			'Rotating the tree'
		],
		correct: 1,
		explanation: 'A leaf has no children. Just remove it by setting its parent\'s pointer to NULL and freeing the memory. No restructuring needed. Simplest delete case.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
