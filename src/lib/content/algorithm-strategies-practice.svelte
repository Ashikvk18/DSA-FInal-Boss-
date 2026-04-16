<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Algorithm Strategies</h2>
		<p class="text-gray-400">Master Divide & Conquer, Greedy, Dynamic Programming, and Backtracking with hands-on C++ problems.</p>
	</div>

	<div>
		<h3>Practice 1: Divide & Conquer — Max Subarray Sum</h3>
		<p class="text-gray-400 text-sm mb-3">Find the maximum contiguous subarray sum using divide and conquer.</p>
		<CodePlayground
			title="Max Subarray Sum — D&C vs Kadane's"
			initialCode={`#include <iostream>
#include <climits>
#include <algorithm>
using namespace std;

// D&C approach: O(n log n)
int maxCrossing(int a[], int l, int m, int r) {
    int leftSum = INT_MIN, sum = 0;
    for (int i = m; i >= l; i--) { sum += a[i]; leftSum = max(leftSum, sum); }
    int rightSum = INT_MIN; sum = 0;
    for (int i = m+1; i <= r; i++) { sum += a[i]; rightSum = max(rightSum, sum); }
    return leftSum + rightSum;
}

int maxSubDC(int a[], int l, int r) {
    if (l == r) return a[l];
    int m = (l + r) / 2;
    return max({maxSubDC(a, l, m), maxSubDC(a, m+1, r), maxCrossing(a, l, m, r)});
}

// Kadane's (DP): O(n)
int kadane(int a[], int n) {
    int maxSoFar = a[0], maxEndingHere = a[0];
    for (int i = 1; i < n; i++) {
        maxEndingHere = max(a[i], maxEndingHere + a[i]);
        maxSoFar = max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = 9;
    cout << "Array: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    cout << "D&C result:    " << maxSubDC(arr, 0, n-1) << endl;
    cout << "Kadane result: " << kadane(arr, n) << endl;
    cout << "(Subarray: [4, -1, 2, 1] = 6)" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Greedy — Activity Selection</h3>
		<p class="text-gray-400 text-sm mb-3">Pick the maximum number of non-overlapping activities by always choosing the earliest finish time.</p>
		<CodePlayground
			title="Activity Selection — Greedy"
			initialCode={`#include <iostream>
#include <algorithm>
using namespace std;

struct Activity { int start, end; string name; };

int main() {
    Activity acts[] = {
        {1, 3, "A"}, {2, 5, "B"}, {4, 7, "C"},
        {1, 8, "D"}, {5, 9, "E"}, {8, 10, "F"},
        {9, 11, "G"}, {11, 14, "H"}, {13, 16, "I"}
    };
    int n = 9;

    // Sort by end time (greedy choice!)
    sort(acts, acts + n, [](Activity &a, Activity &b) {
        return a.end < b.end;
    });

    cout << "Activities sorted by end time:" << endl;
    for (int i = 0; i < n; i++)
        cout << "  " << acts[i].name << ": [" << acts[i].start << ", " << acts[i].end << ")" << endl;

    // Greedy: pick earliest finishing, skip overlaps
    cout << "\\nSelected activities:" << endl;
    int count = 1, lastEnd = acts[0].end;
    cout << "  " << acts[0].name << " [" << acts[0].start << "," << acts[0].end << ")" << endl;

    for (int i = 1; i < n; i++) {
        if (acts[i].start >= lastEnd) {
            cout << "  " << acts[i].name << " [" << acts[i].start << "," << acts[i].end << ")" << endl;
            lastEnd = acts[i].end;
            count++;
        }
    }
    cout << "\\nMax non-overlapping activities: " << count << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: DP — Fibonacci (Top-Down & Bottom-Up)</h3>
		<p class="text-gray-400 text-sm mb-3">Compare naive recursion, memoization, and tabulation for Fibonacci.</p>
		<CodePlayground
			title="Fibonacci — 3 Approaches"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

// 1. Naive recursion — O(2^n)
int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n-1) + fibNaive(n-2);
}

// 2. Memoization (top-down) — O(n)
int memo[100];
int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibMemo(n-1) + fibMemo(n-2);
}

