export const theoryHTML = `
<section class="theory-section" id="avl-intro">
	<h2>1. Why AVL Trees?</h2>
	<div class="definition-box">
		<strong>Problem:</strong> A regular BST can become <strong>skewed</strong> (height = n) if elements are inserted in sorted order. All operations degrade to O(n).<br><br>
		<strong>AVL Tree:</strong> A <strong>self-balancing BST</strong> invented by Adelson-Velsky and Landis (1962). For every node, the <strong>balance factor</strong> (height of left subtree − height of right subtree) is <strong>-1, 0, or +1</strong>. If an insertion or deletion violates this, the tree performs <strong>rotations</strong> to rebalance.
	</div>

<pre><code>// Balance Factor = height(left) - height(right)
// BF must be: -1, 0, or +1 for every node

//      30 (BF=0)        Valid AVL
//     /  \\
//   20    40
//  (0)   (0)

//      30 (BF=2!)       INVALID — left-heavy
//     /
//   20
//  /
// 10                    Needs rotation to fix!</code></pre>

	<h3>AVL Guarantees</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Property</th>
				<th class="text-left p-2 text-gray-400">Regular BST</th>
				<th class="text-left p-2 text-gray-400">AVL Tree</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Height</td><td class="p-2">O(n) worst</td><td class="p-2">O(log n) always</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Search</td><td class="p-2">O(n) worst</td><td class="p-2">O(log n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert</td><td class="p-2">O(n) worst</td><td class="p-2">O(log n)</td></tr>
			<tr><td class="p-2">Delete</td><td class="p-2">O(n) worst</td><td class="p-2">O(log n)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="avl-node">
	<h2>2. AVL Node Structure</h2>
<pre><code>struct AVLNode {
    int data;
    AVLNode *left, *right;
    int height;  // store height for O(1) balance factor computation
};

int getHeight(AVLNode *node) {
    return node ? node-&gt;height : -1;
}

int getBalanceFactor(AVLNode *node) {
    if (!node) return 0;
    return getHeight(node-&gt;left) - getHeight(node-&gt;right);
}

void updateHeight(AVLNode *node) {
    node-&gt;height = 1 + max(getHeight(node-&gt;left), getHeight(node-&gt;right));
}

AVLNode* createNode(int val) {
    return new AVLNode{val, nullptr, nullptr, 0};
}</code></pre>
</section>

<section class="theory-section" id="rotations">
	<h2>3. The Four Rotations</h2>
	<div class="definition-box">
		<strong>Rotations</strong> are the mechanism AVL trees use to rebalance. There are <strong>4 cases</strong> based on where the imbalance occurs. Each is fixed by one or two rotations.
	</div>

	<h3>Case 1: LL (Left-Left) — Right Rotation</h3>
<pre><code>// Imbalance at node, caused by insertion into LEFT child's LEFT subtree
//
//       30 (BF=2)          20
//      /              →   /  \\
//    20                 10    30
//   /
//  10
//
// Fix: Single RIGHT rotation at 30

AVLNode* rightRotate(AVLNode *y) {
    AVLNode *x = y-&gt;left;
    AVLNode *T2 = x-&gt;right;
    
    // Rotate
    x-&gt;right = y;
    y-&gt;left = T2;
    
    // Update heights (y first, then x)
    updateHeight(y);
    updateHeight(x);
    
    return x;  // x is the new root
}</code></pre>

	<h3>Case 2: RR (Right-Right) — Left Rotation</h3>
<pre><code>// Imbalance caused by insertion into RIGHT child's RIGHT subtree
//
//  10 (BF=-2)              20
//    \\                →   /  \\
//     20                 10    30
//      \\
//       30
//
// Fix: Single LEFT rotation at 10

AVLNode* leftRotate(AVLNode *x) {
    AVLNode *y = x-&gt;right;
    AVLNode *T2 = y-&gt;left;
    
    // Rotate
    y-&gt;left = x;
    x-&gt;right = T2;
    
    // Update heights
    updateHeight(x);
    updateHeight(y);
    
    return y;  // y is the new root
}</code></pre>

	<h3>Case 3: LR (Left-Right) — Left then Right</h3>
<pre><code>// Imbalance caused by insertion into LEFT child's RIGHT subtree
//
//     30 (BF=2)        30          25
//    /            →   /       →   /  \\
//  20               25          20    30
//    \\             /
//     25          20
//
// Fix: Left rotate at 20, then right rotate at 30

// In code: if BF &gt; 1 and key &gt; node-&gt;left-&gt;data
//   node-&gt;left = leftRotate(node-&gt;left);  // make it LL
//   return rightRotate(node);              // fix LL</code></pre>

	<h3>Case 4: RL (Right-Left) — Right then Left</h3>
<pre><code>// Imbalance caused by insertion into RIGHT child's LEFT subtree
//
//  10 (BF=-2)      10              15
//    \\          →     \\       →   /  \\
//     20              15        10    20
//    /                  \\
//   15                   20
//
// Fix: Right rotate at 20, then left rotate at 10

// In code: if BF &lt; -1 and key &lt; node-&gt;right-&gt;data
//   node-&gt;right = rightRotate(node-&gt;right);  // make it RR
//   return leftRotate(node);                  // fix RR</code></pre>

	<h3>Rotation Summary</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Case</th>
				<th class="text-left p-2 text-gray-400">BF of Node</th>
				<th class="text-left p-2 text-gray-400">BF of Child</th>
				<th class="text-left p-2 text-gray-400">Fix</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">LL</td><td class="p-2">+2</td><td class="p-2">+1 or 0</td><td class="p-2">Right rotate</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">LR</td><td class="p-2">+2</td><td class="p-2">-1</td><td class="p-2">Left rotate child, then right rotate</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2 font-bold">RR</td><td class="p-2">-2</td><td class="p-2">-1 or 0</td><td class="p-2">Left rotate</td></tr>
			<tr><td class="p-2 font-bold">RL</td><td class="p-2">-2</td><td class="p-2">+1</td><td class="p-2">Right rotate child, then left rotate</td></tr>
		</tbody>
	</table>

	<div class="important-box">
		<strong>Memory Trick:</strong> If the imbalance path is <strong>straight</strong> (LL or RR) → single rotation. If it <strong>zigzags</strong> (LR or RL) → double rotation (first straighten, then fix).
	</div>
</section>

<section class="theory-section" id="avl-insert">
	<h2>4. AVL Insertion</h2>
<pre><code>AVLNode* insert(AVLNode *node, int key) {
    // 1. Normal BST insert
    if (!node) return createNode(key);
    if (key &lt; node-&gt;data)
        node-&gt;left = insert(node-&gt;left, key);
    else if (key &gt; node-&gt;data)
        node-&gt;right = insert(node-&gt;right, key);
    else
        return node;  // no duplicates
    
    // 2. Update height
    updateHeight(node);
    
    // 3. Get balance factor
    int bf = getBalanceFactor(node);
    
    // 4. Fix imbalance (4 cases)
    
    // LL Case
    if (bf &gt; 1 &amp;&amp; key &lt; node-&gt;left-&gt;data)
        return rightRotate(node);
    
    // RR Case
    if (bf &lt; -1 &amp;&amp; key &gt; node-&gt;right-&gt;data)
        return leftRotate(node);
    
    // LR Case
    if (bf &gt; 1 &amp;&amp; key &gt; node-&gt;left-&gt;data) {
        node-&gt;left = leftRotate(node-&gt;left);
        return rightRotate(node);
    }
    
    // RL Case
    if (bf &lt; -1 &amp;&amp; key &lt; node-&gt;right-&gt;data) {
        node-&gt;right = rightRotate(node-&gt;right);
        return leftRotate(node);
    }
    
    return node;  // balanced — no rotation needed
}

// Insert 10, 20, 30 into AVL:
// Insert 10: [10]
// Insert 20: [10, 20]  — balanced
// Insert 30: [10, 20, 30] — BF(10)=-2, RR case!
//   Left rotate at 10 → [20, 10, 30] — balanced!</code></pre>
</section>

<section class="theory-section" id="avl-delete">
	<h2>5. AVL Deletion</h2>
<pre><code>AVLNode* findMin(AVLNode *node) {
    while (node-&gt;left) node = node-&gt;left;
    return node;
}

AVLNode* deleteNode(AVLNode *root, int key) {
    // 1. Standard BST delete
    if (!root) return nullptr;
    
    if (key &lt; root-&gt;data)
        root-&gt;left = deleteNode(root-&gt;left, key);
    else if (key &gt; root-&gt;data)
        root-&gt;right = deleteNode(root-&gt;right, key);
    else {
        if (!root-&gt;left || !root-&gt;right) {
            AVLNode *temp = root-&gt;left ? root-&gt;left : root-&gt;right;
            if (!temp) { temp = root; root = nullptr; }
            else *root = *temp;
            delete temp;
        } else {
            AVLNode *succ = findMin(root-&gt;right);
            root-&gt;data = succ-&gt;data;
            root-&gt;right = deleteNode(root-&gt;right, succ-&gt;data);
        }
    }
    
    if (!root) return nullptr;
    
    // 2. Update height
    updateHeight(root);
    
    // 3. Rebalance (same 4 cases, but use BF of children)
    int bf = getBalanceFactor(root);
    
    // LL
    if (bf &gt; 1 &amp;&amp; getBalanceFactor(root-&gt;left) &gt;= 0)
        return rightRotate(root);
    // LR
    if (bf &gt; 1 &amp;&amp; getBalanceFactor(root-&gt;left) &lt; 0) {
        root-&gt;left = leftRotate(root-&gt;left);
        return rightRotate(root);
    }
    // RR
    if (bf &lt; -1 &amp;&amp; getBalanceFactor(root-&gt;right) &lt;= 0)
        return leftRotate(root);
    // RL
    if (bf &lt; -1 &amp;&amp; getBalanceFactor(root-&gt;right) &gt; 0) {
        root-&gt;right = rightRotate(root-&gt;right);
        return leftRotate(root);
    }
    
    return root;
}

// Key difference from insertion:
// Insertion needs at most ONE rotation (fixes the first imbalance)
// Deletion may need rotations all the way up to the root!</code></pre>
</section>

<section class="theory-section" id="avl-height">
	<h2>6. AVL Tree Height Analysis</h2>
<pre><code>// Minimum nodes for an AVL tree of height h:
// N(h) = N(h-1) + N(h-2) + 1
// N(0) = 1, N(1) = 2
// This is related to Fibonacci numbers!

// h=0: 1 node      h=3: 7 nodes
// h=1: 2 nodes     h=4: 12 nodes
// h=2: 4 nodes     h=5: 20 nodes

// Maximum height for n nodes: ~1.44 * log₂(n)
// So AVL height is at most 44% more than perfect balance
// Still O(log n) — guaranteed!

// Comparison:
// Perfect binary tree of height h: 2^(h+1) - 1 nodes
// AVL tree of height h: at least ~Fib(h+3) - 1 nodes
// BST (worst): n nodes can have height n-1</code></pre>
</section>

<section class="theory-section" id="avl-vs-rb">
	<h2>7. AVL vs Red-Black Trees</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">AVL Tree</th>
				<th class="text-left p-2 text-gray-400">Red-Black Tree</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Balance</td><td class="p-2">Strictly balanced (BF: -1,0,1)</td><td class="p-2">Loosely balanced (color rules)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Height</td><td class="p-2">≤ 1.44 log n (tighter)</td><td class="p-2">≤ 2 log n (looser)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Search</td><td class="p-2">Faster (shorter height)</td><td class="p-2">Slightly slower</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert/Delete</td><td class="p-2">More rotations</td><td class="p-2">Fewer rotations</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Used in</td><td class="p-2">Databases, read-heavy</td><td class="p-2">C++ map/set, Java TreeMap, Linux kernel</td></tr>
			<tr><td class="p-2">Best for</td><td class="p-2">Lookup-intensive apps</td><td class="p-2">Insert/delete-intensive apps</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>AVL = self-balancing BST</strong>. Balance factor |BF| ≤ 1 at every node.</li>
			<li>• <strong>BF = height(left) - height(right)</strong>. BF of +2 or -2 triggers rotation.</li>
			<li>• <strong>4 rotation cases</strong>: LL (right rotate), RR (left rotate), LR (left-right), RL (right-left).</li>
			<li>• <strong>Straight path → single rotation. Zigzag → double rotation.</strong></li>
			<li>• <strong>Height ≤ 1.44 log n</strong> — all operations guaranteed O(log n).</li>
			<li>• Insert: BST insert + update heights + at most 1 rotation.</li>
			<li>• Delete: BST delete + update heights + may need rotations up to root.</li>
			<li>• AVL = better for searches. Red-Black = better for frequent inserts/deletes.</li>
		</ul>
	</div>
</section>
`;
