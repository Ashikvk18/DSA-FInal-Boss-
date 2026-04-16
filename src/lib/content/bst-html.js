export const theoryHTML = `
<section class="theory-section" id="bst-intro">
	<h2>1. What is a Binary Search Tree (BST)?</h2>
	<div class="definition-box">
		<strong>BST Property:</strong> For every node, <strong>all values in the left subtree are smaller</strong>, and <strong>all values in the right subtree are larger</strong>. This ordering enables O(log n) search, insert, and delete on <strong>balanced</strong> trees.
	</div>

<pre><code>//        30           BST Property at every node:
//       /  \\          Left &lt; Root &lt; Right
//     20    40
//    / \\   / \\        20 &lt; 30 &lt; 40  ✓
//   10  25 35  50     10 &lt; 20 &lt; 25  ✓
//                     35 &lt; 40 &lt; 50  ✓

// NOT a BST:
//        30
//       /  \\
//     20    40
//    / \\
//   10  35    ← 35 is in left subtree of 30 but 35 &gt; 30! INVALID

// Key property: Inorder traversal of BST gives SORTED order
// Inorder of above BST: 10 20 25 30 35 40 50</code></pre>

	<h3>Why BST?</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Operation</th>
				<th class="text-left p-2 text-gray-400">Array (sorted)</th>
				<th class="text-left p-2 text-gray-400">Linked List</th>
				<th class="text-left p-2 text-gray-400">BST (balanced)</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Search</td><td class="p-2">O(log n)</td><td class="p-2">O(n)</td><td class="p-2">O(log n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert</td><td class="p-2">O(n)</td><td class="p-2">O(1)*</td><td class="p-2">O(log n)</td></tr>
			<tr><td class="p-2">Delete</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td><td class="p-2">O(log n)</td></tr>
		</tbody>
	</table>
	<p class="text-sm text-gray-500 mt-1">BST combines the fast search of sorted arrays with the fast insert/delete of linked lists.</p>
</section>

<section class="theory-section" id="bst-search">
	<h2>2. Search in BST — O(h)</h2>
<pre><code>// Start at root, compare key with current node:
// key == data → FOUND
// key &lt; data  → go LEFT
// key &gt; data  → go RIGHT
// reach NULL  → NOT FOUND

// Recursive
Node* search(Node *root, int key) {
    if (root == nullptr) return nullptr;     // not found
    if (key == root-&gt;data) return root;      // found!
    if (key &lt; root-&gt;data) return search(root-&gt;left, key);
    return search(root-&gt;right, key);
}

// Iterative (preferred — no stack overhead)
Node* searchIterative(Node *root, int key) {
    while (root != nullptr) {
        if (key == root-&gt;data) return root;
        else if (key &lt; root-&gt;data) root = root-&gt;left;
        else root = root-&gt;right;
    }
    return nullptr;
}

// Time: O(h) where h = height
// Balanced BST: h = log n → O(log n)
// Skewed BST: h = n → O(n) — worst case!</code></pre>
</section>

<section class="theory-section" id="bst-insert">
	<h2>3. Insert in BST — O(h)</h2>
<pre><code>// New nodes are ALWAYS inserted as LEAVES
// Search for the correct position, then create node there

// Recursive
Node* insert(Node *root, int key) {
    if (root == nullptr) {
        return new Node{key, nullptr, nullptr};
    }
    if (key &lt; root-&gt;data)
        root-&gt;left = insert(root-&gt;left, key);
    else if (key &gt; root-&gt;data)
        root-&gt;right = insert(root-&gt;right, key);
    // if key == root-&gt;data, duplicate — ignore
    return root;
}

// Iterative
Node* insertIterative(Node *root, int key) {
    Node *newNode = new Node{key, nullptr, nullptr};
    if (root == nullptr) return newNode;
    
    Node *curr = root, *parent = nullptr;
    while (curr != nullptr) {
        parent = curr;
        if (key &lt; curr-&gt;data) curr = curr-&gt;left;
        else if (key &gt; curr-&gt;data) curr = curr-&gt;right;
        else return root;  // duplicate
    }
    
    if (key &lt; parent-&gt;data) parent-&gt;left = newNode;
    else parent-&gt;right = newNode;
    
    return root;
}

// Build BST from array: insert each element
// [30, 20, 40, 10, 25, 35, 50]
//        30
//       /  \\
//     20    40
//    / \\   / \\
//   10  25 35  50</code></pre>
</section>

<section class="theory-section" id="bst-delete">
	<h2>4. Delete from BST — O(h)</h2>
	<div class="definition-box">
		<strong>Three cases for deleting a node:</strong><br>
		<strong>Case 1:</strong> Node is a <strong>leaf</strong> — simply remove it<br>
		<strong>Case 2:</strong> Node has <strong>one child</strong> — replace node with its child<br>
		<strong>Case 3:</strong> Node has <strong>two children</strong> — replace with <strong>inorder successor</strong> (smallest in right subtree) or <strong>inorder predecessor</strong> (largest in left subtree)
	</div>

<pre><code>// Find minimum in a subtree (leftmost node)
Node* findMin(Node *root) {
    while (root-&gt;left != nullptr)
        root = root-&gt;left;
    return root;
}

// Find maximum in a subtree (rightmost node)
Node* findMax(Node *root) {
    while (root-&gt;right != nullptr)
        root = root-&gt;right;
    return root;
}

Node* deleteNode(Node *root, int key) {
    if (root == nullptr) return nullptr;
    
    // Search for the node
    if (key &lt; root-&gt;data)
        root-&gt;left = deleteNode(root-&gt;left, key);
    else if (key &gt; root-&gt;data)
        root-&gt;right = deleteNode(root-&gt;right, key);
    else {
        // FOUND the node to delete
        
        // Case 1: Leaf node
        if (root-&gt;left == nullptr &amp;&amp; root-&gt;right == nullptr) {
            delete root;
            return nullptr;
        }
        // Case 2: One child
        else if (root-&gt;left == nullptr) {
            Node *temp = root-&gt;right;
            delete root;
            return temp;
        }
        else if (root-&gt;right == nullptr) {
            Node *temp = root-&gt;left;
            delete root;
            return temp;
        }
        // Case 3: Two children
        else {
            // Replace with inorder successor (min of right subtree)
            Node *successor = findMin(root-&gt;right);
            root-&gt;data = successor-&gt;data;
            root-&gt;right = deleteNode(root-&gt;right, successor-&gt;data);
        }
    }
    return root;
}

// Example: Delete 20 from:
//        30                    30
//       /  \\      →          /  \\
//     20    40              25    40
//    / \\   / \\            /    / \\
//   10  25 35  50         10   35  50
// 20 has two children. Inorder successor = 25.
// Replace 20 with 25, delete original 25 (leaf).</code></pre>
</section>

<section class="theory-section" id="bst-properties">
	<h2>5. BST Properties &amp; Operations</h2>

	<h3>Inorder Traversal = Sorted Order</h3>
<pre><code>void inorder(Node *root) {
    if (!root) return;
    inorder(root-&gt;left);
    cout &lt;&lt; root-&gt;data &lt;&lt; " ";
    inorder(root-&gt;right);
}
// BST [10, 20, 25, 30, 35, 40, 50] — always sorted!</code></pre>

	<h3>Find Kth Smallest Element</h3>
<pre><code>// Inorder traversal, count to k
int kthSmallest(Node *root, int &amp;k) {
    if (!root) return -1;
    
    int left = kthSmallest(root-&gt;left, k);
    if (left != -1) return left;
    
    k--;
    if (k == 0) return root-&gt;data;
    
    return kthSmallest(root-&gt;right, k);
}
// kthSmallest(root, 3) on BST above → 25 (3rd smallest)</code></pre>

	<h3>Check if Binary Tree is a BST</h3>
<pre><code>// Method: use range checking (min, max bounds)
bool isBST(Node *root, int minVal, int maxVal) {
    if (!root) return true;
    if (root-&gt;data &lt;= minVal || root-&gt;data &gt;= maxVal)
        return false;
    return isBST(root-&gt;left, minVal, root-&gt;data) &amp;&amp;
           isBST(root-&gt;right, root-&gt;data, maxVal);
}
// Usage: isBST(root, INT_MIN, INT_MAX)

// Alternative: do inorder traversal and check if sorted</code></pre>

	<h3>Lowest Common Ancestor (LCA)</h3>
<pre><code>// In BST, LCA is where the two values split
Node* lca(Node *root, int a, int b) {
    if (!root) return nullptr;
    if (a &lt; root-&gt;data &amp;&amp; b &lt; root-&gt;data)
        return lca(root-&gt;left, a, b);     // both in left
    if (a &gt; root-&gt;data &amp;&amp; b &gt; root-&gt;data)
        return lca(root-&gt;right, a, b);    // both in right
    return root;  // split point = LCA!
}
// LCA(10, 25) in BST rooted at 30 → 20
// LCA(10, 50) → 30 (root)</code></pre>

	<h3>Floor and Ceil</h3>
<pre><code>// Floor: largest value ≤ key
// Ceil: smallest value ≥ key

int floor(Node *root, int key) {
    int result = -1;
    while (root) {
        if (root-&gt;data == key) return key;
        if (root-&gt;data &lt; key) {
            result = root-&gt;data;  // candidate for floor
            root = root-&gt;right;
        } else {
            root = root-&gt;left;
        }
    }
    return result;
}

int ceil(Node *root, int key) {
    int result = -1;
    while (root) {
        if (root-&gt;data == key) return key;
        if (root-&gt;data &gt; key) {
            result = root-&gt;data;  // candidate for ceil
            root = root-&gt;left;
        } else {
            root = root-&gt;right;
        }
    }
    return result;
}</code></pre>
</section>

<section class="theory-section" id="bst-from-preorder">
	<h2>6. Generate BST from Preorder</h2>
<pre><code>// Given preorder of a BST, reconstruct the tree
// Key insight: first element is root. Elements smaller go left,
// larger go right. Use range (min, max) to determine subtree bounds.

Node* buildBSTFromPreorder(int pre[], int &amp;idx, int n, int minVal, int maxVal) {
    if (idx &gt;= n || pre[idx] &lt; minVal || pre[idx] &gt; maxVal)
        return nullptr;
    
    Node *root = new Node{pre[idx++], nullptr, nullptr};
    root-&gt;left = buildBSTFromPreorder(pre, idx, n, minVal, root-&gt;data);
    root-&gt;right = buildBSTFromPreorder(pre, idx, n, root-&gt;data, maxVal);
    return root;
}

// Preorder: [30, 20, 10, 25, 40, 35, 50]
// Root=30, left subtree values &lt; 30: [20,10,25]
// Right subtree values &gt; 30: [40,35,50]
// Recursively build each subtree

// Time: O(n) — each element processed once</code></pre>

	<div class="important-box">
		<strong>Note:</strong> For a <strong>BST</strong>, preorder alone is sufficient to reconstruct the tree (unlike general binary trees which need inorder + another). This is because the BST property provides the additional constraint needed.
	</div>
</section>

<section class="theory-section" id="balanced-vs-skewed">
	<h2>7. Balanced vs Skewed BST</h2>
<pre><code>// Inserting sorted data creates a SKEWED tree:
// Insert: 10, 20, 30, 40, 50
//   10
//    \\
//     20          Height = n-1 = 4
//      \\         All operations become O(n)!
//       30        This is basically a linked list.
//        \\
//         40
//          \\
//           50

// Inserting the same data in different order:
// Insert: 30, 20, 40, 10, 50
//        30
//       /  \\       Height = 2
//     20    40      Operations are O(log n)
//    /        \\
//   10         50

// Solution: Self-balancing BSTs (AVL, Red-Black)
// They automatically rebalance after insert/delete
// Guarantee height = O(log n)</code></pre>

	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">BST Type</th>
				<th class="text-left p-2 text-gray-400">Height</th>
				<th class="text-left p-2 text-gray-400">Search/Insert/Delete</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Balanced (AVL, RB)</td><td class="p-2">O(log n)</td><td class="p-2">O(log n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Random insertions</td><td class="p-2">~O(log n)</td><td class="p-2">~O(log n)</td></tr>
			<tr><td class="p-2">Skewed (sorted input)</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>BST property</strong>: left &lt; root &lt; right at every node. Inorder = sorted.</li>
			<li>• <strong>Search</strong>: compare and go left/right. O(h). Iterative preferred.</li>
			<li>• <strong>Insert</strong>: always insert as a leaf. Follow search path to find position. O(h).</li>
			<li>• <strong>Delete</strong>: 3 cases — leaf (remove), one child (replace), two children (replace with inorder successor).</li>
			<li>• <strong>Min</strong> = leftmost node. <strong>Max</strong> = rightmost node.</li>
			<li>• <strong>LCA</strong>: where two values split left/right. O(h).</li>
			<li>• <strong>Validate BST</strong>: range checking (min, max bounds) at each node.</li>
			<li>• <strong>From preorder</strong>: BST can be reconstructed from preorder alone (range-based).</li>
			<li>• <strong>Balanced h=O(log n)</strong> → fast. <strong>Skewed h=O(n)</strong> → slow. Use AVL/RB trees to guarantee balance.</li>
		</ul>
	</div>
</section>
`;
