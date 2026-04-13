import Theory from './cpp-essentials-theory.svelte';
import Practice from './cpp-essentials-practice.svelte';
import Quiz from '$lib/components/Quiz.svelte';

const quiz = [
	{
		question: 'What is the index of the first element in a C++ array?',
		options: ['1', '0', '-1', 'Depends on the compiler'],
		correct: 1,
		explanation: 'C++ arrays are 0-indexed. The first element is always at index 0.'
	},
	{
		question: 'What happens when you declare `int A[5];` without initialization?',
		options: [
			'All elements are 0',
			'All elements are -1',
			'Elements contain garbage (undefined) values',
			'Compilation error'
		],
		correct: 2,
		explanation: 'Uninitialized local arrays contain garbage values. Only global/static arrays are zero-initialized.'
	},
	{
		question: 'Given `int A[5] = {1, 2};`, what is A[3]?',
		options: ['Garbage value', '0', '2', 'Compilation error'],
		correct: 1,
		explanation: 'When partially initialized, remaining elements are automatically set to 0.'
	},
	{
		question: 'What is the purpose of padding in structures?',
		options: [
			'To make the structure look bigger',
			'To align members to memory boundaries for faster access',
			'To add security',
			'Padding does not exist in C++'
		],
		correct: 1,
		explanation: 'The compiler adds padding bytes to align structure members to word boundaries (typically 4 or 8 bytes) for efficient memory access.'
	},
	{
		question: 'What does the `&` operator do when used with a variable like `&x`?',
		options: [
			'Dereferences the pointer',
			'Returns the memory address of x',
			'Creates a reference to x',
			'Performs bitwise AND'
		],
		correct: 1,
		explanation: 'The unary & operator returns the memory address of a variable. In declarations like `int &ref = x`, it creates a reference.'
	},
	{
		question: 'What is a dangling pointer?',
		options: [
			'A pointer that points to NULL',
			'A pointer that was never initialized',
			'A pointer that points to freed/deallocated memory',
			'A pointer to a local variable'
		],
		correct: 2,
		explanation: 'A dangling pointer occurs when the memory it points to has been freed (via delete/free), but the pointer still holds the old address.'
	},
	{
		question: 'Which statement about C++ references is FALSE?',
		options: [
			'A reference must be initialized at declaration',
			'A reference can be reassigned to another variable',
			'A reference cannot be null',
			'A reference shares the same address as the original variable'
		],
		correct: 1,
		explanation: 'Once a reference is initialized to a variable, it CANNOT be reassigned to refer to a different variable. This is a key difference from pointers.'
	},
	{
		question: 'How do you access a structure member through a pointer?',
		options: [
			'p.member',
			'p->member',
			'*p.member',
			'p::member'
		],
		correct: 1,
		explanation: 'The arrow operator (->) is used to access structure members through a pointer. p->member is equivalent to (*p).member.'
	},
	{
		question: 'In pass by value, what happens to the original variable when the function modifies the parameter?',
		options: [
			'The original is modified',
			'The original is NOT modified — only the copy changes',
			'It depends on the data type',
			'Compilation error'
		],
		correct: 1,
		explanation: 'Pass by value creates a copy of the argument. Any changes inside the function affect only the copy, not the original.'
	},
	{
		question: 'When an array is passed to a function in C++, it is passed as:',
		options: [
			'A copy of the entire array (by value)',
			'A pointer to the first element',
			'A reference to the array',
			'It cannot be passed to a function'
		],
		correct: 1,
		explanation: 'Arrays "decay" into a pointer to their first element when passed to a function. This is why modifications inside the function affect the original array.'
	},
	{
		question: 'What is wrong with this code?\n`int* getArray() { int A[5] = {1,2,3,4,5}; return A; }`',
		options: [
			'Nothing, it works fine',
			'Returns pointer to local stack memory (dangling pointer)',
			'Syntax error',
			'Array cannot be returned'
		],
		correct: 1,
		explanation: 'Local array A is on the stack and is destroyed when the function returns. The returned pointer becomes dangling. Use heap allocation (new) instead.'
	},
	{
		question: 'What are the three access specifiers in a C++ class?',
		options: [
			'open, closed, restricted',
			'public, private, protected',
			'global, local, static',
			'read, write, execute'
		],
		correct: 1,
		explanation: 'C++ classes have three access specifiers: public (accessible everywhere), private (only within the class), and protected (within the class and derived classes).'
	},
	{
		question: 'A constructor in C++ has:',
		options: [
			'The same name as the class and a void return type',
			'The same name as the class and no return type',
			'Any name and no return type',
			'The same name as the class and returns an object'
		],
		correct: 1,
		explanation: 'A constructor has the same name as the class and NO return type (not even void). It is automatically called when an object is created.'
	},
	{
		question: 'What does `template <class T>` do?',
		options: [
			'Creates a new class called T',
			'Makes the function/class generic — T is replaced by the actual type at compile time',
			'Inherits from class T',
			'Declares an abstract class'
		],
		correct: 1,
		explanation: 'Templates enable generic programming. T is a placeholder type that is replaced by the actual type (int, float, string, etc.) when the template is instantiated.'
	},
	{
		question: 'Given `int *p = new int[10];`, which is the correct way to free this memory?',
		options: [
			'delete p;',
			'delete[] p;',
			'free(p);',
			'Both A and B'
		],
		correct: 1,
		explanation: 'Memory allocated with new[] must be freed with delete[]. Using delete (without []) for an array is undefined behavior.'
	},
	{
		question: 'What is the size of ANY pointer on a 64-bit system?',
		options: [
			'Depends on the data type it points to',
			'4 bytes',
			'8 bytes',
			'2 bytes'
		],
		correct: 2,
		explanation: 'On a 64-bit system, all pointers are 8 bytes regardless of what they point to (int*, char*, double*, struct* are all 8 bytes).'
	},
	{
		question: 'Which is the most efficient way to pass a large structure to a function that only reads it?',
		options: [
			'Pass by value',
			'Pass by pointer',
			'Pass by const reference',
			'Pass by global variable'
		],
		correct: 2,
		explanation: 'const reference avoids copying (efficient) and prevents modification (safe). This is the standard C++ idiom for read-only access to large objects.'
	},
	{
		question: 'What does an initializer list do in a constructor?\n`Rectangle(int l, int b) : length(l), breadth(b) {}`',
		options: [
			'Assigns values after the object is created',
			'Initializes members directly during construction (more efficient)',
			'Creates a list of initial values',
			'It is the same as assignment in the constructor body'
		],
		correct: 1,
		explanation: 'Initializer lists initialize members at construction time, before the body executes. They are more efficient (avoid default-construct-then-assign) and required for const members and references.'
	}
];

export default {
	theory: Theory,
	practice: Practice,
	quiz,
	quizComponent: Quiz
};
