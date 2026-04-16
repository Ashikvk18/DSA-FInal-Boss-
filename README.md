# DSA Final Boss

A self-study platform for learning Data Structures and Algorithms in C++. Built this while preparing for software engineering interviews. Covers everything from basic C++ to graphs and dynamic programming across 18 modules.

## What This Is

A web app with theory explanations, interactive code playgrounds, and quizzes for each topic. The theory is written in plain language with actual code examples instead of abstract descriptions. The code playgrounds have editable C++ snippets you can copy and run locally. Each module has 18 quiz questions with detailed explanations.

Progress is saved in your browser (localStorage) so you can pick up where you left off.

## Modules

1. **C++ Essentials** - Syntax, data types, pointers, references, STL basics
2. **Arrays** - Operations, two-pointer, sliding window, kadane's
3. **Strings** - Manipulation, pattern matching, common problems
4. **Recursion** - Base cases, call stack, backtracking intro, tail recursion
5. **Searching** - Linear, binary search, search on answer
6. **Matrices** - Traversals, rotation, spiral order, search in sorted matrix
7. **Linked Lists** - Singly/doubly, reversal, cycle detection, merge
8. **Stacks** - Array/linked list impl, infix/postfix, next greater element
9. **Queues** - Circular queue, deque, priority queue, BFS foundation
10. **Binary Trees** - Traversals (recursive + iterative), height, construction from traversals
11. **Binary Search Trees** - Search, insert, delete, LCA, validation, floor/ceil
12. **AVL Trees** - Rotations (LL, RR, LR, RL), insertion, deletion, height analysis
13. **Advanced Trees** - 2-3 trees, 2-3-4 trees, Red-Black trees, B-trees
14. **Heaps** - Insert, extract, heapify, heap sort, priority queue, kth largest
15. **Sorting** - Bubble, selection, insertion, merge, quick, counting, radix, shell
16. **Hashing** - Chaining, linear probing, quadratic probing, double hashing, rehashing
17. **Graphs** - Representation, BFS, DFS, cycle detection, Union-Find, topological sort
18. **Algorithm Strategies** - Recurrences, divide & conquer, greedy, DP, backtracking

## Tech Stack

- SvelteKit
- TailwindCSS
- JavaScript (no TypeScript)
- Theory rendered as raw HTML strings to avoid Svelte template parsing issues

## Running Locally

```
git clone https://github.com/Ashikvk18/DSA-FInal-Boss-.git
cd DSA-FInal-Boss-
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Project Structure

```
src/
  lib/
    content/         -- module content (theory, practice, quiz per module)
    components/      -- CodePlayground.svelte, Quiz.svelte, etc.
    stores/          -- progress tracking (localStorage)
    modules.js       -- module definitions (id, title, description)
  routes/
    module/[id]/     -- dynamic module pages
```

Each module has 4 files:
- `<module>-html.js` - theory content as HTML string
- `<module>-theory.svelte` - renders the HTML
- `<module>-practice.svelte` - code playground exercises
- `<module>.js` - exports theory, practice, quiz data

## Notes

- The code examples are C++ and meant to be copied into a local compiler. The playgrounds are read/edit/copy only, not a live compiler.
- No login required. Everything runs client-side.
- Modules are not gated. You can jump to any module in any order.
- Quiz scores are tracked per module in localStorage.
