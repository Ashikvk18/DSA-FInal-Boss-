<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Linked Lists</h2>
		<p class="text-gray-400">Build, manipulate, and solve classic linked list problems hands-on.</p>
	</div>

	<div>
		<h3>Practice 1: Create, Display, Count, Sum</h3>
		<p class="text-gray-400 text-sm mb-3">Build a linked list from an array and implement basic traversal operations.</p>
		<CodePlayground
			title="Linked List Basics"
			initialCode={`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node *next;
};

Node* createList(int A[], int n) {
    Node *head = new Node{A[0], nullptr};
    Node *tail = head;
    for (int i = 1; i < n; i++) {
        tail->next = new Node{A[i], nullptr};
        tail = tail->next;
    }
    return head;
}

void display(Node *p) {
    while (p) { cout << p->data << " -> "; p = p->next; }
    cout << "NULL" << endl;
}

int count(Node *p) {
    int c = 0;
    while (p) { c++; p = p->next; }
    return c;
}

int sum(Node *p) {
    int s = 0;
    while (p) { s += p->data; p = p->next; }
    return s;
}

int maxVal(Node *p) {
    int mx = p->data;
    while (p) { if (p->data > mx) mx = p->data; p = p->next; }
    return mx;
}

int main() {
    int A[] = {10, 20, 30, 40, 50};
    Node *head = createList(A, 5);

    cout << "List: "; display(head);
    cout << "Count: " << count(head) << endl;
    cout << "Sum: " << sum(head) << endl;
    cout << "Max: " << maxVal(head) << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Insert Operations</h3>
		<p class="text-gray-400 text-sm mb-3">Insert at beginning, end, and at a specific position.</p>
		<CodePlayground
			title="Insert at Various Positions"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

void display(Node *p) {
    while (p) { cout << p->data << " -> "; p = p->next; }
    cout << "NULL" << endl;
}

void insertFirst(Node **head, int val) {
    Node *n = new Node{val, *head};
    *head = n;
}

void insertLast(Node **head, int val) {
    Node *n = new Node{val, nullptr};
    if (!*head) { *head = n; return; }
    Node *p = *head;
    while (p->next) p = p->next;
    p->next = n;
}

void insertAt(Node **head, int pos, int val) {
    if (pos == 0) { insertFirst(head, val); return; }
    Node *p = *head;
    for (int i = 0; i < pos - 1 && p; i++) p = p->next;
    if (p) {
        Node *n = new Node{val, p->next};
        p->next = n;
    }
}

int main() {
    Node *head = nullptr;

    insertLast(&head, 10);
    insertLast(&head, 20);
    insertLast(&head, 30);
    cout << "After append 10,20,30: "; display(head);

    insertFirst(&head, 5);
    cout << "Insert 5 at front:     "; display(head);

    insertAt(&head, 2, 15);
    cout << "Insert 15 at pos 2:    "; display(head);

    insertAt(&head, 5, 25);
    cout << "Insert 25 at pos 5:    "; display(head);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Delete Operations</h3>
		<p class="text-gray-400 text-sm mb-3">Delete from head, by position, and by value.</p>
		<CodePlayground
			title="Delete Operations"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

Node* createList(int A[], int n) {
    Node *head = new Node{A[0], nullptr};
    Node *tail = head;
    for (int i = 1; i < n; i++) {
        tail->next = new Node{A[i], nullptr};
        tail = tail->next;
    }
    return head;
}

void display(Node *p) {
    while (p) { cout << p->data << " -> "; p = p->next; }
    cout << "NULL" << endl;
}

int deleteFirst(Node **head) {
    if (!*head) return -1;
    Node *p = *head;
    int val = p->data;
    *head = p->next;
    delete p;
    return val;
}

int deleteAt(Node **head, int pos) {
    if (!*head) return -1;
    if (pos == 0) return deleteFirst(head);
    Node *p = *head;
    for (int i = 0; i < pos - 1 && p->next; i++) p = p->next;
    if (p->next) {
        Node *del = p->next;
        int val = del->data;
        p->next = del->next;
        delete del;
        return val;
    }
    return -1;
}

int main() {
    int A[] = {10, 20, 30, 40, 50, 60};
    Node *head = createList(A, 6);
    cout << "Original: "; display(head);

    int d = deleteFirst(&head);
    cout << "Deleted first (" << d << "): "; display(head);

    d = deleteAt(&head, 2);
    cout << "Deleted pos 2 (" << d << "): "; display(head);

    d = deleteAt(&head, 3);
    cout << "Deleted last (" << d << "):  "; display(head);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Reverse a Linked List</h3>
		<p class="text-gray-400 text-sm mb-3">The classic interview question — reverse using 3 pointers.</p>
		<CodePlayground
			title="Reverse Linked List — Iterative & Recursive"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

Node* createList(int A[], int n) {
    Node *head = new Node{A[0], nullptr};
    Node *tail = head;
    for (int i = 1; i < n; i++) {
        tail->next = new Node{A[i], nullptr};
        tail = tail->next;
    }
    return head;
}

void display(Node *p) {
    while (p) { cout << p->data << " -> "; p = p->next; }
    cout << "NULL" << endl;
}

// Iterative: 3 pointers
Node* reverseIterative(Node *head) {
    Node *prev = nullptr, *curr = head, *next;
    while (curr) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Recursive
Node* reverseRecursive(Node *prev, Node *curr) {
    if (!curr) return prev;
    Node *next = curr->next;
    curr->next = prev;
    return reverseRecursive(curr, next);
}

int main() {
    int A[] = {10, 20, 30, 40, 50};
    Node *head = createList(A, 5);
    cout << "Original:  "; display(head);

    head = reverseIterative(head);
    cout << "Reversed (iter): "; display(head);

    head = reverseRecursive(nullptr, head);
    cout << "Reversed back (rec): "; display(head);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Floyd's Cycle Detection</h3>
		<p class="text-gray-400 text-sm mb-3">Detect a loop and find where it starts using slow/fast pointers.</p>
		<CodePlayground
			title="Loop Detection — Floyd's Algorithm"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

bool hasLoop(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

Node* findLoopStart(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) break;
    }
    if (!fast || !fast->next) return nullptr;
    slow = head;
    while (slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;
}

int main() {
    // Create list: 1->2->3->4->5->6
    Node *n1 = new Node{1, nullptr};
    Node *n2 = new Node{2, nullptr}; n1->next = n2;
    Node *n3 = new Node{3, nullptr}; n2->next = n3;
    Node *n4 = new Node{4, nullptr}; n3->next = n4;
    Node *n5 = new Node{5, nullptr}; n4->next = n5;
    Node *n6 = new Node{6, nullptr}; n5->next = n6;

    // No loop
    cout << "Has loop (no loop): " << (hasLoop(n1) ? "YES" : "NO") << endl;

    // Create loop: 6->3
    n6->next = n3;
    cout << "Has loop (with loop): " << (hasLoop(n1) ? "YES" : "NO") << endl;

    Node *start = findLoopStart(n1);
    if (start)
        cout << "Loop starts at node with value: " << start->data << endl;

    // Break loop for cleanup
    n6->next = nullptr;
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Merge Two Sorted Lists & Find Middle</h3>
		<p class="text-gray-400 text-sm mb-3">Two essential techniques: merge sorted lists and find the middle node.</p>
		<CodePlayground
			title="Merge Sorted Lists & Find Middle"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

Node* createList(int A[], int n) {
    Node *head = new Node{A[0], nullptr};
    Node *tail = head;
    for (int i = 1; i < n; i++) {
        tail->next = new Node{A[i], nullptr};
        tail = tail->next;
    }
    return head;
}

void display(Node *p) {
    while (p) { cout << p->data << " -> "; p = p->next; }
    cout << "NULL" << endl;
}

Node* findMiddle(Node *head) {
    Node *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

Node* mergeSorted(Node *a, Node *b) {
    if (!a) return b;
    if (!b) return a;
    Node *head, *tail;
    if (a->data <= b->data) { head = tail = a; a = a->next; }
    else { head = tail = b; b = b->next; }
    while (a && b) {
        if (a->data <= b->data) { tail->next = a; tail = a; a = a->next; }
        else { tail->next = b; tail = b; b = b->next; }
    }
    tail->next = a ? a : b;
    return head;
}

int main() {
    // Find middle
    int A[] = {1, 2, 3, 4, 5};
    Node *list1 = createList(A, 5);
    cout << "List: "; display(list1);
    cout << "Middle: " << findMiddle(list1)->data << endl;

    // Merge sorted lists
    int B[] = {2, 8, 15, 22};
    int C[] = {5, 10, 12, 20, 25};
    Node *l1 = createList(B, 4);
    Node *l2 = createList(C, 5);
    cout << "\\nList 1: "; display(l1);
    cout << "List 2: "; display(l2);
    Node *merged = mergeSorted(l1, l2);
    cout << "Merged: "; display(merged);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 7: Doubly Linked List</h3>
		<p class="text-gray-400 text-sm mb-3">Build a doubly linked list with insert, delete, and reverse.</p>
		<CodePlayground
			title="Doubly Linked List Operations"
			initialCode={`#include <iostream>
using namespace std;

struct DNode {
    int data;
    DNode *prev, *next;
};

void display(DNode *p) {
    cout << "NULL <-> ";
    while (p) {
        cout << p->data << " <-> ";
        p = p->next;
    }
    cout << "NULL" << endl;
}

void insertFirst(DNode **head, int val) {
    DNode *n = new DNode{val, nullptr, *head};
    if (*head) (*head)->prev = n;
    *head = n;
}

void insertLast(DNode **head, int val) {
    DNode *n = new DNode{val, nullptr, nullptr};
    if (!*head) { *head = n; return; }
    DNode *p = *head;
    while (p->next) p = p->next;
    p->next = n;
    n->prev = p;
}

int deleteNode(DNode **head, DNode *p) {
    if (!p) return -1;
    int val = p->data;
    if (p->prev) p->prev->next = p->next;
    else *head = p->next;
    if (p->next) p->next->prev = p->prev;
    delete p;
    return val;
}

DNode* reverseDLL(DNode *head) {
    DNode *p = head, *temp = nullptr;
    while (p) {
        temp = p->prev;
        p->prev = p->next;
        p->next = temp;
        p = p->prev;
    }
    return temp ? temp->prev : head;
}

int main() {
    DNode *head = nullptr;
    insertLast(&head, 10);
    insertLast(&head, 20);
    insertLast(&head, 30);
    insertFirst(&head, 5);
    cout << "DLL: "; display(head);

    // Delete the second node (value 10)
    deleteNode(&head, head->next);
    cout << "After delete 10: "; display(head);

    head = reverseDLL(head);
    cout << "Reversed: "; display(head);

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Check if Linked List is a Palindrome</h3>
		<p class="text-gray-400 text-sm mb-3">Find middle, reverse second half, compare. Combine all the techniques you've learned!</p>
		<CodePlayground
			title="Palindrome Linked List — Try It Yourself"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

Node* createList(int A[], int n) {
    Node *head = new Node{A[0], nullptr};
    Node *tail = head;
    for (int i = 1; i < n; i++) {
        tail->next = new Node{A[i], nullptr};
        tail = tail->next;
    }
    return head;
}

void display(Node *p) {
    while (p) { cout << p->data << " -> "; p = p->next; }
    cout << "NULL" << endl;
}

// TODO: Check if linked list is a palindrome
// Steps:
// 1. Find middle using slow/fast pointers
// 2. Reverse the second half
// 3. Compare first half with reversed second half
bool isPalindrome(Node *head) {
    // YOUR CODE HERE

}

int main() {
    int A[] = {1, 2, 3, 2, 1};
    Node *list1 = createList(A, 5);
    cout << "List: "; display(list1);
    cout << "Palindrome? " << (isPalindrome(list1) ? "YES" : "NO") << endl;

    int B[] = {1, 2, 3, 4, 5};
    Node *list2 = createList(B, 5);
    cout << "\\nList: "; display(list2);
    cout << "Palindrome? " << (isPalindrome(list2) ? "YES" : "NO") << endl;

    return 0;
}`}
		/>
	</div>
</div>
