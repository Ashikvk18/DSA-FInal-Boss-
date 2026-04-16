import Theory from './hashing-theory.svelte';
import Practice from './hashing-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'Hashing provides which average-case time complexity for search, insert, and delete?',
		options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
		correct: 2,
		explanation: 'Hash tables use a hash function to compute an index directly → O(1) average for all three operations. Worst case is O(n) when all keys collide into the same slot.'
	},
	{
		question: 'A hash function must be:',
		options: [
			'Random each time it\'s called',
			'Deterministic — same key always produces same hash',
			'Sorted',
			'Reversible'
		],
		correct: 1,
		explanation: 'A hash function must be deterministic: hash("Alice") must always return the same value. Otherwise, you could never find an element after inserting it!'
	},
	{
		question: 'The division method hash function is:',
		options: ['h(key) = key + tableSize', 'h(key) = key * tableSize', 'h(key) = key % tableSize', 'h(key) = key / tableSize'],
		correct: 2,
		explanation: 'h(key) = key % tableSize. The modulo operation maps any key to an index in [0, tableSize-1]. Using a prime tableSize reduces clustering.'
	},
	{
		question: 'Why should the hash table size be a prime number?',
		options: [
			'Primes are faster to compute',
			'Primes reduce clustering by distributing keys more uniformly',
			'Primes use less memory',
			'Primes prevent collisions entirely'
		],
		correct: 1,
		explanation: 'A prime table size ensures that key % size distributes keys more uniformly, especially when keys have common factors. Non-prime sizes can cause patterns in key distribution to create clusters.'
	},
	{
		question: 'The load factor α of a hash table is:',
		options: ['tableSize / n', 'n / tableSize', 'n * tableSize', 'log(n)'],
		correct: 1,
		explanation: 'Load factor α = n / tableSize (number of elements divided by table size). Higher α means more collisions. Ideal: α < 0.7 for open addressing, α ≈ 1 for chaining.'
	},
	{
		question: 'In separate chaining, collisions are handled by:',
		options: [
			'Finding the next empty slot',
			'Storing colliding elements in a linked list at the same index',
			'Replacing the existing element',
			'Discarding the new element'
		],
		correct: 1,
		explanation: 'Chaining stores ALL elements that hash to the same index in a linked list (chain) at that slot. Multiple elements can coexist at the same index.'
	},
	{
		question: 'The average search time for chaining with load factor α is:',
		options: ['O(1)', 'O(1 + α)', 'O(n)', 'O(log n)'],
		correct: 1,
		explanation: 'Average chain length = α. Search: O(1) to compute hash + O(α) to traverse the chain = O(1 + α). When α is small (≈1), this is effectively O(1).'
	},
	{
		question: 'Linear probing resolves collisions by:',
		options: [
			'Using a linked list',
			'Trying the next consecutive slot (index+1, index+2, ...)',
			'Using a second hash function',
			'Rehashing immediately'
		],
		correct: 1,
		explanation: 'Linear probing: if slot h(key) is occupied, try h(key)+1, h(key)+2, etc. (mod tableSize). Simple and cache-friendly, but suffers from primary clustering.'
	},
	{
		question: 'Primary clustering in linear probing means:',
		options: [
			'Keys form long contiguous runs, making future probes longer',
			'The table is full',
			'All keys hash to index 0',
			'The hash function is broken'
		],
		correct: 0,
		explanation: 'Primary clustering: occupied slots form long contiguous blocks. Any key that hashes ANYWHERE in the cluster must probe to the end. Clusters grow and merge, degrading performance.'
	},
	{
		question: 'Quadratic probing uses the probe sequence:',
		options: [
			'h(key) + 1, h(key) + 2, h(key) + 3, ...',
			'h(key) + 1², h(key) + 2², h(key) + 3², ...',
			'h(key) * 2, h(key) * 3, ...',
			'h(key) + h2(key), h(key) + 2*h2(key), ...'
		],
		correct: 1,
		explanation: 'Quadratic probing: try h(key)+1, h(key)+4, h(key)+9, ... (i² increments). This spreads probes further apart, reducing primary clustering. But can cause secondary clustering.'
	},
	{
		question: 'Double hashing uses:',
		options: [
			'Two separate hash tables',
			'Two hash functions — h1 for index, h2 for step size',
			'Hashing the hash',
			'A backup linked list'
		],
		correct: 1,
		explanation: 'Double hashing: h(key,i) = (h1(key) + i*h2(key)) % size. Different keys get different step sizes based on h2, virtually eliminating clustering. Best open addressing method.'
	},
	{
		question: 'In open addressing, you cannot simply delete an element by setting it to empty because:',
		options: [
			'It wastes memory',
			'It would break search chains — later elements that probed past this slot would become unfindable',
			'The hash function would change',
			'It\'s too slow'
		],
		correct: 1,
		explanation: 'If you set a slot to empty, searches for elements that probed past that slot will stop prematurely (thinking the chain ended). Use a TOMBSTONE/DELETED marker instead.'
	},
	{
		question: 'A tombstone (DELETED marker) in open addressing is treated as:',
		options: [
			'Empty for both insert and search',
			'Occupied for both insert and search',
			'Empty for insert (can be reused), occupied for search (don\'t stop)',
			'The slot is permanently unusable'
		],
		correct: 2,
		explanation: 'Tombstone = "used to have something here." For insert: treat as empty (reuse the slot). For search: treat as occupied (keep probing past it). This preserves search chains.'
	},
	{
		question: 'Rehashing is triggered when:',
		options: [
			'Any collision occurs',
			'The load factor exceeds a threshold',
			'A search fails',
			'The table is completely full'
		],
		correct: 1,
		explanation: 'Rehash when α exceeds a threshold (e.g., 0.7 for open addressing). Create a larger table (typically 2x size, next prime), re-insert all elements. Amortized O(1) per insert.'
	},
	{
		question: 'C++ unordered_map uses which collision resolution?',
		options: ['Linear probing', 'Quadratic probing', 'Separate chaining', 'Double hashing'],
		correct: 2,
		explanation: 'C++ unordered_map uses separate chaining internally. It rehashes when load factor exceeds max_load_factor() (default 1.0). Each bucket is essentially a linked list.'
	},
	{
		question: 'When should you use map instead of unordered_map?',
		options: [
			'When you need O(1) lookup',
			'When you need sorted iteration or ordered operations (lower_bound, etc.)',
			'When you have integer keys',
			'Always — map is faster'
		],
		correct: 1,
		explanation: 'map (Red-Black tree): O(log n) but supports sorted iteration, lower_bound, upper_bound. unordered_map (hash table): O(1) avg but no ordering. Use map when you need sorted access.'
	},
	{
		question: 'The worst case for hash table operations is O(n) when:',
		options: [
			'The table is empty',
			'All keys hash to the same index (one long chain or cluster)',
			'The load factor is 0',
			'Keys are unique'
		],
		correct: 1,
		explanation: 'If all n keys collide into the same slot, chaining creates one list of length n, and probing creates one cluster of length n. Every operation becomes O(n). Good hash functions prevent this.'
	},
	{
		question: 'For the "Two Sum" problem (find two numbers that add to target), hashing gives:',
		options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
		correct: 2,
		explanation: 'For each element x, check if (target - x) exists in the hash map. If yes → found pair. If no → insert x. One pass through the array: O(n) time, O(n) space. Classic hash map application.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
