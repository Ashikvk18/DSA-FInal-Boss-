<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — C++ Essentials</h2>
		<p class="text-gray-400">Write, modify, and experiment with these code snippets. Copy them to your local IDE or <a href="https://www.onlinegdb.com/online_c++_compiler" target="_blank" class="text-blue-400 hover:underline">OnlineGDB</a> to run.</p>
	</div>

	<!-- Practice 1: Arrays -->
	<div>
		<h3>Practice 1: Arrays Basics</h3>
		<p class="text-gray-400 text-sm mb-3">Create an array, find sum, average, max, and min.</p>
		<CodePlayground
			title="Arrays - Sum, Avg, Max, Min"
			initialCode={`#include <iostream>
using namespace std;

int main() {
    int A[] = {12, 35, 1, 10, 34, 1};
    int n = sizeof(A) / sizeof(A[0]);

    int sum = 0, maxVal = A[0], minVal = A[0];

    for (int i = 0; i < n; i++) {
        sum += A[i];
        if (A[i] > maxVal) maxVal = A[i];
        if (A[i] < minVal) minVal = A[i];
    }

    cout << "Sum = " << sum << endl;
    cout << "Average = " << (float)sum / n << endl;
    cout << "Max = " << maxVal << endl;
    cout << "Min = " << minVal << endl;

    return 0;
}`}
		/>
	</div>

	<!-- Practice 2: Structures -->
	<div>
		<h3>Practice 2: Structures</h3>
		<p class="text-gray-400 text-sm mb-3">Create a Student struct with name, roll, and GPA. Store 3 students and display them.</p>
		<CodePlayground
			title="Structures - Student Records"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

struct Student {
    char name[30];
    int roll;
    float gpa;
};

void display(Student s) {
    cout << "Name: " << s.name
         << ", Roll: " << s.roll
         << ", GPA: " << s.gpa << endl;
}

int main() {
    Student students[3] = {
        {"Alice", 101, 3.8},
        {"Bob", 102, 3.5},
        {"Charlie", 103, 3.9}
    };

    for (int i = 0; i < 3; i++)
        display(students[i]);

    // Find student with highest GPA
    int best = 0;
    for (int i = 1; i < 3; i++)
        if (students[i].gpa > students[best].gpa)
            best = i;

    cout << "\\nHighest GPA: " << students[best].name
         << " (" << students[best].gpa << ")" << endl;

    return 0;
}`}
		/>
	</div>

	<!-- Practice 3: Pointers -->
	<div>
		<h3>Practice 3: Pointers</h3>
		<p class="text-gray-400 text-sm mb-3">Explore pointer declaration, dereferencing, arithmetic, and dynamic allocation.</p>
		<CodePlayground
			title="Pointers - Basics and Dynamic Memory"
			initialCode={`#include <iostream>
using namespace std;

int main() {
    // Basic pointer
    int x = 42;
    int *p = &x;

    cout << "Value of x: " << x << endl;
    cout << "Address of x: " << &x << endl;
    cout << "Value of p (address): " << p << endl;
    cout << "Value at *p: " << *p << endl;

    *p = 100;  // modify x through pointer
    cout << "x after *p = 100: " << x << endl;

    // Pointer arithmetic with arrays
    int A[] = {10, 20, 30, 40, 50};
    int *q = A;

    cout << "\\nPointer Arithmetic:" << endl;
    for (int i = 0; i < 5; i++)
        cout << "*(q+" << i << ") = " << *(q + i) << endl;

    // Dynamic allocation
    int n = 5;
    int *arr = new int[n];

    for (int i = 0; i < n; i++)
        arr[i] = (i + 1) * 10;

    cout << "\\nDynamic array: ";
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;

    delete[] arr;  // always free!

    return 0;
}`}
		/>
	</div>

	<!-- Practice 4: References -->
	<div>
		<h3>Practice 4: References</h3>
		<p class="text-gray-400 text-sm mb-3">Understand how references work as aliases.</p>
		<CodePlayground
			title="References - Aliases"
			initialCode={`#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int &ref = x;  // ref is alias for x

    cout << "x = " << x << endl;
    cout << "ref = " << ref << endl;
    cout << "Address of x: " << &x << endl;
    cout << "Address of ref: " << &ref << endl;
    cout << "Same address? " << (&x == &ref ? "YES" : "NO") << endl;

    ref = 50;  // modifies x
    cout << "\\nAfter ref = 50:" << endl;
    cout << "x = " << x << endl;

    x = 100;   // modifies ref too (same thing)
    cout << "After x = 100:" << endl;
    cout << "ref = " << ref << endl;

    return 0;
}`}
		/>
	</div>

	<!-- Practice 5: Pointer to Structure -->
	<div>
		<h3>Practice 5: Pointer to Structure</h3>
		<p class="text-gray-400 text-sm mb-3">Stack vs heap allocation of structures, arrow operator.</p>
		<CodePlayground
			title="Pointer to Structure"
			initialCode={`#include <iostream>
