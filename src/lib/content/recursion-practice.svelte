<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Recursion</h2>
		<p class="text-gray-400">Master recursion by tracing, writing, and experimenting with these problems.</p>
	</div>

	<div>
		<h3>Practice 1: Factorial — Trace It</h3>
		<p class="text-gray-400 text-sm mb-3">Run and observe the stack frames being created and destroyed.</p>
		<CodePlayground
			title="Factorial with Tracing"
			initialCode={`#include <iostream>
using namespace std;

int factorial(int n) {
    cout << "  Entering factorial(" << n << ")" << endl;
    if (n <= 0) {
        cout << "  Base case! Returning 1" << endl;
        return 1;
    }
    int result = n * factorial(n - 1);
    cout << "  Returning factorial(" << n << ") = " << result << endl;
    return result;
}

int main() {
    cout << "=== Factorial(5) ===" << endl;
    int ans = factorial(5);
    cout << "\\nAnswer: " << ans << endl;
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Head vs Tail Recursion</h3>
		<p class="text-gray-400 text-sm mb-3">See how the order of printing changes based on where the recursive call is.</p>
		<CodePlayground
			title="Head vs Tail Recursion"
			initialCode={`#include <iostream>
using namespace std;

// Tail: work BEFORE recursive call
void tailPrint(int n) {
    if (n == 0) return;
    cout << n << " ";       // prints FIRST
    tailPrint(n - 1);       // then recurse
}

// Head: work AFTER recursive call
void headPrint(int n) {
    if (n == 0) return;
    headPrint(n - 1);       // recurse FIRST
    cout << n << " ";       // prints AFTER
}

int main() {
    cout << "Tail (descending): ";
    tailPrint(5);
    cout << endl;

    cout << "Head (ascending):  ";
    headPrint(5);
    cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Fibonacci — Naive vs Memoized</h3>
		<p class="text-gray-400 text-sm mb-3">Compare the call counts of naive vs memoized Fibonacci.</p>
		<CodePlayground
			title="Fibonacci: Naive vs Memoized"
			initialCode={`#include <iostream>
using namespace std;

int naiveCalls = 0;
int memoCalls = 0;

// Naive — O(2^n)
int fibNaive(int n) {
    naiveCalls++;
    if (n <= 1) return n;
    return fibNaive(n-1) + fibNaive(n-2);
}

// Memoized — O(n)
int cache[100];
bool computed[100] = {false};

int fibMemo(int n) {
    memoCalls++;
    if (n <= 1) return n;
    if (computed[n]) return cache[n];
    cache[n] = fibMemo(n-1) + fibMemo(n-2);
    computed[n] = true;
    return cache[n];
}

int main() {
    int n = 30;

    naiveCalls = 0;
    cout << "fib(" << n << ") = " << fibNaive(n) << endl;
    cout << "Naive calls: " << naiveCalls << endl;

    memoCalls = 0;
    cout << "\\nfib(" << n << ") = " << fibMemo(n) << endl;
    cout << "Memoized calls: " << memoCalls << endl;

    cout << "\\nSpeedup: " << naiveCalls / memoCalls << "x faster!" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Power — O(n) vs O(log n)</h3>
		<p class="text-gray-400 text-sm mb-3">Compare naive exponentiation with fast power using divide and conquer.</p>
		<CodePlayground
			title="Power: Naive vs Fast"
			initialCode={`#include <iostream>
using namespace std;

int slowCalls = 0, fastCalls = 0;

// O(n) — multiplies x, n times
long long slowPower(int x, int n) {
    slowCalls++;
    if (n == 0) return 1;
    return x * slowPower(x, n - 1);
}

// O(log n) — squares the half each time
long long fastPower(int x, int n) {
    fastCalls++;
    if (n == 0) return 1;
    long long half = fastPower(x, n / 2);
    if (n % 2 == 0)
        return half * half;
    else
        return x * half * half;
}

int main() {
    int x = 2, n = 20;

    slowCalls = 0;
    cout << x << "^" << n << " = " << slowPower(x, n) << endl;
    cout << "Slow calls: " << slowCalls << endl;

    fastCalls = 0;
    cout << x << "^" << n << " = " << fastPower(x, n) << endl;
    cout << "Fast calls: " << fastCalls << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Tower of Hanoi</h3>
		<p class="text-gray-400 text-sm mb-3">Watch the classic puzzle solved recursively. Try changing n to see how moves grow exponentially.</p>
		<CodePlayground
			title="Tower of Hanoi"
			initialCode={`#include <iostream>
using namespace std;

int moveCount = 0;

void towerOfHanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    towerOfHanoi(n - 1, from, aux, to);
    moveCount++;
    cout << "Move disk " << n << ": " << from << " -> " << to << endl;
    towerOfHanoi(n - 1, aux, to, from);
}

int main() {
    int n = 3;  // try 4, 5 to see exponential growth

    cout << "Tower of Hanoi with " << n << " disks:" << endl;
    cout << "================================" << endl;
    towerOfHanoi(n, 'A', 'C', 'B');

    cout << "================================" << endl;
    cout << "Total moves: " << moveCount << endl;
    cout << "Formula: 2^n - 1 = " << ((1 << n) - 1) << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: nCr — Combinations</h3>
		<p class="text-gray-400 text-sm mb-3">Compute combinations using Pascal's triangle recursion.</p>
		<CodePlayground
			title="nCr using Pascal's Identity"
			initialCode={`#include <iostream>
using namespace std;

int calls = 0;

int nCr(int n, int r) {
    calls++;
    if (r == 0 || r == n) return 1;
    return nCr(n-1, r-1) + nCr(n-1, r);
}

int main() {
    cout << "C(5,2) = " << nCr(5, 2) << " (calls: " << calls << ")" << endl;
    calls = 0;
    cout << "C(10,3) = " << nCr(10, 3) << " (calls: " << calls << ")" << endl;
    calls = 0;
    cout << "C(20,10) = " << nCr(20, 10) << " (calls: " << calls << ")" << endl;

    // Print Pascal's Triangle
    cout << "\\nPascal's Triangle (first 8 rows):" << endl;
    for (int i = 0; i < 8; i++) {
        for (int s = 0; s < 7 - i; s++) cout << "  ";
        for (int j = 0; j <= i; j++)
            cout << nCr(i, j) << "   ";
        cout << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 7: Taylor Series (e^x)</h3>
		<p class="text-gray-400 text-sm mb-3">Compute e^x using recursion and compare with Horner's method.</p>
		<CodePlayground
			title="Taylor Series for e^x"
			initialCode={`#include <iostream>
#include <cmath>
using namespace std;

// Iterative Taylor series — O(n)
double taylorIterative(double x, int terms) {
    double result = 1.0;
    double term = 1.0;
    for (int i = 1; i < terms; i++) {
        term *= x / i;
        result += term;
    }
    return result;
}

int main() {
    double x = 1.0;  // e^1 should be ~2.71828

    cout << "Computing e^" << x << " with increasing terms:" << endl;
    for (int n = 1; n <= 15; n++) {
        double approx = taylorIterative(x, n);
        cout << "Terms=" << n << "\\t e^x = " << approx
             << "\\t error = " << abs(approx - exp(x)) << endl;
    }

    cout << "\\nActual e^1 = " << exp(1.0) << endl;

    // Try different x values
    cout << "\\ne^2 (10 terms) = " << taylorIterative(2.0, 10) << " (actual: " << exp(2.0) << ")" << endl;
    cout << "e^3 (15 terms) = " << taylorIterative(3.0, 15) << " (actual: " << exp(3.0) << ")" << endl;

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Sum of Digits (Recursive)</h3>
		<p class="text-gray-400 text-sm mb-3">Write a recursive function to compute the sum of digits of a number. e.g., sumDigits(1234) = 10.</p>
		<CodePlayground
			title="Sum of Digits — Write It Yourself!"
			initialCode={`#include <iostream>
using namespace std;

// TODO: Write a recursive function sumDigits(int n)
// Base case: if n == 0, return 0
// Recursive: last digit (n%10) + sumDigits(n/10)
int sumDigits(int n) {
    // YOUR CODE HERE


}

int main() {
    cout << "sumDigits(1234) = " << sumDigits(1234) << endl;   // expected: 10
    cout << "sumDigits(9999) = " << sumDigits(9999) << endl;   // expected: 36
    cout << "sumDigits(105)  = " << sumDigits(105) << endl;    // expected: 6
    return 0;
}`}
		/>
	</div>
</div>
