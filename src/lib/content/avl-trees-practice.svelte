<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — AVL Trees</h2>
		<p class="text-gray-400">Implement AVL rotations, insertion, deletion, and watch the tree self-balance.</p>
	</div>

	<div>
		<h3>Practice 1: AVL Rotations — Left & Right</h3>
		<p class="text-gray-400 text-sm mb-3">Implement the two fundamental rotations that power AVL trees.</p>
		<CodePlayground
			title="Left & Right Rotations"
			initialCode={`#include <iostream>
using namespace std;

struct Node {
    int data, height;
    Node *left, *right;
};

Node* createNode(int val) {
    return new Node{val, 0, nullptr, nullptr};
}

int getHeight(Node *n) { return n ? n->height : -1; }

void updateHeight(Node *n) {
    n->height = 1 + max(getHeight(n->left), getHeight(n->right));
}

int getBF(Node *n) {
    return n ? getHeight(n->left) - getHeight(n->right) : 0;
}

Node* rightRotate(Node *y) {
    Node *x = y->left;
    Node *T2 = x->right;
    x->right = y;
    y->left = T2;
    updateHeight(y);
    updateHeight(x);
    return x;
}

Node* leftRotate(Node *x) {
    Node *y = x->right;
    Node *T2 = y->left;
    y->left = x;
    x->right = T2;
    updateHeight(x);
    updateHeight(y);
    return y;
}

void printTree(Node *root, string prefix = "", bool isLeft = true) {
    if (!root) return;
    cout << prefix << (isLeft ? "├── " : "└── ")
         << root->data << " (BF=" << getBF(root) << ")" << endl;
    printTree(root->left, prefix + (isLeft ? "│   " : "    "), true);
    printTree(root->right, prefix + (isLeft ? "│   " : "    "), false);
}

int main() {
    // Build unbalanced: 30 -> 20 -> 10 (LL case)
    Node *root = createNode(30);
    root->left = createNode(20);
    root->left->left = createNode(10);
    updateHeight(root->left);
    updateHeight(root);

    cout << "Before (LL imbalance):" << endl;
    printTree(root, "", false);

    root = rightRotate(root);
    cout << "\\nAfter right rotation:" << endl;
    printTree(root, "", false);

    // Build unbalanced: 10 -> 20 -> 30 (RR case)
    Node *root2 = createNode(10);
    root2->right = createNode(20);
    root2->right->right = createNode(30);
    updateHeight(root2->right);
    updateHeight(root2);

    cout << "\\nBefore (RR imbalance):" << endl;
    printTree(root2, "", false);

    root2 = leftRotate(root2);
    cout << "\\nAfter left rotation:" << endl;
    printTree(root2, "", false);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Full AVL Insertion</h3>
		<p class="text-gray-400 text-sm mb-3">Insert elements and watch the tree auto-balance with all 4 rotation cases.</p>
		<CodePlayground
			title="AVL Insertion with Auto-Balancing"
			initialCode={`#include <iostream>
using namespace std;

struct Node {
    int data, height;
    Node *left, *right;
};

Node* createNode(int v) { return new Node{v, 0, nullptr, nullptr}; }
int getH(Node *n) { return n ? n->height : -1; }
void updH(Node *n) { n->height = 1 + max(getH(n->left), getH(n->right)); }
int getBF(Node *n) { return n ? getH(n->left) - getH(n->right) : 0; }

Node* rightRotate(Node *y) {
    Node *x = y->left; Node *T = x->right;
    x->right = y; y->left = T;
    updH(y); updH(x); return x;
}
Node* leftRotate(Node *x) {
    Node *y = x->right; Node *T = y->left;
    y->left = x; x->right = T;
    updH(x); updH(y); return y;
}

Node* insert(Node *node, int key) {
    if (!node) return createNode(key);
    if (key < node->data) node->left = insert(node->left, key);
    else if (key > node->data) node->right = insert(node->right, key);
    else return node;

    updH(node);
    int bf = getBF(node);

    if (bf > 1 && key < node->left->data)  // LL
        { cout << "  LL rotation at " << node->data << endl; return rightRotate(node); }
    if (bf < -1 && key > node->right->data) // RR
        { cout << "  RR rotation at " << node->data << endl; return leftRotate(node); }
    if (bf > 1 && key > node->left->data) { // LR
        cout << "  LR rotation at " << node->data << endl;
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    if (bf < -1 && key < node->right->data) { // RL
        cout << "  RL rotation at " << node->data << endl;
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
    return node;
}

void inorder(Node *r) {
    if (!r) return;
    inorder(r->left); cout << r->data << " "; inorder(r->right);
}

void printTree(Node *r, string p = "", bool l = true) {
    if (!r) return;
    cout << p << (l ? "├── " : "└── ") << r->data << "(BF=" << getBF(r) << ")" << endl;
    printTree(r->left, p + (l ? "│   " : "    "), true);
    printTree(r->right, p + (l ? "│   " : "    "), false);
}

int main() {
    Node *root = nullptr;
    int vals[] = {10, 20, 30, 25, 28, 27, 5, 4};

    for (int v : vals) {
        cout << "Insert " << v << ":" << endl;
        root = insert(root, v);
    }

    cout << "\\nFinal AVL Tree:" << endl;
    printTree(root, "", false);
    cout << "\\nInorder: "; inorder(root); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: AVL Deletion</h3>
		<p class="text-gray-400 text-sm mb-3">Delete nodes and see rebalancing in action — deletions may cascade rotations.</p>
		<CodePlayground
			title="AVL Deletion with Rebalancing"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data, height; Node *left, *right; };
Node* cn(int v) { return new Node{v, 0, nullptr, nullptr}; }
int getH(Node *n) { return n ? n->height : -1; }
void updH(Node *n) { n->height = 1 + max(getH(n->left), getH(n->right)); }
int getBF(Node *n) { return n ? getH(n->left) - getH(n->right) : 0; }

Node* rRot(Node *y) { Node *x=y->left,*T=x->right; x->right=y; y->left=T; updH(y);updH(x); return x; }
Node* lRot(Node *x) { Node *y=x->right,*T=y->left; y->left=x; x->right=T; updH(x);updH(y); return y; }

Node* balance(Node *node) {
    updH(node);
    int bf = getBF(node);
    if (bf > 1 && getBF(node->left) >= 0) return rRot(node);
    if (bf > 1 && getBF(node->left) < 0) { node->left = lRot(node->left); return rRot(node); }
    if (bf < -1 && getBF(node->right) <= 0) return lRot(node);
    if (bf < -1 && getBF(node->right) > 0) { node->right = rRot(node->right); return lRot(node); }
    return node;
}

Node* insert(Node *n, int k) {
    if (!n) return cn(k);
    if (k < n->data) n->left = insert(n->left, k);
    else if (k > n->data) n->right = insert(n->right, k);
    return balance(n);
}

Node* findMin(Node *n) { while (n->left) n = n->left; return n; }

Node* deleteNode(Node *root, int key) {
    if (!root) return nullptr;
    if (key < root->data) root->left = deleteNode(root->left, key);
    else if (key > root->data) root->right = deleteNode(root->right, key);
    else {
        if (!root->left || !root->right) {
            Node *t = root->left ? root->left : root->right;
            delete root;
            return t;
        }
        Node *succ = findMin(root->right);
        root->data = succ->data;
        root->right = deleteNode(root->right, succ->data);
    }
    return balance(root);
}

void inorder(Node *r) { if (!r) return; inorder(r->left); cout<<r->data<<" "; inorder(r->right); }
void printTree(Node *r, string p="", bool l=true) {
    if (!r) return;
    cout<<p<<(l?"├── ":"└── ")<<r->data<<"(BF="<<getBF(r)<<")"<<endl;
    printTree(r->left, p+(l?"│   ":"    "), true);
    printTree(r->right, p+(l?"│   ":"    "), false);
}

int main() {
    Node *root = nullptr;
    int vals[] = {20, 10, 30, 5, 15, 25, 35, 3, 8};
    for (int v : vals) root = insert(root, v);

    cout << "Original AVL:" << endl;
    printTree(root, "", false);
    cout << "Inorder: "; inorder(root); cout << endl;

    cout << "\\nDelete 30:" << endl;
    root = deleteNode(root, 30);
    printTree(root, "", false);

    cout << "\\nDelete 25:" << endl;
    root = deleteNode(root, 25);
    printTree(root, "", false);
    cout << "Inorder: "; inorder(root); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Sorted Array to Balanced BST</h3>
		<p class="text-gray-400 text-sm mb-3">Build a balanced BST from a sorted array — O(n) without any rotations needed!</p>
		<CodePlayground
			title="Sorted Array → Balanced BST"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *left, *right; };

Node* sortedArrayToBST(int arr[], int start, int end) {
    if (start > end) return nullptr;
    int mid = (start + end) / 2;
    Node *root = new Node{arr[mid], nullptr, nullptr};
    root->left = sortedArrayToBST(arr, start, mid - 1);
    root->right = sortedArrayToBST(arr, mid + 1, end);
    return root;
}

int height(Node *r) {
    if (!r) return -1;
    return 1 + max(height(r->left), height(r->right));
}

void printTree(Node *r, string p = "", bool l = true) {
    if (!r) return;
    cout << p << (l ? "├── " : "└── ") << r->data << endl;
    printTree(r->left, p + (l ? "│   " : "    "), true);
    printTree(r->right, p + (l ? "│   " : "    "), false);
}

void inorder(Node *r) {
    if (!r) return;
    inorder(r->left); cout << r->data << " "; inorder(r->right);
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};
    int n = 15;

    Node *root = sortedArrayToBST(arr, 0, n - 1);

    cout << "Balanced BST from sorted array [1..15]:" << endl;
    printTree(root, "", false);
    cout << "\\nHeight: " << height(root) << " (optimal for 15 nodes)" << endl;
    cout << "Inorder: "; inorder(root); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Compare BST vs AVL with Sorted Input</h3>
		<p class="text-gray-400 text-sm mb-3">See the dramatic difference when inserting sorted data into BST vs AVL.</p>
		<CodePlayground
			title="BST vs AVL — Sorted Input"
			initialCode={`#include <iostream>
using namespace std;

// Simple BST
struct BSTNode { int data; BSTNode *left, *right; };
BSTNode* bstInsert(BSTNode *r, int k) {
    if (!r) return new BSTNode{k, nullptr, nullptr};
    if (k < r->data) r->left = bstInsert(r->left, k);
    else r->right = bstInsert(r->right, k);
    return r;
}
int bstHeight(BSTNode *r) { if (!r) return -1; return 1 + max(bstHeight(r->left), bstHeight(r->right)); }

// AVL
struct AVLNode { int data, height; AVLNode *left, *right; };
AVLNode* cn(int v) { return new AVLNode{v, 0, nullptr, nullptr}; }
int getH(AVLNode *n) { return n ? n->height : -1; }
void updH(AVLNode *n) { n->height = 1+max(getH(n->left),getH(n->right)); }
int getBF(AVLNode *n) { return n ? getH(n->left)-getH(n->right) : 0; }
AVLNode* rRot(AVLNode *y) { AVLNode *x=y->left,*T=x->right; x->right=y;y->left=T; updH(y);updH(x); return x; }
AVLNode* lRot(AVLNode *x) { AVLNode *y=x->right,*T=y->left; y->left=x;x->right=T; updH(x);updH(y); return y; }
AVLNode* avlInsert(AVLNode *n, int k) {
    if (!n) return cn(k);
    if (k < n->data) n->left = avlInsert(n->left, k);
    else if (k > n->data) n->right = avlInsert(n->right, k);
    else return n;
    updH(n); int bf = getBF(n);
    if (bf>1 && k<n->left->data) return rRot(n);
    if (bf<-1 && k>n->right->data) return lRot(n);
    if (bf>1 && k>n->left->data) { n->left=lRot(n->left); return rRot(n); }
    if (bf<-1 && k<n->right->data) { n->right=rRot(n->right); return lRot(n); }
    return n;
}

int main() {
    BSTNode *bst = nullptr;
    AVLNode *avl = nullptr;

    cout << "Inserting 1 to 15 in order:\\n" << endl;
    for (int i = 1; i <= 15; i++) {
        bst = bstInsert(bst, i);
        avl = avlInsert(avl, i);
    }

    cout << "BST height: " << bstHeight(bst) << " (worst case = n-1 = 14)" << endl;
    cout << "AVL height: " << getH(avl) << " (balanced = ~log n = 3)" << endl;

    cout << "\\nBST search for 15: " << bstHeight(bst)+1 << " comparisons" << endl;
    cout << "AVL search for 15: ~" << getH(avl)+1 << " comparisons" << endl;
    cout << "\\nAVL is " << (bstHeight(bst)+1)/(getH(avl)+1) << "x faster!" << endl;

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Determine Rotation Type</h3>
		<p class="text-gray-400 text-sm mb-3">Given a sequence of insertions, determine which rotation case is triggered at each imbalance.</p>
		<CodePlayground
			title="Identify Rotation Cases — Try It Yourself"
			initialCode={`#include <iostream>
#include <string>
using namespace std;

// Given these insertions into an empty AVL tree,
// determine the rotation type at each step.
// Print: "LL", "RR", "LR", or "RL" when rotation occurs.

// TODO: Trace through these insertions manually:
// Insert: 30, 20, 10     → what rotation at 30?
// Insert: 5, 4           → what rotation?
// Insert: 35, 36         → what rotation?
// Insert: 33             → what rotation?

// After you figure it out, verify with the code from Practice 2!

int main() {
    cout << "Trace these insertions into an empty AVL tree:" << endl;
    cout << "Insert 30, 20, 10 -> Rotation type: ___" << endl;
    cout << "Insert 5           -> No rotation needed" << endl;
    cout << "Insert 4           -> Rotation type: ___" << endl;
    cout << "Insert 35, 36      -> Rotation type: ___" << endl;
    cout << "Insert 33          -> Rotation type: ___" << endl;

    cout << "\\nAnswers: LL, LL, RR, RL" << endl;
    cout << "(Verify by running Practice 2 with these values!)" << endl;

    return 0;
}`}
		/>
	</div>
</div>
