<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Graphs</h2>
		<p class="text-gray-400">Build graphs, traverse with BFS/DFS, detect cycles, and implement Union-Find.</p>
	</div>

	<div>
		<h3>Practice 1: Graph Representation (Matrix & List)</h3>
		<p class="text-gray-400 text-sm mb-3">Build the same graph using both adjacency matrix and adjacency list.</p>
		<CodePlayground
			title="Adjacency Matrix vs Adjacency List"
			initialCode={`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int V = 5;
    // Edges: 0-1, 0-2, 1-2, 1-3, 2-4, 3-4

    // --- Adjacency Matrix ---
    int matrix[5][5] = {0};
    int edges[][2] = {{0,1},{0,2},{1,2},{1,3},{2,4},{3,4}};
    for (auto &e : edges) {
        matrix[e[0]][e[1]] = 1;
        matrix[e[1]][e[0]] = 1;  // undirected
    }
    cout << "=== Adjacency Matrix ===" << endl;
    cout << "  ";
    for (int i = 0; i < V; i++) cout << i << " ";
    cout << endl;
    for (int i = 0; i < V; i++) {
        cout << i << " ";
        for (int j = 0; j < V; j++) cout << matrix[i][j] << " ";
        cout << endl;
    }
    cout << "Edge 1-3? " << (matrix[1][3] ? "YES" : "NO") << endl;
    cout << "Edge 0-4? " << (matrix[0][4] ? "YES" : "NO") << endl;

    // --- Adjacency List ---
    vector<int> adj[V];
    for (auto &e : edges) {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }
    cout << "\\n=== Adjacency List ===" << endl;
    for (int i = 0; i < V; i++) {
        cout << i << ": ";
        for (int nbr : adj[i]) cout << nbr << " ";
        cout << endl;
    }

    // Degree of each vertex
    cout << "\\nDegrees: ";
    for (int i = 0; i < V; i++)
        cout << i << "=" << adj[i].size() << " ";
    cout << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: BFS Traversal & Shortest Path</h3>
		<p class="text-gray-400 text-sm mb-3">Traverse a graph level-by-level and find shortest distances from a source.</p>
		<CodePlayground
			title="BFS — Level Order & Shortest Path"
			initialCode={`#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(vector<int> adj[], int V, int src) {
    bool visited[V] = {};
    int dist[V];
    fill(dist, dist + V, -1);
    queue<int> q;

    visited[src] = true;
    dist[src] = 0;
    q.push(src);

    cout << "BFS from " << src << ":" << endl;
    while (!q.empty()) {
        int sz = q.size();
        cout << "  Level " << dist[q.front()] << ": ";
        for (int i = 0; i < sz; i++) {
            int curr = q.front(); q.pop();
            cout << curr << " ";
            for (int nbr : adj[curr]) {
                if (!visited[nbr]) {
                    visited[nbr] = true;
                    dist[nbr] = dist[curr] + 1;
                    q.push(nbr);
                }
            }
        }
        cout << endl;
    }

    cout << "\\nShortest distances from " << src << ":" << endl;
    for (int i = 0; i < V; i++)
        cout << "  " << src << " -> " << i << ": " << dist[i] << endl;
}

