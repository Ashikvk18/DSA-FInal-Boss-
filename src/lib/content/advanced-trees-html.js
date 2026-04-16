export const theoryHTML = `
<section class="theory-section" id="multiway-intro">
	<h2>1. Beyond Binary — Why Multi-way Trees?</h2>
	<div class="definition-box">
		<strong>Problem:</strong> Binary trees store one key per node. For <strong>disk-based storage</strong> (databases, file systems), each node access = one disk read. We want to minimize disk reads by storing <strong>many keys per node</strong> and having <strong>many children</strong>.<br><br>
		<strong>Multi-way Search Tree:</strong> A tree where each node can have <strong>m children</strong> and <strong>m-1 keys</strong>. Keys within a node are sorted. This reduces tree height dramatically → fewer disk accesses.
	</div>

<pre><code>// Binary tree (m=2): 1 key, 2 children per node
// Height for n keys: O(log₂ n)
// 1 million keys → ~20 levels → 20 disk reads!

// Multi-way tree (m=100): 99 keys, 100 children per node
// Height for n keys: O(log₁₀₀ n)
// 1 million keys → ~3 levels → 3 disk reads!

// M-way search tree node:
// [key₁ | key₂ | ... | key_{m-1}]
// Each key separates the ranges for child pointers
// child₀ &lt; key₁ &lt; child₁ &lt; key₂ &lt; ... &lt; key_{m-1} &lt; child_{m-1}</code></pre>
</section>

<section class="theory-section" id="two-three-tree">
	<h2>2. 2-3 Trees</h2>
	<div class="definition-box">
		<strong>2-3 Tree:</strong> A balanced multi-way search tree where every node has either <strong>2 children (1 key)</strong> or <strong>3 children (2 keys)</strong>. All leaves are at the <strong>same level</strong>. This guarantees O(log n) height.
	</div>

<pre><code>// 2-node: [key]  — 2 children
//         / \\
//      &lt;key  &gt;key

// 3-node: [key₁ | key₂]  — 3 children
//         /    |    \\
//     &lt;key₁  between  &gt;key₂

// Example 2-3 tree:
//         [30]
//        /    \\
//    [10|20]  [40|50]
//   /  |  \\   /  |  \\
//  5  15  25  35  45  60</code></pre>

	<h3>2-3 Tree Insertion</h3>
<pre><code>// Insertion always happens at a LEAF
// Case 1: Leaf is a 2-node → just add key (becomes 3-node) ✓
// Case 2: Leaf is a 3-node → SPLIT!
//   - Insert key → temporary 4-node [a|b|c]
//   - Middle key (b) moves UP to parent
//   - Left gets [a], Right gets [c]
//   - If parent overflows, split again (may cascade to root)

// Example: Insert 35 into [30|40]
// [30|40] becomes temp [30|35|40]
// Split: 35 goes up, [30] left, [40] right

// If split reaches root, a NEW root is created
// → tree grows from the TOP (not bottom!)
// → all leaves always at same level ✓</code></pre>

	<h3>2-3 Tree Deletion</h3>
<pre><code>// Delete from leaf:
// Case 1: Leaf is a 3-node → just remove key (becomes 2-node) ✓
// Case 2: Leaf is a 2-node → UNDERFLOW!
//   - Try to borrow (rotate) from sibling
//   - If sibling is also a 2-node → MERGE with sibling
//   - Merging may cascade up to root (root may shrink)

// Delete internal node:
// Replace with inorder successor (from leaf), then delete from leaf</code></pre>
</section>

<section class="theory-section" id="two-three-four-tree">
	<h2>3. 2-3-4 Trees</h2>
	<div class="definition-box">
		<strong>2-3-4 Tree:</strong> Extension of 2-3 trees. Each node can have <strong>2, 3, or 4 children</strong> (1, 2, or 3 keys). Also called a <strong>B-tree of order 4</strong>. All leaves at the same level.
	</div>

<pre><code>// Node types:
// 2-node: [a]       — 2 children
// 3-node: [a|b]     — 3 children
// 4-node: [a|b|c]   — 4 children

// Insertion:
// When encountering a 4-node during search → SPLIT it immediately
// (This is "top-down" splitting — ensures we never have to cascade up)

// Split a 4-node [a|b|c]:
//   Push middle (b) up to parent
//   Left child gets [a], right child gets [c]

// This "pre-emptive splitting" makes insertion simpler
// than 2-3 trees (no cascading splits)</code></pre>

	<div class="important-box">
		<strong>Key Insight:</strong> 2-3-4 trees have a direct correspondence with <strong>Red-Black trees</strong>! Every 2-3-4 tree can be converted to a Red-Black tree and vice versa. This is why Red-Black trees exist — they're a binary representation of 2-3-4 trees.
	</div>
</section>

<section class="theory-section" id="red-black-tree">
	<h2>4. Red-Black Trees</h2>
	<div class="definition-box">
		<strong>Red-Black Tree:</strong> A self-balancing BST where each node has a <strong>color</strong> (red or black). Five properties ensure balance:<br>
		1. Every node is red or black<br>
		2. Root is always <strong>black</strong><br>
		3. Every NULL leaf is considered <strong>black</strong><br>
		4. Red node's children must be <strong>black</strong> (no two consecutive reds)<br>
		5. Every path from root to NULL has the <strong>same number of black nodes</strong> (black-height)
	</div>

<pre><code>struct RBNode {
    int data;
    RBNode *left, *right, *parent;
    bool isRed;  // true = red, false = black
};

// Properties guarantee: height ≤ 2 × log₂(n+1)
// Looser than AVL (1.44 log n) but still O(log n)

// Visual (B=black, R=red):
//          [13B]
//         /     \\
//      [8R]     [17R]
//      / \\      /  \\
//   [1B] [11B] [15B] [25B]
//     \\           \\
//     [6R]       [22R]</code></pre>

	<h3>2-3-4 ↔ Red-Black Correspondence</h3>
<pre><code>// 2-node [a] → single black node
//   [aB]

// 3-node [a|b] → black parent with one red child
//   [bB]          or    [aB]
//   /                      \\
// [aR]                    [bR]

// 4-node [a|b|c] → black parent with two red children
//      [bB]
//     /    \\
//   [aR]  [cR]

// Converting 2-3-4 to Red-Black:
// Middle key → black node
// Side keys → red children
// This is why red nodes can't have red children!
// (It would create a 5-node, which doesn't exist in 2-3-4)</code></pre>

	<h3>Red-Black Insertion</h3>
<pre><code>// 1. Insert as in regular BST
// 2. Color new node RED
// 3. Fix violations (recolor and/or rotate)

// Cases after inserting red node X:
// Case 1: Parent is BLACK → no violation ✓
// Case 2: Parent is RED, Uncle is RED → recolor
//   - Parent and Uncle → black, Grandparent → red
//   - Move up and check grandparent

// Case 3: Parent is RED, Uncle is BLACK (or NULL)
//   - If zigzag (LR or RL): rotate to straighten
//   - Then rotate at grandparent and recolor

// At most 2 rotations needed per insertion!
// (vs potentially O(log n) for AVL deletion)</code></pre>

	<h3>Red-Black Deletion</h3>
<pre><code>// Deletion is more complex — involves "double black" concept
// When deleting a black node, it creates a "double black"
// that must be resolved by:
// - Recoloring (if sibling is red)
// - Rotation + recolor (if sibling is black with red child)
// - Propagating double-black up (if sibling and its children are black)

// At most 3 rotations needed per deletion!</code></pre>
</section>

<section class="theory-section" id="b-trees">
	<h2>5. B-Trees (Generalization)</h2>
	<div class="definition-box">
		<strong>B-Tree of order m:</strong> A balanced m-way search tree where:<br>
		- Root has at least 2 children (unless it's a leaf)<br>
		- Non-root internal nodes have between ⌈m/2⌉ and m children<br>
		- All leaves at the <strong>same level</strong><br>
		- A node with k children has k-1 keys<br>
		B-Trees are the <strong>standard for databases and file systems</strong>.
	</div>

<pre><code>// B-Tree of order 5:
// Each node: 2 to 4 keys, 3 to 5 children
// (Except root: 1 to 4 keys)

//              [30|60]
//             /   |    \\
//      [10|20] [40|50] [70|80|90]

// Properties:
// Height of B-tree: O(log_{m/2} n)
// For m=1000, n=1 billion: height ≈ 3!
// Only 3 disk reads to find any record!

// Real-world usage:
// MySQL InnoDB → B+ Trees (variant of B-Trees)
// PostgreSQL → B-Trees for indexes
// File systems (NTFS, ext4) → B-Trees
// MongoDB → B-Trees</code></pre>

	<h3>B-Tree vs B+ Tree</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">B-Tree</th>
				<th class="text-left p-2 text-gray-400">B+ Tree</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Data storage</td><td class="p-2">In all nodes</td><td class="p-2">Only in leaves</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Leaf linking</td><td class="p-2">No</td><td class="p-2">Leaves linked (sequential access)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Range queries</td><td class="p-2">Slower</td><td class="p-2">Fast (follow leaf links)</td></tr>
			<tr><td class="p-2">Used in</td><td class="p-2">General purpose</td><td class="p-2">Databases (MySQL, PostgreSQL)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="comparison">
	<h2>6. Complete Tree Comparison</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Tree Type</th>
				<th class="text-left p-2 text-gray-400">Balance</th>
				<th class="text-left p-2 text-gray-400">Height</th>
				<th class="text-left p-2 text-gray-400">Used In</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">BST</td><td class="p-2">Not guaranteed</td><td class="p-2">O(n) worst</td><td class="p-2">Simple lookups</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">AVL</td><td class="p-2">Strict (BF ≤ 1)</td><td class="p-2">1.44 log n</td><td class="p-2">Read-heavy databases</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Red-Black</td><td class="p-2">Relaxed (colors)</td><td class="p-2">2 log n</td><td class="p-2">C++ map/set, Java TreeMap</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">2-3 Tree</td><td class="p-2">Perfect</td><td class="p-2">log₂ n to log₃ n</td><td class="p-2">Theoretical foundation</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">2-3-4 Tree</td><td class="p-2">Perfect</td><td class="p-2">~log n</td><td class="p-2">Maps to Red-Black</td></tr>
			<tr><td class="p-2">B-Tree</td><td class="p-2">Perfect</td><td class="p-2">log_{m/2} n</td><td class="p-2">Databases, file systems</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Multi-way trees</strong> store multiple keys per node → reduce height → fewer disk reads.</li>
			<li>• <strong>2-3 Tree</strong>: nodes have 2 or 3 children. All leaves same level. Insert splits 3-nodes upward.</li>
			<li>• <strong>2-3-4 Tree</strong>: nodes have 2, 3, or 4 children. Pre-emptive splitting on the way down.</li>
			<li>• <strong>Red-Black = binary representation of 2-3-4 tree</strong>. 4-node = black with 2 red children.</li>
			<li>• <strong>RB rules</strong>: root black, no consecutive reds, equal black-height on all paths.</li>
			<li>• <strong>RB insert</strong>: at most 2 rotations. <strong>RB delete</strong>: at most 3 rotations.</li>
			<li>• <strong>B-Tree of order m</strong>: ⌈m/2⌉ to m children. Standard for databases (height ~3 for billions).</li>
			<li>• <strong>B+ Tree</strong>: data only in leaves, leaves linked → fast range queries. Used by MySQL, PostgreSQL.</li>
			<li>• AVL = best search. RB = best insert/delete balance. B-Tree = best for disk.</li>
		</ul>
	</div>
</section>
`;
