import Theory from './strings-theory.svelte';
import Practice from './strings-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'What marks the end of a C-style string?',
		options: ['A newline character', 'The null character \'\\0\' (ASCII 0)', 'A space character', 'The last character of the array'],
		correct: 1,
		explanation: 'C-style strings are null-terminated. The \'\\0\' character (ASCII value 0) marks the end. All string functions rely on this to know where the string stops.'
	},
	{
		question: 'What is the ASCII value of \'A\'?',
		options: ['97', '65', '48', '32'],
		correct: 1,
		explanation: '\'A\' = 65. Uppercase letters are A(65) through Z(90). Lowercase a(97) through z(122). The difference is 32.'
	},
	{
		question: 'To convert a lowercase letter to uppercase, you:',
		options: [
			'Add 32 to its ASCII value',
			'Subtract 32 from its ASCII value',
			'Add 26 to its ASCII value',
			'XOR with 32'
		],
		correct: 1,
		explanation: 'Lowercase letters are 32 higher than uppercase in ASCII. \'a\'(97) - 32 = \'A\'(65). So subtract 32 to convert lower → upper.'
	},
	{
		question: 'How do you convert a digit character \'7\' to the integer 7?',
		options: [
			'(int)\'7\'',
			'\'7\' - \'0\'',
			'\'7\' - 48',
			'Both B and C'
		],
		correct: 3,
		explanation: '\'7\' has ASCII value 55, \'0\' has ASCII value 48. So \'7\' - \'0\' = 55 - 48 = 7. Both \'7\'-\'0\' and \'7\'-48 give the same result.'
	},
	{
		question: 'The most space-efficient method to check for duplicate characters (lowercase only) is:',
		options: [
			'Hash array of size 26',
			'Sorting the string first',
			'Bitwise using a single integer',
			'Nested loops'
		],
		correct: 2,
		explanation: 'A single 32-bit integer can track 26 lowercase letters (1 bit per letter). This uses O(1) space — literally one int — compared to an array of 26 ints.'
	},
	{
		question: 'Two strings are anagrams if:',
		options: [
			'They have the same length',
			'They contain the same characters with the same frequency',
			'One is the reverse of the other',
			'They have the same first and last character'
		],
		correct: 1,
		explanation: 'Anagrams contain the exact same characters in the exact same frequency, just rearranged. "listen" and "silent" are anagrams.'
	},
	{
		question: 'The most efficient way to check anagrams is:',
		options: [
			'Sort both strings and compare — O(n log n)',
			'Count array: increment for s1, decrement for s2, check all zero — O(n)',
			'Generate all permutations — O(n!)',
			'Compare character by character — O(n)'
		],
		correct: 1,
		explanation: 'The count array method is O(n): one pass to count characters, one pass to verify all counts are zero. Sorting is O(n log n), and permutations is O(n!) — both worse.'
	},
	{
		question: 'How many permutations does a string of length 4 have?',
		options: ['4', '8', '16', '24'],
		correct: 3,
		explanation: 'A string of length n has n! permutations. 4! = 4 × 3 × 2 × 1 = 24.'
	},
	{
		question: 'The backtracking pattern for generating permutations is:',
		options: [
			'Sort, select, repeat',
			'Fix one character, recurse on rest, undo the fix',
			'Swap all pairs, print, swap back',
			'Use a queue to generate level by level'
		],
		correct: 1,
		explanation: 'The pattern is: fix a character at the current position (swap), recursively permute the remaining characters, then undo the swap (backtrack). This generates all n! arrangements.'
	},
	{
		question: 'What is the time complexity of the two-pointer string reversal?',
		options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
		correct: 2,
		explanation: 'Two pointers start from both ends and meet in the middle. Each character is visited once. Time: O(n), Space: O(1).'
	},
	{
		question: '"racecar" is a palindrome because:',
		options: [
			'It contains repeated characters',
			'It reads the same forward and backward',
			'It has an odd number of characters',
			'All characters are lowercase'
		],
		correct: 1,
		explanation: 'A palindrome reads the same forward and backward. "racecar" reversed is "racecar" — identical.'
	},
	{
		question: 'What does `char *p = "Hello";` create?',
		options: [
			'A modifiable string on the stack',
			'A pointer to a read-only string literal',
			'A string on the heap',
			'A null pointer'
		],
		correct: 1,
		explanation: 'String literals like "Hello" are stored in read-only memory. The pointer p points to this read-only data. Modifying it (p[0]=\'J\') is undefined behavior.'
	},
	{
		question: 'std::string in C++ compared to C-style strings:',
		options: [
			'Is slower and uses more memory',
			'Cannot be concatenated',
			'Manages memory automatically and supports dynamic resizing',
			'Does not support indexing'
		],
		correct: 2,
		explanation: 'std::string handles memory management (no manual allocation), grows dynamically, provides rich methods (find, substr, etc.), and avoids null-terminator bugs.'
	},
	{
		question: 'To count words in "  Hello   World  ", the key insight is:',
		options: [
			'Count spaces and add 1',
			'Count transitions from space to non-space character',
			'Split by space and count',
			'Count all non-space characters'
		],
		correct: 1,
		explanation: 'Counting spaces fails with multiple/leading/trailing spaces. Instead, count transitions from space (or start) to non-space — each transition marks the start of a new word.'
	},
	{
		question: 'The brute force substring search has time complexity:',
		options: ['O(n)', 'O(m + n)', 'O(m × n)', 'O(n²)'],
		correct: 2,
		explanation: 'For each of the n-m+1 starting positions in the text, we may compare up to m characters of the pattern. Worst case: O(m × n). KMP algorithm improves this to O(m + n).'
	},
	{
		question: 'In the bitwise duplicate detection, what does `checker & (1 << bit)` check?',
		options: [
			'If the character is uppercase',
			'If the bit at that position is already set (character seen before)',
			'If the character is a vowel',
			'The count of the character'
		],
		correct: 1,
		explanation: 'Each bit in the integer represents a letter (bit 0 = \'a\', bit 1 = \'b\', etc.). If the bit is already set (1), the character was seen before — it\'s a duplicate.'
	},
	{
		question: 'String comparison in C++ (lexicographic order) compares:',
		options: [
			'String lengths only',
			'Characters by their ASCII values, left to right',
			'The first and last characters',
			'The number of vowels'
		],
		correct: 1,
		explanation: 'Lexicographic comparison goes character by character from left to right, comparing ASCII values. The first difference determines the result. If one string is a prefix of the other, the shorter one is "less".'
	},
	{
		question: 'Which is NOT a valid way to initialize a string in C++?',
		options: [
			'char s[] = "Hello";',
			'string s = "Hello";',
			'char s[6] = {\'H\',\'e\',\'l\',\'l\',\'o\',\'\\0\'};',
			'char s[] = {Hello};'
		],
		correct: 3,
		explanation: 'char s[] = {Hello} is invalid — Hello without quotes is not a valid character array initializer. All other options are valid ways to create strings.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
