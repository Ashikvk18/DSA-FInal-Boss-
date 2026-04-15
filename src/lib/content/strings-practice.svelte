<script>
	import CodePlayground from '$lib/components/CodePlayground.svelte';
</script>

<div class="space-y-8">
	<div class="mb-6">
		<h2>Practice — Strings</h2>
		<p class="text-gray-400">Master string manipulation with these hands-on exercises.</p>
	</div>

	<div>
		<h3>Practice 1: String Length & ASCII</h3>
		<p class="text-gray-400 text-sm mb-3">Understand null termination and ASCII values.</p>
		<CodePlayground
			title="String Length & ASCII Values"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

int myStrLen(char s[]) {
    int len = 0;
    while (s[len] != '\\0') len++;
    return len;
}

int main() {
    char s[] = "Hello";
    cout << "String: " << s << endl;
    cout << "Length (manual): " << myStrLen(s) << endl;
    cout << "Length (strlen): " << strlen(s) << endl;
    cout << "Size in memory: " << sizeof(s) << " bytes (includes \\\\0)" << endl;

    cout << "\\nASCII values:" << endl;
    for (int i = 0; s[i] != '\\0'; i++)
        cout << "  '" << s[i] << "' = " << (int)s[i] << endl;

    cout << "\\nKey ASCII:" << endl;
    cout << "  'A' = " << (int)'A' << ", 'Z' = " << (int)'Z' << endl;
    cout << "  'a' = " << (int)'a' << ", 'z' = " << (int)'z' << endl;
    cout << "  '0' = " << (int)'0' << ", '9' = " << (int)'9' << endl;
    cout << "  Diff: 'a'-'A' = " << ('a'-'A') << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 2: Case Conversion</h3>
		<p class="text-gray-400 text-sm mb-3">Convert between uppercase, lowercase, and toggle case.</p>
		<CodePlayground
			title="Case Conversion"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

void toUpper(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++)
        if (s[i] >= 'a' && s[i] <= 'z')
            s[i] -= 32;
}

void toLower(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++)
        if (s[i] >= 'A' && s[i] <= 'Z')
            s[i] += 32;
}

void toggleCase(char s[]) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') s[i] += 32;
        else if (s[i] >= 'a' && s[i] <= 'z') s[i] -= 32;
    }
}

