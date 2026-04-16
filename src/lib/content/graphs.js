import Theory from './graphs-theory.svelte';
import Practice from './graphs-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'A graph G = (V, E) consists of:',
		options: [
			'A root node and children',
			'Vertices (nodes) and edges (connections)',
			'Keys and values',
			'Rows and columns'
		],
		correct: 1,
		explanation: 'A graph is a set of vertices V (entities) and edges E (connections between them). Unlike trees, graphs can have cycles, multiple paths, and disconnected components.'
	},
	{
		question: 'The maximum number of edges in an undirected graph with V vertices is:',
		options: ['V', 'V - 1', 'V(V-1)/2', 'V²'],
		correct: 2,
		explanation: 'Each pair of vertices can have at most one edge. Number of pairs = V choose 2 = V(V-1)/2. A graph with this many edges is called a complete graph.'
	},
	{
		question: 'In a directed graph, the sum of all in-degrees equals:',
		options: ['|V|', '|E|', '2|E|', '|V| + |E|'],
		correct: 1,
		explanation: 'Every directed edge u→v contributes exactly 1 to the in-degree of v. So the sum of all in-degrees = total number of edges |E|. Same for out-degrees.'
	},
	{
		question: 'Adjacency matrix uses how much space?',
		options: ['O(V)', 'O(E)', 'O(V²)', 'O(V + E)'],
		correct: 2,
		explanation: 'Adjacency matrix is a V×V 2D array → O(V²) space regardless of the number of edges. This wastes space for sparse graphs but gives O(1) edge lookup.'
	},
	{
		question: 'Adjacency list uses how much space?',
		options: ['O(V²)', 'O(V + E)', 'O(E²)', 'O(V)'],
		correct: 1,
		explanation: 'Adjacency list: one list per vertex (O(V)) with total entries across all lists = 2E for undirected (each edge stored twice) = O(V + E). Best for sparse graphs.'
	},
	{
		question: 'Checking if edge (u,v) exists takes O(1) in:',
		options: ['Adjacency list', 'Adjacency matrix', 'Both', 'Neither'],
		correct: 1,
		explanation: 'Adjacency matrix: just check matrix[u][v] → O(1). Adjacency list: must scan u\'s neighbor list → O(degree(u)). Matrix wins for edge lookups.'
	},
	{
		question: 'BFS uses which data structure?',
		options: ['Stack', 'Queue', 'Heap', 'Array'],
		correct: 1,
		explanation: 'BFS uses a queue (FIFO) to explore vertices level by level. Enqueue neighbors of the current vertex; dequeue to process next. This gives shortest path in unweighted graphs.'
	},
	{
		question: 'BFS finds the shortest path in:',
		options: [
			'Weighted graphs',
			'Unweighted graphs',
			'All graphs',
			'Only trees'
		],
		correct: 1,
		explanation: 'BFS visits vertices in order of distance (number of edges) from the source. Each level = one more edge. For WEIGHTED graphs, use Dijkstra\'s algorithm instead.'
	},
	{
		question: 'DFS uses which data structure?',
		options: ['Queue', 'Stack (or recursion call stack)', 'Heap', 'Hash table'],
		correct: 1,
		explanation: 'DFS uses a stack (explicitly or via recursion). It goes as deep as possible before backtracking. The recursion call stack acts as an implicit stack.'
	},
	{
		question: 'The time complexity of BFS and DFS is:',
		options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
		correct: 2,
		explanation: 'Both BFS and DFS visit every vertex once O(V) and examine every edge once O(E). Total: O(V + E). This applies when using an adjacency list.'
	},
	{
		question: 'To detect a cycle in an undirected graph using DFS, you check if:',
		options: [
			'A vertex is visited twice',
			'A visited neighbor is NOT the parent of the current vertex',
			'The graph has more edges than vertices',
			'DFS visits all vertices'
		],
		correct: 1,
		explanation: 'In undirected DFS, revisiting the parent is normal (the edge we came from). A cycle exists only if we reach a visited vertex that is NOT our parent — that means there\'s another path.'
	},
	{
		question: 'To detect a cycle in a directed graph using DFS, you look for:',
		options: [
			'Any visited vertex',
			'A GRAY (in current recursion stack) vertex — a back edge',
			'A vertex with high degree',
			'An edge to the source'
		],
		correct: 1,
		explanation: 'Use 3 colors: WHITE (unvisited), GRAY (in current DFS path), BLACK (fully processed). Finding a GRAY neighbor means we\'ve found a back edge → cycle in the directed graph.'
	},
	{
		question: 'Union-Find (DSU) supports which operations efficiently?',
		options: [
			'Sort and search',
			'Find (which set?) and Union (merge sets)',
			'Insert and delete',
			'Push and pop'
		],
		correct: 1,
		explanation: 'DSU provides two operations: Find(x) returns the set representative, Union(x,y) merges two sets. With path compression + union by rank, both are nearly O(1) amortized.'
	},
	{
		question: 'Path compression in Union-Find means:',
		options: [
			'Making the tree perfectly balanced',
			'Making every node point directly to the root during Find',
			'Compressing the graph edges',
			'Reducing the number of unions'
		],
		correct: 1,
		explanation: 'During Find(x), we make every node on the path point directly to the root. This flattens the tree, making future Find operations nearly O(1). Combined with union by rank: O(α(n)) ≈ O(1).'
	},
	{
		question: 'Topological sort is only possible on:',
		options: [
			'Undirected graphs',
			'Directed Acyclic Graphs (DAGs)',
			'Complete graphs',
			'Any directed graph'
		],
		correct: 1,
		explanation: 'Topological ordering requires that for every edge u→v, u comes before v. This is impossible if there\'s a cycle (u before v before ... before u). Only DAGs have topological orderings.'
	},
	{
		question: 'Kahn\'s algorithm for topological sort uses:',
		options: [
			'DFS with a stack',
			'BFS with in-degree tracking — start from nodes with in-degree 0',
			'Union-Find',
			'A priority queue'
		],
		correct: 1,
		explanation: 'Kahn\'s: compute in-degrees, enqueue all nodes with in-degree 0. Dequeue, add to result, decrement neighbors\' in-degrees. When a neighbor hits 0, enqueue it. If result size < V → cycle.'
	},
	{
		question: 'A connected component in an undirected graph is:',
		options: [
			'A vertex with maximum degree',
			'A maximal set of vertices where every pair has a path between them',
			'A cycle in the graph',
			'An edge with maximum weight'
		],
		correct: 1,
		explanation: 'A connected component is a maximal subgraph where any vertex can reach any other vertex via some path. An isolated vertex is its own component. Use BFS/DFS to find all components.'
	},
	{
		question: 'For a tree with V vertices, the number of edges is always:',
		options: ['V', 'V - 1', 'V + 1', 'V(V-1)/2'],
		correct: 1,
		explanation: 'A tree is a connected acyclic graph. It always has exactly V-1 edges. Adding one more edge creates a cycle. Removing one edge disconnects the graph.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
