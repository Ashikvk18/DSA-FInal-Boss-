import Theory from './avl-trees-theory.svelte';
import Practice from './avl-trees-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'An AVL tree is a BST where the balance factor of every node is:',
		options: ['0 only', '-1, 0, or +1', '-2 to +2', 'Any value'],
		correct: 1,
		explanation: 'AVL property: |Balance Factor| ≤ 1 for every node. BF can be -1 (right-heavy), 0 (perfectly balanced), or +1 (left-heavy). BF of ±2 triggers rebalancing.'
	},
	{
		question: 'Balance Factor (BF) is defined as:',
		options: [
			'Number of left nodes - number of right nodes',
			'Height of left subtree - height of right subtree',
			'Depth of left child - depth of right child',
			'Left child value - right child value'
		],
		correct: 1,
		explanation: 'BF = height(left subtree) - height(right subtree). Positive BF means left-heavy, negative means right-heavy.'
	},
	{
		question: 'When do rotations occur in an AVL tree?',
		options: [
			'After every insertion',
			'When the balance factor becomes +2 or -2',
			'When a leaf is added',
			'When the tree height increases'
		],
		correct: 1,
		explanation: 'Rotations are triggered only when an insertion or deletion causes some node\'s BF to become +2 or -2. Many operations don\'t need rotations at all.'
	},
	{
		question: 'An LL imbalance (BF=+2, left child BF=+1) is fixed by:',
		options: ['Left rotation', 'Right rotation', 'Left-right double rotation', 'Right-left double rotation'],
		correct: 1,
		explanation: 'LL case: imbalance goes left-left (straight path). Fix with a single RIGHT rotation at the imbalanced node. The left child becomes the new root of that subtree.'
	},
	{
		question: 'An RR imbalance (BF=-2, right child BF=-1) is fixed by:',
		options: ['Right rotation', 'Left rotation', 'Left-right double rotation', 'Right-left double rotation'],
		correct: 1,
		explanation: 'RR case: imbalance goes right-right (straight path). Fix with a single LEFT rotation at the imbalanced node. The right child becomes the new root.'
	},
	{
		question: 'An LR imbalance (BF=+2, left child BF=-1) is fixed by:',
		options: [
			'Single right rotation',
			'Single left rotation',
			'Left rotate the left child, then right rotate the node',
			'Right rotate the right child, then left rotate the node'
		],
		correct: 2,
		explanation: 'LR is a zigzag: left then right. First, left rotate the left child to straighten it into LL. Then, right rotate the node to fix LL. Two rotations total.'
	},
	{
		question: 'An RL imbalance (BF=-2, right child BF=+1) is fixed by:',
		options: [
			'Single left rotation',
			'Single right rotation',
			'Left rotate left child, right rotate node',
			'Right rotate right child, then left rotate node'
		],
		correct: 3,
		explanation: 'RL is a zigzag: right then left. First, right rotate the right child to straighten it into RR. Then, left rotate the node to fix RR. Two rotations total.'
	},
	{
		question: 'The key insight for single vs double rotation is:',
		options: [
			'BF magnitude determines it',
			'Straight path (LL/RR) = single; zigzag (LR/RL) = double',
			'Depth of the tree determines it',
			'Number of children determines it'
		],
		correct: 1,
		explanation: 'If the imbalance path is straight (LL or RR), one rotation fixes it. If it zigzags (LR or RL), you need two rotations — first straighten, then fix.'
	},
	{
		question: 'The maximum height of an AVL tree with n nodes is approximately:',
		options: ['log₂(n)', '1.44 × log₂(n)', '2 × log₂(n)', 'n/2'],
		correct: 1,
		explanation: 'AVL height ≤ 1.44 × log₂(n). This is only 44% more than a perfectly balanced tree. Still O(log n), guaranteeing efficient operations.'
	},
	{
		question: 'The minimum number of nodes in an AVL tree of height h follows:',
		options: [
			'A power of 2 pattern',
			'A Fibonacci-like recurrence: N(h) = N(h-1) + N(h-2) + 1',
			'N(h) = 2^h',
			'N(h) = h²'
		],
		correct: 1,
		explanation: 'The sparsest AVL tree of height h has N(h) = N(h-1) + N(h-2) + 1 nodes. This is Fibonacci-like: the left subtree has height h-1 and the right has h-2 (or vice versa).'
	},
	{
		question: 'After an AVL insertion, at most how many rotations are needed?',
		options: ['0', '1 (single or double)', '2', 'O(log n)'],
		correct: 1,
		explanation: 'After insertion, at most ONE rotation (which may be single or double) is needed. Fixing the first imbalanced ancestor fixes all ancestors above it.'
	},
	{
		question: 'After an AVL deletion, how many rotations may be needed?',
		options: ['At most 1', 'At most 2', 'O(log n) — rotations may cascade up', 'None ever'],
		correct: 2,
		explanation: 'Unlike insertion, deletion can cause imbalances to propagate up the tree. In the worst case, rotations are needed at every level → O(log n) rotations.'
	},
	{
		question: 'Inserting [1, 2, 3] into an empty AVL tree triggers:',
		options: ['LL rotation', 'RR rotation (left rotate at 1)', 'LR rotation', 'No rotation'],
		correct: 1,
		explanation: 'After inserting 1, 2, 3: node 1 has BF=-2, its right child (2) has BF=-1. This is RR case. Left rotate at 1 gives: 2 as root with 1 and 3 as children.'
	},
	{
		question: 'In a right rotation at node Y, what becomes the new root?',
		options: ['Y\'s right child', 'Y\'s left child', 'Y\'s parent', 'Y stays as root'],
		correct: 1,
		explanation: 'Right rotation at Y: Y\'s left child (X) becomes the new root. X\'s right subtree becomes Y\'s left subtree. Y becomes X\'s right child.'
	},
	{
		question: 'Why do we store height in each AVL node instead of computing it?',
		options: [
			'To make the tree look balanced',
			'For O(1) balance factor computation instead of O(n)',
			'It\'s required by the AVL definition',
			'To save memory'
		],
		correct: 1,
		explanation: 'Computing height from scratch is O(n). Storing height in each node gives O(1) BF computation. We update height bottom-up after each insert/delete — still O(log n) total.'
	},
	{
		question: 'AVL trees are better than Red-Black trees for:',
		options: [
			'Frequent insertions and deletions',
			'Lookup-intensive (search-heavy) applications',
			'Memory-constrained systems',
			'All cases'
		],
		correct: 1,
		explanation: 'AVL trees are more strictly balanced (height ≤ 1.44 log n vs 2 log n for RB). This means shorter search paths → faster lookups. But they do more rotations on insert/delete.'
	},
	{
		question: 'Red-Black trees are used in C++ std::map instead of AVL because:',
		options: [
			'They are always faster',
			'They need fewer rotations on insert/delete, better for mixed workloads',
			'They use less memory',
			'AVL trees are patented'
		],
		correct: 1,
		explanation: 'Red-Black trees do fewer rotations (at most 2 per insert, 3 per delete vs O(log n) for AVL delete). For workloads with frequent inserts/deletes, RB trees have less overhead.'
	},
	{
		question: 'Converting a sorted array to a balanced BST takes:',
		options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
		correct: 1,
		explanation: 'Pick the middle element as root, recursively build left and right subtrees. Each element is visited once → O(n). No rotations needed — the structure is inherently balanced.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
