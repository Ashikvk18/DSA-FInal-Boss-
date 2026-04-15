export const theoryHTML = `
<section class="theory-section" id="string-basics">
	<h2>1. String Basics in C/C++</h2>
	<div class="definition-box">
		<strong>Definition:</strong> A <strong>string</strong> is a sequence of characters stored in contiguous memory. In C, strings are <strong>null-terminated character arrays</strong> (ending with <code>'\\0'</code>). In C++, you can also use the <code>std::string</code> class from <code>&lt;string&gt;</code> which manages memory automatically.
	</div>

	<h3>C-Style Strings (Character Arrays)</h3>
<pre><code>// C-style string — null-terminated character array
char name[6] = {'H','e','l','l','o','\\0'};  // explicit null
char name2[] = "Hello";                       // compiler adds '\\0'
// Memory: ['H','e','l','l','o','\\0']
// Size in memory: 6 bytes (5 chars + null terminator)

// IMPORTANT: '\\0' (null character, ASCII 0) marks the end
// Without it, string functions read garbage past the array!

// String literals are stored in READ-ONLY memory
char *ptr = "Hello";  // ptr points to read-only string literal
// ptr[0] = 'J';      // UNDEFINED BEHAVIOR! Can't modify literals</code></pre>

	<h3>C++ std::string</h3>
<pre><code>#include &lt;string&gt;
using namespace std;

string s1 = "Hello";           // initialization
string s2("World");            // constructor
string s3 = s1 + " " + s2;    // concatenation: "Hello World"

// Key advantages over C-style:
// 1. Automatic memory management (no manual allocation)
// 2. Dynamic resizing (grows as needed)
// 3. No null-terminator issues
// 4. Rich set of built-in methods

s1.length();        // 5 (or s1.size())
s1[0];              // 'H'
s1.substr(1, 3);    // "ell"
s1.find("ll");      // 2 (index where "ll" starts)
s1.append(" World");// s1 = "Hello World"
s1.empty();         // false</code></pre>

	<h3>ASCII Values — The Foundation</h3>
<pre><code>// Every character has a numeric ASCII value
// 'A' = 65, 'B' = 66, ..., 'Z' = 90
// 'a' = 97, 'b' = 98, ..., 'z' = 122
// '0' = 48, '1' = 49, ..., '9' = 57
// ' ' = 32, '\\0' = 0

// Key relationships:
// 'a' - 'A' = 32  (lowercase = uppercase + 32)
// '5' - '0' = 5   (digit char to int: ch - '0')
// 'c' - 'a' = 2   (position in alphabet: 0-indexed)</code></pre>
</section>

<section class="theory-section" id="string-length">
	<h2>2. Finding String Length</h2>
<pre><code>// C-style: count characters until '\\0'
int myStrLen(char s[]) {
    int len = 0;
    while (s[len] != '\\0')
        len++;
    return len;
}
// Time: O(n)  Space: O(1)

// Or use built-in:
// C: strlen(s)      — from &lt;cstring&gt;
// C++: s.length()   — std::string method</code></pre>
</section>

<section class="theory-section" id="case-operations">
	<h2>3. Changing Case</h2>
<pre><code>// Convert to uppercase
void toUpperCase(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] &gt;= 'a' &amp;&amp; s[i] &lt;= 'z')
            s[i] = s[i] - 32;  // 'a'-32 = 'A'
    }
}

// Convert to lowercase
void toLowerCase(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] &gt;= 'A' &amp;&amp; s[i] &lt;= 'Z')
            s[i] = s[i] + 32;  // 'A'+32 = 'a'
    }
}

// Toggle case
void toggleCase(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] &gt;= 'A' &amp;&amp; s[i] &lt;= 'Z')
            s[i] += 32;
        else if (s[i] &gt;= 'a' &amp;&amp; s[i] &lt;= 'z')
            s[i] -= 32;
    }
}
// All O(n) time, O(1) space</code></pre>
</section>

<section class="theory-section" id="validation">
	<h2>4. String Validation</h2>
	<div class="definition-box">
		<strong>Validation</strong> means checking if a string contains only specific types of characters — alphabetic, numeric, alphanumeric, etc.
	</div>
<pre><code>bool isAlpha(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (!((s[i] &gt;= 'A' &amp;&amp; s[i] &lt;= 'Z') || 
              (s[i] &gt;= 'a' &amp;&amp; s[i] &lt;= 'z')))
            return false;
    }
    return true;
}

bool isDigit(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] &lt; '0' || s[i] &gt; '9')
            return false;
    }
    return true;
}

bool isAlphaNumeric(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (!((s[i] &gt;= 'A' &amp;&amp; s[i] &lt;= 'Z') ||
              (s[i] &gt;= 'a' &amp;&amp; s[i] &lt;= 'z') ||
              (s[i] &gt;= '0' &amp;&amp; s[i] &lt;= '9')))
            return false;
    }
    return true;
}

// C++ &lt;cctype&gt; equivalents: isalpha(), isdigit(), isalnum()
// These work on single characters</code></pre>
</section>

<section class="theory-section" id="reverse-string">
	<h2>5. Reversing a String</h2>
<pre><code>// Method 1: Two-pointer swap — O(n) time, O(1) space ✓
void reverseString(char s[]) {
    int i = 0, j = strlen(s) - 1;
    while (i &lt; j) {
        swap(s[i], s[j]);
        i++;
        j--;
    }
}

// Method 2: Using auxiliary array — O(n) time, O(n) space
void reverseAux(char s[]) {
    int n = strlen(s);
    char *rev = new char[n + 1];
    for (int i = n-1, j = 0; i &gt;= 0; i--, j++)
        rev[j] = s[i];
    rev[n] = '\\0';
    strcpy(s, rev);
    delete[] rev;
}

// C++ string:
string reverseStr(string s) {
    int i = 0, j = s.length() - 1;
    while (i &lt; j) swap(s[i++], s[j--]);
    return s;
}
// Or: reverse(s.begin(), s.end());  // from &lt;algorithm&gt;</code></pre>
</section>

<section class="theory-section" id="palindrome">
	<h2>6. Palindrome Check</h2>
	<div class="definition-box">
		<strong>Palindrome:</strong> A string that reads the same forward and backward. Examples: "madam", "racecar", "level", "121".
	</div>
<pre><code>// Method 1: Compare from both ends — O(n) time, O(1) space ✓
bool isPalindrome(char s[]) {
    int i = 0, j = strlen(s) - 1;
    while (i &lt; j) {
        if (s[i] != s[j])
            return false;
        i++;
        j--;
    }
    return true;
}

// Method 2: Compare with reversed copy — O(n) time, O(n) space
bool isPalindromeReverse(string s) {
    string rev = s;
    reverse(rev.begin(), rev.end());
    return s == rev;
}

// Case-insensitive palindrome (ignore spaces)
bool isPalindromeCaseInsensitive(string s) {
    string cleaned = "";
    for (char c : s) {
        if (isalpha(c))
            cleaned += tolower(c);
    }
    int i = 0, j = cleaned.length() - 1;
    while (i &lt; j) {
        if (cleaned[i++] != cleaned[j--])
            return false;
    }
    return true;
}
// "Race Car" → "racecar" → palindrome!</code></pre>
</section>

<section class="theory-section" id="duplicates">
	<h2>7. Finding Duplicate Characters</h2>

	<h3>Method 1: Hash Array — O(n)</h3>
<pre><code>// Use an array of size 26 (for lowercase) or 128 (for ASCII)
void findDuplicates(char s[]) {
    int count[26] = {0};  // for lowercase a-z
    
    for (int i = 0; s[i] != '\\0'; i++)
        count[s[i] - 'a']++;
    
    for (int i = 0; i &lt; 26; i++) {
        if (count[i] &gt; 1)
            cout &lt;&lt; (char)('a' + i) &lt;&lt; " appears " 
                 &lt;&lt; count[i] &lt;&lt; " times" &lt;&lt; endl;
    }
}
// Time: O(n)  Space: O(1) — fixed 26 slots</code></pre>

	<h3>Method 2: Bitwise (for lowercase only) — O(n) time, O(1) space</h3>
<pre><code>// Use a single int (32 bits) — each bit represents a letter
void findDuplicatesBitwise(char s[]) {
    int checker = 0;
    
    for (int i = 0; s[i] != '\\0'; i++) {
        int bit = s[i] - 'a';         // 0-25
        int mask = 1 &lt;&lt; bit;           // set the bit position
        
        if (checker &amp; mask)            // bit already set?
            cout &lt;&lt; s[i] &lt;&lt; " is duplicate" &lt;&lt; endl;
        else
            checker |= mask;           // mark bit
    }
}
// Genius trick! Only works for 26 lowercase letters (fits in 32-bit int)
// Time: O(n)  Space: O(1) — literally one integer!</code></pre>
</section>

<section class="theory-section" id="anagram">
	<h2>8. Anagram Check</h2>
	<div class="definition-box">
		<strong>Anagram:</strong> Two strings are anagrams if they contain the <strong>exact same characters</strong> in the <strong>same frequency</strong>, just rearranged. Examples: "listen" &amp; "silent", "anagram" &amp; "nagaram".
	</div>
<pre><code>// Method 1: Hash counting — O(n) time, O(1) space ✓
bool isAnagram(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    
    int count[26] = {0};
    
    // Increment for s1, decrement for s2
    for (int i = 0; i &lt; s1.length(); i++) {
        count[s1[i] - 'a']++;
        count[s2[i] - 'a']--;
    }
    
    // If all counts are 0, strings are anagrams
    for (int i = 0; i &lt; 26; i++)
        if (count[i] != 0) return false;
    
    return true;
}

// Method 2: Sort both and compare — O(n log n)
bool isAnagramSort(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    return s1 == s2;
}</code></pre>
</section>

<section class="theory-section" id="permutations">
	<h2>9. Permutations of a String</h2>
	<div class="definition-box">
		<strong>Permutation:</strong> All possible arrangements of characters. A string of length n has <strong>n!</strong> permutations. "ABC" has 3! = 6 permutations: ABC, ACB, BAC, BCA, CAB, CBA.
	</div>
<pre><code>// Backtracking approach — fix one char, permute the rest
void permutations(char s[], int l, int h) {
    if (l == h) {
        cout &lt;&lt; s &lt;&lt; endl;  // print one permutation
        return;
    }
    for (int i = l; i &lt;= h; i++) {
        swap(s[l], s[i]);           // fix s[i] at position l
        permutations(s, l+1, h);    // permute rest
        swap(s[l], s[i]);           // backtrack (undo swap)
    }
}

// Usage:
// char s[] = "ABC";
// permutations(s, 0, 2);
// Output: ABC ACB BAC BCA CBA CAB

// Time: O(n × n!)  — n! permutations, each takes O(n) to print
// Space: O(n) — recursion depth</code></pre>

	<div class="important-box">
		<strong>Google Interview Note:</strong> String permutations are a classic <strong>backtracking</strong> problem. The pattern — "fix one, recurse on rest, undo" — appears in many problems: N-Queens, Sudoku solver, subset generation, combination sum. Master this pattern!
	</div>
</section>

<section class="theory-section" id="more-operations">
	<h2>10. More String Operations</h2>

	<h3>Count Words in a String</h3>
<pre><code>int countWords(char s[]) {
    int count = 0;
    bool inWord = false;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] != ' ' &amp;&amp; !inWord) {
            count++;
            inWord = true;
        } else if (s[i] == ' ') {
            inWord = false;
        }
    }
    return count;
}
// "Hello World" → 2
// "  Hello   World  " → 2 (handles multiple spaces)</code></pre>

	<h3>Compare Strings</h3>
<pre><code>// Returns: 0 if equal, negative if s1 &lt; s2, positive if s1 &gt; s2
int myStrcmp(char s1[], char s2[]) {
    int i = 0;
    while (s1[i] != '\\0' &amp;&amp; s2[i] != '\\0') {
        if (s1[i] != s2[i])
            return s1[i] - s2[i];
        i++;
    }
    return s1[i] - s2[i];  // handle different lengths
}
// "apple" vs "apply": 'e'-'y' = negative → apple &lt; apply
// Uses lexicographic (dictionary) order based on ASCII values</code></pre>

	<h3>Check if String is a Substring</h3>
<pre><code>// Brute force — O(m × n)
int findSubstring(string text, string pattern) {
    int n = text.length(), m = pattern.length();
    for (int i = 0; i &lt;= n - m; i++) {
        int j;
        for (j = 0; j &lt; m; j++) {
            if (text[i+j] != pattern[j])
                break;
        }
        if (j == m) return i;  // found at index i
    }
    return -1;
}
// Better: KMP algorithm — O(n + m) [covered in advanced topics]
// C++: text.find(pattern) returns position or string::npos</code></pre>
</section>

<section class="theory-section">
	<h2>Summary — What You Must Remember</h2>
	<div class="bg-gray-800/50 rounded-lg p-4">
		<ul class="space-y-2 text-gray-300">
			<li>• <strong>C-strings</strong> are null-terminated char arrays. <strong>std::string</strong> manages memory automatically.</li>
			<li>• <strong>ASCII</strong>: 'A'=65, 'a'=97, '0'=48. Lowercase = uppercase + 32.</li>
			<li>• <strong>Length</strong>: count until '\\0'. O(n).</li>
			<li>• <strong>Case change</strong>: ±32 from ASCII value. O(n).</li>
			<li>• <strong>Reverse</strong>: two-pointer swap. O(n) time, O(1) space.</li>
			<li>• <strong>Palindrome</strong>: compare from both ends. O(n) time, O(1) space.</li>
			<li>• <strong>Duplicates</strong>: hash array (count[26]) or bitwise (single int). Both O(n).</li>
			<li>• <strong>Anagram</strong>: same chars, same frequency. Count array method is O(n).</li>
			<li>• <strong>Permutations</strong>: backtracking — fix, recurse, undo. O(n × n!).</li>
			<li>• <strong>Substring search</strong>: brute force O(mn), KMP O(n+m).</li>
			<li>• For interviews: always clarify — ASCII or Unicode? Case sensitive? Spaces?</li>
		</ul>
	</div>
</section>
`;
