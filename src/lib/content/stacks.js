import Theory from './stacks-theory.svelte';
import Practice from './stacks-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'A stack follows which principle?',
		options: ['FIFO (First In, First Out)', 'LIFO (Last In, First Out)', 'Random access', 'Priority-based'],
		correct: 1,
		explanation: 'Stack = LIFO. The last element pushed is the first to be popped. Like a stack of plates — you add and remove from the top only.'
	},
	{
		question: 'What is the time complexity of push and pop on a stack?',
		options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
		correct: 2,
		explanation: 'Both push and pop operate on the top of the stack — a single pointer increment/decrement (array) or insert/delete at head (linked list). O(1).'
	},
	{
		question: 'What happens when you pop from an empty stack?',
		options: ['Returns 0', 'Returns NULL', 'Stack Underflow error', 'Returns the last pushed element'],
		correct: 2,
		explanation: 'Popping from an empty stack is called Stack Underflow. There\'s nothing to remove. A good implementation should check isEmpty() before popping.'
	},
	{
		question: 'What happens when you push onto a full array-based stack?',
		options: ['It resizes automatically', 'Stack Overflow error', 'The bottom element is removed', 'Nothing happens'],
		correct: 1,
		explanation: 'An array-based stack has fixed capacity. Pushing when top == capacity-1 causes Stack Overflow. Linked list stacks don\'t have this problem.'
	},
	{
		question: 'In an array-based stack, `top` is initialized to:',
		options: ['0', '1', '-1', 'capacity - 1'],
		correct: 2,
		explanation: 'top = -1 indicates an empty stack. After the first push, top becomes 0. The element is at arr[0]. This convention makes isEmpty() simply check top == -1.'
	},
	{
		question: 'In a linked list stack, push is equivalent to:',
		options: ['Insert at tail', 'Insert at head', 'Insert at middle', 'Insert sorted'],
		correct: 1,
		explanation: 'Push = insert at head of linked list. The new node becomes the top. Pop = delete from head. Both are O(1) without needing to traverse.'
	},
	{
		question: 'Which expression type needs NO parentheses and NO precedence rules?',
		options: ['Infix', 'Postfix', 'Both need them', 'Neither needs them'],
		correct: 1,
		explanation: 'Postfix (Reverse Polish Notation) is unambiguous without parentheses or precedence rules. The order of operators and operands alone determines evaluation. That\'s why computers prefer it.'
	},
	{
		question: 'The postfix of "A + B * C" is:',
		options: ['AB+C*', 'ABC*+', 'ABC+*', '+A*BC'],
		correct: 1,
		explanation: '* has higher precedence than +, so B*C is computed first. Postfix: A, B, C pushed, then * (B*C), then + (A + result). → ABC*+'
	},
	{
		question: 'The postfix of "(A + B) * C" is:',
		options: ['ABC*+', 'AB+C*', 'A+BC*', '*+ABC'],
		correct: 1,
		explanation: 'Parentheses force A+B first. Postfix: A, B, + (A+B), C, * (result*C). → AB+C*'
	},
	{
		question: 'To evaluate postfix "2 3 * 5 +", the answer is:',
		options: ['25', '11', '16', '30'],
		correct: 1,
		explanation: 'Push 2, push 3. See *: pop 3,2 → 2*3=6, push 6. Push 5. See +: pop 5,6 → 6+5=11, push 11. Answer = 11.'
	},
	{
		question: 'In infix to postfix conversion, when you encounter a closing parenthesis ")", you:',
		options: [
			'Push it onto the stack',
			'Pop and output until you find the matching "("',
			'Ignore it',
			'Output it directly'
		],
		correct: 1,
		explanation: 'On ")", pop operators from the stack and add to output until "(" is found. Then discard the "(". Parentheses are consumed during conversion — they don\'t appear in postfix.'
	},
	{
		question: 'In infix to postfix, when the current operator has LOWER precedence than the stack top:',
		options: [
			'Push current operator immediately',
			'Pop the stack top to output, then compare again',
			'Discard the current operator',
			'Reverse the stack'
		],
		correct: 1,
		explanation: 'If the incoming operator has lower or equal precedence, pop the stack top to output (it should be evaluated first). Repeat until stack top has lower precedence or stack is empty, then push incoming.'
	},
	{
		question: 'The parenthesis matching algorithm uses a stack. What does it push?',
		options: [
			'All characters',
			'Only opening brackets',
			'Only closing brackets',
			'Only operators'
		],
		correct: 1,
		explanation: 'Only opening brackets ( [ { are pushed. When a closing bracket is encountered, pop and check if it matches. If mismatch or stack empty → unbalanced.'
	},
	{
		question: '"([)]" is:',
		options: ['Balanced', 'Not balanced — mismatched nesting', 'Valid but unusual', 'A syntax error only in C++'],
		correct: 1,
		explanation: '"([)]" is NOT balanced. The [ opens inside (, but ] closes before ) does. Correct nesting would be "([])". The stack detects this: pop [ when seeing ), but [ ≠ ) → fail.'
	},
	{
		question: 'The Next Greater Element problem is solved in O(n) using:',
		options: [
			'Binary search',
			'A stack — traverse right to left, pop smaller elements',
			'Two nested loops',
			'A queue'
		],
		correct: 1,
		explanation: 'Traverse right to left. For each element, pop all smaller elements from the stack. The stack top (if exists) is the next greater element. Push current. Each element is pushed and popped at most once → O(n).'
	},
	{
		question: 'The Stock Span problem finds for each day:',
		options: [
			'The maximum price',
			'How many consecutive previous days had price ≤ today',
			'The next day with higher price',
			'The average price'
		],
		correct: 1,
		explanation: 'Stock span counts consecutive days (going backwards) where the price was ≤ today\'s price. Solved with a stack of indices in O(n).'
	},
	{
		question: 'Which of these is NOT a typical stack application?',
		options: [
			'Function call management (call stack)',
			'BFS (Breadth-First Search)',
			'Undo/Redo in editors',
			'Expression evaluation'
		],
		correct: 1,
		explanation: 'BFS uses a QUEUE (FIFO), not a stack. DFS uses a stack (or recursion, which is an implicit stack). Function calls, undo, and expression evaluation all use stacks.'
	},
	{
		question: 'To implement two stacks in one array, the efficient approach is:',
		options: [
			'Split the array in half',
			'Stack 1 grows from left, Stack 2 grows from right',
			'Use odd indices for one, even for the other',
			'Alternate elements between stacks'
		],
		correct: 1,
		explanation: 'Stack 1 starts at index 0 and grows right. Stack 2 starts at index n-1 and grows left. They share the space efficiently — overflow only when they meet in the middle.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
