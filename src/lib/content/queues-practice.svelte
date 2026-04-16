<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Queues</h2>
		<p class="text-gray-400">Build queues from scratch and solve classic queue-based problems.</p>
	</div>

	<div>
		<h3>Practice 1: Queue using Array</h3>
		<p class="text-gray-400 text-sm mb-3">Build a simple queue and observe the wasted space problem.</p>
		<CodePlayground
			title="Simple Array Queue"
			initialCode={`#include <iostream>
using namespace std;

class Queue {
    int *arr;
    int front, rear, capacity;
public:
    Queue(int size) : capacity(size), front(0), rear(-1) {
        arr = new int[capacity];
    }
    void enqueue(int x) {
        if (rear == capacity - 1) { cout << "Queue Full!" << endl; return; }
        arr[++rear] = x;
    }
    int dequeue() {
        if (isEmpty()) { cout << "Queue Empty!" << endl; return -1; }
        return arr[front++];
    }
    int peek() { return isEmpty() ? -1 : arr[front]; }
    bool isEmpty() { return front > rear; }
    int size() { return rear - front + 1; }
    void display() {
        cout << "Queue (front->rear): ";
        for (int i = front; i <= rear; i++) cout << arr[i] << " ";
        cout << "  [front=" << front << " rear=" << rear << "]" << endl;
    }
    ~Queue() { delete[] arr; }
};

int main() {
    Queue q(5);
    q.enqueue(10); q.enqueue(20); q.enqueue(30);
    q.display();

    cout << "Dequeue: " << q.dequeue() << endl;
    cout << "Dequeue: " << q.dequeue() << endl;
    q.display();

    q.enqueue(40); q.enqueue(50);
    q.display();

    // Try to enqueue more — rear hits capacity!
    q.enqueue(60);  // "Queue Full!" even though indices 0,1 are unused!
    cout << "\\n** Space at front is WASTED! Need circular queue. **" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Circular Queue</h3>
		<p class="text-gray-400 text-sm mb-3">Wrap around with modulo to reuse space — no waste!</p>
		<CodePlayground
			title="Circular Queue"
			initialCode={`#include <iostream>
using namespace std;

class CircularQueue {
    int *arr;
    int front, rear, capacity, count;
public:
    CircularQueue(int size) : capacity(size), front(0), rear(-1), count(0) {
        arr = new int[capacity];
    }
    void enqueue(int x) {
        if (isFull()) { cout << "Full!" << endl; return; }
        rear = (rear + 1) % capacity;
        arr[rear] = x;
        count++;
    }
    int dequeue() {
        if (isEmpty()) { cout << "Empty!" << endl; return -1; }
        int val = arr[front];
        front = (front + 1) % capacity;
        count--;
        return val;
    }
    int peek() { return isEmpty() ? -1 : arr[front]; }
    bool isEmpty() { return count == 0; }
    bool isFull() { return count == capacity; }
    void display() {
        cout << "Queue: ";
        int idx = front;
        for (int i = 0; i < count; i++) {
            cout << arr[idx] << " ";
            idx = (idx + 1) % capacity;
        }
        cout << "  [size=" << count << "/" << capacity << "]" << endl;
    }
    ~CircularQueue() { delete[] arr; }
};

int main() {
    CircularQueue q(5);
    q.enqueue(10); q.enqueue(20); q.enqueue(30);
    q.enqueue(40); q.enqueue(50);
    q.display();

    cout << "Dequeue: " << q.dequeue() << endl;
    cout << "Dequeue: " << q.dequeue() << endl;
    cout << "Dequeue: " << q.dequeue() << endl;
    q.display();

    // Now we can enqueue again — space is reused!
    q.enqueue(60); q.enqueue(70); q.enqueue(80);
    q.display();
    cout << "** Space reused! No waste. **" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Queue using Linked List</h3>
		<p class="text-gray-400 text-sm mb-3">Dynamic queue with no size limit using front and rear pointers.</p>
		<CodePlayground
			title="Linked List Queue"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

class QueueLL {
    Node *front, *rear;
    int count;
public:
    QueueLL() : front(nullptr), rear(nullptr), count(0) {}

    void enqueue(int x) {
        Node *n = new Node{x, nullptr};
        if (!rear) { front = rear = n; }
        else { rear->next = n; rear = n; }
        count++;
    }
    int dequeue() {
        if (!front) { cout << "Empty!" << endl; return -1; }
        Node *temp = front;
        int val = temp->data;
        front = front->next;
        if (!front) rear = nullptr;
        delete temp;
        count--;
        return val;
    }
    int peek() { return front ? front->data : -1; }
    bool isEmpty() { return front == nullptr; }
    int size() { return count; }
    void display() {
        cout << "Queue: ";
        Node *p = front;
        while (p) { cout << p->data << " "; p = p->next; }
        cout << "(size=" << count << ")" << endl;
    }
    ~QueueLL() { while (front) dequeue(); }
};

int main() {
    QueueLL q;
    q.enqueue(10); q.enqueue(20); q.enqueue(30);
    q.display();

    cout << "Dequeue: " << q.dequeue() << endl;
    q.enqueue(40); q.enqueue(50);
    q.display();

    cout << "Front: " << q.peek() << endl;
    cout << "Size: " << q.size() << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: DEQueue (Double-Ended Queue)</h3>
		<p class="text-gray-400 text-sm mb-3">Insert and delete from both ends — can act as both stack and queue.</p>
		<CodePlayground
			title="Deque — Double-Ended Queue"
			initialCode={`#include <iostream>
using namespace std;

class Deque {
    int *arr;
    int front, rear, capacity, count;
public:
    Deque(int size) : capacity(size), front(0), rear(-1), count(0) {
        arr = new int[capacity];
    }
    void enqueueRear(int x) {
        if (count == capacity) { cout << "Full!" << endl; return; }
        rear = (rear + 1) % capacity;
        arr[rear] = x;
        count++;
    }
    void enqueueFront(int x) {
        if (count == capacity) { cout << "Full!" << endl; return; }
        front = (front - 1 + capacity) % capacity;
        arr[front] = x;
        count++;
    }
    int dequeueFront() {
        if (count == 0) return -1;
        int val = arr[front];
        front = (front + 1) % capacity;
        count--;
        return val;
    }
    int dequeueRear() {
        if (count == 0) return -1;
        int val = arr[rear];
        rear = (rear - 1 + capacity) % capacity;
        count--;
        return val;
    }
    void display() {
        cout << "Deque: ";
        int idx = front;
        for (int i = 0; i < count; i++) {
            cout << arr[idx] << " ";
            idx = (idx + 1) % capacity;
        }
        cout << endl;
    }
    ~Deque() { delete[] arr; }
};

int main() {
    Deque dq(8);

    // Use as queue
    dq.enqueueRear(10); dq.enqueueRear(20); dq.enqueueRear(30);
    cout << "After enqueue rear 10,20,30: "; dq.display();

    // Insert at front
    dq.enqueueFront(5);
    cout << "After enqueue front 5: "; dq.display();

    // Remove from both ends
    cout << "Dequeue front: " << dq.dequeueFront() << endl;
    cout << "Dequeue rear: " << dq.dequeueRear() << endl;
    dq.display();

    // Use as stack (push/pop from same end)
    cout << "\\n--- Using as Stack ---" << endl;
    dq.enqueueRear(100); dq.enqueueRear(200);
    cout << "Push 100, 200: "; dq.display();
    cout << "Pop: " << dq.dequeueRear() << endl;
    dq.display();

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Priority Queue (Sorted Array)</h3>
		<p class="text-gray-400 text-sm mb-3">Elements dequeued by priority, not insertion order.</p>
		<CodePlayground
			title="Priority Queue"
			initialCode={`#include <iostream>
using namespace std;

class PriorityQueue {
    int *arr;
    int count, capacity;
public:
    PriorityQueue(int size) : capacity(size), count(0) {
        arr = new int[capacity];
    }
    void enqueue(int x) {
        if (count == capacity) { cout << "Full!" << endl; return; }
        // Insert in sorted order (ascending = min-priority)
        int i = count - 1;
        while (i >= 0 && arr[i] > x) {
            arr[i + 1] = arr[i];
            i--;
        }
        arr[i + 1] = x;
        count++;
    }
    int dequeue() {
        if (count == 0) return -1;
        int val = arr[0];  // smallest = highest priority
        for (int i = 0; i < count - 1; i++)
            arr[i] = arr[i + 1];
        count--;
        return val;
    }
    void display() {
        cout << "PQ: ";
        for (int i = 0; i < count; i++) cout << arr[i] << " ";
        cout << endl;
    }
    ~PriorityQueue() { delete[] arr; }
};

int main() {
    PriorityQueue pq(10);

    pq.enqueue(30);
    pq.enqueue(10);
    pq.enqueue(50);
    pq.enqueue(20);
    pq.enqueue(40);
    cout << "After inserting 30,10,50,20,40:" << endl;
    pq.display();

    cout << "\\nDequeue order (by priority):" << endl;
    while (true) {
        int val = pq.dequeue();
        if (val == -1) break;
        cout << val << " ";
    }
    cout << endl;
    cout << "** Elements come out in sorted order! **" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Generate Binary Numbers 1 to N</h3>
		<p class="text-gray-400 text-sm mb-3">Use a queue to generate binary representations — each number spawns two children.</p>
		<CodePlayground
			title="Generate Binary Numbers using Queue"
			initialCode={`#include <iostream>
#include <queue>
#include <string>
using namespace std;

void generateBinary(int n) {
    queue<string> q;
    q.push("1");

    for (int i = 1; i <= n; i++) {
        string s = q.front();
        q.pop();
        cout << i << " -> " << s << endl;
        q.push(s + "0");
        q.push(s + "1");
    }
}

int main() {
    cout << "Binary numbers 1 to 16:" << endl;
    generateBinary(16);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 7: Implement Stack using Two Queues</h3>
		<p class="text-gray-400 text-sm mb-3">A classic interview question — simulate LIFO using two FIFO queues.</p>
		<CodePlayground
			title="Stack using Two Queues"
			initialCode={`#include <iostream>
#include <queue>
using namespace std;

class StackUsingQueues {
    queue<int> q1, q2;
public:
    // Push: O(n) — move all to q2, push new to q1, move back
    void push(int x) {
        // Move everything from q1 to q2
        while (!q1.empty()) {
            q2.push(q1.front());
            q1.pop();
        }
        // Push new element to q1 (it's now at front)
        q1.push(x);
        // Move everything back from q2 to q1
        while (!q2.empty()) {
            q1.push(q2.front());
            q2.pop();
        }
    }

    // Pop: O(1) — front of q1 is the most recently pushed
    int pop() {
        if (q1.empty()) return -1;
        int val = q1.front();
        q1.pop();
        return val;
    }

    int top() { return q1.empty() ? -1 : q1.front(); }
    bool isEmpty() { return q1.empty(); }
};

int main() {
    StackUsingQueues s;
    s.push(10); s.push(20); s.push(30);
    cout << "Top: " << s.top() << endl;        // 30 (LIFO!)
    cout << "Pop: " << s.pop() << endl;         // 30
    cout << "Pop: " << s.pop() << endl;         // 20
    s.push(40);
    cout << "Top: " << s.top() << endl;         // 40
    cout << "Pop: " << s.pop() << endl;         // 40
    cout << "Pop: " << s.pop() << endl;         // 10
    cout << "Empty: " << s.isEmpty() << endl;   // 1

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Implement Queue using Two Stacks</h3>
		<p class="text-gray-400 text-sm mb-3">The reverse problem — simulate FIFO using two LIFO stacks.</p>
		<CodePlayground
			title="Queue using Two Stacks — Try It Yourself"
			initialCode={`#include <iostream>
#include <stack>
using namespace std;

class QueueUsingStacks {
    stack<int> s1, s2;  // s1 for enqueue, s2 for dequeue
public:
    // TODO: Enqueue — just push to s1
    void enqueue(int x) {
        // YOUR CODE HERE
    }

    // TODO: Dequeue — if s2 empty, move all from s1 to s2, then pop s2
    // Moving from s1 to s2 reverses the order → FIFO!
    int dequeue() {
        // YOUR CODE HERE
        return -1;
    }
};

int main() {
    QueueUsingStacks q;
    q.enqueue(10); q.enqueue(20); q.enqueue(30);
    cout << q.dequeue() << endl;  // expect 10 (FIFO)
    cout << q.dequeue() << endl;  // expect 20
    q.enqueue(40);
    cout << q.dequeue() << endl;  // expect 30
    cout << q.dequeue() << endl;  // expect 40
    return 0;
}`}
		/>
	</div>
</div>
