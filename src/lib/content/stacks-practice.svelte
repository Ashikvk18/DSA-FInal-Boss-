<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Stacks</h2>
		<p class="text-gray-400">Implement stacks from scratch and solve classic stack-based problems.</p>
	</div>

	<div>
		<h3>Practice 1: Stack using Array</h3>
		<p class="text-gray-400 text-sm mb-3">Build a stack with push, pop, peek, and display operations.</p>
		<CodePlayground
			title="Array-Based Stack"
			initialCode={`#include <iostream>
using namespace std;

class Stack {
    int *arr;
    int top, capacity;
public:
    Stack(int size) : capacity(size), top(-1) {
        arr = new int[capacity];
    }
    void push(int x) {
        if (top == capacity - 1) { cout << "Overflow!" << endl; return; }
        arr[++top] = x;
    }
    int pop() {
        if (top == -1) { cout << "Underflow!" << endl; return -1; }
        return arr[top--];
    }
    int peek() { return (top == -1) ? -1 : arr[top]; }
    bool isEmpty() { return top == -1; }
    int size() { return top + 1; }
    void display() {
        cout << "Stack (top->bottom): ";
        for (int i = top; i >= 0; i--) cout << arr[i] << " ";
        cout << endl;
    }
    ~Stack() { delete[] arr; }
};

int main() {
    Stack s(10);
    s.push(10); s.push(20); s.push(30); s.push(40);
    s.display();

    cout << "Peek: " << s.peek() << endl;
    cout << "Pop: " << s.pop() << endl;
    cout << "Pop: " << s.pop() << endl;
    s.display();
    cout << "Size: " << s.size() << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Stack using Linked List</h3>
		<p class="text-gray-400 text-sm mb-3">Dynamic stack with no size limit — push is insert-at-head, pop is delete-from-head.</p>
		<CodePlayground
			title="Linked List Stack"
			initialCode={`#include <iostream>
using namespace std;

struct Node { int data; Node *next; };

class StackLL {
    Node *top;
    int count;
public:
    StackLL() : top(nullptr), count(0) {}

    void push(int x) {
        top = new Node{x, top};
        count++;
    }
    int pop() {
        if (!top) { cout << "Underflow!" << endl; return -1; }
        Node *temp = top;
        int val = temp->data;
        top = top->next;
        delete temp;
        count--;
        return val;
    }
    int peek() { return top ? top->data : -1; }
    bool isEmpty() { return top == nullptr; }
    int size() { return count; }
    void display() {
        cout << "Stack: ";
        Node *p = top;
        while (p) { cout << p->data << " "; p = p->next; }
        cout << endl;
    }
    ~StackLL() { while (top) pop(); }
};

int main() {
    StackLL s;
    s.push(10); s.push(20); s.push(30);
    s.display();

    cout << "Pop: " << s.pop() << endl;
    s.push(40); s.push(50);
    s.display();
    cout << "Size: " << s.size() << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Parenthesis Matching</h3>
		<p class="text-gray-400 text-sm mb-3">Check if brackets are balanced using a stack — how compilers validate syntax!</p>
		<CodePlayground
			title="Balanced Parentheses Checker"
			initialCode={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(string expr) {
    stack<char> s;
    for (char c : expr) {
        if (c == '(' || c == '[' || c == '{')
            s.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (s.empty()) return false;
            char top = s.top(); s.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{'))
                return false;
        }
    }
    return s.empty();
}

int main() {
    string tests[] = {
        "(())",
        "([{}])",
        "(()",
        "(]",
        "{[()]}",
        "((())())()",
        "}{",
        "a*(b+c)-[d/e]"
    };

    for (auto &t : tests) {
        cout << "\\"" << t << "\\" -> "
             << (isBalanced(t) ? "BALANCED" : "NOT balanced") << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Infix to Postfix Conversion</h3>
		<p class="text-gray-400 text-sm mb-3">Convert human-readable expressions to postfix using the Shunting Yard algorithm.</p>
		<CodePlayground
			title="Infix to Postfix"
			initialCode={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

string infixToPostfix(string infix) {
    string postfix = "";
    stack<char> s;

    for (char c : infix) {
        if (isalnum(c)) {
            postfix += c;
        } else if (c == '(') {
            s.push(c);
        } else if (c == ')') {
            while (!s.empty() && s.top() != '(') {
                postfix += s.top(); s.pop();
            }
            s.pop(); // remove '('
        } else {
            while (!s.empty() && s.top() != '(' &&
                   precedence(s.top()) >= precedence(c)) {
                postfix += s.top(); s.pop();
            }
            s.push(c);
        }
    }
    while (!s.empty()) {
        postfix += s.top(); s.pop();
    }
    return postfix;
}

int main() {
    string tests[] = {
        "A+B*C",
        "(A+B)*C",
        "A+B*C-D/E",
        "((A+B)*C-D)",
        "A*(B+C)/D",
        "A+B*(C^D-E)"
    };

    for (auto &t : tests) {
        cout << "Infix:   " << t << endl;
        cout << "Postfix: " << infixToPostfix(t) << endl << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Postfix Expression Evaluation</h3>
		<p class="text-gray-400 text-sm mb-3">Evaluate postfix expressions using a stack — push operands, pop and compute on operators.</p>
		<CodePlayground
			title="Postfix Evaluation"
			initialCode={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

int evalPostfix(string expr) {
    stack<int> s;
    for (char c : expr) {
        if (isdigit(c)) {
            s.push(c - '0');
        } else if (c != ' ') {
            int b = s.top(); s.pop();
            int a = s.top(); s.pop();
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

int main() {
    string exprs[] = {"23*5+", "53+82-*", "46+2/5*7+"};
    // 23*5+ = 2*3+5 = 11
    // 53+82-* = (5+3)*(8-2) = 48
    // 46+2/5*7+ = ((4+6)/2)*5+7 = 32

    for (auto &e : exprs) {
        cout << "Postfix: " << e << endl;
        cout << "Result:  " << evalPostfix(e) << endl << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Next Greater Element</h3>
		<p class="text-gray-400 text-sm mb-3">For each element, find the next element that is greater. Classic O(n) stack trick.</p>
		<CodePlayground
			title="Next Greater Element"
			initialCode={`#include <iostream>
#include <stack>
using namespace std;

void nextGreaterElement(int arr[], int n) {
    stack<int> s;
    int result[100];

    for (int i = n - 1; i >= 0; i--) {
        while (!s.empty() && s.top() <= arr[i])
            s.pop();
        result[i] = s.empty() ? -1 : s.top();
        s.push(arr[i]);
    }

    cout << "Element -> Next Greater" << endl;
    for (int i = 0; i < n; i++)
        cout << "  " << arr[i] << " -> " << result[i] << endl;
}

int main() {
    int arr1[] = {4, 5, 2, 10, 8};
    cout << "Array: 4 5 2 10 8" << endl;
    nextGreaterElement(arr1, 5);

    cout << endl;

    int arr2[] = {13, 7, 6, 12};
    cout << "Array: 13 7 6 12" << endl;
    nextGreaterElement(arr2, 4);

    cout << endl;

    int arr3[] = {1, 3, 2, 4};
    cout << "Array: 1 3 2 4" << endl;
    nextGreaterElement(arr3, 4);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 7: Stock Span Problem</h3>
		<p class="text-gray-400 text-sm mb-3">Find how many consecutive previous days had price ≤ today.</p>
		<CodePlayground
			title="Stock Span"
			initialCode={`#include <iostream>
#include <stack>
using namespace std;

void stockSpan(int prices[], int n) {
    stack<int> s;
    int span[100];

    for (int i = 0; i < n; i++) {
        while (!s.empty() && prices[s.top()] <= prices[i])
            s.pop();
        span[i] = s.empty() ? (i + 1) : (i - s.top());
        s.push(i);
    }

    cout << "Day\\tPrice\\tSpan" << endl;
    for (int i = 0; i < n; i++)
        cout << i << "\\t" << prices[i] << "\\t" << span[i] << endl;
}

int main() {
    int prices[] = {100, 80, 60, 70, 60, 75, 85};
    int n = 7;
    cout << "Stock Span Problem:" << endl;
    stockSpan(prices, n);

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Reverse a String using Stack</h3>
		<p class="text-gray-400 text-sm mb-3">Push all characters onto a stack, then pop them off to get the reverse.</p>
		<CodePlayground
			title="Reverse String with Stack — Try It Yourself"
			initialCode={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

// TODO: Reverse the string using a stack
// 1. Push each character onto the stack
// 2. Pop characters to build the reversed string
string reverseWithStack(string s) {
    // YOUR CODE HERE

}

int main() {
    cout << reverseWithStack("Hello") << endl;    // "olleH"
    cout << reverseWithStack("Stack") << endl;    // "kcatS"
    cout << reverseWithStack("abcdef") << endl;   // "fedcba"
    return 0;
}`}
		/>
	</div>
</div>
