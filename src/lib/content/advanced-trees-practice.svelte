<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Advanced Trees</h2>
		<p class="text-gray-400">Explore 2-3 trees, Red-Black tree concepts, and B-Tree operations.</p>
	</div>

	<div>
		<h3>Practice 1: Simulate 2-3 Tree Insertion</h3>
		<p class="text-gray-400 text-sm mb-3">Trace 2-3 tree insertion with splitting. Nodes hold 1-2 keys.</p>
		<CodePlayground
			title="2-3 Tree Insertion Simulation"
			initialCode={`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Simplified 2-3 node simulation
struct Node23 {
    vector<int> keys;    // 1 or 2 keys
    vector<Node23*> children;  // 0 (leaf) or 2-3 children
    bool isLeaf() { return children.empty(); }
};

void display(Node23 *node, int depth = 0) {
    if (!node) return;
    string indent(depth * 4, ' ');
    cout << indent << "[";
    for (int i = 0; i < (int)node->keys.size(); i++) {
        if (i > 0) cout << "|";
        cout << node->keys[i];
    }
    cout << "]" << endl;
    for (auto c : node->children)
        display(c, depth + 1);
}

int main() {
    // Manual simulation of 2-3 tree insertion:
    // Insert: 10, 20, 30, 40, 50, 60, 70

    cout << "=== 2-3 Tree Insertion Trace ===" << endl;

    cout << "\\nInsert 10: [10]" << endl;
    cout << "Insert 20: [10|20]  (2-node becomes 3-node)" << endl;

    cout << "\\nInsert 30: [10|20|30] OVERFLOW! Split:" << endl;
    cout << "  Middle (20) goes up → new root" << endl;
    cout << "      [20]" << endl;
    cout << "     /    \\\\" << endl;
    cout << "   [10]  [30]" << endl;

    cout << "\\nInsert 40: 40 > 20, go right → [30] becomes [30|40]" << endl;
    cout << "      [20]" << endl;
    cout << "     /    \\\\" << endl;
    cout << "   [10]  [30|40]" << endl;

    cout << "\\nInsert 50: 50 > 20, go right → [30|40|50] OVERFLOW! Split:" << endl;
    cout << "  Middle (40) goes up to parent → [20|40]" << endl;
    cout << "       [20|40]" << endl;
    cout << "      /   |   \\\\" << endl;
    cout << "   [10] [30]  [50]" << endl;

    cout << "\\nInsert 60: go to [50] → [50|60]" << endl;
    cout << "Insert 70: go to [50|60|70] OVERFLOW! Split:" << endl;
    cout << "  Middle (60) goes up → [20|40|60] OVERFLOW at root! Split:" << endl;
    cout << "  Middle (40) becomes new root:" << endl;
    cout << "          [40]" << endl;
    cout << "         /    \\\\" << endl;
    cout << "      [20]    [60]" << endl;
    cout << "      / \\\\    / \\\\" << endl;
    cout << "   [10] [30] [50] [70]" << endl;

    cout << "\\n** Tree grows from TOP — all leaves at same level! **" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Red-Black Tree Properties Checker</h3>
		<p class="text-gray-400 text-sm mb-3">Verify all 5 Red-Black tree properties on a given tree.</p>
		<CodePlayground
			title="Red-Black Tree Property Verification"
			initialCode={`#include <iostream>
using namespace std;

struct RBNode {
    int data;
    bool isRed;
    RBNode *left, *right;
};

RBNode* cn(int d, bool red, RBNode* l = nullptr, RBNode* r = nullptr) {
    return new RBNode{d, red, l, r};
}

// Check: no two consecutive red nodes
bool noConsecutiveReds(RBNode *node, bool parentRed = false) {
    if (!node) return true;
    if (parentRed && node->isRed) {
        cout << "  VIOLATION: consecutive reds at " << node->data << endl;
        return false;
    }
    return noConsecutiveReds(node->left, node->isRed) &&
           noConsecutiveReds(node->right, node->isRed);
}

// Check: all paths have same black-height
int blackHeight(RBNode *node) {
    if (!node) return 1;  // NULL counts as black
    int lh = blackHeight(node->left);
    int rh = blackHeight(node->right);
    if (lh == -1 || rh == -1 || lh != rh) {
        if (lh != rh && lh != -1 && rh != -1)
            cout << "  VIOLATION: unequal black-height at " << node->data
                 << " (left=" << lh << ", right=" << rh << ")" << endl;
        return -1;
    }
    return lh + (node->isRed ? 0 : 1);
}

bool isValidRBTree(RBNode *root) {
    bool valid = true;
    // Property 2: root is black
    if (root && root->isRed) {
        cout << "  VIOLATION: root is red!" << endl;
        valid = false;
    }
    // Property 4: no consecutive reds
    if (!noConsecutiveReds(root)) valid = false;
    // Property 5: equal black-height
    if (blackHeight(root) == -1) valid = false;
    return valid;
}

void printTree(RBNode *r, string p = "", bool l = true) {
    if (!r) return;
    cout << p << (l ? "├── " : "└── ") << r->data
         << (r->isRed ? "(R)" : "(B)") << endl;
    printTree(r->left, p + (l ? "│   " : "    "), true);
    printTree(r->right, p + (l ? "│   " : "    "), false);
}

int main() {
    // Valid Red-Black Tree
    RBNode *valid = cn(13, false,
        cn(8, true,
            cn(1, false, nullptr, cn(6, true)),
            cn(11, false)),
        cn(17, true,
            cn(15, false),
            cn(25, false, cn(22, true), nullptr))
    );

    cout << "Tree 1 (valid):" << endl;
    printTree(valid, "", false);
    cout << (isValidRBTree(valid) ? "VALID RB Tree!" : "INVALID!") << endl;

    // Invalid: two consecutive reds
    RBNode *invalid = cn(10, false,
        cn(5, true,
            cn(3, true), nullptr),  // 5(R)->3(R) violation!
        cn(15, false)
    );

    cout << "\\nTree 2 (invalid):" << endl;
    printTree(invalid, "", false);
    cout << (isValidRBTree(invalid) ? "VALID RB Tree!" : "INVALID!") << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: 2-3-4 to Red-Black Conversion</h3>
		<p class="text-gray-400 text-sm mb-3">See how 2-3-4 tree nodes map to Red-Black tree nodes.</p>
		<CodePlayground
			title="2-3-4 ↔ Red-Black Mapping"
			initialCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== 2-3-4 Node to Red-Black Mapping ===\\n" << endl;

    cout << "1. 2-node [a] → Single black node" << endl;
    cout << "   [a]  →  (aB)" << endl;

    cout << "\\n2. 3-node [a|b] → Two arrangements:" << endl;
    cout << "   Left-leaning:     Right-leaning:" << endl;
    cout << "      (bB)              (aB)" << endl;
    cout << "      /                    \\\\" << endl;
    cout << "    (aR)                  (bR)" << endl;

    cout << "\\n3. 4-node [a|b|c] → Black with two red children" << endl;
    cout << "        (bB)" << endl;
    cout << "       /    \\\\" << endl;
    cout << "     (aR)  (cR)" << endl;

    cout << "\\n=== Example Conversion ===" << endl;
    cout << "\\n2-3-4 Tree:" << endl;
    cout << "           [40]" << endl;
    cout << "          /    \\\\" << endl;
    cout << "      [20]    [50|60|70]" << endl;
    cout << "      / \\\\    /   |    \\\\" << endl;
    cout << "   [10] [30] [45] [55] [80]" << endl;

    cout << "\\nRed-Black equivalent:" << endl;
    cout << "           (40B)" << endl;
    cout << "          /      \\\\" << endl;
    cout << "       (20B)    (60B)       ← 4-node [50|60|70]" << endl;
    cout << "       /  \\\\    /    \\\\" << endl;
    cout << "    (10B)(30B)(50R) (70R)   ← 50,70 are red children" << endl;
    cout << "              /       \\\\" << endl;
    cout << "           (45B)    (80B)" << endl;

    cout << "\\n** Every 4-node becomes black parent + 2 red children **" << endl;
    cout << "** No two consecutive reds → no 5-nodes in 2-3-4 **" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: B-Tree Order & Properties Calculator</h3>
		<p class="text-gray-400 text-sm mb-3">Calculate B-Tree properties: min/max keys, height for given data size.</p>
		<CodePlayground
			title="B-Tree Properties Calculator"
			initialCode={`#include <iostream>
#include <cmath>
using namespace std;

void btreeProperties(int order) {
    int minChildren = (order + 1) / 2;  // ceil(m/2)
    int maxChildren = order;
    int minKeys = minChildren - 1;
    int maxKeys = maxChildren - 1;

    cout << "=== B-Tree of Order " << order << " ===" << endl;
    cout << "Max children per node: " << maxChildren << endl;
    cout << "Max keys per node: " << maxKeys << endl;
    cout << "Min children (non-root): " << minChildren << endl;
    cout << "Min keys (non-root): " << minKeys << endl;
    cout << endl;

    // Height for various data sizes
    cout << "Height for n records:" << endl;
    int sizes[] = {100, 1000, 10000, 100000, 1000000, 1000000000};
    for (int n : sizes) {
        double h = ceil(log(n + 1) / log(order)) - 1;
        double hMin = ceil(log(n + 1) / log(minChildren)) - 1;
        if (h < 0) h = 0;
        cout << "  n=" << n << " -> height ~" << (int)h
             << " to " << (int)hMin << " levels" << endl;
    }
    cout << endl;
}

int main() {
    btreeProperties(3);   // 2-3 tree
    btreeProperties(4);   // 2-3-4 tree
    btreeProperties(100);  // realistic disk-based
    btreeProperties(1000); // high-order (database)

    cout << "=== Key Insight ===" << endl;
    cout << "B-Tree of order 1000 with 1 BILLION keys:" << endl;
    cout << "Height = ~3 levels = only 3 disk reads!" << endl;
    cout << "Binary tree would need ~30 levels!" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: std::map (Red-Black Tree in C++ STL)</h3>
		<p class="text-gray-400 text-sm mb-3">C++ std::map is implemented as a Red-Black tree. See it in action.</p>
		<CodePlayground
			title="std::map — Red-Black Tree Under the Hood"
			initialCode={`#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    // std::map is a Red-Black tree!
    map<int, string> m;

    // Insert — O(log n) guaranteed
    m[50] = "fifty";
    m[30] = "thirty";
    m[70] = "seventy";
    m[20] = "twenty";
    m[40] = "forty";
    m[60] = "sixty";
    m[80] = "eighty";

    // Iteration gives SORTED order (inorder traversal of RB tree)
    cout << "Map contents (sorted by key):" << endl;
    for (auto &[key, val] : m)
        cout << "  " << key << " -> " << val << endl;

    // Search — O(log n)
    cout << "\\nSearch for 40: " << m[40] << endl;
    cout << "Contains 55? " << (m.count(55) ? "Yes" : "No") << endl;

    // Lower/upper bound — O(log n)
    auto it = m.lower_bound(35);
    cout << "\\nLower bound of 35: " << it->first << endl;
    it = m.upper_bound(50);
    cout << "Upper bound of 50: " << it->first << endl;

    // Delete — O(log n)
    m.erase(30);
    cout << "\\nAfter erasing 30:" << endl;
    for (auto &[key, val] : m)
        cout << "  " << key << " -> " << val << endl;

    cout << "\\n** All operations O(log n) — Red-Black tree guarantees! **" << endl;

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Trace 2-3 Tree Deletion</h3>
		<p class="text-gray-400 text-sm mb-3">Given a 2-3 tree, trace what happens when you delete a value. Think about borrowing and merging.</p>
		<CodePlayground
			title="2-3 Tree Deletion Trace — Think It Through"
			initialCode={`#include <iostream>
using namespace std;

int main() {
    cout << "Starting 2-3 Tree:" << endl;
    cout << "       [40]" << endl;
    cout << "      /    \\\\" << endl;
    cout << "   [20]    [60]" << endl;
    cout << "   / \\\\    / \\\\" << endl;
    cout << " [10] [30] [50] [70]" << endl;

    cout << "\\n=== DELETE 70 ===" << endl;
    cout << "70 is a leaf in a 2-node → UNDERFLOW!" << endl;
    cout << "Sibling [50] is also a 2-node → MERGE" << endl;
    cout << "TODO: What does the tree look like after?" << endl;
    cout << "Hint: [50] and [70] merge with parent key [60]" << endl;

    cout << "\\n=== DELETE 30 ===" << endl;
    cout << "From the result above, delete 30." << endl;
    cout << "TODO: Trace the borrow or merge operation." << endl;

    cout << "\\n** Work this out on paper first! **" << endl;
    cout << "** Key rules: **" << endl;
    cout << "** 1. If sibling has 2 keys (3-node), BORROW through parent **" << endl;
    cout << "** 2. If sibling has 1 key (2-node), MERGE with sibling **" << endl;
    cout << "** 3. Merge may cascade upward **" << endl;

    return 0;
}`}
		/>
	</div>
</div>
