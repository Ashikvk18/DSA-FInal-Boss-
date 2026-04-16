<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Binary Trees</h2>
		<p class="text-gray-400">Build trees, traverse them in every order, and compute properties hands-on.</p>
	</div>

	<div>
		<h3>Practice 1: Create a Binary Tree & Display</h3>
		<p class="text-gray-400 text-sm mb-3">Manually build a tree and display it using all three recursive traversals.</p>
		<CodePlayground
			title="Build & Traverse a Binary Tree"
			initialCode={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
};

Node* createNode(int val) {
    return new Node{val, nullptr, nullptr};
}

void preorder(Node *root) {
    if (!root) return;
    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

void inorder(Node *root) {
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

void postorder(Node *root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}

int main() {
    //        1
    //       / \\
    //      2   3
    //     / \\   \\
    //    4   5   6
    Node *root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    root->right->right = createNode(6);

    cout << "Preorder  (Root-L-R): "; preorder(root); cout << endl;
    cout << "Inorder   (L-Root-R): "; inorder(root); cout << endl;
    cout << "Postorder (L-R-Root): "; postorder(root); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Level Order Traversal (BFS)</h3>
		<p class="text-gray-400 text-sm mb-3">Visit nodes level by level using a queue.</p>
		<CodePlayground
			title="Level Order Traversal"
			initialCode={`#include <iostream>
#include <queue>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
};
Node* cn(int v) { return new Node{v, nullptr, nullptr}; }

void levelOrder(Node *root) {
    if (!root) return;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node *curr = q.front(); q.pop();
        cout << curr->data << " ";
        if (curr->left) q.push(curr->left);
        if (curr->right) q.push(curr->right);
    }
    cout << endl;
}

void levelOrderByLevel(Node *root) {
    if (!root) return;
    queue<Node*> q;
    q.push(root);
    int level = 0;
    while (!q.empty()) {
        int size = q.size();
        cout << "Level " << level << ": ";
        for (int i = 0; i < size; i++) {
            Node *curr = q.front(); q.pop();
            cout << curr->data << " ";
            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }
        cout << endl;
        level++;
    }
}

int main() {
    //        1
    //       / \\
    //      2   3
    //     / \\   \\
    //    4   5   6
    //   /
    //  7
    Node *root = cn(1);
    root->left = cn(2); root->right = cn(3);
    root->left->left = cn(4); root->left->right = cn(5);
    root->right->right = cn(6);
    root->left->left->left = cn(7);

    cout << "Level Order: "; levelOrder(root);
    cout << endl;
    levelOrderByLevel(root);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Iterative Traversals using Stack</h3>
		<p class="text-gray-400 text-sm mb-3">Implement preorder and inorder without recursion.</p>
		<CodePlayground
			title="Iterative Preorder & Inorder"
			initialCode={`#include <iostream>
#include <stack>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
};
Node* cn(int v) { return new Node{v, nullptr, nullptr}; }

void preorderIterative(Node *root) {
    if (!root) return;
    stack<Node*> s;
    s.push(root);
    while (!s.empty()) {
        Node *curr = s.top(); s.pop();
        cout << curr->data << " ";
        if (curr->right) s.push(curr->right);
        if (curr->left) s.push(curr->left);
    }
    cout << endl;
}

void inorderIterative(Node *root) {
    stack<Node*> s;
    Node *curr = root;
    while (curr || !s.empty()) {
        while (curr) {
            s.push(curr);
            curr = curr->left;
        }
        curr = s.top(); s.pop();
        cout << curr->data << " ";
        curr = curr->right;
    }
    cout << endl;
}

int main() {
    Node *root = cn(1);
    root->left = cn(2); root->right = cn(3);
    root->left->left = cn(4); root->left->right = cn(5);
    root->right->right = cn(6);

    cout << "Iterative Preorder:  "; preorderIterative(root);
    cout << "Iterative Inorder:   "; inorderIterative(root);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Height, Count, Leaves, Sum</h3>
		<p class="text-gray-400 text-sm mb-3">Compute tree properties using recursion.</p>
		<CodePlayground
			title="Tree Properties"
			initialCode={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
};
Node* cn(int v) { return new Node{v, nullptr, nullptr}; }

int height(Node *root) {
    if (!root) return -1;
    return 1 + max(height(root->left), height(root->right));
}

int countNodes(Node *root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}

int countLeaves(Node *root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}

int sumNodes(Node *root) {
    if (!root) return 0;
    return root->data + sumNodes(root->left) + sumNodes(root->right);
}

int main() {
    //        10
    //       /  \\
    //     20    30
    //    / \\     \\
    //   40  50    60
    //  /
    // 70
    Node *root = cn(10);
    root->left = cn(20); root->right = cn(30);
    root->left->left = cn(40); root->left->right = cn(50);
    root->right->right = cn(60);
    root->left->left->left = cn(70);

    cout << "Height: " << height(root) << endl;
    cout << "Total nodes: " << countNodes(root) << endl;
    cout << "Leaf nodes: " << countLeaves(root) << endl;
    cout << "Sum: " << sumNodes(root) << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Build Tree from Preorder + Inorder</h3>
		<p class="text-gray-400 text-sm mb-3">Reconstruct a binary tree given its preorder and inorder traversals.</p>
		<CodePlayground
			title="Build Tree from Traversals"
			initialCode={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
};
Node* cn(int v) { return new Node{v, nullptr, nullptr}; }

int findIndex(int in[], int start, int end, int val) {
    for (int i = start; i <= end; i++)
        if (in[i] == val) return i;
    return -1;
}

Node* buildTree(int pre[], int in[], int inStart, int inEnd, int &preIdx) {
    if (inStart > inEnd) return nullptr;
    Node *node = cn(pre[preIdx++]);
    if (inStart == inEnd) return node;
    int inIdx = findIndex(in, inStart, inEnd, node->data);
    node->left = buildTree(pre, in, inStart, inIdx - 1, preIdx);
    node->right = buildTree(pre, in, inIdx + 1, inEnd, preIdx);
    return node;
}

void inorder(Node *r) {
    if (!r) return;
    inorder(r->left);
    cout << r->data << " ";
    inorder(r->right);
}
void preorder(Node *r) {
    if (!r) return;
    cout << r->data << " ";
    preorder(r->left);
    preorder(r->right);
}

int main() {
    int pre[] = {1, 2, 4, 5, 3, 6};
    int in[]  = {4, 2, 5, 1, 3, 6};
    int n = 6;
    int preIdx = 0;

    cout << "Given:" << endl;
    cout << "Preorder: "; for (int i = 0; i < n; i++) cout << pre[i] << " "; cout << endl;
    cout << "Inorder:  "; for (int i = 0; i < n; i++) cout << in[i] << " "; cout << endl;

    Node *root = buildTree(pre, in, 0, n - 1, preIdx);

    cout << "\\nReconstructed tree:" << endl;
    cout << "Preorder: "; preorder(root); cout << endl;
    cout << "Inorder:  "; inorder(root); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Check if Two Trees are Identical</h3>
		<p class="text-gray-400 text-sm mb-3">Compare two trees node by node recursively.</p>
		<CodePlayground
			title="Identical Trees & Mirror"
			initialCode={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
};
Node* cn(int v) { return new Node{v, nullptr, nullptr}; }

bool isIdentical(Node *a, Node *b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return (a->data == b->data) &&
           isIdentical(a->left, b->left) &&
           isIdentical(a->right, b->right);
}

// Mirror/invert a tree
Node* mirror(Node *root) {
    if (!root) return nullptr;
    Node *temp = root->left;
    root->left = mirror(root->right);
    root->right = mirror(temp);
    return root;
}

void inorder(Node *r) {
    if (!r) return;
    inorder(r->left);
    cout << r->data << " ";
    inorder(r->right);
}

int main() {
    Node *t1 = cn(1);
    t1->left = cn(2); t1->right = cn(3);
    t1->left->left = cn(4);

    Node *t2 = cn(1);
    t2->left = cn(2); t2->right = cn(3);
    t2->left->left = cn(4);

    Node *t3 = cn(1);
    t3->left = cn(2); t3->right = cn(3);
    t3->left->right = cn(4);

    cout << "t1 == t2? " << (isIdentical(t1, t2) ? "YES" : "NO") << endl;
    cout << "t1 == t3? " << (isIdentical(t1, t3) ? "YES" : "NO") << endl;

    cout << "\\nt1 inorder: "; inorder(t1); cout << endl;
    mirror(t1);
    cout << "t1 mirror:  "; inorder(t1); cout << endl;

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Diameter of a Binary Tree</h3>
		<p class="text-gray-400 text-sm mb-3">The diameter is the longest path between any two nodes. It may or may not pass through the root.</p>
		<CodePlayground
			title="Diameter — Try It Yourself"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *left, *right; };
Node* cn(int v) { return new Node{v, nullptr, nullptr}; }

// TODO: Find diameter of binary tree
// Diameter at each node = height(left) + height(right) + 2
// Answer = max diameter across all nodes
// Hint: modify height() to also track max diameter

int height(Node *root) {
    if (!root) return -1;
    return 1 + max(height(root->left), height(root->right));
}

int diameter(Node *root) {
    // YOUR CODE HERE
    // For each node: leftHeight + rightHeight + 2
    // Return the maximum across all nodes

    return 0;
}

int main() {
    //        1
    //       / \\
    //      2   3
    //     / \\
    //    4   5
    //   /     \\
    //  6       7
    Node *root = cn(1);
    root->left = cn(2); root->right = cn(3);
    root->left->left = cn(4); root->left->right = cn(5);
    root->left->left->left = cn(6);
    root->left->right->right = cn(7);

    cout << "Diameter: " << diameter(root) << endl;  // expected: 5 (6->4->2->5->7)
    return 0;
}`}
		/>
	</div>
</div>
