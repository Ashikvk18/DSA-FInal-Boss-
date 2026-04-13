export const theoryHTML = `
<section class="theory-section" id="arrays-basics">
	<h2>1. Arrays Basics</h2>
	<div class="definition-box">
		<strong>Definition:</strong> An <strong>array</strong> is a collection of elements of the <strong>same data type</strong>, stored in <strong>contiguous memory locations</strong>. Each element is accessed using an <strong>index</strong> (starting from 0 in C++).
	</div>
	<h3>Why Arrays?</h3>
	<p>Without arrays, if you need to store 100 student marks, you'd need 100 separate variables (<code>m1, m2, m3, ... m100</code>). Arrays let you store all 100 in a single variable with indexed access.</p>
	<h3>Declaration Syntax</h3>
<pre><code>// Syntax: dataType arrayName[size];
int A[5];           // declares an array of 5 integers (uninitialized - garbage values)
int B[5] = {2, 4, 6, 8, 10};  // declares and initializes
int C[] = {1, 2, 3};           // size inferred as 3
int D[5] = {1, 2};             // remaining elements are 0: {1, 2, 0, 0, 0}</code></pre>
	<h3>Memory Layout</h3>
	<p>If <code>int A[5]</code> starts at address 200 and <code>int</code> is 4 bytes:</p>
<pre><code>Index:    [0]   [1]   [2]   [3]   [4]
Address:  200   204   208   212   216
Formula:  Address(A[i]) = BaseAddress + i * sizeof(dataType)</code></pre>
	<div class="important-box">
		<strong>Key Point:</strong> Array indexing starts at 0. For an array of size <code>n</code>, valid indices are <code>0</code> to <code>n-1</code>. Accessing <code>A[n]</code> is <strong>undefined behavior</strong> (out of bounds).
	</div>
	<h3>Accessing and Modifying Elements</h3>
<pre><code>int A[5] = {10, 20, 30, 40, 50};

// Access
cout &lt;&lt; A[0];   // 10
cout &lt;&lt; A[3];   // 40

// Modify
A[2] = 99;      // Array is now: {10, 20, 99, 40, 50}

// Traversal
for (int i = 0; i &lt; 5; i++) {
    cout &lt;&lt; A[i] &lt;&lt; " ";
}</code></pre>
	<h3>Array Size</h3>
<pre><code>int A[5] = {1,2,3,4,5};
int size = sizeof(A) / sizeof(A[0]);  // 20 / 4 = 5</code></pre>
	<div class="example-box">
		<strong>Example - Sum of Array Elements:</strong>
<pre><code>#include &lt;iostream&gt;
using namespace std;

int main() {
    int A[] = {3, 7, 2, 9, 1};
    int n = sizeof(A) / sizeof(A[0]);
    int sum = 0;

    for (int i = 0; i &lt; n; i++)
        sum += A[i];

    cout &lt;&lt; "Sum = " &lt;&lt; sum &lt;&lt; endl;  // Sum = 22
    return 0;
}</code></pre>
	</div>
</section>

<section class="theory-section" id="structures">
	<h2>2. Structures</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A <strong>structure</strong> (<code>struct</code>) is a user-defined data type that groups variables of <strong>different data types</strong> under a single name. Unlike arrays (which hold same-type elements), structures can hold heterogeneous data.
	</div>
	<h3>Why Structures?</h3>
	<p>To represent a "Student" you need a name (string), roll number (int), and GPA (float). Without structs, you'd need separate variables or parallel arrays. A struct bundles them logically.</p>
	<h3>Declaration and Usage</h3>
<pre><code>struct Rectangle {
    int length;
    int breadth;
};

int main() {
    // Declaration + initialization
    struct Rectangle r1 = {10, 5};

    // In C++ you can omit 'struct' keyword
    Rectangle r2;
    r2.length = 15;
    r2.breadth = 7;

    cout &lt;&lt; "Area of r1 = " &lt;&lt; r1.length * r1.breadth &lt;&lt; endl;  // 50
    cout &lt;&lt; "Area of r2 = " &lt;&lt; r2.length * r2.breadth &lt;&lt; endl;  // 105
}</code></pre>
	<h3>Memory Layout of Structures</h3>
<pre><code>struct Student {
    int roll;      // 4 bytes
    char grade;    // 1 byte (+ 3 bytes padding)
    float gpa;     // 4 bytes
};
// Total: 12 bytes (due to padding/alignment, not 9)</code></pre>
	<div class="important-box">
		<strong>Padding:</strong> The compiler inserts padding bytes to align members to memory boundaries (usually multiples of 4). <code>sizeof(Student)</code> may be larger than the sum of individual member sizes.
	</div>
	<h3>Array of Structures</h3>
<pre><code>struct Student {
    char name[25];
    int roll;
    float gpa;
};

Student students[3] = {
    {"Alice", 101, 3.8},
    {"Bob", 102, 3.5},
    {"Charlie", 103, 3.9}
};

for (int i = 0; i &lt; 3; i++)
    cout &lt;&lt; students[i].name &lt;&lt; " - GPA: " &lt;&lt; students[i].gpa &lt;&lt; endl;</code></pre>
	<h3>Nested Structures</h3>
<pre><code>struct Address {
    char city[20];
    int pin;
};

struct Student {
    char name[25];
    int roll;
    Address addr;   // nested struct
};

Student s = {"Alice", 101, {"Mumbai", 400001}};
cout &lt;&lt; s.addr.city;  // Mumbai</code></pre>
</section>

<section class="theory-section" id="pointers">
	<h2>3. Pointers</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A <strong>pointer</strong> is a variable that stores the <strong>memory address</strong> of another variable. It "points to" the location where data is stored rather than holding the data itself.
	</div>
	<h3>Why Pointers?</h3>
	<ul class="list-disc pl-6 space-y-1 text-gray-300">
		<li>Dynamic memory allocation (heap)</li>
		<li>Efficient parameter passing (avoid copying large data)</li>
		<li>Building data structures (linked lists, trees, graphs)</li>
		<li>Accessing hardware/memory-mapped I/O</li>
	</ul>
	<h3>Declaration and Initialization</h3>
<pre><code>int x = 10;
int *p;       // p is a pointer to int (declaration)
p = &amp;x;       // p now holds the address of x

// Combined
int *q = &amp;x;  // declare and initialize

// Dereferencing: access the value at the address
cout &lt;&lt; p;    // prints address (e.g., 0x7ffd5e8)
cout &lt;&lt; *p;   // prints 10 (value at that address)</code></pre>
	<h3>Pointer Arithmetic</h3>
<pre><code>int A[5] = {2, 4, 6, 8, 10};
int *p = A;        // p points to A[0]

cout &lt;&lt; *p;        // 2  (A[0])
cout &lt;&lt; *(p+1);    // 4  (A[1])
cout &lt;&lt; *(p+3);    // 8  (A[3])

p++;               // p now points to A[1]
cout &lt;&lt; *p;        // 4

// p + i moves (i * sizeof(int)) bytes forward</code></pre>
	<div class="important-box">
		<strong>Pointer Sizes:</strong> On a 64-bit system, ALL pointers are 8 bytes regardless of the type they point to. On 32-bit systems, they're 4 bytes. <code>sizeof(int*) == sizeof(char*) == sizeof(double*)</code>.
	</div>
	<h3>Dynamic Memory Allocation</h3>
<pre><code>// C style (malloc)
int *p = (int *)malloc(5 * sizeof(int));  // allocates 20 bytes on heap
free(p);                                   // releases memory

// C++ style (new/delete)
int *q = new int[5];    // allocates array of 5 ints on heap
q[0] = 10;
q[1] = 20;
delete[] q;             // releases array memory

int *r = new int(25);   // allocates single int with value 25
delete r;               // releases single int</code></pre>
	<div class="important-box">
		<strong>Memory Leak:</strong> If you allocate with <code>new</code> but never call <code>delete</code>, that memory is leaked — it remains occupied until the program terminates. Always pair <code>new</code> with <code>delete</code>, and <code>new[]</code> with <code>delete[]</code>.
	</div>
	<h3>Null Pointer</h3>
<pre><code>int *p = nullptr;   // C++11 onwards (preferred)
int *q = NULL;      // C style
int *r = 0;         // also valid but not recommended

if (p == nullptr)
    cout &lt;&lt; "p is null";</code></pre>
	<h3>Dangling Pointer</h3>
<pre><code>int *p = new int(10);
delete p;       // memory freed
// p is now a DANGLING POINTER — it still holds the old address
// but that memory is no longer valid
*p = 20;        // UNDEFINED BEHAVIOR!

// Fix: set to nullptr after delete
p = nullptr;</code></pre>
</section>

<section class="theory-section" id="references">
	<h2>4. References in C++</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A <strong>reference</strong> is an <strong>alias</strong> (another name) for an existing variable. Once initialized, it cannot be changed to refer to a different variable. It is NOT a new variable — it shares the same memory address as the original.
	</div>
	<h3>Syntax and Usage</h3>
<pre><code>int x = 10;
int &amp;ref = x;    // ref is a reference to x

cout &lt;&lt; x;       // 10
cout &lt;&lt; ref;     // 10
cout &lt;&lt; &amp;x;      // same address
cout &lt;&lt; &amp;ref;    // same address!

ref = 20;        // modifies x through ref
cout &lt;&lt; x;       // 20</code></pre>
	<div class="important-box">
		<strong>Rules of References:</strong>
		<ul class="list-disc pl-6 mt-2">
			<li>Must be initialized at declaration (<code>int &amp;ref;</code> is INVALID)</li>
			<li>Cannot be re-assigned to another variable</li>
			<li>Cannot be null</li>
			<li>Internally implemented using pointers by the compiler</li>
		</ul>
	</div>
	<h3>Reference vs Pointer</h3>
<pre><code>// Pointer: can be null, can be reassigned, uses * and &amp;
int x = 10, y = 20;
int *p = &amp;x;
p = &amp;y;        // OK — now points to y
p = nullptr;   // OK

// Reference: cannot be null, cannot be reassigned
int &amp;r = x;
// &amp;r = y;   // This does NOT make r refer to y!
//              It assigns y's value to x (since r IS x)
r = y;         // x is now 20</code></pre>
</section>

<section class="theory-section" id="pointer-to-structure">
	<h2>5. Pointer to Structure</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A pointer to a structure holds the address of a structure variable. Members are accessed using the <strong>arrow operator</strong> (<code>-&gt;</code>) instead of the dot operator.
	</div>
<pre><code>struct Rectangle {
    int length;
    int breadth;
};

// Stack allocation
Rectangle r = {10, 5};
Rectangle *p = &amp;r;

cout &lt;&lt; p-&gt;length;    // 10 (arrow operator)
cout &lt;&lt; (*p).breadth;  // 5 (dereference + dot)

// Heap allocation
Rectangle *q = new Rectangle;
q-&gt;length = 15;
q-&gt;breadth = 8;
cout &lt;&lt; "Area = " &lt;&lt; q-&gt;length * q-&gt;breadth;  // 120
delete q;</code></pre>
	<div class="important-box">
		<strong>Dot vs Arrow:</strong>
		<ul class="list-disc pl-6 mt-2">
			<li><code>r.length</code> — used when <code>r</code> is a structure variable</li>
			<li><code>p-&gt;length</code> — used when <code>p</code> is a pointer to a structure</li>
			<li><code>p-&gt;length</code> is equivalent to <code>(*p).length</code></li>
		</ul>
	</div>
</section>

<section class="theory-section" id="functions">
	<h2>6. Functions</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A <strong>function</strong> is a self-contained block of code that performs a specific task. It is defined once and can be called multiple times. Functions provide <strong>modularity</strong>, <strong>reusability</strong>, and <strong>abstraction</strong>.
	</div>
	<h3>Anatomy of a Function</h3>
<pre><code>// Function declaration (prototype)
returnType functionName(parameterList);

// Function definition
returnType functionName(parameterList) {
    // body
    return value;  // if returnType is not void
}

// Example
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 5);   // function call
    cout &lt;&lt; result;            // 8
}</code></pre>
	<h3>Function Declaration vs Definition</h3>
<pre><code>// Declaration (tells compiler the signature exists)
int factorial(int n);   // placed before main or in a header

// Definition (actual implementation)
int factorial(int n) {
    if (n &lt;= 1) return 1;
    return n * factorial(n - 1);
}</code></pre>
	<h3>Default Arguments</h3>
<pre><code>int power(int base, int exp = 2) {   // exp defaults to 2
    int result = 1;
    for (int i = 0; i &lt; exp; i++)
        result *= base;
    return result;
}

cout &lt;&lt; power(5);      // 25 (5^2, default exp)
cout &lt;&lt; power(2, 10);  // 1024 (2^10)</code></pre>
	<h3>Function Overloading</h3>
<pre><code>// Same name, different parameters
int add(int a, int b) {  return a + b;  }
float add(float a, float b) {  return a + b;  }
int add(int a, int b, int c) {  return a + b + c;  }

cout &lt;&lt; add(3, 5);        // calls int version
cout &lt;&lt; add(1.5f, 2.5f);  // calls float version
cout &lt;&lt; add(1, 2, 3);     // calls 3-param version</code></pre>
</section>

<section class="theory-section" id="parameter-passing">
	<h2>7. Parameter Passing Methods</h2>
	<div class="definition-box">
		<strong>Three ways to pass parameters in C++:</strong>
		<ol class="list-decimal pl-6 mt-2 space-y-1">
			<li><strong>Pass by Value</strong> — a copy of the argument is made</li>
			<li><strong>Pass by Address (Pointer)</strong> — the address is passed</li>
			<li><strong>Pass by Reference</strong> — an alias is passed (C++ only)</li>
		</ol>
	</div>
	<h3>Pass by Value</h3>
<pre><code>void swap(int a, int b) {   // a, b are COPIES
    int temp = a;
    a = b;
    b = temp;
}

int x = 10, y = 20;
swap(x, y);
cout &lt;&lt; x &lt;&lt; " " &lt;&lt; y;  // 10 20 (NOT swapped! copies were swapped)</code></pre>
	<div class="important-box">
		<strong>Pass by Value:</strong> The function receives a <em>copy</em>. Changes inside the function do NOT affect the original variables. Use when you don't want to modify the original.
	</div>
	<h3>Pass by Address (Pointer)</h3>
<pre><code>void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int x = 10, y = 20;
swap(&amp;x, &amp;y);
cout &lt;&lt; x &lt;&lt; " " &lt;&lt; y;  // 20 10 (SWAPPED!)</code></pre>
	<h3>Pass by Reference</h3>
<pre><code>void swap(int &amp;a, int &amp;b) {   // a, b are aliases
    int temp = a;
    a = b;
    b = temp;
}

int x = 10, y = 20;
swap(x, y);
cout &lt;&lt; x &lt;&lt; " " &lt;&lt; y;  // 20 10 (SWAPPED!)</code></pre>
	<div class="example-box">
		<strong>When to use which?</strong>
		<ul class="list-disc pl-6 mt-2 space-y-1">
			<li><strong>By Value:</strong> Small data, don't need to modify original (int, char, float)</li>
			<li><strong>By Reference:</strong> Need to modify original, or large objects (avoids copy overhead)</li>
			<li><strong>By const Reference:</strong> Large objects, read-only access (<code>void print(const vector&lt;int&gt; &amp;v)</code>)</li>
			<li><strong>By Pointer:</strong> When you need nullptr semantics, or interfacing with C code</li>
		</ul>
	</div>
</section>

<section class="theory-section" id="array-as-parameter">
	<h2>8. Array as Parameter</h2>
	<div class="definition-box">
		<strong>Key Fact:</strong> In C/C++, when you pass an array to a function, you are actually passing a <strong>pointer to its first element</strong>. The array "decays" into a pointer. The function does NOT know the array's size — you must pass it separately.
	</div>
<pre><code>// All three are EQUIVALENT:
void printArray(int A[], int n);
void printArray(int *A, int n);
void printArray(int A[5], int n);  // the 5 is ignored by compiler

// Implementation
void printArray(int A[], int n) {
    for (int i = 0; i &lt; n; i++)
        cout &lt;&lt; A[i] &lt;&lt; " ";
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    printArray(arr, 5);  // Output: 10 20 30 40 50
}</code></pre>
	<div class="important-box">
		<strong>Critical:</strong> Since an array is passed as a pointer, any modification inside the function <strong>modifies the original array</strong>. There is no "pass by value" for arrays in C/C++.
	</div>
<pre><code>void doubleElements(int A[], int n) {
    for (int i = 0; i &lt; n; i++)
        A[i] *= 2;   // modifies original!
}

int arr[] = {1, 2, 3};
doubleElements(arr, 3);
// arr is now {2, 4, 6}</code></pre>
	<h3>Returning an Array</h3>
<pre><code>// You CANNOT return a local array (it's on the stack, gets destroyed)
// Instead, allocate on heap:
int* createArray(int n) {
    int *A = new int[n];
    for (int i = 0; i &lt; n; i++)
        A[i] = i + 1;
    return A;    // OK — heap memory persists
}

int *arr = createArray(5);
// arr = {1, 2, 3, 4, 5}
delete[] arr;  // don't forget to free!</code></pre>
</section>

<section class="theory-section" id="structure-as-parameter">
	<h2>9. Structure as Parameter</h2>
	<div class="definition-box">
		<strong>Unlike arrays</strong>, structures ARE passed <strong>by value</strong> by default — a full copy is made. For large structures, this is expensive. Use pointers or references for efficiency.
	</div>
<pre><code>struct Rectangle {
    int length;
    int breadth;
};

// Pass by value (copy is made)
int area(Rectangle r) {
    return r.length * r.breadth;
}

// Pass by reference (efficient, can modify)
void expand(Rectangle &amp;r, int factor) {
    r.length *= factor;
    r.breadth *= factor;
}

// Pass by pointer
void shrink(Rectangle *r, int factor) {
    r-&gt;length /= factor;
    r-&gt;breadth /= factor;
}

int main() {
    Rectangle r = {10, 5};
    cout &lt;&lt; area(r);     // 50 (r is NOT modified)
    expand(r, 2);        // r is now {20, 10}
    shrink(&amp;r, 2);       // r is back to {10, 5}
}</code></pre>
</section>

<section class="theory-section" id="converting-to-oop">
	<h2>10. Converting C to C++ (Monolithic → OOP)</h2>
	<div class="definition-box">
		<strong>The evolution of program design:</strong>
		<ol class="list-decimal pl-6 mt-2 space-y-1">
			<li><strong>Monolithic:</strong> Everything in one function (main). Hard to maintain.</li>
			<li><strong>Modular / Procedural:</strong> Split into functions. Data and functions are separate.</li>
			<li><strong>Structures + Functions:</strong> Group related data, pass to functions.</li>
			<li><strong>Object-Oriented:</strong> Data + functions bundled into classes. Data is private.</li>
		</ol>
	</div>
	<h3>Step 1: Monolithic</h3>
<pre><code>int main() {
    int length = 10, breadth = 5;
    int area = length * breadth;
    int perimeter = 2 * (length + breadth);
    cout &lt;&lt; "Area: " &lt;&lt; area &lt;&lt; ", Perimeter: " &lt;&lt; perimeter;
}</code></pre>
	<h3>Step 2: Modular (Functions)</h3>
<pre><code>int area(int l, int b) {  return l * b;  }
int perimeter(int l, int b) {  return 2 * (l + b);  }

int main() {
    int l = 10, b = 5;
    cout &lt;&lt; "Area: " &lt;&lt; area(l, b);
    cout &lt;&lt; "Perimeter: " &lt;&lt; perimeter(l, b);
}</code></pre>
	<h3>Step 3: Structure + Functions</h3>
<pre><code>struct Rectangle {
    int length;
    int breadth;
};

int area(Rectangle r) {  return r.length * r.breadth;  }
int perimeter(Rectangle r) {  return 2 * (r.length + r.breadth);  }

int main() {
    Rectangle r = {10, 5};
    cout &lt;&lt; area(r) &lt;&lt; " " &lt;&lt; perimeter(r);
}</code></pre>
	<h3>Step 4: Object-Oriented (Class)</h3>
<pre><code>class Rectangle {
private:
    int length;
    int breadth;
public:
    Rectangle(int l, int b) {
        length = l;
        breadth = b;
    }
    int area() {  return length * breadth;  }
    int perimeter() {  return 2 * (length + breadth);  }
};

int main() {
    Rectangle r(10, 5);
    cout &lt;&lt; r.area() &lt;&lt; " " &lt;&lt; r.perimeter();
}</code></pre>
	<div class="important-box">
		<strong>Why OOP wins:</strong> Data (<code>length</code>, <code>breadth</code>) is <strong>encapsulated</strong> — it's <code>private</code>. No one can accidentally modify it. The functions that operate on the data live inside the class. This is the foundation of DSA in C++: every data structure becomes a class.
	</div>
</section>

<section class="theory-section" id="class-and-constructor">
	<h2>11. C++ Class and Constructor</h2>
	<div class="definition-box">
		<strong>Class:</strong> A blueprint for creating objects. It defines data members (attributes) and member functions (methods).<br><br>
		<strong>Object:</strong> An instance of a class. When you create an object, memory is allocated for its data members.<br><br>
		<strong>Constructor:</strong> A special member function that is <strong>automatically called</strong> when an object is created. It has the <strong>same name as the class</strong> and <strong>no return type</strong>.
	</div>
	<h3>Class Syntax</h3>
<pre><code>class ClassName {
private:      // accessible only within the class
    // data members
public:       // accessible from outside
    // constructors
    // member functions
protected:    // accessible within class and derived classes
    // data members / functions
};   // semicolon is mandatory!</code></pre>
	<h3>Types of Constructors</h3>
<pre><code>class Rectangle {
private:
    int length;
    int breadth;
public:
    // 1. Default constructor (no parameters)
    Rectangle() {
        length = 0;
        breadth = 0;
    }

    // 2. Parameterized constructor
    Rectangle(int l, int b) {
        length = l;
        breadth = b;
    }

    // 3. Copy constructor
    Rectangle(const Rectangle &amp;r) {
        length = r.length;
        breadth = r.breadth;
    }

    // Destructor (called when object is destroyed)
    ~Rectangle() {
        cout &lt;&lt; "Rectangle destroyed" &lt;&lt; endl;
    }

    int area() {  return length * breadth;  }
    int perimeter() {  return 2 * (length + breadth);  }

    // Getters and Setters
    int getLength() {  return length;  }
    void setLength(int l) {  length = l;  }
};

int main() {
    Rectangle r1;          // default constructor
    Rectangle r2(10, 5);   // parameterized constructor
    Rectangle r3(r2);      // copy constructor
    Rectangle r4 = r2;     // also copy constructor

    cout &lt;&lt; r2.area();     // 50
}</code></pre>
	<h3>Initializer List (Preferred Way)</h3>
<pre><code>class Rectangle {
    int length, breadth;
public:
    // Using initializer list (more efficient)
    Rectangle(int l, int b) : length(l), breadth(b) {  }
};

// Why? For const members and references, initializer list is REQUIRED:
class MyClass {
    const int id;
    int &amp;ref;
public:
    MyClass(int i, int &amp;r) : id(i), ref(r) {  }
};</code></pre>
</section>

<section class="theory-section" id="templates">
	<h2>12. Template Classes</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A <strong>template</strong> allows you to write generic code that works with <strong>any data type</strong>. Instead of writing separate classes/functions for <code>int</code>, <code>float</code>, <code>double</code>, etc., you write one template and the compiler generates the specific version at compile time.
	</div>
	<h3>Function Template</h3>
<pre><code>template &lt;typename T&gt;
T maximum(T a, T b) {
    return (a &gt; b) ? a : b;
}

cout &lt;&lt; maximum(3, 7);       // int version: 7
cout &lt;&lt; maximum(3.5, 2.1);   // double version: 3.5
cout &lt;&lt; maximum('a', 'z');   // char version: z</code></pre>
	<h3>Class Template</h3>
<pre><code>template &lt;class T&gt;
class Stack {
private:
    T *arr;
    int top;
    int capacity;
public:
    Stack(int cap) : capacity(cap), top(-1) {
        arr = new T[capacity];
    }

    ~Stack() {  delete[] arr;  }

    void push(T val) {
        if (top == capacity - 1) return;  // overflow
        arr[++top] = val;
    }

    T pop() {
        if (top == -1) throw "Stack Underflow";
        return arr[top--];
    }

    T peek() {
        if (top == -1) throw "Stack Empty";
        return arr[top];
    }

    bool isEmpty() {  return top == -1;  }
};

int main() {
    Stack&lt;int&gt; intStack(10);
    intStack.push(5);
    intStack.push(10);
    cout &lt;&lt; intStack.pop();   // 10

    Stack&lt;string&gt; strStack(5);
    strStack.push("Hello");
    strStack.push("World");
    cout &lt;&lt; strStack.pop();   // World
}</code></pre>
	<div class="important-box">
		<strong>Why Templates matter for DSA:</strong> Every data structure (Stack, Queue, LinkedList, BST, etc.) should ideally be a template class so it can hold any data type. This is exactly how the C++ STL (Standard Template Library) is built — <code>vector&lt;T&gt;</code>, <code>stack&lt;T&gt;</code>, <code>queue&lt;T&gt;</code>, <code>map&lt;K,V&gt;</code> are all template classes.
	</div>
	<h3>Template with Multiple Types</h3>
<pre><code>template &lt;class K, class V&gt;
class Pair {
    K key;
    V value;
public:
    Pair(K k, V v) : key(k), value(v) {  }
    K getKey() {  return key;  }
    V getValue() {  return value;  }
};

Pair&lt;string, int&gt; p("age", 25);
cout &lt;&lt; p.getKey() &lt;&lt; ": " &lt;&lt; p.getValue();  // age: 25</code></pre>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Arrays</strong> — contiguous, same type, 0-indexed, fixed size once declared</li>
			<li>• <strong>Structures</strong> — group different types, padding exists, passed by value by default</li>
			<li>• <strong>Pointers</strong> — store addresses, enable heap allocation, always pair new/delete</li>
			<li>• <strong>References</strong> — aliases, must be initialized, cannot be null or reassigned</li>
			<li>• <strong>Functions</strong> — modularity, overloading, default arguments</li>
			<li>• <strong>Parameter Passing</strong> — by value (copy), by address (pointer), by reference (alias)</li>
			<li>• <strong>Array params</strong> — always passed as pointer, size must be separate parameter</li>
			<li>• <strong>Structure params</strong> — passed by value (expensive), prefer reference/pointer</li>
			<li>• <strong>Classes</strong> — encapsulation, constructors, destructors, access specifiers</li>
			<li>• <strong>Templates</strong> — generic programming, foundation of STL, write once for all types</li>
		</ul>
	</div>
</section>
`;
