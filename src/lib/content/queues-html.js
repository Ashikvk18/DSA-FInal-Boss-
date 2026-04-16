export const theoryHTML = `
<section class="theory-section" id="queue-intro">
	<h2>1. What is a Queue?</h2>
	<div class="definition-box">
		<strong>Queue:</strong> A linear data structure that follows the <strong>FIFO</strong> (First In, First Out) principle. Elements are added at the <strong>rear</strong> (enqueue) and removed from the <strong>front</strong> (dequeue). Think of a line at a ticket counter — first person in line gets served first.
	</div>

<pre><code>// Queue operations:
// enqueue(x) — add element at the rear       O(1)
// dequeue()  — remove element from the front  O(1)
// front()    — peek at the front element      O(1)
// isEmpty()  — check if queue is empty        O(1)
// isFull()   — check if full (array-based)    O(1)

// Visual:
//   enqueue(10) enqueue(20) enqueue(30) dequeue()
//   Front→[10]  Front→[10,20] Front→[10,20,30]  Front→[20,30]
//                                                 (10 removed)

// Comparison:
// Stack = LIFO (plates)     — push/pop from same end
// Queue = FIFO (line/queue) — add at back, remove from front</code></pre>

	<h3>Real-World Uses of Queues</h3>
	<ul class="list-disc pl-6 text-gray-300 space-y-1">
		<li><strong>BFS</strong> (Breadth-First Search) — explores level by level</li>
		<li><strong>CPU scheduling</strong> — processes wait in a ready queue</li>
		<li><strong>Print spooler</strong> — documents printed in order submitted</li>
		<li><strong>Web server</strong> — handles requests in order of arrival</li>
		<li><strong>Buffering</strong> — keyboard buffer, network packet queue</li>
		<li><strong>Level-order tree traversal</strong></li>
	</ul>
</section>

<section class="theory-section" id="queue-array">
	<h2>2. Queue using Array (Simple)</h2>
<pre><code>class Queue {
    int *arr;
    int front, rear, capacity;
public:
    Queue(int size) : capacity(size), front(0), rear(-1) {
        arr = new int[capacity];
    }
    
    void enqueue(int x) {
        if (rear == capacity - 1) {
            cout &lt;&lt; "Queue Full!" &lt;&lt; endl;
            return;
        }
        arr[++rear] = x;
    }
    
    int dequeue() {
        if (isEmpty()) {
            cout &lt;&lt; "Queue Empty!" &lt;&lt; endl;
            return -1;
        }
        return arr[front++];
    }
    
    int peek() {
        if (isEmpty()) return -1;
        return arr[front];
    }
    
    bool isEmpty() { return front &gt; rear; }
    int size()     { return rear - front + 1; }
    
    ~Queue() { delete[] arr; }
};

// PROBLEM: After several enqueue/dequeue cycles,
// front moves forward and space at the beginning is WASTED.
// Even though array has room, rear hits capacity → "full"
// 
// [_, _, _, 40, 50]  front=3, rear=4
//  wasted!  wasted!
//
// Solution: Circular Queue!</code></pre>
</section>

<section class="theory-section" id="circular-queue">
	<h2>3. Circular Queue</h2>
	<div class="definition-box">
		<strong>Circular Queue:</strong> The array wraps around — when rear reaches the end, it continues from index 0. This eliminates the wasted space problem of simple queues. Uses modulo arithmetic: <code>next = (current + 1) % capacity</code>.
	</div>

<pre><code>class CircularQueue {
    int *arr;
    int front, rear, capacity, count;
public:
    CircularQueue(int size) : capacity(size), front(0), rear(-1), count(0) {
        arr = new int[capacity];
    }
    
    void enqueue(int x) {
        if (isFull()) {
            cout &lt;&lt; "Queue Full!" &lt;&lt; endl;
            return;
        }
        rear = (rear + 1) % capacity;  // wrap around!
        arr[rear] = x;
        count++;
    }
    
    int dequeue() {
        if (isEmpty()) {
            cout &lt;&lt; "Queue Empty!" &lt;&lt; endl;
            return -1;
        }
        int val = arr[front];
        front = (front + 1) % capacity;  // wrap around!
        count--;
        return val;
    }
    
    int peek()     { return isEmpty() ? -1 : arr[front]; }
    bool isEmpty() { return count == 0; }
    bool isFull()  { return count == capacity; }
    int size()     { return count; }
    
    ~CircularQueue() { delete[] arr; }
};

// Visual (capacity = 5):
// After enqueue 10,20,30,40,50: [10,20,30,40,50] full
// dequeue x3: [_,_,_,40,50]   front=3
// enqueue 60: [60,_,_,40,50]  rear wraps to 0!
// enqueue 70: [60,70,_,40,50] rear=1
// Space is reused — no waste!</code></pre>

	<div class="important-box">
		<strong>Key Insight:</strong> The modulo operation <code>% capacity</code> is what makes it circular. When index reaches the end, it wraps back to 0. This is the same concept behind circular buffers in operating systems and network programming.
	</div>
</section>

<section class="theory-section" id="queue-ll">
	<h2>4. Queue using Linked List</h2>
<pre><code>struct Node {
    int data;
    Node *next;
};

class QueueLL {
    Node *front, *rear;
    int count;
public:
    QueueLL() : front(nullptr), rear(nullptr), count(0) {}
    
    void enqueue(int x) {
        Node *newNode = new Node{x, nullptr};
        if (rear == nullptr) {
            front = rear = newNode;
        } else {
            rear-&gt;next = newNode;
            rear = newNode;
        }
        count++;
    }
    // Enqueue = insert at tail → O(1) with rear pointer
    
    int dequeue() {
        if (isEmpty()) {
            cout &lt;&lt; "Queue Empty!" &lt;&lt; endl;
            return -1;
        }
        Node *temp = front;
        int val = temp-&gt;data;
        front = front-&gt;next;
        if (front == nullptr) rear = nullptr;  // queue became empty
        delete temp;
        count--;
        return val;
    }
    // Dequeue = delete from head → O(1)
    
    int peek()     { return front ? front-&gt;data : -1; }
    bool isEmpty() { return front == nullptr; }
    int size()     { return count; }
    
    ~QueueLL() { while (front) dequeue(); }
};

// No size limit — grows dynamically
// No wasted space — no circular logic needed
// Trade-off: pointer overhead per node</code></pre>
</section>

<section class="theory-section" id="deque">
	<h2>5. DEQueue (Double-Ended Queue)</h2>
	<div class="definition-box">
		<strong>DEQueue (Deque):</strong> A queue that supports insertion and deletion at <strong>both ends</strong> — front and rear. It generalizes both stack and queue. Two types:<br>
		• <strong>Input-restricted:</strong> Insert at one end only, delete from both<br>
		• <strong>Output-restricted:</strong> Delete from one end only, insert at both
	</div>

<pre><code>// Deque operations:
// enqueueFront(x)  — insert at front     O(1)
// enqueueRear(x)   — insert at rear      O(1)
// dequeueFront()   — remove from front   O(1)
// dequeueRear()    — remove from rear    O(1)

class Deque {
    int *arr;
    int front, rear, capacity, count;
public:
    Deque(int size) : capacity(size), front(0), rear(-1), count(0) {
        arr = new int[capacity];
    }
    
    void enqueueRear(int x) {
        if (isFull()) return;
        rear = (rear + 1) % capacity;
        arr[rear] = x;
        count++;
    }
    
    void enqueueFront(int x) {
        if (isFull()) return;
        front = (front - 1 + capacity) % capacity;  // wrap backwards
        arr[front] = x;
        count++;
    }
    
    int dequeueFront() {
        if (isEmpty()) return -1;
        int val = arr[front];
        front = (front + 1) % capacity;
        count--;
        return val;
    }
    
    int dequeueRear() {
        if (isEmpty()) return -1;
        int val = arr[rear];
        rear = (rear - 1 + capacity) % capacity;  // wrap backwards
        count--;
        return val;
    }
    
    bool isEmpty() { return count == 0; }
    bool isFull()  { return count == capacity; }
    
    ~Deque() { delete[] arr; }
};

// Use as Stack: enqueueFront + dequeueFront (or rear+rear)
// Use as Queue: enqueueRear + dequeueFront
// C++ STL: std::deque&lt;int&gt;</code></pre>
</section>

<section class="theory-section" id="priority-queue">
	<h2>6. Priority Queue</h2>
	<div class="definition-box">
		<strong>Priority Queue:</strong> Each element has a <strong>priority</strong>. The element with the highest (or lowest) priority is dequeued first, regardless of insertion order. NOT a simple FIFO queue.
	</div>

<pre><code>// Two types:
// Max Priority Queue: largest element dequeued first
// Min Priority Queue: smallest element dequeued first

// Implementation options:
// 1. Unsorted Array:  enqueue O(1), dequeue O(n) — must scan for max
// 2. Sorted Array:    enqueue O(n), dequeue O(1) — already sorted
// 3. Heap (BEST):     enqueue O(log n), dequeue O(log n)

// Simple sorted array implementation:
class PriorityQueue {
    int *arr;
    int count, capacity;
public:
    PriorityQueue(int size) : capacity(size), count(0) {
        arr = new int[capacity];
    }
    
    // Insert in sorted order — O(n)
    void enqueue(int x) {
        if (count == capacity) return;
        int i = count - 1;
        while (i &gt;= 0 &amp;&amp; arr[i] &gt; x) {
            arr[i + 1] = arr[i];
            i--;
        }
        arr[i + 1] = x;
        count++;
    }
    
    // Remove smallest (front) — O(1)
    int dequeue() {
        if (count == 0) return -1;
        int val = arr[0];
        for (int i = 0; i &lt; count - 1; i++)
            arr[i] = arr[i + 1];
        count--;
        return val;
    }
    
    int peek() { return (count &gt; 0) ? arr[0] : -1; }
    bool isEmpty() { return count == 0; }
    
    ~PriorityQueue() { delete[] arr; }
};

// C++ STL: priority_queue&lt;int&gt; (max-heap by default)
//          priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; (min-heap)</code></pre>

	<h3>Priority Queue Comparison</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Implementation</th>
				<th class="text-left p-2 text-gray-400">Enqueue</th>
				<th class="text-left p-2 text-gray-400">Dequeue</th>
				<th class="text-left p-2 text-gray-400">Peek</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Unsorted Array</td><td class="p-2">O(1)</td><td class="p-2">O(n)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Sorted Array</td><td class="p-2">O(n)</td><td class="p-2">O(1)</td><td class="p-2">O(1)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Heap ✓</td><td class="p-2">O(log n)</td><td class="p-2">O(log n)</td><td class="p-2">O(1)</td></tr>
			<tr><td class="p-2">BST</td><td class="p-2">O(log n)</td><td class="p-2">O(log n)</td><td class="p-2">O(log n)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="queue-applications">
	<h2>7. Queue Applications</h2>

	<h3>BFS (Breadth-First Search)</h3>
<pre><code>// BFS explores a graph level by level using a queue
// 1. Start at source node, enqueue it
// 2. Dequeue a node, visit its unvisited neighbors, enqueue them
// 3. Repeat until queue is empty

void BFS(int graph[][10], int n, int start) {
    bool visited[10] = {false};
    queue&lt;int&gt; q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout &lt;&lt; node &lt;&lt; " ";
        
        for (int i = 0; i &lt; n; i++) {
            if (graph[node][i] == 1 &amp;&amp; !visited[i]) {
                visited[i] = true;
                q.push(i);
            }
        }
    }
}
// Queue ensures level-by-level exploration
// DFS uses a stack (or recursion) instead</code></pre>

	<h3>Generate Binary Numbers 1 to N</h3>
<pre><code>// Generate "1", "10", "11", "100", "101", ... using a queue
void generateBinary(int n) {
    queue&lt;string&gt; q;
    q.push("1");
    
    for (int i = 0; i &lt; n; i++) {
        string s = q.front();
        q.pop();
        cout &lt;&lt; s &lt;&lt; " ";
        q.push(s + "0");  // left child
        q.push(s + "1");  // right child
    }
}
// n=5: 1 10 11 100 101
// Each number generates the next two!</code></pre>

	<h3>Interleave First and Second Half of Queue</h3>
<pre><code>// Input:  [1, 2, 3, 4, 5, 6, 7, 8]
// Output: [1, 5, 2, 6, 3, 7, 4, 8]
// Interleave first half with second half

void interleave(queue&lt;int&gt; &amp;q) {
    int half = q.size() / 2;
    queue&lt;int&gt; firstHalf;
    
    // Separate first half
    for (int i = 0; i &lt; half; i++) {
        firstHalf.push(q.front());
        q.pop();
    }
    
    // Interleave
    while (!firstHalf.empty()) {
        q.push(firstHalf.front());
        firstHalf.pop();
        q.push(q.front());
        q.pop();
    }
}</code></pre>
</section>

<section class="theory-section" id="stack-vs-queue">
	<h2>8. Stack vs Queue — When to Use Which</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Stack (LIFO)</th>
				<th class="text-left p-2 text-gray-400">Queue (FIFO)</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Order</td><td class="p-2">Last In, First Out</td><td class="p-2">First In, First Out</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Add</td><td class="p-2">Push (top)</td><td class="p-2">Enqueue (rear)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Remove</td><td class="p-2">Pop (top)</td><td class="p-2">Dequeue (front)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Graph</td><td class="p-2">DFS</td><td class="p-2">BFS</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Use cases</td><td class="p-2">Undo, recursion, expression eval</td><td class="p-2">Scheduling, buffering, BFS</td></tr>
			<tr><td class="p-2">Key question</td><td class="p-2">"Process most recent first"</td><td class="p-2">"Process in order of arrival"</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Queue = FIFO</strong>. Enqueue at rear, dequeue from front — all O(1).</li>
			<li>• <strong>Simple array queue</strong> wastes space as front advances. Use <strong>circular queue</strong> with modulo.</li>
			<li>• <strong>Circular queue</strong>: next = (current + 1) % capacity. Wraps around to reuse space.</li>
			<li>• <strong>Linked list queue</strong>: front pointer for dequeue, rear pointer for enqueue. No size limit.</li>
			<li>• <strong>DEQueue (Deque)</strong>: insert/delete at both ends. Generalizes stack and queue.</li>
			<li>• <strong>Priority Queue</strong>: dequeue by priority, not order. Best with heap — O(log n) both ops.</li>
			<li>• <strong>BFS</strong> uses a queue. <strong>DFS</strong> uses a stack. This is the fundamental difference.</li>
			<li>• STL: <code>queue&lt;int&gt;</code>, <code>deque&lt;int&gt;</code>, <code>priority_queue&lt;int&gt;</code>.</li>
		</ul>
	</div>
</section>
`;
