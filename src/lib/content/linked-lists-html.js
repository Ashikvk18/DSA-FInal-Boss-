export const theoryHTML = `
<section class="theory-section" id="ll-intro">
	<h2>1. Why Linked Lists?</h2>
	<div class="definition-box">
		<strong>Problem with Arrays:</strong> Arrays have <strong>fixed size</strong> (static) or expensive resizing (dynamic). Inserting/deleting in the middle requires shifting O(n) elements. Memory must be <strong>contiguous</strong> — hard to find large continuous blocks.
	</div>

	<div class="definition-box">
		<strong>Linked List:</strong> A linear data structure where each element (<strong>node</strong>) contains data and a <strong>pointer</strong> to the next node. Nodes can be scattered anywhere in memory — no contiguity required. Insertion/deletion is O(1) if you have a pointer to the position.
	</div>

<pre><code>// Array vs Linked List — Mental Model
// Array:  [10|20|30|40|50]  — contiguous, indexed
// List:   [10]→[20]→[30]→[40]→[50]→NULL  — scattered, linked

// Node structure:
struct Node {
    int data;       // the value
    Node *next;     // pointer to next node
};

// Creating nodes:
Node *n1 = new Node();
n1-&gt;data = 10;
n1-&gt;next = nullptr;   // last node points to NULL</code></pre>

	<h3>Array vs Linked List Comparison</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Array</th>
				<th class="text-left p-2 text-gray-400">Linked List</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Access by index</td><td class="p-2">O(1) ✓</td><td class="p-2">O(n) ✗</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert at beginning</td><td class="p-2">O(n)</td><td class="p-2">O(1) ✓</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert at middle</td><td class="p-2">O(n)</td><td class="p-2">O(1)*</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Delete at beginning</td><td class="p-2">O(n)</td><td class="p-2">O(1) ✓</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Memory</td><td class="p-2">Contiguous</td><td class="p-2">Scattered</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Extra space per element</td><td class="p-2">None</td><td class="p-2">1 pointer (4-8 bytes)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Size</td><td class="p-2">Fixed or resize</td><td class="p-2">Dynamic (grows freely)</td></tr>
			<tr><td class="p-2">Cache performance</td><td class="p-2">Excellent</td><td class="p-2">Poor (scattered)</td></tr>
		</tbody>
	</table>
	<p class="text-sm text-gray-500 mt-1">* O(1) insert/delete at a position assumes you already have a pointer to that position. Finding the position is O(n).</p>
</section>

<section class="theory-section" id="singly-ll">
	<h2>2. Singly Linked List — All Operations</h2>

	<h3>Node Structure & Creation</h3>
<pre><code>struct Node {
    int data;
    Node *next;
};

// Create a linked list from an array
Node* createList(int A[], int n) {
    Node *head = new Node();
    head-&gt;data = A[0];
    head-&gt;next = nullptr;
    
    Node *tail = head;
    for (int i = 1; i &lt; n; i++) {
        Node *newNode = new Node();
        newNode-&gt;data = A[i];
        newNode-&gt;next = nullptr;
        tail-&gt;next = newNode;
        tail = newNode;
    }
    return head;
}
// head→[10]→[20]→[30]→[40]→NULL</code></pre>

	<h3>Display & Count — O(n)</h3>
<pre><code>// Iterative display
void display(Node *p) {
    while (p != nullptr) {
        cout &lt;&lt; p-&gt;data &lt;&lt; " → ";
        p = p-&gt;next;
    }
    cout &lt;&lt; "NULL" &lt;&lt; endl;
}

// Recursive display
void displayRec(Node *p) {
    if (p == nullptr) { cout &lt;&lt; "NULL" &lt;&lt; endl; return; }
    cout &lt;&lt; p-&gt;data &lt;&lt; " → ";
    displayRec(p-&gt;next);
}

// Count nodes
int count(Node *p) {
    int c = 0;
    while (p) { c++; p = p-&gt;next; }
    return c;
}

// Sum of all elements
int sum(Node *p) {
    int s = 0;
    while (p) { s += p-&gt;data; p = p-&gt;next; }
    return s;
}</code></pre>

	<h3>Search — O(n)</h3>
<pre><code>// Linear search (only option — no random access!)
Node* search(Node *p, int key) {
    while (p) {
        if (p-&gt;data == key) return p;
        p = p-&gt;next;
    }
    return nullptr;  // not found
}

// Move-to-front optimization
Node* searchMoveToFront(Node **head, int key) {
    Node *p = *head, *prev = nullptr;
    while (p) {
        if (p-&gt;data == key) {
            if (prev) {
                prev-&gt;next = p-&gt;next;
                p-&gt;next = *head;
                *head = p;
            }
            return p;
        }
        prev = p;
        p = p-&gt;next;
    }
    return nullptr;
}</code></pre>

	<h3>Insert — O(1) at head, O(n) at position</h3>
<pre><code>// Insert at beginning — O(1)
void insertFirst(Node **head, int val) {
    Node *newNode = new Node();
    newNode-&gt;data = val;
    newNode-&gt;next = *head;
    *head = newNode;
}
// Before: head→[20]→[30]→NULL
// After:  head→[10]→[20]→[30]→NULL

// Insert at end — O(n) without tail pointer, O(1) with tail
void insertLast(Node **head, int val) {
    Node *newNode = new Node();
    newNode-&gt;data = val;
    newNode-&gt;next = nullptr;
    
    if (*head == nullptr) { *head = newNode; return; }
    
    Node *p = *head;
    while (p-&gt;next != nullptr)
        p = p-&gt;next;
    p-&gt;next = newNode;
}

// Insert at position (0-indexed) — O(n)
void insertAt(Node **head, int pos, int val) {
    if (pos == 0) { insertFirst(head, val); return; }
    
    Node *p = *head;
    for (int i = 0; i &lt; pos - 1 &amp;&amp; p; i++)
        p = p-&gt;next;
    
    if (p) {
        Node *newNode = new Node();
        newNode-&gt;data = val;
        newNode-&gt;next = p-&gt;next;
        p-&gt;next = newNode;
    }
}
// Insert 25 at position 2:
// Before: [10]→[20]→[30]→[40]
// After:  [10]→[20]→[25]→[30]→[40]</code></pre>

	<h3>Delete — O(1) at head, O(n) at position</h3>
<pre><code>// Delete first node — O(1)
int deleteFirst(Node **head) {
    if (*head == nullptr) return -1;
    Node *p = *head;
    int val = p-&gt;data;
    *head = p-&gt;next;
    delete p;
    return val;
}

// Delete at position — O(n)
int deleteAt(Node **head, int pos) {
    if (*head == nullptr) return -1;
    if (pos == 0) return deleteFirst(head);
    
    Node *p = *head;
    for (int i = 0; i &lt; pos - 1 &amp;&amp; p-&gt;next; i++)
        p = p-&gt;next;
    
    if (p-&gt;next) {
        Node *toDelete = p-&gt;next;
        int val = toDelete-&gt;data;
        p-&gt;next = toDelete-&gt;next;
        delete toDelete;
        return val;
    }
    return -1;
}

// Delete by value — O(n)
int deleteByValue(Node **head, int key) {
    if (*head == nullptr) return -1;
    if ((*head)-&gt;data == key) return deleteFirst(head);
    
    Node *p = *head;
    while (p-&gt;next &amp;&amp; p-&gt;next-&gt;data != key)
        p = p-&gt;next;
    
    if (p-&gt;next) {
        Node *toDelete = p-&gt;next;
        p-&gt;next = toDelete-&gt;next;
        delete toDelete;
        return key;
    }
    return -1;
}</code></pre>

	<h3>Reverse — O(n)</h3>
<pre><code>// Iterative reverse using 3 pointers — O(n) time, O(1) space
Node* reverse(Node *head) {
    Node *prev = nullptr, *curr = head, *next = nullptr;
    while (curr) {
        next = curr-&gt;next;     // save next
        curr-&gt;next = prev;     // reverse link
        prev = curr;            // advance prev
        curr = next;            // advance curr
    }
    return prev;  // new head
}

// Recursive reverse
Node* reverseRec(Node *prev, Node *curr) {
    if (curr == nullptr) return prev;
    Node *next = curr-&gt;next;
    curr-&gt;next = prev;
    return reverseRec(curr, next);
}
// Usage: head = reverseRec(nullptr, head);</code></pre>

	<div class="important-box">
		<strong>Interview Classic:</strong> Reversing a linked list is one of the most common interview questions. Master both iterative (3 pointers) and recursive approaches. The key insight: at each step, you only need prev, curr, and next.
	</div>

	<h3>Sort (Insertion Sort) — O(n²)</h3>
<pre><code>// Check if sorted
bool isSorted(Node *p) {
    while (p &amp;&amp; p-&gt;next) {
        if (p-&gt;data &gt; p-&gt;next-&gt;data) return false;
        p = p-&gt;next;
    }
    return true;
}

// Insert into sorted position
void insertSorted(Node **head, int val) {
    Node *newNode = new Node();
    newNode-&gt;data = val;
    
    if (*head == nullptr || val &lt; (*head)-&gt;data) {
        newNode-&gt;next = *head;
        *head = newNode;
        return;
    }
    
    Node *p = *head;
    while (p-&gt;next &amp;&amp; p-&gt;next-&gt;data &lt; val)
        p = p-&gt;next;
    
    newNode-&gt;next = p-&gt;next;
    p-&gt;next = newNode;
}</code></pre>

	<h3>Remove Duplicates from Sorted List — O(n)</h3>
<pre><code>void removeDuplicates(Node *head) {
    Node *p = head;
    while (p &amp;&amp; p-&gt;next) {
        if (p-&gt;data == p-&gt;next-&gt;data) {
            Node *dup = p-&gt;next;
            p-&gt;next = dup-&gt;next;
            delete dup;
        } else {
            p = p-&gt;next;
        }
    }
}
// [3]→[3]→[5]→[5]→[5]→[8] becomes [3]→[5]→[8]</code></pre>

	<h3>Merge Two Sorted Lists — O(m + n)</h3>
<pre><code>Node* mergeSorted(Node *a, Node *b) {
    if (!a) return b;
    if (!b) return a;
    
    Node *head, *tail;
    if (a-&gt;data &lt;= b-&gt;data) { head = tail = a; a = a-&gt;next; }
    else { head = tail = b; b = b-&gt;next; }
    
    while (a &amp;&amp; b) {
        if (a-&gt;data &lt;= b-&gt;data) { tail-&gt;next = a; tail = a; a = a-&gt;next; }
        else { tail-&gt;next = b; tail = b; b = b-&gt;next; }
    }
    tail-&gt;next = (a) ? a : b;
    return head;
}</code></pre>

	<h3>Detect Loop (Floyd's Cycle Detection) — O(n)</h3>
<pre><code>// Use slow (1 step) and fast (2 steps) pointers
// If they meet → loop exists
bool hasLoop(Node *head) {
    Node *slow = head, *fast = head;
    while (fast &amp;&amp; fast-&gt;next) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
        if (slow == fast) return true;
    }
    return false;
}

// Find the START of the loop
Node* findLoopStart(Node *head) {
    Node *slow = head, *fast = head;
    while (fast &amp;&amp; fast-&gt;next) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
        if (slow == fast) break;
    }
    if (!fast || !fast-&gt;next) return nullptr;  // no loop
    
    slow = head;  // reset slow to head
    while (slow != fast) {
        slow = slow-&gt;next;
        fast = fast-&gt;next;  // both move 1 step now
    }
    return slow;  // meeting point = loop start
}</code></pre>

	<h3>Find Middle Node — O(n)</h3>
<pre><code>// Slow-fast pointer technique
Node* findMiddle(Node *head) {
    Node *slow = head, *fast = head;
    while (fast &amp;&amp; fast-&gt;next) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
    }
    return slow;  // slow is at the middle when fast reaches end
}
// [1]→[2]→[3]→[4]→[5] → middle is [3]
// [1]→[2]→[3]→[4] → middle is [3] (second of two middles)</code></pre>
</section>

<section class="theory-section" id="circular-ll">
	<h2>3. Circular Linked List</h2>
	<div class="definition-box">
		<strong>Circular Linked List:</strong> The last node points <strong>back to the head</strong> instead of NULL. No node has a NULL next pointer. Useful for round-robin scheduling, circular buffers, and multiplayer game turns.
	</div>

<pre><code>// Circular: [10]→[20]→[30]→[40]→(back to [10])
//             ↑__________________________|

// Display (must detect full loop)
void displayCircular(Node *head) {
    if (!head) return;
    Node *p = head;
    do {
        cout &lt;&lt; p-&gt;data &lt;&lt; " → ";
        p = p-&gt;next;
    } while (p != head);
    cout &lt;&lt; "(head)" &lt;&lt; endl;
}

// Insert at head of circular list
void insertFirstCircular(Node **head, int val) {
    Node *newNode = new Node();
    newNode-&gt;data = val;
    
    if (*head == nullptr) {
        *head = newNode;
        newNode-&gt;next = newNode;  // points to itself
        return;
    }
    
    // Find the last node
    Node *tail = *head;
    while (tail-&gt;next != *head)
        tail = tail-&gt;next;
    
    newNode-&gt;next = *head;
    tail-&gt;next = newNode;
    *head = newNode;
}

// Delete from head
int deleteFirstCircular(Node **head) {
    if (!*head) return -1;
    
    Node *p = *head;
    int val = p-&gt;data;
    
    if (p-&gt;next == p) {  // only one node
        *head = nullptr;
    } else {
        Node *tail = *head;
        while (tail-&gt;next != *head)
            tail = tail-&gt;next;
        *head = p-&gt;next;
        tail-&gt;next = *head;
    }
    delete p;
    return val;
}</code></pre>
</section>

<section class="theory-section" id="doubly-ll">
	<h2>4. Doubly Linked List</h2>
	<div class="definition-box">
		<strong>Doubly Linked List:</strong> Each node has <strong>two pointers</strong> — one to the next node and one to the previous node. Allows traversal in <strong>both directions</strong>. Delete is O(1) given a pointer to the node (no need to find previous).
	</div>

<pre><code>struct DNode {
    int data;
    DNode *prev;
    DNode *next;
};

// NULL←[10]⇄[20]⇄[30]⇄[40]→NULL

// Insert at beginning — O(1)
void insertFirstDLL(DNode **head, int val) {
    DNode *newNode = new DNode();
    newNode-&gt;data = val;
    newNode-&gt;prev = nullptr;
    newNode-&gt;next = *head;
    if (*head) (*head)-&gt;prev = newNode;
    *head = newNode;
}

// Insert after a given node — O(1)
void insertAfter(DNode *p, int val) {
    if (!p) return;
    DNode *newNode = new DNode();
    newNode-&gt;data = val;
    newNode-&gt;next = p-&gt;next;
    newNode-&gt;prev = p;
    if (p-&gt;next) p-&gt;next-&gt;prev = newNode;
    p-&gt;next = newNode;
}

// Delete a node — O(1) given the node pointer!
int deleteDNode(DNode **head, DNode *p) {
    if (!p) return -1;
    int val = p-&gt;data;
    
    if (p-&gt;prev) p-&gt;prev-&gt;next = p-&gt;next;
    else *head = p-&gt;next;  // deleting head
    
    if (p-&gt;next) p-&gt;next-&gt;prev = p-&gt;prev;
    
    delete p;
    return val;
}

// Reverse — swap prev and next for every node
DNode* reverseDLL(DNode *head) {
    DNode *p = head, *temp = nullptr;
    while (p) {
        temp = p-&gt;prev;
        p-&gt;prev = p-&gt;next;
        p-&gt;next = temp;
        p = p-&gt;prev;  // move forward (prev is now next)
    }
    return (temp) ? temp-&gt;prev : head;
}</code></pre>

	<h3>Doubly Linked List vs Singly</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Singly</th>
				<th class="text-left p-2 text-gray-400">Doubly</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Traversal</td><td class="p-2">Forward only</td><td class="p-2">Both directions</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Delete given node</td><td class="p-2">O(n) — need prev</td><td class="p-2">O(1) — has prev pointer</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Space per node</td><td class="p-2">1 pointer</td><td class="p-2">2 pointers</td></tr>
			<tr><td class="p-2">Insert before node</td><td class="p-2">O(n)</td><td class="p-2">O(1)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="ll-classic-problems">
	<h2>5. Classic Linked List Interview Problems</h2>

	<h3>Find Nth Node from End — O(n)</h3>
<pre><code>// Two-pointer technique: advance fast by n, then move both
Node* nthFromEnd(Node *head, int n) {
    Node *fast = head, *slow = head;
    for (int i = 0; i &lt; n; i++) {
        if (!fast) return nullptr;
        fast = fast-&gt;next;
    }
    while (fast) {
        slow = slow-&gt;next;
        fast = fast-&gt;next;
    }
    return slow;
}
// For 3rd from end of [1]→[2]→[3]→[4]→[5]:
// fast starts at [4], then both move → slow ends at [3]</code></pre>

	<h3>Check if Linked List is a Palindrome — O(n)</h3>
<pre><code>bool isPalindromeLL(Node *head) {
    // 1. Find middle using slow/fast
    Node *slow = head, *fast = head;
    while (fast &amp;&amp; fast-&gt;next) {
        slow = slow-&gt;next;
        fast = fast-&gt;next-&gt;next;
    }
    
    // 2. Reverse second half
    Node *prev = nullptr, *curr = slow;
    while (curr) {
        Node *next = curr-&gt;next;
        curr-&gt;next = prev;
        prev = curr;
        curr = next;
    }
    
    // 3. Compare first half with reversed second half
    Node *p1 = head, *p2 = prev;
    while (p2) {
        if (p1-&gt;data != p2-&gt;data) return false;
        p1 = p1-&gt;next;
        p2 = p2-&gt;next;
    }
    return true;
}
// [1]→[2]→[3]→[2]→[1] → YES (palindrome)</code></pre>

	<h3>Find Intersection of Two Lists</h3>
<pre><code>// Two lists may merge at some node
// Find that intersection node
Node* findIntersection(Node *a, Node *b) {
    int lenA = count(a), lenB = count(b);
    int diff = abs(lenA - lenB);
    
    // Advance the longer list by diff
    Node *longer = (lenA &gt; lenB) ? a : b;
    Node *shorter = (lenA &gt; lenB) ? b : a;
    for (int i = 0; i &lt; diff; i++) longer = longer-&gt;next;
    
    // Now move both until they meet
    while (longer &amp;&amp; shorter) {
        if (longer == shorter) return longer;
        longer = longer-&gt;next;
        shorter = shorter-&gt;next;
    }
    return nullptr;
}</code></pre>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Singly LL</strong>: each node has data + next pointer. Insert/delete at head is O(1). At position is O(n).</li>
			<li>• <strong>Circular LL</strong>: last node points to head. Good for round-robin. Must detect full traversal with do-while.</li>
			<li>• <strong>Doubly LL</strong>: each node has prev + next. Delete given node is O(1). Costs extra pointer per node.</li>
			<li>• <strong>Reverse</strong>: 3 pointers (prev, curr, next). Most common interview question.</li>
			<li>• <strong>Floyd's cycle detection</strong>: slow (1 step) + fast (2 steps). If they meet → loop.</li>
			<li>• <strong>Find middle</strong>: slow/fast pointers. When fast reaches end, slow is at middle.</li>
			<li>• <strong>Merge sorted lists</strong>: two-pointer merge, O(m+n).</li>
			<li>• <strong>Nth from end</strong>: advance fast by n, then move both.</li>
			<li>• <strong>Palindrome check</strong>: find middle, reverse second half, compare.</li>
			<li>• Arrays = fast access, LL = fast insert/delete. Choose based on your operation pattern.</li>
		</ul>
	</div>
</section>
`;
