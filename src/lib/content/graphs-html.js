export const theoryHTML = `
<section class="theory-section" id="graph-intro">
	<h2>1. What is a Graph?</h2>
	<div class="definition-box">
		<strong>Graph G = (V, E):</strong> A collection of <strong>vertices</strong> (nodes) V and <strong>edges</strong> (connections) E. Graphs model relationships: social networks, maps, dependencies, web pages, circuits, and more.<br><br>
		Unlike trees, graphs can have <strong>cycles</strong>, <strong>multiple paths</strong>, and nodes with <strong>any number of connections</strong>.
	</div>

<pre><code>// Graph terminology:
// Vertex (node): an entity
// Edge: connection between two vertices
// Adjacent: two vertices connected by an edge
// Degree: number of edges connected to a vertex
// Path: sequence of vertices connected by edges
// Cycle: a path that starts and ends at the same vertex
// Connected: there's a path between every pair of vertices

// Types:
// Undirected: edges have no direction (A—B means A→B and B→A)
// Directed (digraph): edges have direction (A→B doesn't mean B→A)
// Weighted: edges have costs/weights
// Unweighted: all edges have equal cost

// Example undirected graph:
//   0 --- 1
//   |   / |
//   |  /  |
//   | /   |
//   2 --- 3
// V = {0, 1, 2, 3}
// E = {(0,1), (0,2), (1,2), (1,3), (2,3)}</code></pre>

	<h3>Graph Properties</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Property</th>
				<th class="text-left p-2 text-gray-400">Undirected</th>
				<th class="text-left p-2 text-gray-400">Directed</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Max edges</td><td class="p-2">V(V-1)/2</td><td class="p-2">V(V-1)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Degree</td><td class="p-2">Number of edges at vertex</td><td class="p-2">In-degree + Out-degree</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Sum of degrees</td><td class="p-2">2 × |E|</td><td class="p-2">Sum(in) = Sum(out) = |E|</td></tr>
			<tr><td class="p-2">Dense if</td><td class="p-2">|E| ≈ V²</td><td class="p-2">|E| ≈ V²</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="graph-representation">
	<h2>2. Graph Representation</h2>

	<h3>Adjacency Matrix</h3>
<pre><code>// 2D array: matrix[i][j] = 1 if edge from i to j, else 0
// For weighted: matrix[i][j] = weight

// Graph:  0—1, 0—2, 1—2, 1—3, 2—3
//     0  1  2  3
// 0 [ 0, 1, 1, 0 ]
// 1 [ 1, 0, 1, 1 ]
// 2 [ 1, 1, 0, 1 ]
// 3 [ 0, 1, 1, 0 ]

// Pros: O(1) edge lookup, simple
// Cons: O(V²) space even for sparse graphs
// Best for: dense graphs, small V

int adj[V][V] = {0};  // initialize all to 0
adj[u][v] = 1;         // add edge u→v
adj[v][u] = 1;         // undirected: add both directions</code></pre>

	<h3>Adjacency List</h3>
<pre><code>// Array of lists: adj[i] = list of neighbors of vertex i
// Most common representation!

// Graph: 0—1, 0—2, 1—2, 1—3, 2—3
// adj[0] = {1, 2}
// adj[1] = {0, 2, 3}
// adj[2] = {0, 1, 3}
// adj[3] = {1, 2}

// Pros: O(V + E) space, efficient for sparse graphs
// Cons: O(degree) to check if edge exists
// Best for: most real-world graphs (usually sparse)

vector&lt;int&gt; adj[V];        // unweighted
adj[u].push_back(v);        // add edge u→v
adj[v].push_back(u);        // undirected: add both

// Weighted:
vector&lt;pair&lt;int,int&gt;&gt; adj[V];  // {neighbor, weight}
adj[u].push_back({v, w});</code></pre>

	<h3>Comparison</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Operation</th>
				<th class="text-left p-2 text-gray-400">Adj Matrix</th>
				<th class="text-left p-2 text-gray-400">Adj List</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Space</td><td class="p-2">O(V²)</td><td class="p-2">O(V + E)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Check edge (u,v)</td><td class="p-2">O(1)</td><td class="p-2">O(degree(u))</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">All neighbors of u</td><td class="p-2">O(V)</td><td class="p-2">O(degree(u))</td></tr>
			<tr><td class="p-2">Add edge</td><td class="p-2">O(1)</td><td class="p-2">O(1)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="bfs">
	<h2>3. Breadth-First Search (BFS) — O(V + E)</h2>
	<div class="definition-box">
		<strong>BFS:</strong> Explores graph <strong>level by level</strong> using a <strong>queue</strong>. Visits all neighbors of the current vertex before moving deeper. Finds the <strong>shortest path</strong> in unweighted graphs.
	</div>

<pre><code>void bfs(vector&lt;int&gt; adj[], int V, int source) {
    bool visited[V] = {false};
    queue&lt;int&gt; q;
    
    visited[source] = true;
    q.push(source);
    
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        cout &lt;&lt; curr &lt;&lt; " ";
        
        for (int neighbor : adj[curr]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}

// BFS from vertex 0:
//   0 --- 1 --- 4
//   |   / |
//   2 --- 3
//
// Queue: [0] → visit 0, add 1,2
// Queue: [1, 2] → visit 1, add 3,4
// Queue: [2, 3, 4] → visit 2 (3 already visited)
// Queue: [3, 4] → visit 3, visit 4
// BFS order: 0, 1, 2, 3, 4
// Level 0: {0}  Level 1: {1,2}  Level 2: {3,4}

// BFS gives SHORTEST PATH in unweighted graphs!
// Distance from source = level number</code></pre>

	<h3>BFS Shortest Path</h3>
<pre><code>void bfsShortestPath(vector&lt;int&gt; adj[], int V, int src) {
    int dist[V];
    fill(dist, dist + V, -1);
    queue&lt;int&gt; q;
    
    dist[src] = 0;
    q.push(src);
    
    while (!q.empty()) {
        int curr = q.front(); q.pop();
        for (int nbr : adj[curr]) {
            if (dist[nbr] == -1) {
                dist[nbr] = dist[curr] + 1;
                q.push(nbr);
            }
        }
    }
    // dist[v] = shortest distance from src to v
}</code></pre>
</section>

<section class="theory-section" id="dfs">
	<h2>4. Depth-First Search (DFS) — O(V + E)</h2>
	<div class="definition-box">
		<strong>DFS:</strong> Explores graph by going as <strong>deep as possible</strong> before backtracking. Uses <strong>recursion</strong> (or explicit stack). Used for cycle detection, topological sort, connected components, and more.
	</div>

<pre><code>// Recursive DFS
void dfs(vector&lt;int&gt; adj[], bool visited[], int curr) {
    visited[curr] = true;
    cout &lt;&lt; curr &lt;&lt; " ";
    
    for (int neighbor : adj[curr]) {
        if (!visited[neighbor]) {
            dfs(adj, visited, neighbor);
        }
    }
}

// Iterative DFS (using stack)
void dfsIterative(vector&lt;int&gt; adj[], int V, int source) {
    bool visited[V] = {false};
    stack&lt;int&gt; s;
    s.push(source);
    
    while (!s.empty()) {
        int curr = s.top(); s.pop();
        if (visited[curr]) continue;
        visited[curr] = true;
        cout &lt;&lt; curr &lt;&lt; " ";
        
        for (int nbr : adj[curr]) {
            if (!visited[nbr])
                s.push(nbr);
        }
    }
}

// DFS from vertex 0:
//   0 --- 1 --- 4
//   |   / |
//   2 --- 3
//
// Visit 0 → go to 1 → go to 2 → go to 3 (backtrack) → go to 4
// DFS order: 0, 1, 2, 3, 4 (may vary based on neighbor order)

// DFS vs BFS:
// BFS: shortest path, level-order, uses QUEUE
// DFS: cycle detection, topological sort, uses STACK/recursion</code></pre>
</section>

<section class="theory-section" id="cycle-detection">
	<h2>5. Cycle Detection</h2>

	<h3>Undirected Graph — DFS</h3>
<pre><code>// A cycle exists if DFS visits an already-visited node
// that is NOT the parent (in undirected graphs)

bool hasCycleDFS(vector&lt;int&gt; adj[], bool visited[], int curr, int parent) {
    visited[curr] = true;
    for (int nbr : adj[curr]) {
        if (!visited[nbr]) {
            if (hasCycleDFS(adj, visited, nbr, curr))
                return true;
        } else if (nbr != parent) {
            return true;  // visited and not parent = CYCLE!
        }
    }
    return false;
}

// Check all components:
bool hasCycle(vector&lt;int&gt; adj[], int V) {
    bool visited[V] = {false};
    for (int i = 0; i &lt; V; i++) {
        if (!visited[i]) {
            if (hasCycleDFS(adj, visited, i, -1))
                return true;
        }
    }
    return false;
}</code></pre>

	<h3>Directed Graph — DFS with Colors</h3>
<pre><code>// Use 3 states: WHITE (unvisited), GRAY (in current path), BLACK (done)
// Cycle = encountering a GRAY node (back edge)

enum Color { WHITE, GRAY, BLACK };

bool hasCycleDirected(vector&lt;int&gt; adj[], Color color[], int curr) {
    color[curr] = GRAY;
    for (int nbr : adj[curr]) {
        if (color[nbr] == GRAY) return true;   // back edge = cycle!
        if (color[nbr] == WHITE &amp;&amp; hasCycleDirected(adj, color, nbr))
            return true;
    }
    color[curr] = BLACK;
    return false;
}</code></pre>
</section>

<section class="theory-section" id="connected-components">
	<h2>6. Connected Components & Disjoint Sets</h2>

	<h3>Finding Connected Components (BFS/DFS)</h3>
<pre><code>int countComponents(vector&lt;int&gt; adj[], int V) {
    bool visited[V] = {false};
    int count = 0;
    for (int i = 0; i &lt; V; i++) {
        if (!visited[i]) {
            bfs(adj, visited, i);  // or dfs
            count++;
        }
    }
    return count;
}
// Each BFS/DFS from an unvisited node discovers one component</code></pre>

	<h3>Union-Find (Disjoint Set Union — DSU)</h3>
<pre><code>// Efficient structure for grouping elements into disjoint sets
// Two operations: FIND (which set?) and UNION (merge two sets)

int parent[V], rank_arr[V];

void makeSet(int V) {
    for (int i = 0; i &lt; V; i++) {
        parent[i] = i;     // each node is its own parent
        rank_arr[i] = 0;
    }
}

// Find with PATH COMPRESSION
int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);  // compress path
    return parent[x];
}

// Union by RANK
void unionSets(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx == ry) return;  // already same set
    
    if (rank_arr[rx] &lt; rank_arr[ry]) swap(rx, ry);
    parent[ry] = rx;
    if (rank_arr[rx] == rank_arr[ry]) rank_arr[rx]++;
}

// With path compression + union by rank:
// Nearly O(1) per operation — amortized O(α(n)) ≈ O(1)
// α = inverse Ackermann function (grows incredibly slowly)

// Use cases:
// - Kruskal's MST algorithm
// - Detect cycle in undirected graph
// - Connected components (dynamic)
// - Network connectivity</code></pre>
</section>

<section class="theory-section" id="topological-sort">
	<h2>7. Topological Sort (DAG only)</h2>
	<div class="definition-box">
		<strong>Topological Sort:</strong> Linear ordering of vertices in a <strong>Directed Acyclic Graph (DAG)</strong> such that for every edge u→v, u comes before v. Used for task scheduling, build systems, course prerequisites.
	</div>

<pre><code>// Method 1: DFS-based
void topoSortDFS(vector&lt;int&gt; adj[], bool visited[], stack&lt;int&gt; &amp;result, int curr) {
    visited[curr] = true;
    for (int nbr : adj[curr])
        if (!visited[nbr])
            topoSortDFS(adj, visited, result, nbr);
    result.push(curr);  // push AFTER all descendants
}

// Method 2: Kahn's Algorithm (BFS-based, uses in-degree)
vector&lt;int&gt; kahnTopoSort(vector&lt;int&gt; adj[], int V) {
    int inDegree[V] = {0};
    for (int u = 0; u &lt; V; u++)
        for (int v : adj[u])
            inDegree[v]++;
    
    queue&lt;int&gt; q;
    for (int i = 0; i &lt; V; i++)
        if (inDegree[i] == 0) q.push(i);
    
    vector&lt;int&gt; order;
    while (!q.empty()) {
        int curr = q.front(); q.pop();
        order.push_back(curr);
        for (int nbr : adj[curr]) {
            inDegree[nbr]--;
            if (inDegree[nbr] == 0) q.push(nbr);
        }
    }
    // If order.size() != V, graph has a cycle!
    return order;
}

// Example: Course prerequisites
// Math → Physics → Engineering
// Math → CS → AI
// Topological order: Math, Physics, CS, Engineering, AI
// (or Math, CS, Physics, AI, Engineering — multiple valid orders)</code></pre>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Graph G = (V, E)</strong>. Directed/undirected, weighted/unweighted.</li>
			<li>• <strong>Adjacency matrix</strong>: O(V²) space, O(1) edge check. Good for dense graphs.</li>
			<li>• <strong>Adjacency list</strong>: O(V+E) space. Best for most graphs (sparse).</li>
			<li>• <strong>BFS</strong>: queue, level-by-level. Shortest path in unweighted graphs. O(V+E).</li>
			<li>• <strong>DFS</strong>: stack/recursion, go deep then backtrack. O(V+E).</li>
			<li>• <strong>Cycle detection</strong>: undirected = DFS + parent check. Directed = DFS with 3 colors (gray = back edge).</li>
			<li>• <strong>Union-Find (DSU)</strong>: find + union with path compression + rank. Nearly O(1) per op.</li>
			<li>• <strong>Topological sort</strong>: DAG only. DFS (post-order reverse) or Kahn's (BFS with in-degree).</li>
		</ul>
	</div>
</section>
`;