int main() {
    int V = 7;
    vector<int> adj[V];
    int edges[][2] = {{0,1},{0,2},{1,3},{1,4},{2,5},{3,6},{4,6}};
    for (auto &e : edges) {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }
    bfs(adj, V, 0);
    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: DFS Traversal (Recursive & Iterative)</h3>
		<p class="text-gray-400 text-sm mb-3">Explore the graph depth-first using both recursion and an explicit stack.</p>
		<CodePlayground
			title="DFS — Recursive & Iterative"
			initialCode={`#include <iostream>
#include <vector>
#include <stack>
using namespace std;

void dfsRecursive(vector<int> adj[], bool visited[], int curr, int depth) {
    visited[curr] = true;
    string indent(depth * 2, ' ');
    cout << indent << "Visit " << curr << " (depth " << depth << ")" << endl;
    for (int nbr : adj[curr])
        if (!visited[nbr])
            dfsRecursive(adj, visited, nbr, depth + 1);
}

void dfsIterative(vector<int> adj[], int V, int src) {
    bool visited[V] = {};
    stack<int> s;
    s.push(src);
    cout << "Iterative DFS: ";
    while (!s.empty()) {
        int curr = s.top(); s.pop();
        if (visited[curr]) continue;
        visited[curr] = true;
        cout << curr << " ";
        for (int i = adj[curr].size()-1; i >= 0; i--)
            if (!visited[adj[curr][i]])
                s.push(adj[curr][i]);
    }
    cout << endl;
}

int main() {
    int V = 7;
    vector<int> adj[V];
    int edges[][2] = {{0,1},{0,2},{1,3},{1,4},{2,5},{3,6},{4,6}};
    for (auto &e : edges) {
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }

    cout << "=== Recursive DFS ===" << endl;
    bool visited[V] = {};
    dfsRecursive(adj, visited, 0, 0);

    cout << "\\n=== Iterative DFS ===" << endl;
    dfsIterative(adj, V, 0);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Cycle Detection</h3>
		<p class="text-gray-400 text-sm mb-3">Detect cycles in undirected and directed graphs using DFS.</p>
		<CodePlayground
			title="Cycle Detection — Undirected & Directed"
			initialCode={`#include <iostream>
#include <vector>
using namespace std;

// Undirected: cycle if we visit a node that's not our parent
bool hasCycleUndirected(vector<int> adj[], bool visited[], int curr, int parent) {
    visited[curr] = true;
    for (int nbr : adj[curr]) {
        if (!visited[nbr]) {
            if (hasCycleUndirected(adj, visited, nbr, curr)) return true;
        } else if (nbr != parent) {
            cout << "  Cycle found: back edge " << curr << "-" << nbr << endl;
            return true;
        }
    }
    return false;
}

// Directed: cycle if we reach a GRAY (in-stack) node
enum Color { WHITE, GRAY, BLACK };
bool hasCycleDirected(vector<int> adj[], Color color[], int curr) {
    color[curr] = GRAY;
    for (int nbr : adj[curr]) {
        if (color[nbr] == GRAY) {
            cout << "  Cycle: back edge " << curr << "->" << nbr << endl;
            return true;
        }
        if (color[nbr] == WHITE && hasCycleDirected(adj, color, nbr))
            return true;
    }
    color[curr] = BLACK;
    return false;
}

int main() {
    // Undirected with cycle: 0-1, 1-2, 2-0, 2-3
    int V1 = 4;
    vector<int> g1[V1];
    g1[0].push_back(1); g1[1].push_back(0);
    g1[1].push_back(2); g1[2].push_back(1);
    g1[2].push_back(0); g1[0].push_back(2);
    g1[2].push_back(3); g1[3].push_back(2);

    cout << "Undirected graph (0-1-2-0, 2-3):" << endl;
    bool vis1[4] = {};
    cout << (hasCycleUndirected(g1, vis1, 0, -1) ? "HAS CYCLE" : "NO CYCLE") << endl;

    // Directed with cycle: 0->1, 1->2, 2->0
    int V2 = 4;
    vector<int> g2[V2];
    g2[0].push_back(1);
    g2[1].push_back(2);
    g2[2].push_back(0);  // cycle!
    g2[2].push_back(3);

    cout << "\\nDirected graph (0->1->2->0, 2->3):" << endl;
    Color col[4] = {WHITE, WHITE, WHITE, WHITE};
    cout << (hasCycleDirected(g2, col, 0) ? "HAS CYCLE" : "NO CYCLE") << endl;

    // Directed acyclic: 0->1, 0->2, 1->3, 2->3
    vector<int> g3[4];
    g3[0].push_back(1); g3[0].push_back(2);
    g3[1].push_back(3); g3[2].push_back(3);
    cout << "\\nDAG (0->1,2 -> 3):" << endl;
    Color col2[4] = {WHITE, WHITE, WHITE, WHITE};
    cout << (hasCycleDirected(g3, col2, 0) ? "HAS CYCLE" : "NO CYCLE") << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Union-Find (Disjoint Set Union)</h3>
		<p class="text-gray-400 text-sm mb-3">Implement DSU with path compression and union by rank.</p>
		<CodePlayground
			title="Union-Find with Path Compression"
			initialCode={`#include <iostream>
using namespace std;

int parent[100], rnk[100];

void makeSet(int n) {
    for (int i = 0; i < n; i++) { parent[i] = i; rnk[i] = 0; }
}

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);  // path compression
    return parent[x];
}

void unite(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx == ry) { cout << "  " << x << " and " << y << " already connected" << endl; return; }
    if (rnk[rx] < rnk[ry]) swap(rx, ry);
    parent[ry] = rx;
    if (rnk[rx] == rnk[ry]) rnk[rx]++;
    cout << "  Union(" << x << "," << y << "): root " << ry << " -> " << rx << endl;
}

bool connected(int x, int y) { return find(x) == find(y); }

int main() {
    makeSet(8);
    cout << "Union operations:" << endl;
    unite(0, 1);
    unite(2, 3);
    unite(4, 5);
    unite(6, 7);
    unite(0, 2);
    unite(4, 6);
    unite(0, 4);

    cout << "\\nConnectivity:" << endl;
    int queries[][2] = {{0,7},{1,5},{2,6},{3,4}};
    for (auto &q : queries)
        cout << "  " << q[0] << "-" << q[1] << ": "
             << (connected(q[0],q[1]) ? "CONNECTED" : "NOT CONNECTED") << endl;

    // Count components
    int components = 0;
    for (int i = 0; i < 8; i++)
        if (find(i) == i) components++;
    cout << "\\nComponents: " << components << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Topological Sort (Kahn's BFS)</h3>
		<p class="text-gray-400 text-sm mb-3">Order tasks respecting dependencies using Kahn's algorithm.</p>
		<CodePlayground
			title="Topological Sort — Kahn's Algorithm"
			initialCode={`#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> topoSort(vector<int> adj[], int V) {
    int inDeg[V] = {};
    for (int u = 0; u < V; u++)
        for (int v : adj[u]) inDeg[v]++;

    queue<int> q;
    for (int i = 0; i < V; i++)
        if (inDeg[i] == 0) q.push(i);

    vector<int> order;
    while (!q.empty()) {
        int curr = q.front(); q.pop();
        order.push_back(curr);
        for (int nbr : adj[curr]) {
            inDeg[nbr]--;
            if (inDeg[nbr] == 0) q.push(nbr);
        }
    }
    return order;
}

int main() {
    // Course prerequisites:
    // 0:Math  1:Physics  2:CS  3:Engineering  4:AI  5:ML
    // Math->Physics, Math->CS, Physics->Engineering,
    // CS->AI, CS->ML, AI->ML
    int V = 6;
    vector<int> adj[V];
    adj[0].push_back(1); adj[0].push_back(2);  // Math->Phys, Math->CS
    adj[1].push_back(3);  // Phys->Eng
    adj[2].push_back(4); adj[2].push_back(5);  // CS->AI, CS->ML
    adj[4].push_back(5);  // AI->ML

    string names[] = {"Math","Physics","CS","Engineering","AI","ML"};

    vector<int> order = topoSort(adj, V);
    if ((int)order.size() != V) {
        cout << "CYCLE DETECTED! No valid ordering." << endl;
    } else {
        cout << "Course order:" << endl;
        for (int i = 0; i < (int)order.size(); i++)
            cout << "  " << i+1 << ". " << names[order[i]] << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Count Connected Components</h3>
		<p class="text-gray-400 text-sm mb-3">Given a graph that may not be fully connected, count the number of connected components using BFS or DFS.</p>
		<CodePlayground
			title="Connected Components — Try It Yourself"
			initialCode={`#include <iostream>
#include <vector>
using namespace std;

// TODO: Count connected components
// For each unvisited vertex, run DFS/BFS — each run = one component

void dfs(vector<int> adj[], bool visited[], int curr) {
    // YOUR CODE HERE
}

int countComponents(vector<int> adj[], int V) {
    // YOUR CODE HERE
    // For each unvisited node, run DFS and increment count
    return 0;
}

int main() {
    // Graph with 3 components:
    // Component 1: 0-1-2
    // Component 2: 3-4
    // Component 3: 5 (isolated)
    int V = 6;
    vector<int> adj[V];
    adj[0].push_back(1); adj[1].push_back(0);
    adj[1].push_back(2); adj[2].push_back(1);
    adj[3].push_back(4); adj[4].push_back(3);
    // 5 has no edges

    cout << "Components: " << countComponents(adj, V) << endl;
    // Expected: 3

    return 0;
}`}
		/>
	</div>
</div>