using namespace std;

struct Rectangle {
    int length;
    int breadth;
};

int main() {
    // Stack allocation
    Rectangle r1 = {10, 5};
    Rectangle *p1 = &r1;

    cout << "Stack allocated:" << endl;
    cout << "Length: " << p1->length << endl;
    cout << "Breadth: " << (*p1).breadth << endl;
    cout << "Area: " << p1->length * p1->breadth << endl;

    // Heap allocation
    Rectangle *p2 = new Rectangle;
    p2->length = 20;
    p2->breadth = 8;

    cout << "\\nHeap allocated:" << endl;
    cout << "Length: " << p2->length << endl;
    cout << "Area: " << p2->length * p2->breadth << endl;

    delete p2;

    return 0;
}`}
		/>
	</div>

	<!-- Practice 6: Parameter Passing -->
	<div>
		<h3>Practice 6: Parameter Passing Methods</h3>
		<p class="text-gray-400 text-sm mb-3">Compare all three passing methods with swap function.</p>
		<CodePlayground
			title="Parameter Passing - Value vs Address vs Reference"
			initialCode={`#include <iostream>
using namespace std;

// Pass by Value — DOES NOT swap originals
void swapByValue(int a, int b) {
    int temp = a; a = b; b = temp;
    cout << "Inside swapByValue: a=" << a << " b=" << b << endl;
}

// Pass by Address — SWAPS originals
void swapByAddress(int *a, int *b) {
    int temp = *a; *a = *b; *b = temp;
}

// Pass by Reference — SWAPS originals
void swapByReference(int &a, int &b) {
    int temp = a; a = b; b = temp;
}

int main() {
    int x = 10, y = 20;

    cout << "Original: x=" << x << " y=" << y << endl;

    swapByValue(x, y);
    cout << "After swapByValue: x=" << x << " y=" << y << endl;

    swapByAddress(&x, &y);
    cout << "After swapByAddress: x=" << x << " y=" << y << endl;

    swapByReference(x, y);
    cout << "After swapByReference: x=" << x << " y=" << y << endl;

    return 0;
}`}
		/>
	</div>

	<!-- Practice 7: Array as Parameter -->
	<div>
		<h3>Practice 7: Array as Parameter</h3>
		<p class="text-gray-400 text-sm mb-3">Pass arrays to functions, observe they're always by pointer.</p>
		<CodePlayground
			title="Array as Parameter"
			initialCode={`#include <iostream>
using namespace std;

void printArray(int A[], int n) {
    for (int i = 0; i < n; i++)
        cout << A[i] << " ";
    cout << endl;
}

void reverseArray(int A[], int n) {
    for (int i = 0; i < n / 2; i++) {
        int temp = A[i];
        A[i] = A[n - 1 - i];
        A[n - 1 - i] = temp;
    }
}

int* createArray(int n) {
    int *arr = new int[n];
    for (int i = 0; i < n; i++)
        arr[i] = (i + 1) * (i + 1);  // squares
    return arr;
}

