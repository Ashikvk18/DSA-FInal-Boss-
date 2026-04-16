import Theory from './advanced-trees-theory.svelte';
import Practice from './advanced-trees-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'Why are multi-way trees preferred over binary trees for disk-based storage?',
		options: [
			'They use less memory',
			'More keys per node → lower height → fewer disk reads',
			'They are easier to implement',
			'They support faster in-memory operations'
		],
		correct: 1,
		explanation: 'Each node access = one disk read. Multi-way trees pack many keys per node, drastically reducing height. A B-tree of order 1000 with 1 billion keys has height ~3 vs ~30 for binary.'
	},
	{
		question: 'In a 2-3 tree, each internal node has:',
		options: [
			'Exactly 2 children',
			'Exactly 3 children',
			'2 or 3 children',
			'1 to 4 children'
		],
		correct: 2,
		explanation: 'A 2-3 tree node is either a 2-node (1 key, 2 children) or a 3-node (2 keys, 3 children). This flexibility allows the tree to stay perfectly balanced.'
	},
	{
		question: 'In a 2-3 tree, all leaves are at:',
		options: [
			'Different levels',
			'The same level',
			'The bottom two levels',
			'Any level'
		],
		correct: 1,
		explanation: 'All leaves in a 2-3 tree are at the exact same level. The tree grows upward (root splits create new root), ensuring perfect leaf alignment.'
	},
	{
		question: 'When inserting into a full 3-node in a 2-3 tree, you:',
		options: [
			'Replace the smallest key',
			'Split: middle key goes up to parent, left and right become separate nodes',
			'Create a 4-node',
			'Delete the oldest key'
		],
		correct: 1,
		explanation: 'A 3-node + new key = temporary 4-node [a|b|c]. Split: middle (b) promoted to parent, [a] becomes left child, [c] becomes right child. May cascade upward.'
	},
	{
		question: 'A 2-3-4 tree allows nodes with:',
		options: [
			'2 or 3 children only',
			'2, 3, or 4 children',
			'Any number of children',
			'Exactly 4 children'
		],
		correct: 1,
		explanation: '2-3-4 tree nodes can be 2-nodes (1 key), 3-nodes (2 keys), or 4-nodes (3 keys, 4 children). This is a B-tree of order 4.'
	},
	{
		question: 'The key relationship between 2-3-4 trees and Red-Black trees is:',
		options: [
			'They have the same height',
			'Every 2-3-4 tree can be converted to a Red-Black tree and vice versa',
			'Red-Black trees are faster',
			'They are completely unrelated'
		],
		correct: 1,
		explanation: 'There is a direct bijection: 2-node → black node, 3-node → black + one red child, 4-node → black + two red children. Red-Black trees are the binary representation of 2-3-4 trees.'
	},
	{
		question: 'A 4-node [a|b|c] in a 2-3-4 tree maps to which Red-Black structure?',
		options: [
			'Three black nodes',
			'Black root (b) with red children (a) and (c)',
			'Red root with black children',
			'A single red node'
		],
		correct: 1,
		explanation: '4-node [a|b|c] → b becomes black, a and c become red children. This is why red nodes can\'t have red children — it would create a 5-node, which doesn\'t exist.'
	},
	{
		question: 'The 5 properties of a Red-Black tree include all EXCEPT:',
		options: [
			'Root is black',
			'No two consecutive red nodes',
			'All paths have equal black-height',
			'Left subtree height ≤ right subtree height + 1'
		],
		correct: 3,
		explanation: 'The AVL balance factor property (height difference ≤ 1) is NOT a Red-Black property. RB uses color rules: root black, no consecutive reds, equal black-height on all paths.'
	},
	{
		question: 'The maximum height of a Red-Black tree with n nodes is:',
		options: [
			'log₂(n)',
			'1.44 × log₂(n)',
			'2 × log₂(n+1)',
			'n/2'
		],
		correct: 2,
		explanation: 'RB tree height ≤ 2 × log₂(n+1). Looser than AVL (1.44 log n) but still O(log n). The factor of 2 comes from red nodes potentially doubling the path length.'
	},
	{
		question: 'Red-Black tree insertion needs at most:',
		options: ['0 rotations', '2 rotations', 'O(log n) rotations', 'n rotations'],
		correct: 1,
		explanation: 'RB insertion needs at most 2 rotations (plus some recoloring that may propagate up). This is fewer than AVL deletion which may need O(log n) rotations.'
	},
	{
		question: 'A B-tree of order m requires non-root nodes to have at least:',
		options: ['1 child', 'm/2 children', '⌈m/2⌉ children', 'm children'],
		correct: 2,
		explanation: 'Non-root internal nodes must have between ⌈m/2⌉ and m children. This minimum fill ensures the tree stays balanced and doesn\'t become too sparse.'
	},
	{
		question: 'A B-tree of order 1000 with 1 billion keys has approximately what height?',
		options: ['3', '10', '20', '30'],
		correct: 0,
		explanation: 'Height ≈ log₅₀₀(10⁹) ≈ 3. Each node can hold up to 999 keys, so very few levels are needed. This means only ~3 disk reads to find any record!'
	},
	{
		question: 'The difference between B-tree and B+ tree is:',
		options: [
			'B+ tree is always taller',
			'B+ tree stores data only in leaves, with leaves linked for sequential access',
			'B-tree has more children per node',
			'B+ tree doesn\'t support deletion'
		],
		correct: 1,
		explanation: 'In B+ trees, all data/records are in leaves. Internal nodes only store keys for routing. Leaves are linked, enabling fast range queries. This is why databases prefer B+ trees.'
	},
	{
		question: 'Which tree type is used by C++ std::map and std::set?',
		options: ['AVL tree', 'Red-Black tree', 'B-tree', '2-3 tree'],
		correct: 1,
		explanation: 'C++ STL map/set use Red-Black trees. They provide O(log n) for insert, delete, and search with fewer rotations than AVL on insert/delete operations.'
	},
	{
		question: 'Which tree type is used by MySQL and PostgreSQL for indexes?',
		options: ['Red-Black tree', 'AVL tree', 'B+ tree', 'Binary search tree'],
		correct: 2,
		explanation: 'Databases use B+ trees for indexes. Data in leaves + linked leaves = fast range queries + minimal disk reads. B+ trees are optimized for disk-based storage.'
	},
	{
		question: 'In Red-Black tree insertion, when the parent and uncle are both red, you:',
		options: [
			'Rotate at the grandparent',
			'Recolor: parent and uncle → black, grandparent → red, then check upward',
			'Delete the uncle',
			'Do nothing'
		],
		correct: 1,
		explanation: 'When parent and uncle are both red, recolor them black and grandparent red. This may create a new violation at the grandparent, so propagate the fix upward. No rotation needed.'
	},
	{
		question: 'For lookup-heavy workloads, which is the best self-balancing tree?',
		options: ['Red-Black tree', 'AVL tree', 'B-tree', '2-3 tree'],
		correct: 1,
		explanation: 'AVL trees have stricter balance (height ≤ 1.44 log n vs 2 log n for RB), meaning shorter search paths. For read-heavy workloads, AVL\'s tighter balance gives faster lookups.'
	},
	{
		question: 'The "black-height" of a Red-Black tree is:',
		options: [
			'The total height of the tree',
			'The number of black nodes on any path from root to NULL (same for all paths)',
			'The number of red nodes',
			'The difference between left and right heights'
		],
		correct: 1,
		explanation: 'Black-height = number of black nodes on any path from root to a NULL leaf. Property 5 guarantees this count is the SAME for all paths, which is what keeps the tree balanced.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
