<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Binary Search Trees</h2>
		<p class="text-gray-400">Build BSTs, search, insert, delete, and solve classic BST problems.</p>
	</div>

	<div>
		<h3>Practice 1: Build BST & Inorder (Sorted Output)</h3>
		<p class="text-gray-400 text-sm mb-3">Insert elements into a BST and verify inorder gives sorted output.</p>
		<CodePlayground
			title="Build BST & Sorted Traversal"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *left, *right; };

Node* insert(Node *root, int key) {
    if (!root) return new Node{key, nullptr, nullptr};
    if (key < root->data) root->left = insert(root->left, key);
    else if (key > root->data) root->right = insert(root->right, key);
    return root;
}

void inorder(Node *root) {
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

int main() {
    int values[] = {30, 20, 40, 10, 25, 35, 50, 5, 15};
    int n = 9;
    Node *root = nullptr;

    cout << "Insertion order: ";
    for (int i = 0; i < n; i++) {
        cout << values[i] << " ";
        root = insert(root, values[i]);
    }
    cout << endl;

    cout << "Inorder (sorted): ";
    inorder(root);
    cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Search in BST</h3>
		<p class="text-gray-400 text-sm mb-3">Search for values and trace the path taken.</p>
		<CodePlayground
			title="BST Search with Path Tracing"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *left, *right; };

Node* insert(Node *r, int k) {
    if (!r) return new Node{k, nullptr, nullptr};
    if (k < r->data) r->left = insert(r->left, k);
    else if (k > r->data) r->right = insert(r->right, k);
    return r;
}

bool searchWithPath(Node *root, int key) {
    cout << "  Path: ";
    while (root) {
        cout << root->data;
        if (key == root->data) { cout << " [FOUND]" << endl; return true; }
        if (key < root->data) { cout << " -> L -> "; root = root->left; }
        else { cout << " -> R -> "; root = root->right; }
    }
    cout << "NULL [NOT FOUND]" << endl;
    return false;
}

int main() {
    Node *root = nullptr;
    int vals[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : vals) root = insert(root, v);

    cout << "BST: 50(root), 30, 70, 20, 40, 60, 80\\n" << endl;

    int searches[] = {40, 60, 25, 80, 55};
    for (int key : searches) {
        cout << "Search " << key << ":" << endl;
        searchWithPath(root, key);
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Delete from BST (All 3 Cases)</h3>
		<p class="text-gray-400 text-sm mb-3">Delete leaf, one-child, and two-child nodes. Watch the tree restructure.</p>
		<CodePlayground
			title="BST Deletion — 3 Cases"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *left, *right; };

Node* insert(Node *r, int k) {
    if (!r) return new Node{k, nullptr, nullptr};
    if (k < r->data) r->left = insert(r->left, k);
    else if (k > r->data) r->right = insert(r->right, k);
    return r;
}

void inorder(Node *r) {
    if (!r) return;
    inorder(r->left); cout << r->data << " "; inorder(r->right);
}

Node* findMin(Node *r) {
    while (r->left) r = r->left;
    return r;
}

Node* deleteNode(Node *root, int key) {
    if (!root) return nullptr;
    if (key < root->data) root->left = deleteNode(root->left, key);
    else if (key > root->data) root->right = deleteNode(root->right, key);
    else {
        // Case 1: Leaf
        if (!root->left && !root->right) {
            cout << "  (Deleting leaf " << key << ")" << endl;
            delete root; return nullptr;
        }
        // Case 2: One child
        if (!root->left) {
            cout << "  (Replacing " << key << " with right child)" << endl;
            Node *t = root->right; delete root; return t;
        }
        if (!root->right) {
            cout << "  (Replacing " << key << " with left child)" << endl;
            Node *t = root->left; delete root; return t;
        }
        // Case 3: Two children
        Node *succ = findMin(root->right);
        cout << "  (Replacing " << key << " with successor " << succ->data << ")" << endl;
        root->data = succ->data;
        root->right = deleteNode(root->right, succ->data);
    }
    return root;
}

int main() {
    Node *root = nullptr;
    int vals[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : vals) root = insert(root, v);

    cout << "Original: "; inorder(root); cout << endl;

    cout << "\\nDelete 20 (leaf):" << endl;
    root = deleteNode(root, 20);
    cout << "Result:   "; inorder(root); cout << endl;

    cout << "\\nDelete 30 (two children):" << endl;
    root = deleteNode(root, 30);
    cout << "Result:   "; inorder(root); cout << endl;

    cout << "\\nDelete 70 (two children):" << endl;
    root = deleteNode(root, 70);
    cout << "Result:   "; inorder(root); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Min, Max, Floor, Ceil</h3>
		<p class="text-gray-400 text-sm mb-3">Find minimum, maximum, floor, and ceiling values in a BST.</p>
		<CodePlayground
			title="BST Min, Max, Floor, Ceil"
			initialCode={`#include <iostream>
#include <climits>
using namespace std;

struct Node { int data; Node *left, *right; };

Node* insert(Node *r, int k) {
    if (!r) return new Node{k, nullptr, nullptr};
    if (k < r->data) r->left = insert(r->left, k);
    else if (k > r->data) r->right = insert(r->right, k);
    return r;
}

int findMin(Node *r) {
    while (r->left) r = r->left;
    return r->data;
}

int findMax(Node *r) {
    while (r->right) r = r->right;
    return r->data;
}

int floorBST(Node *root, int key) {
    int result = -1;
    while (root) {
        if (root->data == key) return key;
        if (root->data < key) { result = root->data; root = root->right; }
        else root = root->left;
    }
    return result;
}

int ceilBST(Node *root, int key) {
    int result = -1;
    while (root) {
        if (root->data == key) return key;
        if (root->data > key) { result = root->data; root = root->left; }
        else root = root->right;
    }
    return result;
}

int main() {
    Node *root = nullptr;
    int vals[] = {20, 10, 30, 5, 15, 25, 40};
    for (int v : vals) root = insert(root, v);

    cout << "BST values: 5 10 15 20 25 30 40" << endl;
    cout << "Min: " << findMin(root) << endl;
    cout << "Max: " << findMax(root) << endl;

    int queries[] = {12, 20, 27, 3, 42};
    cout << "\\nFloor & Ceil:" << endl;
    for (int q : queries)
        cout << "  key=" << q << ": floor=" << floorBST(root, q)
             << ", ceil=" << ceilBST(root, q) << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Validate BST & LCA</h3>
		<p class="text-gray-400 text-sm mb-3">Check if a binary tree is a valid BST, and find the lowest common ancestor.</p>
		<CodePlayground
			title="Validate BST & LCA"
			initialCode={`#include <iostream>
#include <climits>
using namespace std;

struct Node { int data; Node *left, *right; };
Node* cn(int v) { return new Node{v, nullptr, nullptr}; }

bool isBST(Node *root, long minVal, long maxVal) {
    if (!root) return true;
    if (root->data <= minVal || root->data >= maxVal) return false;
    return isBST(root->left, minVal, root->data) &&
           isBST(root->right, root->data, maxVal);
}

Node* lca(Node *root, int a, int b) {
    if (!root) return nullptr;
    if (a < root->data && b < root->data) return lca(root->left, a, b);
    if (a > root->data && b > root->data) return lca(root->right, a, b);
    return root;
}

int main() {
    // Valid BST
    Node *bst = cn(30);
    bst->left = cn(20); bst->right = cn(40);
    bst->left->left = cn(10); bst->left->right = cn(25);
    bst->right->left = cn(35); bst->right->right = cn(50);

    cout << "Valid BST? " << (isBST(bst, LONG_MIN, LONG_MAX) ? "YES" : "NO") << endl;

    // Invalid BST (35 in wrong place)
    Node *bad = cn(30);
    bad->left = cn(20); bad->right = cn(40);
    bad->left->left = cn(10); bad->left->right = cn(35);  // 35 > 30!
    cout << "Invalid tree is BST? " << (isBST(bad, LONG_MIN, LONG_MAX) ? "YES" : "NO") << endl;

    // LCA
    cout << "\\nLCA(10, 25) = " << lca(bst, 10, 25)->data << endl;  // 20
    cout << "LCA(10, 50) = " << lca(bst, 10, 50)->data << endl;  // 30
    cout << "LCA(35, 50) = " << lca(bst, 35, 50)->data << endl;  // 40

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Build BST from Preorder</h3>
		<p class="text-gray-400 text-sm mb-3">Reconstruct a BST from its preorder traversal using range bounds.</p>
		<CodePlayground
			title="BST from Preorder"
			initialCode={`#include <iostream>
#include <climits>
using namespace std;

struct Node { int data; Node *left, *right; };

Node* buildFromPreorder(int pre[], int &idx, int n, int minV, int maxV) {
    if (idx >= n || pre[idx] < minV || pre[idx] > maxV)
        return nullptr;
    Node *root = new Node{pre[idx++], nullptr, nullptr};
    root->left = buildFromPreorder(pre, idx, n, minV, root->data);
    root->right = buildFromPreorder(pre, idx, n, root->data, maxV);
    return root;
}

void inorder(Node *r) {
    if (!r) return;
    inorder(r->left); cout << r->data << " "; inorder(r->right);
}
void preorder(Node *r) {
    if (!r) return;
    cout << r->data << " "; preorder(r->left); preorder(r->right);
}

int main() {
    int pre[] = {30, 20, 10, 25, 40, 35, 50};
    int n = 7, idx = 0;

    cout << "Input preorder: ";
    for (int i = 0; i < n; i++) cout << pre[i] << " ";
    cout << endl;

    Node *root = buildFromPreorder(pre, idx, n, INT_MIN, INT_MAX);

    cout << "Reconstructed preorder: "; preorder(root); cout << endl;
    cout << "Inorder (sorted):      "; inorder(root); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Kth Smallest Element in BST</h3>
		<p class="text-gray-400 text-sm mb-3">Use inorder traversal to find the kth smallest value. Hint: inorder visits in sorted order — just count to k.</p>
		<CodePlayground
			title="Kth Smallest — Try It Yourself"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *left, *right; };

Node* insert(Node *r, int k) {
    if (!r) return new Node{k, nullptr, nullptr};
    if (k < r->data) r->left = insert(r->left, k);
    else if (k > r->data) r->right = insert(r->right, k);
    return r;
}

// TODO: Find the kth smallest element
// Use inorder traversal (gives sorted order)
// Decrement k at each visit, when k reaches 0 -> that's the answer
int kthSmallest(Node *root, int &k) {
    // YOUR CODE HERE

    return -1;
}

int main() {
    Node *root = nullptr;
    int vals[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : vals) root = insert(root, v);
    // Sorted: 20 30 40 50 60 70 80

    for (int i = 1; i <= 7; i++) {
        int k = i;
        cout << "K=" << i << ": " << kthSmallest(root, k) << endl;
    }
    // Expected: 20, 30, 40, 50, 60, 70, 80
    return 0;
}`}
		/>
	</div>
</div>
