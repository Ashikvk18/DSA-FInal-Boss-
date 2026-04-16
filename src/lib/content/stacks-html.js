export const theoryHTML = `
<section class="theory-section" id="stack-intro">
	<h2>1. What is a Stack?</h2>
	<div class="definition-box">
		<strong>Stack:</strong> A linear data structure that follows the <strong>LIFO</strong> (Last In, First Out) principle. The last element pushed onto the stack is the first one to be popped off. Think of a stack of plates — you add to the top and remove from the top.
	</div>

<pre><code>// Stack operations:
// push(x)  — add element x to the top        O(1)
// pop()    — remove and return top element    O(1)
// peek()   — return top element without removing  O(1)
// isEmpty() — check if stack is empty         O(1)
// isFull()  — check if stack is full (array)  O(1)

// Visual:
//   push(10) push(20) push(30)   pop()    peek()
//   |    |   |    |   | 30 |   |    |    |    |
//   |    |   |    |   | 20 |   | 20 |    | 20 | ← returns 20
//   | 10 |   | 20 |   | 10 |   | 10 |    | 10 |
//   +----+   | 10 |   +----+   +----+    +----+
//            +----+</code></pre>

	<h3>Real-World Uses of Stacks</h3>
	<ul class="list-disc pl-6 text-gray-300 space-y-1">
		<li><strong>Function call stack</strong> — every function call pushes a frame, return pops it</li>
		<li><strong>Undo/Redo</strong> — undo stack and redo stack in editors</li>
		<li><strong>Browser history</strong> — back button pops from history stack</li>
		<li><strong>Expression evaluation</strong> — converting and evaluating postfix/prefix</li>
		<li><strong>Parenthesis matching</strong> — compilers check balanced brackets</li>
		<li><strong>DFS</strong> — depth-first search uses a stack (explicit or recursion)</li>
	</ul>
</section>

<section class="theory-section" id="stack-array">
	<h2>2. Stack Implementation using Array</h2>
<pre><code>class Stack {
    int *arr;
    int top;
    int capacity;
public:
    Stack(int size) {
        capacity = size;
        arr = new int[capacity];
        top = -1;  // empty stack
    }
    
    void push(int x) {
        if (isFull()) {
            cout &lt;&lt; "Stack Overflow!" &lt;&lt; endl;
            return;
        }
        arr[++top] = x;
    }
    
    int pop() {
        if (isEmpty()) {
            cout &lt;&lt; "Stack Underflow!" &lt;&lt; endl;
            return -1;
        }
        return arr[top--];
    }
    
    int peek() {
        if (isEmpty()) return -1;
        return arr[top];
    }
    
    bool isEmpty() { return top == -1; }
    bool isFull()  { return top == capacity - 1; }
    int size()     { return top + 1; }
    
    ~Stack() { delete[] arr; }
};

// All operations are O(1)!
// Drawback: fixed size — may overflow or waste space</code></pre>
</section>

<section class="theory-section" id="stack-ll">
	<h2>3. Stack Implementation using Linked List</h2>
<pre><code>struct Node {
    int data;
    Node *next;
};

class StackLL {
    Node *top;
    int count;
public:
    StackLL() : top(nullptr), count(0) {}
    
    void push(int x) {
        Node *newNode = new Node{x, top};
        top = newNode;
        count++;
    }
    // Push is insert-at-head → O(1)
    
    int pop() {
        if (isEmpty()) {
            cout &lt;&lt; "Stack Underflow!" &lt;&lt; endl;
            return -1;
        }
        Node *temp = top;
        int val = temp-&gt;data;
        top = top-&gt;next;
        delete temp;
        count--;
        return val;
    }
    // Pop is delete-from-head → O(1)
    
    int peek() {
        if (isEmpty()) return -1;
        return top-&gt;data;
    }
    
    bool isEmpty() { return top == nullptr; }
    int size()     { return count; }
    
    ~StackLL() {
        while (top) {
            Node *temp = top;
            top = top-&gt;next;
            delete temp;
        }
    }
};

// Advantages over array stack:
// ✓ No fixed size — grows as needed
// ✓ No overflow (unless out of memory)
// ✗ Extra memory per node (pointer overhead)
// ✗ No random access (but stacks don't need it)</code></pre>

	<h3>Array vs Linked List Stack</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Feature</th>
				<th class="text-left p-2 text-gray-400">Array Stack</th>
				<th class="text-left p-2 text-gray-400">LL Stack</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Push/Pop</td><td class="p-2">O(1)</td><td class="p-2">O(1)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Size limit</td><td class="p-2">Fixed</td><td class="p-2">Dynamic</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Memory</td><td class="p-2">Contiguous, cache-friendly</td><td class="p-2">Scattered, pointer overhead</td></tr>
			<tr><td class="p-2">Best for</td><td class="p-2">Known max size</td><td class="p-2">Unknown/variable size</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="parenthesis">
	<h2>4. Parenthesis Matching</h2>
	<div class="definition-box">
		<strong>Problem:</strong> Given a string with brackets <code>()[]&#123;&#125;</code>, determine if every opening bracket has a matching closing bracket in the correct order. This is how <strong>compilers</strong> check your code syntax!
	</div>

<pre><code>// Algorithm:
// 1. Scan left to right
// 2. If opening bracket → push onto stack
// 3. If closing bracket → pop and check if it matches
// 4. At the end, stack should be empty

bool isBalanced(string expr) {
    stack&lt;char&gt; s;
    
    for (char c : expr) {
        if (c == '(' || c == '[' || c == '{')
            s.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (s.empty()) return false;  // no matching open
            
            char top = s.top(); s.pop();
            if ((c == ')' &amp;&amp; top != '(') ||
                (c == ']' &amp;&amp; top != '[') ||
                (c == '}' &amp;&amp; top != '{'))
                return false;  // mismatched pair
        }
    }
    return s.empty();  // all brackets matched?
}

// Examples:
// "(())"       → true
// "([{}])"     → true
// "(()"        → false (unmatched opening)
// "(]"         → false (mismatched pair)
// "}{)"        → false (closing before opening)</code></pre>
</section>

<section class="theory-section" id="infix-postfix">
	<h2>5. Infix, Prefix, and Postfix Expressions</h2>
	<div class="definition-box">
		<strong>Infix:</strong> Operator between operands: <code>A + B</code> (human-readable, needs precedence rules)<br>
		<strong>Prefix (Polish):</strong> Operator before operands: <code>+ A B</code><br>
		<strong>Postfix (Reverse Polish):</strong> Operator after operands: <code>A B +</code> (no parentheses needed!)
	</div>

	<h3>Why Postfix?</h3>
<pre><code>// Infix: A + B * C     → ambiguous without precedence!
//   Is it (A + B) * C  or  A + (B * C)?
//   We need BODMAS/PEMDAS rules

// Postfix: A B C * +   → unambiguous!
//   Read left to right: multiply B*C first, then add A
//   NO parentheses needed, NO precedence rules needed
//   Computers evaluate postfix directly using a stack</code></pre>

	<h3>Operator Precedence</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Operator</th>
				<th class="text-left p-2 text-gray-400">Precedence</th>
				<th class="text-left p-2 text-gray-400">Associativity</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">^ (power)</td><td class="p-2">3 (highest)</td><td class="p-2">Right to left</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">* /</td><td class="p-2">2</td><td class="p-2">Left to right</td></tr>
			<tr><td class="p-2">+ -</td><td class="p-2">1 (lowest)</td><td class="p-2">Left to right</td></tr>
		</tbody>
	</table>

	<h3>Infix to Postfix Conversion (Shunting Yard Algorithm)</h3>
<pre><code>int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

string infixToPostfix(string infix) {
    string postfix = "";
    stack&lt;char&gt; s;
    
    for (char c : infix) {
        // Operand → output directly
        if (isalnum(c)) {
            postfix += c;
        }
        // Opening bracket → push
        else if (c == '(') {
            s.push(c);
        }
        // Closing bracket → pop until '('
        else if (c == ')') {
            while (!s.empty() &amp;&amp; s.top() != '(') {
                postfix += s.top();
                s.pop();
            }
            s.pop();  // remove '('
        }
        // Operator → pop higher/equal precedence, then push
        else {
            while (!s.empty() &amp;&amp; s.top() != '(' &amp;&amp;
                   precedence(s.top()) &gt;= precedence(c)) {
                postfix += s.top();
                s.pop();
            }
            s.push(c);
        }
    }
    
    // Pop remaining operators
    while (!s.empty()) {
        postfix += s.top();
        s.pop();
    }
    return postfix;
}

// Examples:
// "A+B*C"       → "ABC*+"
// "(A+B)*C"     → "AB+C*"
// "A+B*C-D/E"   → "ABC*+DE/-"
// "((A+B)*C-D)" → "AB+C*D-"</code></pre>
</section>

<section class="theory-section" id="postfix-eval">
	<h2>6. Postfix Expression Evaluation</h2>
<pre><code>// Algorithm:
// 1. Scan left to right
// 2. If operand → push onto stack
// 3. If operator → pop two operands, apply operator, push result
// 4. Final value on stack is the answer

int evalPostfix(string postfix) {
    stack&lt;int&gt; s;
    
    for (char c : postfix) {
        if (isdigit(c)) {
            s.push(c - '0');  // convert char to int
        } else {
            int b = s.top(); s.pop();  // second operand (popped first!)
            int a = s.top(); s.pop();  // first operand
            
            switch (c) {
                case '+': s.push(a + b); break;
                case '-': s.push(a - b); break;
                case '*': s.push(a * b); break;
                case '/': s.push(a / b); break;
            }
        }
    }
    return s.top();
}

// Example: "23*5+" 
// Step 1: push 2        Stack: [2]
// Step 2: push 3        Stack: [2, 3]
// Step 3: pop 3,2 → 2*3=6, push 6   Stack: [6]
// Step 4: push 5        Stack: [6, 5]
// Step 5: pop 5,6 → 6+5=11, push 11  Stack: [11]
// Answer: 11  (equivalent to 2*3+5)</code></pre>

	<h3>Prefix Evaluation</h3>
<pre><code>// Same idea, but scan RIGHT to LEFT
// Or: reverse the string, swap ( and ), treat as postfix

int evalPrefix(string prefix) {
    stack&lt;int&gt; s;
    
    // Scan from right to left
    for (int i = prefix.length() - 1; i &gt;= 0; i--) {
        char c = prefix[i];
        if (isdigit(c)) {
            s.push(c - '0');
        } else {
            int a = s.top(); s.pop();  // first operand
            int b = s.top(); s.pop();  // second operand
            switch (c) {
                case '+': s.push(a + b); break;
                case '-': s.push(a - b); break;
                case '*': s.push(a * b); break;
                case '/': s.push(a / b); break;
            }
        }
    }
    return s.top();
}</code></pre>
</section>

<section class="theory-section" id="stack-applications">
	<h2>7. More Stack Applications</h2>

	<h3>Reverse a String using Stack</h3>
<pre><code>string reverseString(string s) {
    stack&lt;char&gt; st;
    for (char c : s) st.push(c);
    
    string result = "";
    while (!st.empty()) {
        result += st.top();
        st.pop();
    }
    return result;
}
// "Hello" → push H,e,l,l,o → pop o,l,l,e,H → "olleH"</code></pre>

	<h3>Next Greater Element</h3>
<pre><code>// For each element, find the next element that is greater
// Brute force: O(n²). Stack solution: O(n)!

void nextGreaterElement(int arr[], int n) {
    stack&lt;int&gt; s;
    int result[100];
    
    // Traverse from right to left
    for (int i = n-1; i &gt;= 0; i--) {
        // Pop elements smaller than current
        while (!s.empty() &amp;&amp; s.top() &lt;= arr[i])
            s.pop();
        
        result[i] = s.empty() ? -1 : s.top();
        s.push(arr[i]);
    }
    
    for (int i = 0; i &lt; n; i++)
        cout &lt;&lt; arr[i] &lt;&lt; " → " &lt;&lt; result[i] &lt;&lt; endl;
}

// [4, 5, 2, 10, 8]
// 4 → 5, 5 → 10, 2 → 10, 10 → -1, 8 → -1</code></pre>

	<h3>Stock Span Problem</h3>
<pre><code>// For each day, find how many consecutive previous days
// had price less than or equal to today's price

void stockSpan(int prices[], int n) {
    stack&lt;int&gt; s;  // stores indices
    int span[100];
    
    for (int i = 0; i &lt; n; i++) {
        while (!s.empty() &amp;&amp; prices[s.top()] &lt;= prices[i])
            s.pop();
        
        span[i] = s.empty() ? (i + 1) : (i - s.top());
        s.push(i);
    }
    
    for (int i = 0; i &lt; n; i++)
        cout &lt;&lt; "Day " &lt;&lt; i &lt;&lt; " (price=" &lt;&lt; prices[i] 
             &lt;&lt; "): span=" &lt;&lt; span[i] &lt;&lt; endl;
}
// Prices: [100, 80, 60, 70, 60, 75, 85]
// Spans:  [1,   1,  1,  2,  1,  4,  6]</code></pre>

	<h3>Two Stacks in One Array</h3>
<pre><code>// Use one array for two stacks:
// Stack 1 grows from left (index 0 →)
// Stack 2 grows from right (index n-1 ←)

class TwoStacks {
    int *arr;
    int top1, top2, capacity;
public:
    TwoStacks(int n) : capacity(n), top1(-1), top2(n) {
        arr = new int[n];
    }
    
    void push1(int x) {
        if (top1 &lt; top2 - 1) arr[++top1] = x;
    }
    void push2(int x) {
        if (top1 &lt; top2 - 1) arr[--top2] = x;
    }
    int pop1() {
        if (top1 &gt;= 0) return arr[top1--];
        return -1;
    }
    int pop2() {
        if (top2 &lt; capacity) return arr[top2++];
        return -1;
    }
    ~TwoStacks() { delete[] arr; }
};</code></pre>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Stack = LIFO</strong>. Push, pop, peek — all O(1).</li>
			<li>• <strong>Array stack</strong>: fixed size, cache-friendly. <strong>LL stack</strong>: dynamic, pointer overhead.</li>
			<li>• <strong>Parenthesis matching</strong>: push opening, pop on closing, check match. Stack empty at end = balanced.</li>
			<li>• <strong>Infix → Postfix</strong>: operands go to output, operators go to stack (respect precedence), parentheses control grouping.</li>
			<li>• <strong>Postfix evaluation</strong>: operand → push; operator → pop two, compute, push result.</li>
			<li>• <strong>Next Greater Element</strong>: traverse right to left, pop smaller, answer = stack top.</li>
			<li>• <strong>Stock Span</strong>: how many consecutive days price was ≤ today. Stack of indices.</li>
			<li>• Stacks power function calls, undo, DFS, expression parsing, and many more.</li>
		</ul>
	</div>
</section>
`;
