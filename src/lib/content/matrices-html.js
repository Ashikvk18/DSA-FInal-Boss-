export const theoryHTML = `
<section class="theory-section" id="matrix-intro">
	<h2>1. Introduction to Matrices</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A <strong>matrix</strong> is a 2D array of numbers arranged in rows and columns. An <strong>m × n</strong> matrix has m rows and n columns. Matrices are fundamental in computer science for representing graphs, images, game boards, and solving systems of equations.
	</div>

<pre><code>// A 3x3 matrix
int M[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access: M[row][col]  (0-indexed)
// M[0][0]=1, M[1][2]=6, M[2][1]=8

// Memory layout (row-major in C++):
// [1,2,3,4,5,6,7,8,9] — stored as one contiguous block</code></pre>

	<h3>Special Positions in a Square Matrix (n × n)</h3>
<pre><code>// For an n×n matrix M:
// Main diagonal:      M[i][j] where i == j
// Anti-diagonal:      M[i][j] where i + j == n - 1
// Upper triangle:     M[i][j] where i &lt; j
// Lower triangle:     M[i][j] where i &gt; j

//     j→ 0  1  2  3
// i=0  [ D  U  U  U ]     D = diagonal
// i=1  [ L  D  U  U ]     U = upper triangle
// i=2  [ L  L  D  U ]     L = lower triangle
// i=3  [ L  L  L  D ]</code></pre>
</section>

<section class="theory-section" id="diagonal-matrix">
	<h2>2. Diagonal Matrix</h2>
	<div class="definition-box">
		<strong>Diagonal Matrix:</strong> A square matrix where all non-diagonal elements are <strong>zero</strong>. Only elements where <code>i == j</code> can be non-zero. An n×n diagonal matrix has at most <strong>n</strong> non-zero elements out of n² total.
	</div>

<pre><code>// 4×4 Diagonal Matrix:
// [ 3  0  0  0 ]
// [ 0  7  0  0 ]
// [ 0  5  0  0 ]    Wait — this is NOT diagonal! M[2][1]=5 but 2≠1
// [ 0  0  0  2 ]

// Correct diagonal:
// [ 3  0  0  0 ]
// [ 0  7  0  0 ]
// [ 0  0  5  0 ]    All non-diagonal = 0
// [ 0  0  0  2 ]</code></pre>

	<h3>Space Optimization</h3>
	<p>Storing an n×n diagonal matrix as a full 2D array wastes n² - n spaces (all zeros). Instead, store only the n diagonal elements in a <strong>1D array</strong>.</p>

<pre><code>class DiagonalMatrix {
    int *A;
    int n;
public:
    DiagonalMatrix(int n) : n(n) {
        A = new int[n]();   // only n elements!
    }
    
    void set(int i, int j, int val) {
        if (i == j)
            A[i] = val;     // store only diagonal
    }
    
    int get(int i, int j) {
        if (i == j) return A[i];
        return 0;           // off-diagonal is always 0
    }
    
    // Full matrix uses n² space
    // This uses only n space — huge savings!
    // 1000×1000 matrix: 1,000,000 → 1,000 (1000x savings)
    
    ~DiagonalMatrix() { delete[] A; }
};</code></pre>
</section>

<section class="theory-section" id="triangular-matrix">
	<h2>3. Lower Triangular Matrix</h2>
	<div class="definition-box">
		<strong>Lower Triangular Matrix:</strong> A square matrix where all elements <strong>above</strong> the main diagonal are zero. Only <code>M[i][j]</code> where <code>i &gt;= j</code> can be non-zero.
	</div>

<pre><code>// Lower Triangular (4×4):
// [ 1  0  0  0 ]
// [ 2  3  0  0 ]    zeros above diagonal
// [ 4  5  6  0 ]
// [ 7  8  9 10 ]

// Non-zero count:
// Row 0: 1 element, Row 1: 2, Row 2: 3, Row 3: 4
// Total = 1+2+3+4 = n(n+1)/2
// For n=4: 10 non-zero out of 16 total</code></pre>

	<h3>Row-Major Mapping (1D storage)</h3>
<pre><code>// Store non-zero elements row by row in a 1D array
// Size needed: n(n+1)/2

// Mapping formula: M[i][j] → A[i*(i+1)/2 + j]
// Row 0: A[0]         → M[0][0]
// Row 1: A[1], A[2]   → M[1][0], M[1][1]
// Row 2: A[3], A[4], A[5] → M[2][0], M[2][1], M[2][2]

class LowerTriangular {
    int *A;
    int n;
public:
    LowerTriangular(int n) : n(n) {
        A = new int[n*(n+1)/2]();
    }
    
    void set(int i, int j, int val) {
        if (i &gt;= j)
            A[i*(i+1)/2 + j] = val;
    }
    
    int get(int i, int j) {
        if (i &gt;= j) return A[i*(i+1)/2 + j];
        return 0;
    }
    
    ~LowerTriangular() { delete[] A; }
};</code></pre>

	<h3>Column-Major Mapping</h3>
<pre><code>// Store column by column instead of row by row
// Mapping formula: M[i][j] → A[j*n - j*(j-1)/2 + (i-j)]
// Or simplified: A[n*j - j*(j-1)/2 + i - j]

// Column-major is sometimes preferred for cache efficiency
// when columns are accessed more than rows</code></pre>
</section>

<section class="theory-section" id="upper-triangular">
	<h2>4. Upper Triangular Matrix</h2>
	<div class="definition-box">
		<strong>Upper Triangular Matrix:</strong> All elements <strong>below</strong> the main diagonal are zero. Only <code>M[i][j]</code> where <code>i &lt;= j</code> can be non-zero.
	</div>

<pre><code>// Upper Triangular (4×4):
// [ 1  2  3  4 ]
// [ 0  5  6  7 ]    zeros below diagonal
// [ 0  0  8  9 ]
// [ 0  0  0 10 ]

// Non-zero count = n(n+1)/2 (same as lower!)
// Row 0: n elements, Row 1: n-1, ... Row n-1: 1

// Row-Major Mapping: M[i][j] → A[i*n - i*(i-1)/2 + (j-i)]

class UpperTriangular {
    int *A;
    int n;
public:
    UpperTriangular(int n) : n(n) {
        A = new int[n*(n+1)/2]();
    }
    
    void set(int i, int j, int val) {
        if (i &lt;= j)
            A[i*n - i*(i-1)/2 + (j-i)] = val;
    }
    
    int get(int i, int j) {
        if (i &lt;= j) return A[i*n - i*(i-1)/2 + (j-i)];
        return 0;
    }
    
    ~UpperTriangular() { delete[] A; }
};</code></pre>
</section>

<section class="theory-section" id="symmetric-matrix">
	<h2>5. Symmetric Matrix</h2>
	<div class="definition-box">
		<strong>Symmetric Matrix:</strong> A square matrix where <code>M[i][j] == M[j][i]</code> for all i, j. The matrix is mirror-symmetric across the main diagonal. It's equal to its own transpose: M = M<sup>T</sup>.
	</div>

<pre><code>// Symmetric Matrix:
// [ 1  2  3  4 ]
// [ 2  5  6  7 ]    M[i][j] == M[j][i]
// [ 3  6  8  9 ]    e.g., M[0][2]=3 and M[2][0]=3
// [ 4  7  9 10 ]

// Since upper and lower triangles are mirrors,
// we only need to store ONE triangle + diagonal
// → Store as Lower Triangular: n(n+1)/2 elements
// → When i &lt; j (upper), return A[j][i] instead

class SymmetricMatrix {
    int *A;
    int n;
public:
    SymmetricMatrix(int n) : n(n) {
        A = new int[n*(n+1)/2]();
    }
    
    void set(int i, int j, int val) {
        if (i &gt;= j)
            A[i*(i+1)/2 + j] = val;
        else
            A[j*(j+1)/2 + i] = val;  // store in mirror position
    }
    
    int get(int i, int j) {
        if (i &gt;= j) return A[i*(i+1)/2 + j];
        return A[j*(j+1)/2 + i];     // mirror lookup
    }
    
    ~SymmetricMatrix() { delete[] A; }
};

// Space: n(n+1)/2 instead of n²
// 1000×1000: 500,500 instead of 1,000,000 — ~50% savings</code></pre>
</section>

<section class="theory-section" id="tridiagonal">
	<h2>6. Tridiagonal & Band Matrix</h2>
	<div class="definition-box">
		<strong>Tridiagonal Matrix:</strong> Non-zero elements appear only on the <strong>main diagonal</strong>, the diagonal <strong>above</strong> it (super-diagonal), and the diagonal <strong>below</strong> it (sub-diagonal). All other elements are zero.
	</div>

<pre><code>// Tridiagonal (5×5):
// [ 1  2  0  0  0 ]    main diagonal: i==j
// [ 3  4  5  0  0 ]    lower diagonal: i==j+1
// [ 0  6  7  8  0 ]    upper diagonal: i==j-1
// [ 0  0  9 10 11 ]    all others: 0
// [ 0  0  0 12 13 ]

// Non-zero count: n + (n-1) + (n-1) = 3n - 2
// For n=5: 13 non-zero out of 25

// Condition: |i - j| &lt;= 1

// Mapping to 1D array (3n-2 elements):
// Lower diagonal (i=j+1): A[i-1]       → indices 0 to n-2
// Main diagonal  (i=j):   A[n-1+i]     → indices n-1 to 2n-2
// Upper diagonal (i=j-1): A[2n-1+i]    → indices 2n-1 to 3n-3</code></pre>
</section>

<section class="theory-section" id="sparse-matrix">
	<h2>7. Sparse Matrix</h2>
	<div class="definition-box">
		<strong>Sparse Matrix:</strong> A matrix where the <strong>majority of elements are zero</strong>. If a matrix has m×n elements and only k are non-zero where k &lt;&lt; m×n, it's sparse. Storing all m×n elements wastes memory.
	</div>

<pre><code>// Sparse Matrix (6×7):
// [ 0  0  0  0  0  0  0 ]
// [ 0  0  5  0  0  0  0 ]     Only 4 non-zero elements
// [ 0  0  0  0  0  0  0 ]     out of 42 total!
// [ 0  3  0  0  0  7  0 ]
// [ 0  0  0  0  0  0  0 ]
// [ 0  0  0  0  9  0  0 ]</code></pre>

	<h3>Representation 1: Coordinate List (COO)</h3>
<pre><code>// Store as array of (row, col, value) triples
struct Element {
    int row, col, val;
};

struct SparseMatrix {
    int m, n, numNonZero;
    Element *elements;
};

// For the matrix above:
// elements = [(1,2,5), (3,1,3), (3,5,7), (5,4,9)]
// Space: 3k instead of m×n (where k = non-zero count)
// 6×7 matrix with 4 non-zero: 12 vs 42 — 71% savings!</code></pre>

	<h3>Representation 2: Compressed Sparse Row (CSR)</h3>
<pre><code>// Three arrays:
// values[]:     non-zero values
// colIndex[]:   column of each non-zero value
// rowPtr[]:     index in values[] where each row starts

// For the example:
// values   = [5, 3, 7, 9]
// colIndex = [2, 1, 5, 4]
// rowPtr   = [0, 0, 1, 1, 3, 3, 4]
//             row0 row1 row2 row3 row4 row5 end

// CSR is more efficient for row-wise operations
// Used in real sparse matrix libraries (Eigen, SciPy)</code></pre>

	<h3>Sparse Matrix Operations</h3>
<pre><code>// Addition of two sparse matrices
// Walk through both element lists simultaneously
// If same (row,col) → add values
// If different → take the one that comes first
// Time: O(k1 + k2) where k1, k2 are non-zero counts

// Transpose
// Swap row and col for each element, then sort
// (1,2,5) → (2,1,5)
// (3,1,3) → (1,3,3)
// Time: O(k log k) due to sorting</code></pre>
</section>

<section class="theory-section" id="polynomial">
	<h2>8. Polynomial Representation</h2>
	<div class="definition-box">
		<strong>Polynomial:</strong> An expression like 3x⁵ + 2x³ + 7x + 4. Can be stored as an array of (coefficient, exponent) pairs — similar to sparse matrix representation since many coefficients may be zero.
	</div>

<pre><code>// Polynomial: 3x^5 + 2x^3 + 7x + 4
// Terms: (3,5), (2,3), (7,1), (4,0)

struct Term {
    int coeff;
    int exp;
};

struct Polynomial {
    int numTerms;
    Term *terms;
};

// Addition: merge two sorted-by-exponent term lists
// Same exponent → add coefficients
// Different → take the larger exponent term first
// Exactly like merging sorted arrays!

Polynomial addPoly(Polynomial p1, Polynomial p2) {
    Polynomial result;
    result.terms = new Term[p1.numTerms + p2.numTerms];
    int i = 0, j = 0, k = 0;
    
    while (i &lt; p1.numTerms &amp;&amp; j &lt; p2.numTerms) {
        if (p1.terms[i].exp &gt; p2.terms[j].exp)
            result.terms[k++] = p1.terms[i++];
        else if (p1.terms[i].exp &lt; p2.terms[j].exp)
            result.terms[k++] = p2.terms[j++];
        else {
            result.terms[k].exp = p1.terms[i].exp;
            result.terms[k].coeff = p1.terms[i].coeff + p2.terms[j].coeff;
            if (result.terms[k].coeff != 0) k++;
            i++; j++;
        }
    }
    while (i &lt; p1.numTerms) result.terms[k++] = p1.terms[i++];
    while (j &lt; p2.numTerms) result.terms[k++] = p2.terms[j++];
    
    result.numTerms = k;
    return result;
}

// Evaluation using Horner's method for efficiency</code></pre>
</section>

<section class="theory-section" id="space-summary">
	<h2>9. Space Complexity Summary</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Matrix Type</th>
				<th class="text-left p-2 text-gray-400">Full Storage</th>
				<th class="text-left p-2 text-gray-400">Optimized Storage</th>
				<th class="text-left p-2 text-gray-400">Savings</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Diagonal</td><td class="p-2">n²</td><td class="p-2">n</td><td class="p-2">~n× less</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Lower Triangular</td><td class="p-2">n²</td><td class="p-2">n(n+1)/2</td><td class="p-2">~50%</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Upper Triangular</td><td class="p-2">n²</td><td class="p-2">n(n+1)/2</td><td class="p-2">~50%</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Symmetric</td><td class="p-2">n²</td><td class="p-2">n(n+1)/2</td><td class="p-2">~50%</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Tridiagonal</td><td class="p-2">n²</td><td class="p-2">3n - 2</td><td class="p-2">~n/3× less</td></tr>
			<tr><td class="p-2">Sparse (k non-zero)</td><td class="p-2">m×n</td><td class="p-2">3k (COO)</td><td class="p-2">Depends on k</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Diagonal matrix</strong> — only M[i][j] where i==j. Store in 1D array of size n.</li>
			<li>• <strong>Lower triangular</strong> — M[i][j]==0 when i&lt;j. Store n(n+1)/2 elements. Map: i*(i+1)/2 + j.</li>
			<li>• <strong>Upper triangular</strong> — M[i][j]==0 when i&gt;j. Store n(n+1)/2 elements.</li>
			<li>• <strong>Symmetric</strong> — M[i][j]==M[j][i]. Store as lower triangular, mirror for upper lookups.</li>
			<li>• <strong>Tridiagonal</strong> — non-zero only when |i-j| &lt;= 1. Store 3n-2 elements.</li>
			<li>• <strong>Sparse matrix</strong> — mostly zeros. Store as (row, col, val) triples or CSR format.</li>
			<li>• <strong>Sparse operations</strong> — addition is like merging sorted lists. Transpose swaps row/col.</li>
			<li>• <strong>Polynomial</strong> — stored as (coeff, exp) pairs. Addition merges by exponent.</li>
			<li>• The key idea: <strong>exploit structure to save space</strong> by not storing predictable zeros.</li>
		</ul>
	</div>
</section>
`;
