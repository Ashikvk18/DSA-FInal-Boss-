export const theoryHTML = `
<section class="theory-section" id="hashing-intro">
	<h2>1. What is Hashing?</h2>
	<div class="definition-box">
		<strong>Hashing:</strong> A technique that maps keys to array indices using a <strong>hash function</strong>. This enables <strong>O(1) average</strong> time for insert, search, and delete — faster than any tree or sorted array!<br><br>
		<strong>Hash Table:</strong> An array where each slot stores key-value pairs. The hash function decides which slot a key goes to.
	</div>

<pre><code>// Without hashing: search = O(n) array, O(log n) BST
// With hashing:    search = O(1) average!

// Hash function: key → index
// index = hash(key) % tableSize

// Example: store phone numbers by name
// hash("Alice") % 10 = 3  → table[3] = "555-1234"
// hash("Bob")   % 10 = 7  → table[7] = "555-5678"
// Lookup "Alice": compute hash → go to index 3 → O(1)!

// Problem: What if hash("Charlie") % 10 = 3?
// Same index as Alice! This is called a COLLISION.
// Collision handling is the core challenge of hashing.</code></pre>

	<h3>Complexity Comparison</h3>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Operation</th>
				<th class="text-left p-2 text-gray-400">Array</th>
				<th class="text-left p-2 text-gray-400">BST</th>
				<th class="text-left p-2 text-gray-400">Hash Table (avg)</th>
				<th class="text-left p-2 text-gray-400">Hash Table (worst)</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Search</td><td class="p-2">O(n)</td><td class="p-2">O(log n)</td><td class="p-2 font-bold text-green-400">O(1)</td><td class="p-2">O(n)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Insert</td><td class="p-2">O(1)*</td><td class="p-2">O(log n)</td><td class="p-2 font-bold text-green-400">O(1)</td><td class="p-2">O(n)</td></tr>
			<tr><td class="p-2">Delete</td><td class="p-2">O(n)</td><td class="p-2">O(log n)</td><td class="p-2 font-bold text-green-400">O(1)</td><td class="p-2">O(n)</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section" id="hash-functions">
	<h2>2. Hash Functions</h2>
<pre><code>// A good hash function should:
// 1. Be deterministic (same key → same hash always)
// 2. Distribute keys uniformly across the table
// 3. Be fast to compute

// Division Method (most common):
// h(key) = key % tableSize
// Best when tableSize is PRIME (reduces clustering)
// h(25) with size 7: 25 % 7 = 4

// Multiplication Method:
// h(key) = floor(tableSize * frac(key * A))
// where A is a constant (Knuth suggests A ≈ 0.6180339887)

// For strings:
unsigned int hashString(string key, int tableSize) {
    unsigned int hash = 0;
    for (char c : key)
        hash = hash * 31 + c;  // polynomial rolling hash
    return hash % tableSize;
}

// Why 31? It's prime, odd, and (hash &lt;&lt; 5) - hash is fast
// Java's String.hashCode() uses exactly this formula!</code></pre>

	<div class="important-box">
		<strong>Load Factor:</strong> α = n / tableSize (number of elements / table size).<br>
		• α &lt; 0.7 is ideal for open addressing<br>
		• α can be &gt; 1 for chaining (multiple elements per slot)<br>
		• When α gets too high → <strong>rehash</strong> (double table size, re-insert all elements)
	</div>
</section>

<section class="theory-section" id="chaining">
	<h2>3. Collision Resolution: Chaining (Separate Chaining)</h2>
	<div class="definition-box">
		<strong>Chaining:</strong> Each slot in the hash table points to a <strong>linked list</strong> (or other container). All elements that hash to the same index are stored in that list.
	</div>

<pre><code>// Table size = 7, hash = key % 7
// Insert: 10, 20, 15, 7, 25, 35

// 10 % 7 = 3 → table[3]: [10]
// 20 % 7 = 6 → table[6]: [20]
// 15 % 7 = 1 → table[1]: [15]
//  7 % 7 = 0 → table[0]: [7]
// 25 % 7 = 4 → table[4]: [25]
// 35 % 7 = 0 → table[0]: [7] → [35]  ← COLLISION! Chain it.

// Table:
// [0]: 7 → 35
// [1]: 15
// [2]: (empty)
// [3]: 10
// [4]: 25
// [5]: (empty)
// [6]: 20

// Search for 35: hash(35) = 0, go to table[0], traverse list → found!
// Delete 7: hash(7) = 0, go to table[0], find &amp; remove from list

struct Node {
    int key;
    Node *next;
};

class HashTableChain {
    Node **table;
    int size;
public:
    HashTableChain(int s) : size(s) {
        table = new Node*[size]();  // all nullptr
    }
    
    void insert(int key) {
        int idx = key % size;
        Node *newNode = new Node{key, table[idx]};
        table[idx] = newNode;  // insert at head
    }
    
    bool search(int key) {
        int idx = key % size;
        Node *curr = table[idx];
        while (curr) {
            if (curr-&gt;key == key) return true;
            curr = curr-&gt;next;
        }
        return false;
    }
    
    void remove(int key) {
        int idx = key % size;
        Node *curr = table[idx], *prev = nullptr;
        while (curr) {
            if (curr-&gt;key == key) {
                if (prev) prev-&gt;next = curr-&gt;next;
                else table[idx] = curr-&gt;next;
                delete curr;
                return;
            }
            prev = curr;
            curr = curr-&gt;next;
        }
    }
};

// Avg search: O(1 + α) where α = load factor
// Worst case: O(n) — all keys hash to same slot</code></pre>
</section>

<section class="theory-section" id="linear-probing">
	<h2>4. Collision Resolution: Linear Probing</h2>
	<div class="definition-box">
		<strong>Open Addressing:</strong> All elements stored <strong>in the table itself</strong> (no linked lists). When a collision occurs, probe for the next empty slot.<br>
		<strong>Linear Probing:</strong> h(key, i) = (h(key) + i) % tableSize. Try slot, slot+1, slot+2, ...
	</div>

<pre><code>// Table size = 7, hash = key % 7
// Insert: 10, 20, 15, 7, 25, 35

// 10 % 7 = 3 → table[3] = 10
// 20 % 7 = 6 → table[6] = 20
// 15 % 7 = 1 → table[1] = 15
//  7 % 7 = 0 → table[0] = 7
// 25 % 7 = 4 → table[4] = 25
// 35 % 7 = 0 → COLLISION! Try 1 → occupied! Try 2 → EMPTY! table[2] = 35

// Table: [7, 15, 35, 10, 25, _, 20]
//         0   1   2   3   4  5   6

// Search for 35: hash=0, check[0]=7≠35, check[1]=15≠35, check[2]=35 ✓
// Search for 42: hash=0, check[0,1,2,3,4]=occupied, check[5]=empty → NOT FOUND

// Problem: PRIMARY CLUSTERING
// Long runs of occupied slots form clusters
// New keys that hash anywhere in the cluster must probe to the end
// Clusters grow and merge → performance degrades</code></pre>

	<div class="important-box">
		<strong>Deletion in Open Addressing:</strong> You CAN'T just set a slot to empty! It would break search chains. Use a <strong>DELETED marker</strong> (tombstone): treated as empty for insertion, but occupied for searching.
	</div>
</section>

<section class="theory-section" id="quadratic-probing">
	<h2>5. Quadratic Probing</h2>
<pre><code>// h(key, i) = (h(key) + i²) % tableSize
// Probe: slot, slot+1, slot+4, slot+9, slot+16, ...

// Reduces primary clustering (probes spread out)
// But can cause SECONDARY CLUSTERING:
// Keys with same initial hash follow same probe sequence

// Insert 10, 17, 24 with tableSize=7 (all hash to 3):
// 10: h=3, table[3]=10
// 17: h=3, try 3+1=4, table[4]=17
// 24: h=3, try 3+1=4(full), try 3+4=7%7=0, table[0]=24

// Important: Quadratic probing does NOT guarantee
// finding an empty slot even if table isn't full!
// Guarantee: if tableSize is PRIME and α &lt; 0.5,
// quadratic probing will find an empty slot.</code></pre>
</section>

<section class="theory-section" id="double-hashing">
	<h2>6. Double Hashing</h2>
<pre><code>// Use a SECOND hash function to determine probe step size
// h(key, i) = (h1(key) + i * h2(key)) % tableSize

// h1(key) = key % tableSize
// h2(key) = PRIME - (key % PRIME)   where PRIME &lt; tableSize

// Different keys get different step sizes → NO clustering!
// This is the BEST open addressing method.

// Example: tableSize=7, h1=key%7, h2=5-(key%5)
// Insert 10: h1=3, table[3]=10
// Insert 17: h1=3, COLLISION! h2=5-(17%5)=5-2=3, probe: (3+3)%7=6
//            table[6]=17
// Insert 24: h1=3, COLLISION! h2=5-(24%5)=5-4=1, probe: (3+1)%7=4
//            table[4]=24

// Each key probes with a different step → minimal clustering
// h2(key) must NEVER be 0 (infinite loop!)
// h2(key) and tableSize should be coprime</code></pre>
</section>

<section class="theory-section" id="rehashing">
	<h2>7. Rehashing</h2>
<pre><code>// When load factor exceeds threshold (e.g., α &gt; 0.7):
// 1. Create a new table of DOUBLE the size (next prime)
// 2. Re-hash ALL existing elements into the new table
// 3. Delete old table

// Why rehash?
// High load factor → more collisions → longer probe chains → O(n)
// Rehashing resets everything → back to O(1) performance

// Cost: O(n) for one rehash
// But amortized over n insertions → O(1) per insert
// (Same idea as dynamic array resizing)

// C++ unordered_map rehashes automatically!
// Default max load factor = 1.0</code></pre>
</section>

<section class="theory-section" id="stl-hashing">
	<h2>8. C++ STL Hash Containers</h2>
<pre><code>// unordered_map: hash table with key-value pairs
// unordered_set: hash table with only keys (no values)
// Both use chaining internally

#include &lt;unordered_map&gt;
#include &lt;unordered_set&gt;

unordered_map&lt;string, int&gt; ages;
ages["Alice"] = 25;
ages["Bob"] = 30;
ages.count("Alice");  // 1 (exists)
ages.erase("Bob");

unordered_set&lt;int&gt; seen;
seen.insert(10);
seen.count(10);  // 1

// vs ordered (tree-based):
// map / set      → Red-Black tree, O(log n), sorted iteration
// unordered_map / unordered_set → Hash table, O(1) avg, unsorted

// When to use which:
// Need O(1) lookup, no ordering → unordered_map
// Need sorted iteration → map
// Need min/max operations → map</code></pre>
</section>

<section class="theory-section" id="collision-comparison">
	<h2>9. Collision Resolution Comparison</h2>
	<table class="w-full text-sm text-gray-300 mt-4">
		<thead>
			<tr class="border-b border-gray-700">
				<th class="text-left p-2 text-gray-400">Method</th>
				<th class="text-left p-2 text-gray-400">Clustering</th>
				<th class="text-left p-2 text-gray-400">Load Factor</th>
				<th class="text-left p-2 text-gray-400">Delete</th>
				<th class="text-left p-2 text-gray-400">Cache</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-800"><td class="p-2">Chaining</td><td class="p-2">None</td><td class="p-2">α can be &gt;1</td><td class="p-2">Easy</td><td class="p-2">Poor (pointers)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Linear Probing</td><td class="p-2">Primary</td><td class="p-2">α &lt; 1 (prefer &lt;0.7)</td><td class="p-2">Tombstones</td><td class="p-2">Best (contiguous)</td></tr>
			<tr class="border-b border-gray-800"><td class="p-2">Quadratic</td><td class="p-2">Secondary</td><td class="p-2">α &lt; 0.5 (prime size)</td><td class="p-2">Tombstones</td><td class="p-2">Good</td></tr>
			<tr><td class="p-2">Double Hashing</td><td class="p-2">Minimal</td><td class="p-2">α &lt; 1</td><td class="p-2">Tombstones</td><td class="p-2">Good</td></tr>
		</tbody>
	</table>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>Hash function</strong>: maps key → index. Division method: key % tableSize (prime size best).</li>
			<li>• <strong>Load factor</strong> α = n/tableSize. High α → more collisions → rehash.</li>
			<li>• <strong>Chaining</strong>: linked lists at each slot. Simple, no limit on α, easy deletion.</li>
			<li>• <strong>Linear probing</strong>: try next slot. Cache-friendly but suffers primary clustering.</li>
			<li>• <strong>Quadratic probing</strong>: try slot+i². Reduces primary clustering. Needs prime size, α &lt; 0.5.</li>
			<li>• <strong>Double hashing</strong>: step = h2(key). Best open addressing — minimal clustering.</li>
			<li>• <strong>Deletion in open addressing</strong>: use TOMBSTONE markers, not empty.</li>
			<li>• <strong>Rehashing</strong>: double table, re-insert all. Amortized O(1).</li>
			<li>• <strong>C++ STL</strong>: unordered_map/set = O(1) hash. map/set = O(log n) tree.</li>
		</ul>
	</div>
</section>
`;