// 3. Tabulation (bottom-up) — O(n)
int fibTab(int n) {
    int dp[n+1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// 4. Space-optimized — O(n) time, O(1) space
int fibOpt(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    memset(memo, -1, sizeof(memo));
    int n = 20;

    cout << "Fibonacci(" << n << "):" << endl;
    cout << "  Naive:       " << fibNaive(n) << endl;
    cout << "  Memoization: " << fibMemo(n) << endl;
    cout << "  Tabulation:  " << fibTab(n) << endl;
    cout << "  Optimized:   " << fibOpt(n) << endl;

    cout << "\\nFirst 15 Fibonacci numbers:" << endl;
    for (int i = 0; i < 15; i++) cout << fibOpt(i) << " ";
    cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: DP — 0/1 Knapsack</h3>
		<p class="text-gray-400 text-sm mb-3">The classic optimization problem: maximize value within weight capacity.</p>
		<CodePlayground
			title="0/1 Knapsack — DP"
			initialCode={`#include <iostream>
#include <algorithm>
using namespace std;

int knapsack(int W, int wt[], int val[], int n) {
    int dp[n+1][W+1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i-1] <= w)
                dp[i][w] = max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }

    // Trace which items were selected
    cout << "Selected items: ";
    int w = W;
    for (int i = n; i > 0; i--) {
        if (dp[i][w] != dp[i-1][w]) {
            cout << "item" << i << "(w=" << wt[i-1] << ",v=" << val[i-1] << ") ";
            w -= wt[i-1];
        }
    }
    cout << endl;

    return dp[n][W];
}

int main() {
    int val[] = {60, 100, 120};
    int wt[]  = {10, 20, 30};
    int W = 50, n = 3;

    cout << "Items: ";
    for (int i = 0; i < n; i++)
        cout << "(w=" << wt[i] << ",v=" << val[i] << ") ";
    cout << "\\nCapacity: " << W << endl;

    int result = knapsack(W, wt, val, n);
    cout << "Max value: " << result << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: DP — Longest Common Subsequence</h3>
		<p class="text-gray-400 text-sm mb-3">Find the LCS of two strings — a fundamental DP problem.</p>
		<CodePlayground
			title="Longest Common Subsequence"
			initialCode={`#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string lcs(string a, string b) {
    int m = a.size(), n = b.size();
    int dp[m+1][n+1];

    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }

    // Trace back to find the actual LCS
    string result;
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (a[i-1] == b[j-1]) { result = a[i-1] + result; i--; j--; }
        else if (dp[i-1][j] > dp[i][j-1]) i--;
        else j--;
    }
    return result;
}

int main() {
    string pairs[][2] = {
        {"ABCBDAB", "BDCAB"},
        {"AGGTAB", "GXTXAYB"},
        {"HELLO", "HALLO"}
    };

    for (auto &p : pairs) {
        string result = lcs(p[0], p[1]);
        cout << "LCS(\"" << p[0] << "\", \"" << p[1] << "\") = \""
             << result << "\" (length " << result.size() << ")" << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Backtracking — N-Queens</h3>
		<p class="text-gray-400 text-sm mb-3">Place N queens on an NxN chessboard so no two attack each other.</p>
		<CodePlayground
			title="N-Queens — Backtracking"
			initialCode={`#include <iostream>
using namespace std;

int board[20][20] = {0};

bool isSafe(int row, int col, int n) {
    for (int i = 0; i < row; i++) if (board[i][col]) return false;
    for (int i=row-1,j=col-1; i>=0&&j>=0; i--,j--) if (board[i][j]) return false;
    for (int i=row-1,j=col+1; i>=0&&j<n; i--,j++) if (board[i][j]) return false;
    return true;
}

void printBoard(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            cout << (board[i][j] ? "Q " : ". ");
        cout << endl;
    }
    cout << endl;
}

int solveNQueens(int row, int n, bool printAll) {
    if (row == n) {
        if (printAll) printBoard(n);
        return 1;
    }
    int count = 0;
    for (int col = 0; col < n; col++) {
        if (isSafe(row, col, n)) {
            board[row][col] = 1;
            count += solveNQueens(row + 1, n, printAll);
            board[row][col] = 0;  // BACKTRACK
        }
    }
    return count;
}

int main() {
    cout << "=== 4-Queens (all solutions) ===" << endl;
    int count4 = solveNQueens(0, 4, true);
    cout << "Total 4-Queens solutions: " << count4 << endl;

    cout << "\\n=== N-Queens solution counts ===" << endl;
    for (int n = 1; n <= 10; n++) {
        int cnt = solveNQueens(0, n, false);
        cout << n << "-Queens: " << cnt << " solutions" << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Coin Change (DP)</h3>
		<p class="text-gray-400 text-sm mb-3">Given coin denominations and a target amount, find the minimum number of coins needed. Classic DP problem!</p>
		<CodePlayground
			title="Coin Change — Try It Yourself"
			initialCode={`#include <iostream>
#include <climits>
using namespace std;

// TODO: Find minimum coins to make amount
// dp[i] = minimum coins to make amount i
// Transition: dp[i] = min(dp[i - coin] + 1) for each coin
// Base: dp[0] = 0

int coinChange(int coins[], int numCoins, int amount) {
    int dp[amount + 1];
    // YOUR CODE HERE
    // 1. Initialize dp array (all to INT_MAX or amount+1)
    // 2. dp[0] = 0
    // 3. For each amount 1..amount, try each coin
    // 4. dp[i] = min(dp[i], dp[i-coin] + 1) if i-coin >= 0

    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    int coins[] = {1, 5, 10, 25};
    int n = 4;

    int amounts[] = {11, 30, 47, 63, 0};
    for (int amt : amounts) {
        int result = coinChange(coins, n, amt);
        cout << "Amount " << amt << ": " << result << " coins" << endl;
    }
    // Expected: 11->2(5+5+1), 30->2(25+5), 47->5(25+10+10+1+1), 63->5, 0->0

    return 0;
}`}
		/>
	</div>
</div>