int main() {
    char s1[] = "Hello World";
    cout << "Original:  " << s1 << endl;

    toUpper(s1);
    cout << "Uppercase: " << s1 << endl;

    toLower(s1);
    cout << "Lowercase: " << s1 << endl;

    char s2[] = "Hello World";
    toggleCase(s2);
    cout << "Toggled:   " << s2 << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 3: Reverse & Palindrome</h3>
		<p class="text-gray-400 text-sm mb-3">Reverse strings and check palindromes using the two-pointer technique.</p>
		<CodePlayground
			title="Reverse & Palindrome"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

void reverseString(char s[]) {
    int i = 0, j = strlen(s) - 1;
    while (i < j) {
        swap(s[i], s[j]);
        i++; j--;
    }
}

bool isPalindrome(char s[]) {
    int i = 0, j = strlen(s) - 1;
    while (i < j) {
        if (s[i] != s[j]) return false;
        i++; j--;
    }
    return true;
}

int main() {
    char s1[] = "Hello";
    cout << "Original: " << s1 << endl;
    reverseString(s1);
    cout << "Reversed: " << s1 << endl;

    cout << "\\n--- Palindrome Check ---" << endl;
    char tests[][20] = {"madam", "racecar", "hello", "level", "abba", "abc"};
    for (auto &t : tests) {
        cout << "  \"" << t << "\" -> "
             << (isPalindrome(t) ? "YES" : "NO") << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 4: Finding Duplicates (Hash & Bitwise)</h3>
		<p class="text-gray-400 text-sm mb-3">Find duplicate characters using a count array and using bitwise operations.</p>
		<CodePlayground
			title="Duplicate Characters"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

// Method 1: Hash/Count array
void findDuplicatesHash(char s[]) {
    int count[26] = {0};
    for (int i = 0; s[i] != '\\0'; i++)
        count[s[i] - 'a']++;

    cout << "Hash method:" << endl;
    for (int i = 0; i < 26; i++)
        if (count[i] > 1)
            cout << "  '" << (char)('a'+i) << "' x" << count[i] << endl;
}

// Method 2: Bitwise — uses just ONE integer!
void findDuplicatesBitwise(char s[]) {
    int checker = 0;
    cout << "Bitwise method:" << endl;
    for (int i = 0; s[i] != '\\0'; i++) {
        int bit = s[i] - 'a';
        int mask = 1 << bit;
        if (checker & mask)
            cout << "  '" << s[i] << "' is duplicate" << endl;
        else
            checker |= mask;
    }
}

int main() {
    char s[] = "programming";
    cout << "String: \\"" << s << "\\"\\n" << endl;
    findDuplicatesHash(s);
    cout << endl;
    findDuplicatesBitwise(s);

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 5: Anagram Check</h3>
		<p class="text-gray-400 text-sm mb-3">Check if two strings are anagrams using the count array technique.</p>
		<CodePlayground
			title="Anagram Check"
			initialCode={`#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

bool isAnagram(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    int count[26] = {0};
    for (int i = 0; i < (int)s1.length(); i++) {
        count[s1[i] - 'a']++;
        count[s2[i] - 'a']--;
    }
    for (int i = 0; i < 26; i++)
        if (count[i] != 0) return false;
    return true;
}

int main() {
    string pairs[][2] = {
        {"listen", "silent"},
        {"anagram", "nagaram"},
        {"hello", "world"},
        {"triangle", "integral"},
        {"abc", "abcd"}
    };

    for (auto &p : pairs) {
        cout << "\\"" << p[0] << "\\" & \\"" << p[1] << "\\" -> "
             << (isAnagram(p[0], p[1]) ? "ANAGRAM" : "NOT anagram") << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 6: String Permutations (Backtracking)</h3>
		<p class="text-gray-400 text-sm mb-3">Generate all permutations of a string using the fix-recurse-backtrack pattern.</p>
		<CodePlayground
			title="String Permutations"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

int count = 0;

void permutations(char s[], int l, int h) {
    if (l == h) {
        count++;
        cout << count << ". " << s << endl;
        return;
    }
    for (int i = l; i <= h; i++) {
        swap(s[l], s[i]);          // fix char at position l
        permutations(s, l+1, h);   // permute the rest
        swap(s[l], s[i]);          // backtrack (undo)
    }
}

int main() {
    char s[] = "ABC";
    int n = strlen(s);

    cout << "Permutations of \\"" << s << "\\":" << endl;
    cout << "Expected count: " << n << "! = ";
    int fact = 1;
    for (int i = 1; i <= n; i++) fact *= i;
    cout << fact << endl;
    cout << "---" << endl;

    permutations(s, 0, n - 1);

    cout << "---" << endl;
    cout << "Total: " << count << " permutations" << endl;

    return 0;
}`}
		/>
	</div>

	<div>
		<h3>Practice 7: Word Count & String Compare</h3>
		<p class="text-gray-400 text-sm mb-3">Count words in a sentence and compare strings lexicographically.</p>
		<CodePlayground
			title="Word Count & Compare"
			initialCode={`#include <iostream>
#include <cstring>
using namespace std;

int countWords(char s[]) {
    int count = 0;
    bool inWord = false;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] != ' ' && !inWord) {
            count++;
            inWord = true;
        } else if (s[i] == ' ') {
            inWord = false;
        }
    }
    return count;
}

int myStrcmp(char s1[], char s2[]) {
    int i = 0;
    while (s1[i] != '\\0' && s2[i] != '\\0') {
        if (s1[i] != s2[i]) return s1[i] - s2[i];
        i++;
    }
    return s1[i] - s2[i];
}

int main() {
    cout << "--- Word Count ---" << endl;
    char sentences[][50] = {
        "Hello World",
        "  Hello   World  ",
        "One",
        "The quick brown fox"
    };
    for (auto &s : sentences)
        cout << "  \\"" << s << "\\" -> " << countWords(s) << " words" << endl;

    cout << "\\n--- String Compare ---" << endl;
    char pairs[][2][20] = {
        {"apple", "apply"},
        {"hello", "hello"},
        {"abc", "abd"},
        {"ab", "abc"}
    };
    for (auto &p : pairs) {
        int r = myStrcmp(p[0], p[1]);
        string result = (r == 0) ? "EQUAL" : (r < 0) ? "LESS" : "GREATER";
        cout << "  \\"" << p[0] << "\\" vs \\"" << p[1] << "\\" -> " << result << endl;
    }

    return 0;
}`}
		/>
	</div>

	<div class="bg-amber-950/20 border border-amber-800 rounded-xl p-6">
		<h3 class="text-amber-400 mt-0">Challenge: Check if Two Strings are Rotations</h3>
		<p class="text-gray-400 text-sm mb-3">Two strings are rotations if one can be obtained by rotating the other. e.g., "abcde" and "cdeab". Hint: concatenate s1 with itself and search for s2.</p>
		<CodePlayground
			title="String Rotation — Try It Yourself"
			initialCode={`#include <iostream>
#include <string>
using namespace std;

// TODO: Check if s2 is a rotation of s1
// Hint: if s2 is a rotation of s1, then s2 is a substring of s1+s1
// Example: s1="abcde", s1+s1="abcdeabcde", s2="cdeab" is found in it!
bool isRotation(string s1, string s2) {
    // YOUR CODE HERE

}

int main() {
    cout << "abcde, cdeab -> " << (isRotation("abcde","cdeab") ? "YES" : "NO") << endl;  // YES
    cout << "abcde, abced -> " << (isRotation("abcde","abced") ? "YES" : "NO") << endl;  // NO
    cout << "hello, llohe -> " << (isRotation("hello","llohe") ? "YES" : "NO") << endl;  // YES
    return 0;
}`}
		/>
	</div>
</div>
