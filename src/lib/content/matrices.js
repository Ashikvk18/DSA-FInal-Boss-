import Theory from './matrices-theory.svelte';
import Practice from './matrices-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'A diagonal matrix has non-zero elements only where:',
		options: ['i < j', 'i > j', 'i == j', 'i + j == n-1'],
		correct: 2,
		explanation: 'In a diagonal matrix, only elements on the main diagonal (where row index equals column index, i==j) can be non-zero. All other elements are zero.'
	},
	{
		question: 'An n×n diagonal matrix can be stored in a 1D array of size:',
		options: ['n²', 'n(n+1)/2', 'n', '2n'],
		correct: 2,
		explanation: 'A diagonal matrix has only n non-zero elements (one per row/column). We store just these n values instead of the full n² array.'
	},
	{
		question: 'In a lower triangular matrix, all elements where i < j are:',
		options: ['Non-zero', 'Zero', 'Negative', 'Equal to 1'],
		correct: 1,
		explanation: 'Lower triangular means all elements ABOVE the diagonal (where i < j) are zero. Only elements on or below the diagonal (i >= j) can be non-zero.'
	},
	{
		question: 'How many non-zero elements can a lower triangular n×n matrix have?',
		options: ['n', 'n²', 'n(n+1)/2', 'n(n-1)/2'],
		correct: 2,
		explanation: 'Row 0 has 1 element, row 1 has 2, ..., row n-1 has n. Total = 1+2+...+n = n(n+1)/2.'
	},
	{
		question: 'The row-major mapping formula for lower triangular M[i][j] to 1D array is:',
		options: ['A[i*n + j]', 'A[i*(i+1)/2 + j]', 'A[j*(j+1)/2 + i]', 'A[i+j]'],
		correct: 1,
		explanation: 'Row-major stores rows sequentially. Before row i, there are 0+1+2+...+(i-1) = i*(i-1)/2 elements. In row i, element j is at offset j. Total index = i*(i+1)/2 + j.'
	},
	{
		question: 'A symmetric matrix satisfies:',
		options: ['M[i][j] == 0', 'M[i][j] == M[j][i] for all i,j', 'M[i][j] == -M[j][i]', 'All diagonal elements are 1'],
		correct: 1,
		explanation: 'A symmetric matrix equals its own transpose: M[i][j] == M[j][i] for all i,j. The upper and lower triangles are mirror images.'
	},
	{
		question: 'To store a symmetric matrix efficiently, you store:',
		options: [
			'The full n² elements',
			'Only the lower (or upper) triangle — n(n+1)/2 elements',
			'Only the diagonal — n elements',
			'Only the non-zero elements'
		],
		correct: 1,
		explanation: 'Since upper and lower triangles are mirrors, storing one triangle plus the diagonal is sufficient. Space: n(n+1)/2 instead of n². For upper lookups, swap indices.'
	},
	{
		question: 'A tridiagonal matrix has non-zero elements only on:',
		options: [
			'The main diagonal',
			'The main diagonal and its two adjacent diagonals',
			'The first and last rows',
			'The corners'
		],
		correct: 1,
		explanation: 'Tridiagonal: non-zero on main diagonal (i==j), sub-diagonal (i==j+1), and super-diagonal (i==j-1). Condition: |i-j| <= 1. Total: 3n-2 elements.'
	},
	{
		question: 'A sparse matrix is one where:',
		options: [
			'All elements are non-zero',
			'The majority of elements are zero',
			'It has more rows than columns',
			'It is triangular'
		],
		correct: 1,
		explanation: 'A sparse matrix has mostly zero elements. Storing it as a full 2D array wastes memory. Instead, store only the non-zero elements with their positions.'
	},
	{
		question: 'In COO (Coordinate) sparse representation, each non-zero element is stored as:',
		options: [
			'Just the value',
			'(row, value) pair',
			'(row, column, value) triple',
			'(column, value) pair'
		],
		correct: 2,
		explanation: 'COO stores each non-zero as a (row, column, value) triple. This requires 3k space for k non-zero elements, which is efficient when k << m×n.'
	},
	{
		question: 'Adding two sparse matrices stored in COO format is similar to:',
		options: [
			'Matrix multiplication',
			'Merging two sorted arrays',
			'Binary search',
			'Quicksort'
		],
		correct: 1,
		explanation: 'Both element lists are sorted by position. We use two pointers: same position → add values; different → take the smaller position first. Exactly like merging sorted arrays.'
	},
	{
		question: 'To transpose a sparse matrix in COO format, you:',
		options: [
			'Reverse the element list',
			'Swap row and column indices, then re-sort',
			'Multiply all values by -1',
			'Delete all elements'
		],
		correct: 1,
		explanation: 'Transpose swaps rows and columns. For each triple (r,c,v), create (c,r,v). Then sort by the new (row, col) to maintain order.'
	},
	{
		question: 'A polynomial 3x⁵ + 2x³ + 7 has how many terms?',
		options: ['5', '3', '6', '2'],
		correct: 1,
		explanation: 'A term is a coefficient-exponent pair. This polynomial has 3 terms: (3,5), (2,3), (7,0). Many exponents (4,2,1) have zero coefficients.'
	},
	{
		question: 'Polynomial addition is performed by:',
		options: [
			'Multiplying corresponding terms',
			'Merging term lists by exponent — same exponent terms get added',
			'Concatenating both term arrays',
			'Adding all coefficients together'
		],
		correct: 1,
		explanation: 'Terms are sorted by exponent. Walk through both lists: same exponent → add coefficients; different → take the higher exponent term. Like merging sorted arrays.'
	},
	{
		question: 'In C++, a 2D array is stored in memory in:',
		options: ['Column-major order', 'Row-major order', 'Random order', 'Diagonal order'],
		correct: 1,
		explanation: 'C/C++ uses row-major order: entire row 0 first, then row 1, etc. Address of M[i][j] = Base + (i*cols + j) * sizeof(type).'
	},
	{
		question: 'For a 1000×1000 symmetric matrix, optimized storage saves approximately:',
		options: ['10%', '25%', '50%', '75%'],
		correct: 2,
		explanation: 'Full storage: 1,000,000. Optimized: n(n+1)/2 = 500,500. Savings ≈ 50%. For triangular and symmetric matrices, you always save roughly half.'
	},
	{
		question: 'Which sparse matrix format is most efficient for row-wise access?',
		options: [
			'COO (Coordinate)',
			'CSR (Compressed Sparse Row)',
			'Full 2D array',
			'Linked list'
		],
		correct: 1,
		explanation: 'CSR (Compressed Sparse Row) uses a row pointer array that lets you quickly find all non-zero elements in any row. It\'s the standard for sparse matrix libraries.'
	},
	{
		question: 'A band matrix with bandwidth 5 has non-zero elements only when:',
		options: ['i == j', '|i - j| <= 2', '|i - j| <= 5', 'i + j <= 5'],
		correct: 1,
		explanation: 'A band matrix with bandwidth 2k+1 has non-zero elements where |i-j| <= k. Bandwidth 5 means k=2, so |i-j| <= 2. A tridiagonal is bandwidth 3 (k=1).'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
