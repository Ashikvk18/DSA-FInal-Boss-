<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Matrices</h2>
		<p class="text-gray-400">Implement special matrix representations and operations to master space-efficient storage.</p>
	</div>

	<div>
		<h3>Practice 1: Diagonal Matrix Class</h3>
		<p class="text-gray-400 text-sm mb-3">Store only diagonal elements in a 1D array instead of a full 2D array.</p>
		<CodePlayground
			title="Diagonal Matrix — Space Optimized"
			initialCode={`#include <iostream>
using namespace std;

class DiagonalMatrix {
    int *A;
    int n;
public:
    DiagonalMatrix(int n) : n(n) {
        A = new int[n]();
        cout << "Storage: " << n << " ints (vs " << n*n << " for full 2D)" << endl;
    }
    void set(int i, int j, int val) {
        if (i == j) A[i] = val;
    }
    int get(int i, int j) {
        return (i == j) ? A[i] : 0;
    }
    void display() {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++)
                cout << get(i, j) << "\\t";
            cout << endl;
        }
    }
    ~DiagonalMatrix() { delete[] A; }
};

int main() {
    DiagonalMatrix d(4);
    d.set(0, 0, 5);
    d.set(1, 1, 8);
    d.set(2, 2, 3);
    d.set(3, 3, 12);
    d.set(1, 2, 99);  // ignored — not on diagonal

    cout << "\\nDiagonal Matrix:" << endl;
    d.display();
    cout << "\\nM[1][1] = " << d.get(1, 1) << endl;
    cout << "M[0][2] = " << d.get(0, 2) << " (off-diagonal = 0)" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Lower Triangular Matrix</h3>
		<p class="text-gray-400 text-sm mb-3">Map a lower triangular matrix to a 1D array using row-major formula.</p>
		<CodePlayground
			title="Lower Triangular Matrix"
			initialCode={`#include <iostream>
using namespace std;

class LowerTriangular {
    int *A;
    int n;
public:
    LowerTriangular(int n) : n(n) {
        int size = n * (n + 1) / 2;
        A = new int[size]();
        cout << "Storage: " << size << " ints (vs " << n*n << " for full)" << endl;
    }
    void set(int i, int j, int val) {
        if (i >= j) A[i*(i+1)/2 + j] = val;
    }
    int get(int i, int j) {
        if (i >= j) return A[i*(i+1)/2 + j];
        return 0;
    }
    void display() {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++)
                cout << get(i, j) << "\\t";
            cout << endl;
        }
    }
    ~LowerTriangular() { delete[] A; }
};

int main() {
    LowerTriangular L(4);
    // Set the lower triangle
    L.set(0, 0, 1);
    L.set(1, 0, 2);  L.set(1, 1, 3);
    L.set(2, 0, 4);  L.set(2, 1, 5);  L.set(2, 2, 6);
    L.set(3, 0, 7);  L.set(3, 1, 8);  L.set(3, 2, 9);  L.set(3, 3, 10);

    cout << "\\nLower Triangular Matrix:" << endl;
    L.display();

    cout << "\\nL[2][1] = " << L.get(2, 1) << endl;
    cout << "L[0][3] = " << L.get(0, 3) << " (upper triangle = 0)" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Symmetric Matrix</h3>
		<p class="text-gray-400 text-sm mb-3">Store only the lower triangle and mirror for upper lookups.</p>
		<CodePlayground
			title="Symmetric Matrix"
			initialCode={`#include <iostream>
using namespace std;

class SymmetricMatrix {
    int *A;
    int n;
public:
    SymmetricMatrix(int n) : n(n) {
        A = new int[n*(n+1)/2]();
    }
    void set(int i, int j, int val) {
        if (i >= j) A[i*(i+1)/2 + j] = val;
        else A[j*(j+1)/2 + i] = val;
    }
    int get(int i, int j) {
        if (i >= j) return A[i*(i+1)/2 + j];
        return A[j*(j+1)/2 + i];  // mirror!
    }
    void display() {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++)
                cout << get(i, j) << "\\t";
            cout << endl;
        }
    }
    ~SymmetricMatrix() { delete[] A; }
};

int main() {
    SymmetricMatrix S(4);
    // Set values — only need lower triangle
    S.set(0,0,1);
    S.set(1,0,2); S.set(1,1,5);
    S.set(2,0,3); S.set(2,1,6); S.set(2,2,8);
    S.set(3,0,4); S.set(3,1,7); S.set(3,2,9); S.set(3,3,10);

    cout << "Symmetric Matrix:" << endl;
    S.display();

    // Verify symmetry
    cout << "\\nS[0][2] = " << S.get(0, 2) << endl;
    cout << "S[2][0] = " << S.get(2, 0) << " (same!)" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Sparse Matrix using Coordinate List</h3>
		<p class="text-gray-400 text-sm mb-3">Store only non-zero elements as (row, col, value) triples.</p>
		<CodePlayground
			title="Sparse Matrix — COO Representation"
			initialCode={`#include <iostream>
using namespace std;

struct Element {
    int row, col, val;
};

class SparseMatrix {
    int m, n, num;
    Element *elements;
public:
    SparseMatrix(int m, int n, int num) : m(m), n(n), num(num) {
        elements = new Element[num];
    }
    void setElement(int idx, int r, int c, int v) {
        elements[idx] = {r, c, v};
    }
    void display() {
        int k = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (k < num && elements[k].row == i && elements[k].col == j)
                    cout << elements[k++].val << "\\t";
                else
                    cout << "0\\t";
            }
            cout << endl;
        }
    }
    void displayTriples() {
        cout << "Triples (row, col, val):" << endl;
        for (int i = 0; i < num; i++)
            cout << "  (" << elements[i].row << ", "
                 << elements[i].col << ", "
                 << elements[i].val << ")" << endl;
    }

    SparseMatrix* add(SparseMatrix &other) {
        SparseMatrix *result = new SparseMatrix(m, n, num + other.num);
        int i = 0, j = 0, k = 0;
        while (i < num && j < other.num) {
            int r1 = elements[i].row * n + elements[i].col;
            int r2 = other.elements[j].row * n + other.elements[j].col;
            if (r1 < r2) result->elements[k++] = elements[i++];
            else if (r1 > r2) result->elements[k++] = other.elements[j++];
            else {
                result->elements[k] = elements[i];
                result->elements[k].val += other.elements[j].val;
                if (result->elements[k].val != 0) k++;
                i++; j++;
            }
        }
        while (i < num) result->elements[k++] = elements[i++];
        while (j < other.num) result->elements[k++] = other.elements[j++];
        result->num = k;
        return result;
    }

    ~SparseMatrix() { delete[] elements; }
};

