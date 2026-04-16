export const theoryHTML = `
<section class="theory-section" id="tree-intro">
	<h2>1. What is a Tree?</h2>
	<div class="definition-box">
		<strong>Tree:</strong> A hierarchical data structure consisting of <strong>nodes</strong> connected by <strong>edges</strong>. It has a single <strong>root</strong> node at the top, and every other node has exactly <strong>one parent</strong> and zero or more <strong>children</strong>. Trees are non-linear — unlike arrays, lists, stacks, and queues.
	</div>

<pre><code>//        1          ← root (level 0)
//       / \\
//      2   3        ← level 1
//     / \\   \\
//    4   5   6      ← level 2 (leaves)

// Terminology:
// Root:     node with no parent (node 1)
// Leaf:     node with no children (nodes 4, 5, 6)
// Parent:   node directly above (2 is parent of 4, 5)
// Child:    node directly below (4, 5 are children of 2)
// Sibling:  nodes with same parent (4 and 5)
// Depth:    distance from root (root=0, node 4=2)
// Height:   longest path from node to a leaf (root height=2)
// Degree:   number of children (node 2 has degree 2)
// Subtree:  a node and all its descendants</code></pre>

	<h3>Key Properties</h3>
	<ul class="list-disc pl-6 text-gray-300 space-y-1">
		<li>A tree with <strong>n nodes</strong> has exactly <strong>n-1 edges</strong></li>
		<li>There is exactly <strong>one path</strong> between any two nodes</li>
		<li>Depth of root = 0. Height of tree = height of root</li>
		<li>Number of nodes at level L: at most <strong>2<sup>L</sup></strong> (for binary trees)</li>
	</ul>
</section>

<section class="theory-section" id="binary-tree">
	<h2>2. Binary Tree</h2>
	<div class="definition-box">
		<strong>Binary Tree:</strong> A tree where each node has <strong>at most 2 children</strong> — called <strong>left child</strong> and <strong>right child</strong>. The most commonly used tree structure in CS.
	</div>

<pre><code>struct Node {
    int data;
    Node *left;
    Node *right;
};

Node* createNode(int val) {
    Node *n = new Node();
    n-&gt;data = val;
    n-&gt;left = n-&gt;right = nullptr;
    return n;
}

// Build a tree manually:
//       1
//      / \\
//     2   3
//    / \\
//   4   5
Node *root = createNode(1);
root-&gt;left = createNode(2);
root-&gt;right = createNode(3);
root-&gt;left-&gt;left = createNode(4);
root-&gt;left-&gt;right = createNode(5);</code></pre>

	<h3>Types of Binary Trees</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Type</th>
				<th class="text-left p-2 text-gray-400">Definition</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">Full</td><td class="p-2">Every node has 0 or 2 children (never 1)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">Complete</td><td class="p-2">All levels filled except possibly the last, which is filled left to right</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">Perfect</td><td class="p-2">All internal nodes have 2 children AND all leaves at same level</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">Degenerate</td><td class="p-2">Every node has only 1 child (like a linked list)</td></tr>
			<tr><td class="p-2 font-bold">Balanced</td><td class="p-2">Height difference between left and right subtrees ≤ 1 (for every node)</td></tr>
		</tbody>
	</table>

<pre><code>// Perfect binary tree of height h:
// Nodes = 2^(h+1) - 1
// Leaves = 2^h
// Height h=3: 15 nodes, 8 leaves

// Complete binary tree with n nodes:
// Height = floor(log₂ n)
// Can be stored in an array (heap representation)</code></pre>
</section>

<section class="theory-section" id="traversals">
	<h2>3. Tree Traversals (Recursive)</h2>
	<div class="definition-box">
		<strong>Traversal:</strong> Visiting every node in a tree exactly once in a specific order. The three main depth-first traversals differ in <strong>when</strong> the root is visited relative to its subtrees.
	</div>

<pre><code>//        1
//       / \\
//      2   3
//     / \\   \\
//    4   5   6

// Preorder  (Root, Left, Right): 1 2 4 5 3 6
// Inorder   (Left, Root, Right): 4 2 5 1 3 6
// Postorder (Left, Right, Root): 4 5 2 6 3 1</code></pre>

	<h3>Preorder — Root First</h3>
<pre><code>// Visit root → traverse left → traverse right
void preorder(Node *root) {
    if (root == nullptr) return;
    cout &lt;&lt; root-&gt;data &lt;&lt; " ";   // VISIT
    preorder(root-&gt;left);          // LEFT
    preorder(root-&gt;right);         // RIGHT
}
// Use: create a copy of the tree, serialize tree to string</code></pre>

	<h3>Inorder — Root in Middle</h3>
<pre><code>// Traverse left → visit root → traverse right
void inorder(Node *root) {
    if (root == nullptr) return;
    inorder(root-&gt;left);           // LEFT
    cout &lt;&lt; root-&gt;data &lt;&lt; " ";   // VISIT
    inorder(root-&gt;right);          // RIGHT
}
// For BST: inorder gives SORTED order!</code></pre>

	<h3>Postorder — Root Last</h3>
<pre><code>// Traverse left → traverse right → visit root
void postorder(Node *root) {
    if (root == nullptr) return;
    postorder(root-&gt;left);         // LEFT
    postorder(root-&gt;right);        // RIGHT
    cout &lt;&lt; root-&gt;data &lt;&lt; " ";   // VISIT
}
// Use: delete tree (delete children before parent), evaluate expression tree</code></pre>

	<div class="important-box">
		<strong>Memory Trick:</strong> Pre = root <strong>first</strong>. In = root in <strong>middle</strong>. Post = root <strong>last</strong>. The "order" refers to when you process the root relative to Left and Right.
	</div>
</section>

<section class="theory-section" id="iterative-traversals">
	<h2>4. Iterative Traversals (Using Stack)</h2>

	<h3>Iterative Preorder</h3>
<pre><code>void preorderIterative(Node *root) {
    if (!root) return;
    stack&lt;Node*&gt; s;
    s.push(root);
    
    while (!s.empty()) {
        Node *curr = s.top(); s.pop();
        cout &lt;&lt; curr-&gt;data &lt;&lt; " ";
        
        // Push right first so left is processed first (LIFO)
        if (curr-&gt;right) s.push(curr-&gt;right);
        if (curr-&gt;left) s.push(curr-&gt;left);
    }
}</code></pre>

	<h3>Iterative Inorder</h3>
<pre><code>void inorderIterative(Node *root) {
    stack&lt;Node*&gt; s;
    Node *curr = root;
    
    while (curr || !s.empty()) {
        // Go as far left as possible
        while (curr) {
            s.push(curr);
            curr = curr-&gt;left;
        }
        // Process node
        curr = s.top(); s.pop();
        cout &lt;&lt; curr-&gt;data &lt;&lt; " ";
        // Go right
        curr = curr-&gt;right;
    }
}</code></pre>

	<h3>Iterative Postorder (Two Stacks)</h3>
<pre><code>void postorderIterative(Node *root) {
    if (!root) return;
    stack&lt;Node*&gt; s1, s2;
    s1.push(root);
    
    while (!s1.empty()) {
        Node *curr = s1.top(); s1.pop();
        s2.push(curr);
        if (curr-&gt;left) s1.push(curr-&gt;left);
        if (curr-&gt;right) s1.push(curr-&gt;right);
    }
    
    while (!s2.empty()) {
        cout &lt;&lt; s2.top()-&gt;data &lt;&lt; " ";
        s2.pop();
    }
}</code></pre>
</section>

<section class="theory-section" id="level-order">
	<h2>5. Level Order Traversal (BFS)</h2>
	<div class="definition-box">
		<strong>Level Order:</strong> Visit nodes level by level, left to right. Uses a <strong>queue</strong> (BFS). This is how you'd read a tree "row by row".
	</div>

<pre><code>void levelOrder(Node *root) {
    if (!root) return;
    queue&lt;Node*&gt; q;
    q.push(root);
    
    while (!q.empty()) {
        Node *curr = q.front(); q.pop();
        cout &lt;&lt; curr-&gt;data &lt;&lt; " ";
        
        if (curr-&gt;left) q.push(curr-&gt;left);
        if (curr-&gt;right) q.push(curr-&gt;right);
    }
}

//        1
//       / \\
//      2   3       Level order: 1 2 3 4 5 6
//     / \\   \\
//    4   5   6</code></pre>

	<h3>Level Order with Level Separation</h3>
<pre><code>// Print each level on its own line
void levelOrderByLevel(Node *root) {
    if (!root) return;
    queue&lt;Node*&gt; q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();  // nodes in current level
        for (int i = 0; i &lt; levelSize; i++) {
            Node *curr = q.front(); q.pop();
            cout &lt;&lt; curr-&gt;data &lt;&lt; " ";
            if (curr-&gt;left) q.push(curr-&gt;left);
            if (curr-&gt;right) q.push(curr-&gt;right);
        }
        cout &lt;&lt; endl;  // new line after each level
    }
}
// Output:
// 1
// 2 3
// 4 5 6</code></pre>
</section>

<section class="theory-section" id="height-count">
	<h2>6. Height, Count, and Other Properties</h2>

<pre><code>// Height of tree — O(n)
int height(Node *root) {
    if (root == nullptr) return -1;  // empty tree height = -1
    int lh = height(root-&gt;left);
    int rh = height(root-&gt;right);
    return 1 + max(lh, rh);
}
// Some definitions use height=-1 for null, some use 0.
// With -1: single node has height 0, empty tree has height -1.

// Count nodes — O(n)
int countNodes(Node *root) {
    if (root == nullptr) return 0;
    return 1 + countNodes(root-&gt;left) + countNodes(root-&gt;right);
}

// Count leaf nodes — O(n)
int countLeaves(Node *root) {
    if (root == nullptr) return 0;
    if (root-&gt;left == nullptr &amp;&amp; root-&gt;right == nullptr)
        return 1;  // leaf!
    return countLeaves(root-&gt;left) + countLeaves(root-&gt;right);
}

// Sum of all nodes — O(n)
int sumNodes(Node *root) {
    if (root == nullptr) return 0;
    return root-&gt;data + sumNodes(root-&gt;left) + sumNodes(root-&gt;right);
}

// Check if two trees are identical
bool isIdentical(Node *a, Node *b) {
    if (a == nullptr &amp;&amp; b == nullptr) return true;
    if (a == nullptr || b == nullptr) return false;
    return (a-&gt;data == b-&gt;data) &amp;&amp;
           isIdentical(a-&gt;left, b-&gt;left) &amp;&amp;
           isIdentical(a-&gt;right, b-&gt;right);
}</code></pre>
</section>

<section class="theory-section" id="build-tree">
	<h2>7. Building a Tree from Traversals</h2>

	<h3>Build from Preorder + Inorder</h3>
<pre><code>// Given: Preorder = [1,2,4,5,3,6], Inorder = [4,2,5,1,3,6]
// Preorder first element = ROOT (1)
// Find 1 in Inorder: left of it = left subtree, right = right subtree
// Inorder: [4,2,5] | 1 | [3,6]
//           left        right

// Recursively build:
// Left subtree: preorder [2,4,5], inorder [4,2,5]
// Right subtree: preorder [3,6], inorder [3,6]

Node* buildTree(int pre[], int in[], int inStart, int inEnd, int &amp;preIdx) {
    if (inStart &gt; inEnd) return nullptr;
    
    Node *node = createNode(pre[preIdx++]);
    
    if (inStart == inEnd) return node;
    
    // Find root in inorder
    int inIdx;
    for (int i = inStart; i &lt;= inEnd; i++) {
        if (in[i] == node-&gt;data) { inIdx = i; break; }
    }
    
    node-&gt;left = buildTree(pre, in, inStart, inIdx-1, preIdx);
    node-&gt;right = buildTree(pre, in, inIdx+1, inEnd, preIdx);
    
    return node;
}</code></pre>

	<div class="important-box">
		<strong>Key Rule:</strong> You need <strong>two traversals</strong> to uniquely reconstruct a binary tree, and <strong>one must be inorder</strong>. Preorder + Inorder ✓, Postorder + Inorder ✓, but Preorder + Postorder ✗ (not unique without inorder).
	</div>
</section>

<section class="theory-section" id="array-representation">
	<h2>8. Array Representation of Binary Tree</h2>
<pre><code>// Store tree in an array (used by heaps)
// For node at index i (0-indexed):
//   Left child:  2*i + 1
//   Right child: 2*i + 2
//   Parent:      (i - 1) / 2

//        1
//       / \\
//      2   3        Array: [1, 2, 3, 4, 5, _, 6]
//     / \\   \\       Index:  0  1  2  3  4  5  6
//    4   5   6

// Node 2 (index 1): left child at 2*1+1=3 (node 4), right at 2*1+2=4 (node 5)
// Node 5 (index 4): parent at (4-1)/2=1 (node 2)

// Works perfectly for COMPLETE binary trees (no gaps)
// Sparse trees waste space (many empty slots)</code></pre>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Binary tree</strong>: each node has at most 2 children. n nodes → n-1 edges.</li>
			<li>• <strong>Types</strong>: full (0 or 2 children), complete (filled left to right), perfect (all leaves same level), balanced (height diff ≤ 1).</li>
			<li>• <strong>Preorder</strong> (Root-L-R), <strong>Inorder</strong> (L-Root-R), <strong>Postorder</strong> (L-R-Root). All O(n).</li>
			<li>• <strong>Iterative traversals</strong> use a stack. Level order uses a <strong>queue</strong>.</li>
			<li>• <strong>Height</strong> = 1 + max(left height, right height). <strong>Count</strong> = 1 + left count + right count.</li>
			<li>• <strong>Reconstruct</strong>: need inorder + one other traversal. Preorder gives root first.</li>
			<li>• <strong>Array representation</strong>: left = 2i+1, right = 2i+2, parent = (i-1)/2. Used in heaps.</li>
			<li>• <strong>BST inorder</strong> gives sorted order — covered in the next module.</li>
		</ul>
	</div>
</section>
`;
