<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Essential Concepts</h2>
		<p class="text-gray-400">Experiment with memory allocation, complexity analysis, and ADT implementations.</p>
	</div>

	<div>
		<h3>Practice 1: Stack vs Heap Memory</h3>
		<p class="text-gray-400 text-sm mb-3">Observe the difference between stack and heap allocation.</p>
		<CodePlayground
			title="Stack vs Heap Allocation"
			initialCode={`#include <iostream>
using namespace std;

int main() {
    // STACK allocation
    int a = 10;          // 4 bytes on stack
    int B[5] = {1,2,3,4,5};  // 20 bytes on stack

    cout << "Stack variable a: " << a << endl;
    cout << "Stack array B[0]: " << B[0] << endl;
    cout << "Address of a: " << &a << endl;
    cout << "Address of B: " << B << endl;

    // HEAP allocation
    int *p = new int(42);        // single int on heap
    int *arr = new int[5]{10,20,30,40,50};  // array on heap

    cout << "\\nHeap variable *p: " << *p << endl;
    cout << "Heap array arr[0]: " << arr[0] << endl;
    cout << "Address of p (stack): " << &p << endl;
    cout << "Address p points to (heap): " << p << endl;

    // MUST free heap memory
    delete p;
    delete[] arr;

    cout << "\\nHeap memory freed successfully!" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Memory Leak Demonstration</h3>
		<p class="text-gray-400 text-sm mb-3">See what happens when you forget to free heap memory.</p>
		<CodePlayground
			title="Memory Leak Example"
			initialCode={`#include <iostream>
using namespace std;

void leakyFunction() {
    int *arr = new int[1000];  // allocate on heap
    for (int i = 0; i < 1000; i++)
        arr[i] = i;
    // OOPS! Forgot delete[] arr;
    // This memory is now LEAKED - cannot be recovered
}

void properFunction() {
    int *arr = new int[1000];
    for (int i = 0; i < 1000; i++)
        arr[i] = i;
    delete[] arr;  // properly freed
    cout << "Memory properly freed!" << endl;
}

int main() {
    // Each call leaks 4000 bytes
    for (int i = 0; i < 5; i++)
        leakyFunction();
    cout << "Leaked 20,000 bytes total!" << endl;

    // This is how you should do it
    properFunction();

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Stack ADT using Array</h3>
		<p class="text-gray-400 text-sm mb-3">Implement a Stack ADT — the user only sees push/pop/peek, not the internal array.</p>
		<CodePlayground
			title="Stack ADT Implementation"
			initialCode={`#include <iostream>
using namespace std;

class Stack {
private:
    int *arr;      // internal implementation - HIDDEN from user
    int top;
    int capacity;

public:
    // Constructor
    Stack(int cap) : capacity(cap), top(-1) {
        arr = new int[capacity];
    }

    // Destructor
    ~Stack() { delete[] arr; }

    // ADT Operations - this is what the user sees
    void push(int val) {
        if (isFull()) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top] = val;
    }

    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        return arr[top--];
    }

    int peek() {
        if (isEmpty()) return -1;
        return arr[top];
    }

    bool isEmpty() { return top == -1; }
    bool isFull() { return top == capacity - 1; }

    void display() {
        cout << "Stack (top -> bottom): ";
        for (int i = top; i >= 0; i--)
            cout << arr[i] << " ";
        cout << endl;
    }
};

int main() {
    Stack s(5);  // User doesn't know it's an array inside!

    s.push(10);
    s.push(20);
    s.push(30);
    s.display();         // 30 20 10

    cout << "Peek: " << s.peek() << endl;    // 30
    cout << "Pop: " << s.pop() << endl;      // 30
    cout << "Pop: " << s.pop() << endl;      // 20
    s.display();         // 10

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Time Complexity Analysis</h3>
		<p class="text-gray-400 text-sm mb-3">Run code with different input sizes and observe how time changes.</p>
		<CodePlayground
			title="Measuring Time Complexity"
			initialCode={`#include <iostream>
#include <ctime>
using namespace std;

// O(n) - Linear
long long sumArray(int A[], int n) {
    long long sum = 0;
    for (int i = 0; i < n; i++)
        sum += A[i];
    return sum;
}

// O(n^2) - Quadratic
long long pairSum(int A[], int n) {
    long long count = 0;
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++)
            count++;  // counting pairs
    return count;
}

// O(log n) - Logarithmic
int countHalves(int n) {
    int count = 0;
    while (n > 1) {
        n = n / 2;
        count++;
    }
    return count;
}

int main() {
    int sizes[] = {1000, 5000, 10000, 50000};

    cout << "=== O(log n) ===" << endl;
    for (int s : sizes)
        cout << "n=" << s << " -> " << countHalves(s) << " steps" << endl;

    cout << "\\n=== O(n) ===" << endl;
    for (int s : sizes) {
        int *A = new int[s];
        for (int i = 0; i < s; i++) A[i] = i;

        clock_t start = clock();
        sumArray(A, s);
        clock_t end = clock();

        cout << "n=" << s << " -> "
             << (double)(end-start)/CLOCKS_PER_SEC*1000 << " ms" << endl;
        delete[] A;
    }

    cout << "\\n=== O(n^2) ===" << endl;
    for (int s : sizes) {
        int *A = new int[s];
        for (int i = 0; i < s; i++) A[i] = i;

        clock_t start = clock();
        pairSum(A, s);
        clock_t end = clock();

        cout << "n=" << s << " -> "
             << (double)(end-start)/CLOCKS_PER_SEC*1000 << " ms" << endl;
        delete[] A;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Space Complexity — Recursion Stack</h3>
		<p class="text-gray-400 text-sm mb-3">Visualize how recursion uses stack space.</p>
		<CodePlayground
			title="Recursion Stack Depth"
			initialCode={`#include <iostream>
using namespace std;

// O(n) space — n stack frames
int factorial(int n) {
    cout << "  Stack frame created for n=" << n << endl;
    if (n <= 1) {
        cout << "  Base case reached!" << endl;
        return 1;
    }
    int result = n * factorial(n - 1);
    cout << "  Returning from n=" << n << " result=" << result << endl;
    return result;
}

// O(1) space — iterative, no extra stack frames
int factorialIterative(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++)
        result *= i;
    return result;
}

int main() {
    cout << "=== Recursive factorial(5) ===" << endl;
    cout << "Result: " << factorial(5) << endl;
    // Uses 5 stack frames = O(n) space

    cout << "\\n=== Iterative factorial(5) ===" << endl;
    cout << "Result: " << factorialIterative(5) << endl;
    // Uses 0 extra stack frames = O(1) space

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Analyze These</h3>
		<p class="text-gray-400 text-sm mb-3">Determine the time complexity of each function WITHOUT running. Then verify your answers.</p>
		<CodePlayground
			title="Complexity Analysis Challenge"
			initialCode={`#include <iostream>
using namespace std;

// What is the time complexity of each?

// Function 1
void f1(int n) {
    for (int i = 0; i < n; i++)        // ?
        for (int j = 0; j < n; j++)    // ?
            cout << "*";
}
// Answer: ___

// Function 2
void f2(int n) {
    for (int i = 0; i < n; i++)    // ?
        cout << i;
    for (int j = 0; j < n; j++)    // ?
        cout << j;
}
// Answer: ___

// Function 3
void f3(int n) {
    for (int i = 1; i < n; i = i * 2)  // ?
        cout << i;
}
// Answer: ___

// Function 4
void f4(int n) {
    for (int i = 0; i < n; i++)            // ?
        for (int j = 1; j < n; j = j*2)   // ?
            cout << "*";
}
// Answer: ___

// Function 5
void f5(int n) {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < i; j++)    // note: j < i, not j < n
            cout << "*";
}
// Answer: ___

int main() {
    // Answers:
    // f1: O(n^2)      — nested loops, both run n times
    // f2: O(n)         — two sequential loops = n + n = O(n)
    // f3: O(log n)     — i doubles each time: 1,2,4,8,...n
    // f4: O(n log n)   — outer n × inner log n
    // f5: O(n^2)       — sum of 0+1+2+...+(n-1) = n(n-1)/2 = O(n^2)

    cout << "Check the comments for answers!" << endl;
    return 0;
}`}
		/>
	</div>
</div>
