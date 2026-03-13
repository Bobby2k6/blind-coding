// C:\Users\lenovo\OneDrive\Bobby\Projects\blind-code-blitz-main\src\data\questions.ts
export interface TestCase {
  input: string;
  output: string;
  hidden: boolean;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  constraints?: string;
  testCases: TestCase[];
}

export interface Pool {
  poolNumber: number;
  questions: Question[];
}

export const pools: Pool[] = [
  {
    poolNumber: 1,
    questions: [
      {
        id: 1,
        title: "Reverse a String",
        description: "Given a string, return the reversed version of it.",
        constraints: "1 ≤ length ≤ 1000",
        testCases: [
          { input: "hello", output: "olleh", hidden: false },
          { input: "code", output: "edoc", hidden: false },
          { input: "a", output: "a", hidden: true },
          { input: "racecar", output: "racecar", hidden: true },
          { input: "OpenAI", output: "IAnepO", hidden: true },
        ],
      },
      {
        id: 2,
        title: "Sum of Digits",
        description: "Given an integer N, return the sum of its digits.",
        constraints: "0 ≤ N ≤ 10^9",
        testCases: [
          { input: "123", output: "6", hidden: false },
          { input: "9999", output: "36", hidden: false },
          { input: "0", output: "0", hidden: true },
          { input: "10", output: "1", hidden: true },
          { input: "5678", output: "26", hidden: true },
        ],
      },
      {
        id: 3,
        title: "Check Palindrome",
        description: "Given a string, check if it is a palindrome. Print 'YES' or 'NO'.",
        constraints: "1 ≤ length ≤ 1000. Input is lowercase.",
        testCases: [
          { input: "madam", output: "YES", hidden: false },
          { input: "hello", output: "NO", hidden: false },
          { input: "a", output: "YES", hidden: true },
          { input: "abba", output: "YES", hidden: true },
          { input: "abc", output: "NO", hidden: true },
        ],
      },
      {
        id: 4,
        title: "Factorial",
        description: "Given N, print the factorial of N.",
        constraints: "0 ≤ N ≤ 20",
        testCases: [
          { input: "5", output: "120", hidden: false },
          { input: "0", output: "1", hidden: false },
          { input: "1", output: "1", hidden: true },
          { input: "10", output: "3628800", hidden: true },
          { input: "7", output: "5040", hidden: true },
        ],
      },
      {
        id: 5,
        title: "Count Vowels",
        description: "Given a string, count the number of vowels (a, e, i, o, u).",
        constraints: "1 ≤ length ≤ 1000. Input is lowercase.",
        testCases: [
          { input: "hello", output: "2", hidden: false },
          { input: "aeiou", output: "5", hidden: false },
          { input: "xyz", output: "0", hidden: true },
          { input: "programming", output: "3", hidden: true },
          { input: "a", output: "1", hidden: true },
        ],
      },
    ],
  },
  {
    poolNumber: 2,
    questions: [
      {
        id: 1,
        title: "Even or Odd",
        description: "Given an integer N, print 'EVEN' if even, 'ODD' if odd.",
        testCases: [
          { input: "4", output: "EVEN", hidden: false },
          { input: "7", output: "ODD", hidden: false },
          { input: "0", output: "EVEN", hidden: true },
          { input: "1", output: "ODD", hidden: true },
          { input: "100", output: "EVEN", hidden: true },
        ],
      },
      {
        id: 2,
        title: "Fibonacci Number",
        description: "Given N, print the Nth Fibonacci number (0-indexed). F(0)=0, F(1)=1.",
        constraints: "0 ≤ N ≤ 30",
        testCases: [
          { input: "6", output: "8", hidden: false },
          { input: "0", output: "0", hidden: false },
          { input: "1", output: "1", hidden: true },
          { input: "10", output: "55", hidden: true },
          { input: "15", output: "610", hidden: true },
        ],
      },
      {
        id: 3,
        title: "Largest of Three",
        description: "Given three integers A, B, C (space-separated), print the largest.",
        testCases: [
          { input: "3 7 5", output: "7", hidden: false },
          { input: "10 10 5", output: "10", hidden: false },
          { input: "1 2 3", output: "3", hidden: true },
          { input: "-1 -2 -3", output: "-1", hidden: true },
          { input: "0 0 0", output: "0", hidden: true },
        ],
      },
      {
        id: 4,
        title: "Count Words",
        description: "Given a sentence, count the number of words. Words are separated by single spaces.",
        testCases: [
          { input: "hello world", output: "2", hidden: false },
          { input: "I love coding", output: "3", hidden: false },
          { input: "single", output: "1", hidden: true },
          { input: "the quick brown fox", output: "4", hidden: true },
          { input: "a b c d e", output: "5", hidden: true },
        ],
      },
      {
        id: 5,
        title: "Power of Two",
        description: "Given N, check if it is a power of 2. Print 'YES' or 'NO'.",
        constraints: "1 ≤ N ≤ 10^9",
        testCases: [
          { input: "8", output: "YES", hidden: false },
          { input: "6", output: "NO", hidden: false },
          { input: "1", output: "YES", hidden: true },
          { input: "1024", output: "YES", hidden: true },
          { input: "100", output: "NO", hidden: true },
        ],
      },
    ],
  },
  {
    poolNumber: 3,
    questions: [
      {
        id: 1,
        title: "Sum of Array",
        description: "Given N followed by N integers, print their sum.",
        testCases: [
          { input: "3\n1 2 3", output: "6", hidden: false },
          { input: "5\n10 20 30 40 50", output: "150", hidden: false },
          { input: "1\n42", output: "42", hidden: true },
          { input: "4\n-1 -2 3 4", output: "4", hidden: true },
          { input: "2\n0 0", output: "0", hidden: true },
        ],
      },
      {
        id: 2,
        title: "String Length",
        description: "Given a string, print its length.",
        testCases: [
          { input: "hello", output: "5", hidden: false },
          { input: "ab", output: "2", hidden: false },
          { input: "a", output: "1", hidden: true },
          { input: "programming", output: "11", hidden: true },
          { input: "contest", output: "7", hidden: true },
        ],
      },
      {
        id: 3,
        title: "Multiplication Table",
        description: "Given N, print its multiplication table from 1 to 5, each on a new line in format 'N x i = result'.",
        testCases: [
          { input: "3", output: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15", hidden: false },
          { input: "1", output: "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5", hidden: false },
          { input: "5", output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25", hidden: true },
          { input: "10", output: "10 x 1 = 10\n10 x 2 = 20\n10 x 3 = 30\n10 x 4 = 40\n10 x 5 = 50", hidden: true },
          { input: "0", output: "0 x 1 = 0\n0 x 2 = 0\n0 x 3 = 0\n0 x 4 = 0\n0 x 5 = 0", hidden: true },
        ],
      },
      {
        id: 4,
        title: "Swap Case",
        description: "Given a string, swap uppercase to lowercase and vice versa.",
        testCases: [
          { input: "Hello", output: "hELLO", hidden: false },
          { input: "aBc", output: "AbC", hidden: false },
          { input: "ABC", output: "abc", hidden: true },
          { input: "123", output: "123", hidden: true },
          { input: "HeLLo WoRLd", output: "hEllO wOrlD", hidden: true },
        ],
      },
      {
        id: 5,
        title: "GCD of Two Numbers",
        description: "Given two integers A and B (space-separated), print their GCD.",
        testCases: [
          { input: "12 8", output: "4", hidden: false },
          { input: "7 3", output: "1", hidden: false },
          { input: "100 25", output: "25", hidden: true },
          { input: "17 17", output: "17", hidden: true },
          { input: "48 18", output: "6", hidden: true },
        ],
      },
    ],
  },
  {
    poolNumber: 4,
    questions: [
      {
        id: 1,
        title: "Prime Check",
        description: "Given N, print 'PRIME' if N is prime, else print 'NOT PRIME'.",
        constraints: "2 ≤ N ≤ 10^6",
        testCases: [
          { input: "7", output: "PRIME", hidden: false },
          { input: "10", output: "NOT PRIME", hidden: false },
          { input: "2", output: "PRIME", hidden: true },
          { input: "1000000", output: "NOT PRIME", hidden: true },
          { input: "97", output: "PRIME", hidden: true },
        ],
      },
      {
        id: 2,
        title: "Remove Duplicates",
        description: "Given a string, remove duplicate characters keeping first occurrence. Print the result.",
        testCases: [
          { input: "programming", output: "progamin", hidden: false },
          { input: "hello", output: "helo", hidden: false },
          { input: "aaa", output: "a", hidden: true },
          { input: "abcabc", output: "abc", hidden: true },
          { input: "unique", output: "uniqe", hidden: true },
        ],
      },
      {
        id: 3,
        title: "Triangle Pattern",
        description: "Given N, print a right triangle of '*' with N rows.",
        testCases: [
          { input: "3", output: "*\n**\n***", hidden: false },
          { input: "1", output: "*", hidden: false },
          { input: "2", output: "*\n**", hidden: true },
          { input: "4", output: "*\n**\n***\n****", hidden: true },
          { input: "5", output: "*\n**\n***\n****\n*****", hidden: true },
        ],
      },
      {
        id: 4,
        title: "Second Largest",
        description: "Given N followed by N distinct integers, print the second largest.",
        constraints: "2 ≤ N ≤ 100",
        testCases: [
          { input: "5\n3 1 4 1 5", output: "4", hidden: false },
          { input: "3\n10 20 30", output: "20", hidden: false },
          { input: "2\n1 2", output: "1", hidden: true },
          { input: "4\n100 50 75 25", output: "75", hidden: true },
          { input: "3\n-1 -2 -3", output: "-2", hidden: true },
        ],
      },
      {
        id: 5,
        title: "Character Frequency",
        description: "Given a lowercase string, print the most frequent character. If tie, print the one that appears first.",
        testCases: [
          { input: "aabbbcc", output: "b", hidden: false },
          { input: "hello", output: "l", hidden: false },
          { input: "a", output: "a", hidden: true },
          { input: "abab", output: "a", hidden: true },
          { input: "zzza", output: "z", hidden: true },
        ],
      },
    ],
  },
];