int main() {
    SparseMatrix S1(4, 5, 3);
    S1.setElement(0, 0, 2, 5);
    S1.setElement(1, 1, 4, 3);
    S1.setElement(2, 3, 1, 7);

    cout << "Sparse Matrix (4x5, 3 non-zero):" << endl;
    S1.display();
    cout << endl;
    S1.displayTriples();
    cout << "\\nFull storage: " << 4*5 << " ints" << endl;
    cout << "Sparse storage: " << 3*3 << " ints (3 triples)" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Polynomial Addition</h3>
		<p class="text-gray-400 text-sm mb-3">Represent polynomials as (coeff, exp) pairs and add them by merging.</p>
		<CodePlayground
			title="Polynomial Representation & Addition"
			initialCode={`#include <iostream>
using namespace std;

struct Term { int coeff, exp; };

struct Poly {
    Term *terms;
    int n;
};

void displayPoly(Poly p) {
    for (int i = 0; i < p.n; i++) {
        if (i > 0 && p.terms[i].coeff > 0) cout << " + ";
        else if (i > 0) cout << " ";
        cout << p.terms[i].coeff;
        if (p.terms[i].exp > 0) cout << "x^" << p.terms[i].exp;
    }
    cout << endl;
}

Poly addPoly(Poly p1, Poly p2) {
    Poly result;
    result.terms = new Term[p1.n + p2.n];
    int i = 0, j = 0, k = 0;

    while (i < p1.n && j < p2.n) {
        if (p1.terms[i].exp > p2.terms[j].exp)
            result.terms[k++] = p1.terms[i++];
        else if (p1.terms[i].exp < p2.terms[j].exp)
            result.terms[k++] = p2.terms[j++];
        else {
            int sum = p1.terms[i].coeff + p2.terms[j].coeff;
            if (sum != 0)
                result.terms[k++] = {sum, p1.terms[i].exp};
            i++; j++;
        }
    }
    while (i < p1.n) result.terms[k++] = p1.terms[i++];
    while (j < p2.n) result.terms[k++] = p2.terms[j++];
    result.n = k;
    return result;
}

int main() {
    // P1: 3x^5 + 2x^3 + 7x + 4
    Poly p1;
    p1.n = 4;
    p1.terms = new Term[4]{{3,5}, {2,3}, {7,1}, {4,0}};

    // P2: 5x^4 + 2x^3 + 3x^2 + 1
    Poly p2;
    p2.n = 4;
    p2.terms = new Term[4]{{5,4}, {2,3}, {3,2}, {1,0}};

    cout << "P1 = "; displayPoly(p1);
    cout << "P2 = "; displayPoly(p2);

    Poly sum = addPoly(p1, p2);
    cout << "Sum = "; displayPoly(sum);

    delete[] p1.terms;
    delete[] p2.terms;
    delete[] sum.terms;
    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Sparse Matrix Transpose</h3>
		<p class="text-gray-400 text-sm mb-3">Transpose a sparse matrix by swapping row and col in each triple, then sorting.</p>
		<CodePlayground
			title="Sparse Transpose — Try It Yourself"
			initialCode={`#include <iostream>
#include <algorithm>
using namespace std;

struct Element { int row, col, val; };

// TODO: Transpose the sparse matrix
// 1. Swap row and col for each element
// 2. Sort by (row, col) so the result is in order
void transposeSparse(Element elements[], int n) {
    // YOUR CODE HERE

}

int main() {
    Element e[] = {{0,2,5}, {1,4,3}, {3,1,7}, {3,5,9}};
    int n = 4;

    cout << "Original triples:" << endl;
    for (int i = 0; i < n; i++)
        cout << "  (" << e[i].row << "," << e[i].col << "," << e[i].val << ")" << endl;

    transposeSparse(e, n);

    cout << "\\nTransposed triples:" << endl;
    for (int i = 0; i < n; i++)
        cout << "  (" << e[i].row << "," << e[i].col << "," << e[i].val << ")" << endl;
    // Expected: (1,3,7), (2,0,5), (4,1,3), (5,3,9)

    return 0;
}`}
		/>
	</div>
</div>