int main() {
    int A[] = {1, 2, 3, 4, 5};
    int n = 5;

    cout << "Original: ";
    printArray(A, n);

    reverseArray(A, n);  // modifies original!
    cout << "Reversed: ";
    printArray(A, n);

    // Returning array from function
    int *B = createArray(5);
    cout << "Created: ";
    printArray(B, 5);
    delete[] B;

    return 0;
}`}
		/>
	</div>

	<!-- Practice 8: Class and Constructor -->
	<div>
		<h3>Practice 8: C++ Class with Constructor</h3>
		<p class="text-gray-400 text-sm mb-3">Build a complete Rectangle class with all constructor types.</p>
		<CodePlayground
			title="C++ Class - Rectangle"
			initialCode={`#include <iostream>
using namespace std;

class Rectangle {
private:
    int length;
    int breadth;

public:
    // Default constructor
    Rectangle() : length(0), breadth(0) {
        cout << "Default constructor called" << endl;
    }

    // Parameterized constructor
    Rectangle(int l, int b) : length(l), breadth(b) {
        cout << "Parameterized constructor called" << endl;
    }

    // Copy constructor
    Rectangle(const Rectangle &r) : length(r.length), breadth(r.breadth) {
        cout << "Copy constructor called" << endl;
    }

    // Destructor
    ~Rectangle() {
        cout << "Destructor called for " << length << "x" << breadth << endl;
    }

    int area() { return length * breadth; }
    int perimeter() { return 2 * (length + breadth); }

    void display() {
        cout << length << " x " << breadth
             << " | Area: " << area()
             << " | Perimeter: " << perimeter() << endl;
    }
};

int main() {
    Rectangle r1;          // default
    Rectangle r2(10, 5);   // parameterized
    Rectangle r3(r2);      // copy

    r1.display();
    r2.display();
    r3.display();

    return 0;
}`}
		/>
	</div>

	<!-- Practice 9: Template Class -->
	<div>
		<h3>Practice 9: Template Class</h3>
		<p class="text-gray-400 text-sm mb-3">Build a generic Stack class using templates.</p>
		<CodePlayground
			title="Template Class - Generic Stack"
			initialCode={`#include <iostream>
using namespace std;

template <class T>
class Stack {
private:
    T *arr;
    int top;
    int capacity;

public:
    Stack(int cap) : capacity(cap), top(-1) {
        arr = new T[capacity];
    }

    ~Stack() { delete[] arr; }

    void push(T val) {
        if (top == capacity - 1) {
            cout << "Stack Overflow!" << endl;
            return;
        }
        arr[++top] = val;
    }

    T pop() {
        if (top == -1) {
            cout << "Stack Underflow!" << endl;
            return T();  // return default value
        }
        return arr[top--];
    }

    T peek() { return arr[top]; }
    bool isEmpty() { return top == -1; }
    bool isFull() { return top == capacity - 1; }

    void display() {
        for (int i = top; i >= 0; i--)
            cout << arr[i] << " ";
        cout << endl;
    }
};

int main() {
    // Integer stack
    Stack<int> intStack(5);
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);
    cout << "Int Stack: ";
    intStack.display();
    cout << "Popped: " << intStack.pop() << endl;

    // String stack
    Stack<string> strStack(3);
    strStack.push("Hello");
    strStack.push("World");
    cout << "\\nString Stack: ";
    strStack.display();

    // Float stack
    Stack<float> fStack(3);
    fStack.push(1.1f);
    fStack.push(2.2f);
    fStack.push(3.3f);
    cout << "\\nFloat Stack: ";
    fStack.display();

    return 0;
}`}
		/>
	</div>

	<!-- Challenge -->
	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Build It Yourself</h3>
		<p class="text-gray-400 text-sm mb-3">Without looking at the examples above, try to write:</p>
		<ol class="list-decimal pl-6 text-gray-300 text-sm space-y-1 mb-4">
			<li>A <code>Complex</code> class (real, imaginary) with add and display methods</li>
			<li>A template <code>Pair&lt;K, V&gt;</code> class with getters</li>
			<li>A function that takes an array by pointer and returns a new reversed array (heap allocated)</li>
		</ol>
		<CodePlayground
			title="Your Challenge Code"
			initialCode={`#include <iostream>
using namespace std;

// Challenge 1: Complex class
// Your code here...

// Challenge 2: Template Pair class
// Your code here...

// Challenge 3: Reverse array function
// Your code here...

int main() {
    // Test your implementations here

    return 0;
}`}
		/>
	</div>
</div>
