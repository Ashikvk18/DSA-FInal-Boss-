<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Hashing</h2>
		<p class="text-gray-400">Implement hash tables with chaining, linear probing, quadratic probing, and double hashing.</p>
	</div>

	<div>
		<h3>Practice 1: Hash Table with Chaining</h3>
		<p class="text-gray-400 text-sm mb-3">Build a hash table using separate chaining with linked lists.</p>
		<CodePlayground
			title="Separate Chaining Hash Table"
			initialCode={`#include <iostream>
#include <list>
using namespace std;

class HashTableChain {
    list<int> *table;
    int size;
public:
    HashTableChain(int s) : size(s) { table = new list<int>[size]; }

    int hash(int key) { return key % size; }

    void insert(int key) {
        int idx = hash(key);
        table[idx].push_back(key);
        cout << "Insert " << key << " -> slot " << idx << endl;
    }

    bool search(int key) {
        int idx = hash(key);
        for (int val : table[idx])
            if (val == key) return true;
        return false;
    }

    void remove(int key) {
        int idx = hash(key);
        table[idx].remove(key);
    }

    void display() {
        for (int i = 0; i < size; i++) {
            cout << "[" << i << "]: ";
            for (int val : table[i]) cout << val << " -> ";
            cout << "NULL" << endl;
        }
    }
};

int main() {
    HashTableChain ht(7);
    int keys[] = {10, 20, 15, 7, 25, 35, 14, 21};
    for (int k : keys) ht.insert(k);

    cout << "\\nHash Table:" << endl;
    ht.display();

    cout << "\\nSearch 35: " << (ht.search(35) ? "FOUND" : "NOT FOUND") << endl;
    cout << "Search 99: " << (ht.search(99) ? "FOUND" : "NOT FOUND") << endl;

    ht.remove(35);
    cout << "\\nAfter removing 35:" << endl;
    ht.display();

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Linear Probing</h3>
		<p class="text-gray-400 text-sm mb-3">Open addressing with linear probing — see clustering in action.</p>
		<CodePlayground
			title="Linear Probing Hash Table"
			initialCode={`#include <iostream>
using namespace std;

const int EMPTY = -1, DELETED = -2;

class HashTableLP {
    int *table, size;
public:
    HashTableLP(int s) : size(s) {
        table = new int[size];
        for (int i = 0; i < size; i++) table[i] = EMPTY;
    }

    void insert(int key) {
        int idx = key % size;
        int probes = 0;
        while (table[idx] != EMPTY && table[idx] != DELETED) {
            idx = (idx + 1) % size;
            probes++;
        }
        table[idx] = key;
        cout << "Insert " << key << " -> slot " << idx
             << " (" << probes << " probes)" << endl;
    }

    int search(int key) {
        int idx = key % size, probes = 0;
        while (table[idx] != EMPTY) {
            probes++;
            if (table[idx] == key)
                { cout << "  Found " << key << " at " << idx << " (" << probes << " probes)" << endl; return idx; }
            idx = (idx + 1) % size;
        }
        cout << "  " << key << " not found (" << probes << " probes)" << endl;
        return -1;
    }

    void remove(int key) {
        int idx = search(key);
        if (idx != -1) table[idx] = DELETED;  // tombstone!
    }

    void display() {
        for (int i = 0; i < size; i++) {
            cout << "[" << i << "]: ";
            if (table[i] == EMPTY) cout << "EMPTY";
            else if (table[i] == DELETED) cout << "DELETED";
            else cout << table[i];
            cout << endl;
        }
    }
};

int main() {
    HashTableLP ht(7);
    int keys[] = {10, 20, 15, 7, 25, 35};
    for (int k : keys) ht.insert(k);

    cout << "\\nHash Table:" << endl;
    ht.display();

    cout << "\\nSearching:" << endl;
    ht.search(35);
    ht.search(42);

    cout << "\\nDelete 7, then search 35 again:" << endl;
    ht.remove(7);
    ht.display();
    cout << endl;
    ht.search(35);  // should still find via tombstone

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Quadratic Probing</h3>
		<p class="text-gray-400 text-sm mb-3">Probe with i² steps to reduce clustering.</p>
		<CodePlayground
			title="Quadratic Probing"
			initialCode={`#include <iostream>
using namespace std;

class HashTableQP {
    int *table, size;
    static const int EMPTY = -1;
public:
    HashTableQP(int s) : size(s) {
        table = new int[size];
        for (int i = 0; i < size; i++) table[i] = EMPTY;
    }

    void insert(int key) {
        int idx = key % size;
        int i = 0;
        while (table[(idx + i*i) % size] != EMPTY) {
            i++;
            if (i >= size) { cout << "Table full for " << key << endl; return; }
        }
        int slot = (idx + i*i) % size;
        table[slot] = key;
        cout << "Insert " << key << " -> slot " << slot
             << " (probes: " << i << ", sequence: h+" << i*i << ")" << endl;
    }

    bool search(int key) {
        int idx = key % size, i = 0;
        while (i < size) {
            int slot = (idx + i*i) % size;
            if (table[slot] == EMPTY) return false;
            if (table[slot] == key) return true;
            i++;
        }
        return false;
    }

    void display() {
        for (int i = 0; i < size; i++) {
            cout << "[" << i << "]: ";
            if (table[i] == EMPTY) cout << "EMPTY"; else cout << table[i];
            cout << endl;
        }
    }
};

int main() {
    HashTableQP ht(7);  // prime size!
    int keys[] = {10, 17, 24, 31, 38};  // all hash to 3!
    cout << "All keys hash to index 3 (key % 7):\\n" << endl;
    for (int k : keys) ht.insert(k);

    cout << "\\nHash Table:" << endl;
    ht.display();

    cout << "\\nSearch 24: " << (ht.search(24) ? "FOUND" : "NOT FOUND") << endl;
    cout << "Search 99: " << (ht.search(99) ? "FOUND" : "NOT FOUND") << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Double Hashing</h3>
		<p class="text-gray-400 text-sm mb-3">Use a second hash function for the step size — minimal clustering.</p>
		<CodePlayground
			title="Double Hashing"
			initialCode={`#include <iostream>
using namespace std;

class HashTableDH {
    int *table, size;
    static const int EMPTY = -1;
    int prime;  // for h2
public:
    HashTableDH(int s, int p) : size(s), prime(p) {
        table = new int[size];
        for (int i = 0; i < size; i++) table[i] = EMPTY;
    }

    int h1(int key) { return key % size; }
    int h2(int key) { return prime - (key % prime); }

    void insert(int key) {
        int idx = h1(key);
        int step = h2(key);
        int probes = 0;
        while (table[idx] != EMPTY) {
            idx = (idx + step) % size;
            probes++;
        }
        table[idx] = key;
        cout << "Insert " << key << " -> slot " << idx
             << " (h1=" << h1(key) << ", h2=" << step
             << ", probes=" << probes << ")" << endl;
    }

    void display() {
        for (int i = 0; i < size; i++) {
            cout << "[" << i << "]: ";
            if (table[i] == EMPTY) cout << "EMPTY"; else cout << table[i];
            cout << endl;
        }
    }
};

int main() {
    // size=7, prime=5 for h2
    HashTableDH ht(7, 5);
    int keys[] = {10, 17, 24, 31, 38};
    cout << "Double hashing (size=7, h2 prime=5):\\n" << endl;
    for (int k : keys) ht.insert(k);

    cout << "\\nHash Table:" << endl;
    ht.display();

    cout << "\\n** Different keys get different step sizes! **" << endl;
    cout << "** No clustering unlike linear/quadratic probing **" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: C++ unordered_map & unordered_set</h3>
		<p class="text-gray-400 text-sm mb-3">Use STL hash containers — the most practical way to hash in C++.</p>
		<CodePlayground
			title="STL unordered_map & unordered_set"
			initialCode={`#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <string>
using namespace std;

int main() {
    // unordered_map: key-value pairs
    unordered_map<string, int> ages;
    ages["Alice"] = 25;
    ages["Bob"] = 30;
    ages["Charlie"] = 22;
    ages["Diana"] = 28;

    cout << "=== unordered_map ===" << endl;
    for (auto &[name, age] : ages)
        cout << "  " << name << ": " << age << endl;
    cout << "Alice's age: " << ages["Alice"] << endl;
    cout << "Contains Eve? " << (ages.count("Eve") ? "Yes" : "No") << endl;

    // unordered_set: unique keys only
    unordered_set<int> seen;
    int arr[] = {5, 3, 8, 3, 1, 5, 8, 9, 1};
    cout << "\\n=== unordered_set (find duplicates) ===" << endl;
    cout << "Array: ";
    for (int x : arr) cout << x << " ";
    cout << "\\nDuplicates: ";
    for (int x : arr) {
        if (seen.count(x)) cout << x << " ";
        else seen.insert(x);
    }
    cout << endl;

    // Frequency count (classic hash problem)
    unordered_map<int, int> freq;
    int data[] = {1, 2, 3, 2, 1, 3, 3, 4, 5, 1};
    for (int x : data) freq[x]++;
    cout << "\\n=== Frequency Count ===" << endl;
    for (auto &[val, cnt] : freq)
        cout << "  " << val << " appears " << cnt << " times" << endl;

    // Two sum (O(n) with hash map)
    int target = 9;
    int nums[] = {2, 7, 11, 15};
    unordered_map<int, int> complement;
    cout << "\\n=== Two Sum (target=" << target << ") ===" << endl;
    for (int i = 0; i < 4; i++) {
        if (complement.count(target - nums[i])) {
            cout << "Found: nums[" << complement[target-nums[i]]
                 << "] + nums[" << i << "] = " << target << endl;
            break;
        }
        complement[nums[i]] = i;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: Rehashing Simulation</h3>
		<p class="text-gray-400 text-sm mb-3">Watch a hash table grow and rehash when load factor exceeds threshold.</p>
		<CodePlayground
			title="Rehashing When Load Factor Too High"
			initialCode={`#include <iostream>
#include <vector>
using namespace std;

class HashTableRehash {
    vector<int> table;
    int size, count;
    static const int EMPTY = -1;
    double maxLoadFactor = 0.7;

    int hash(int key) { return key % size; }

    void rehash() {
        cout << "\\n*** REHASHING: size " << size;
        int oldSize = size;
        size = size * 2 + 1;  // roughly double, keep odd
        cout << " -> " << size << " ***" << endl;
        vector<int> oldTable = table;
        table.assign(size, EMPTY);
        count = 0;
        for (int val : oldTable)
            if (val != EMPTY) insert(val);
    }

public:
    HashTableRehash(int s) : size(s), count(0) {
        table.assign(size, EMPTY);
    }

    void insert(int key) {
        if ((double)(count + 1) / size > maxLoadFactor)
            rehash();
        int idx = hash(key);
        while (table[idx] != EMPTY) idx = (idx + 1) % size;
        table[idx] = key;
        count++;
    }

    void display() {
        cout << "Size=" << size << ", Count=" << count
             << ", LoadFactor=" << (double)count/size << endl;
        for (int i = 0; i < size; i++) {
            if (table[i] != EMPTY)
                cout << "  [" << i << "]: " << table[i] << endl;
        }
    }
};

int main() {
    HashTableRehash ht(5);
    int keys[] = {10, 22, 31, 4, 15, 28, 17, 88, 59, 37, 45, 63};

    for (int k : keys) {
        cout << "Insert " << k << endl;
        ht.insert(k);
    }

    cout << "\\nFinal table:" << endl;
    ht.display();

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: First Non-Repeating Character</h3>
		<p class="text-gray-400 text-sm mb-3">Use a hash map to find the first character in a string that doesn't repeat.</p>
		<CodePlayground
			title="First Non-Repeating Character — Try It Yourself"
			initialCode={`#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

// TODO: Find the first non-repeating character in a string
// Example: "aabccbdee" -> 'd' (first char that appears exactly once)
// Hint: count frequencies with unordered_map, then scan string again

char firstNonRepeating(string s) {
    // YOUR CODE HERE
    // Step 1: Count frequency of each character
    // Step 2: Scan string again, return first char with freq == 1

    return '?';
}

int main() {
    string tests[] = {"aabccbdee", "abcabc", "aabb", "leetcode", "hello"};
    for (string &s : tests) {
        char result = firstNonRepeating(s);
        cout << "\\"" << s << "\\" -> ";
        if (result == '?') cout << "No unique character" << endl;
        else cout << "'" << result << "'" << endl;
    }
    // Expected: 'd', no unique, no unique, 'l', 'h'
    return 0;
}`}
		/>
	</div>
</div>
