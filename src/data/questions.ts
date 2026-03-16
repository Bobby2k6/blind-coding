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
  /* ======================= POOL 1 ======================= */

  {
    poolNumber: 1,
    questions: [
      /* LEVEL 1 */

      {
        id: 1,
        title: "Greeting Printer",
        description: "Read a name and print:\nHello!!, #<name>",
        testCases: [
          { input: "Alex", output: "Hello!!, #Alex", hidden: false },
          { input: "Sam", output: "Hello!!, #Sam", hidden: false },
          { input: "John", output: "Hello!!, #John", hidden: true },
          { input: "Lara", output: "Hello!!, #Lara", hidden: true },
          { input: "Neo", output: "Hello!!, #Neo", hidden: true },
        ],
      },

      /* LEVEL 2 (story based) */

      {
        id: 2,
        title: "Student Average Score",
        description:
          "A student wrote 3 tests. Read three integers (space separated) and print their average.\n\nInput: a b c\nOutput: average",
        testCases: [
          { input: "70 80 90", output: "80", hidden: false },
          { input: "60 60 60", output: "60", hidden: false },
          { input: "10 20 30", output: "20", hidden: true },
          { input: "50 60 70", output: "60", hidden: true },
          { input: "100 90 80", output: "90", hidden: true },
        ],
      },

      /* LEVEL 3 */

      {
        id: 3,
        title: "Circle Area",
        description:
          "A circular park has radius R. Read R and print area.\nUse π = 3.14",
        testCases: [
          { input: "5", output: "78.5", hidden: false },
          { input: "2", output: "12.56", hidden: false },
          { input: "1", output: "3.14", hidden: true },
          { input: "10", output: "314", hidden: false },
          { input: "3", output: "28.26", hidden: true },
        ],
      },

      /* LEVEL 4 */

      {
        id: 4,
        title: "Swap Two Numbers",
        description: "Read two integers A and B.\nPrint them swapped.",
        testCases: [
          { input: "3 5", output: "5 3", hidden: false },
          { input: "10 1", output: "1 10", hidden: false },
          { input: "7 8", output: "8 7", hidden: true },
          { input: "0 4", output: "4 0", hidden: true },
          { input: "9 2", output: "2 9", hidden: true },
        ],
      },

      /* LEVEL 5 */

      {
        id: 5,
        title: "Prime Check",
        description:
          "Read integer N.\nPrint PRIME if N is prime else NOT PRIME.",
        constraints: "1 ≤ N ≤ 10^6",
        testCases: [
          { input: "7", output: "PRIME", hidden: false },
          { input: "8", output: "NOT PRIME", hidden: false },
          { input: "2", output: "PRIME", hidden: true },
          { input: "25", output: "NOT PRIME", hidden: true },
          { input: "97", output: "PRIME", hidden: true },
        ],
      },
    ],
  },

  /* ======================= POOL 2 ======================= */

  {
    poolNumber: 2,
    questions: [
      /* LEVEL 1 */

      {
        id: 1,
        title: "Welcome Message",
        description: "Read a name and print:\nWelcome, $<name>!",
        testCases: [
          { input: "Alice", output: "Welcome, $Alice!", hidden: false },
          { input: "Bob", output: "Welcome, $Bob!", hidden: false },
          { input: "Neo", output: "Welcome, $Neo!", hidden: true },
          { input: "Sam", output: "Welcome, $Sam!", hidden: true },
          { input: "John", output: "Welcome, $John!", hidden: true },
        ],
      },

      /* LEVEL 2 */

      {
        id: 2,
        title: "Chocolate Sharing",
        description:
          "Three friends bought chocolates. Read three integers and print the average chocolates each friend gets.",
        testCases: [
          { input: "3 6 9", output: "6", hidden: false },
          { input: "10 10 10", output: "10", hidden: false },
          { input: "2 4 6", output: "4", hidden: true },
          { input: "8 9 7", output: "8", hidden: true },
          { input: "5 5 5", output: "5", hidden: true },
        ],
      },

      /* LEVEL 3 */

      {
        id: 3,
        title: "Triangle Area",
        description:
          "Read base and height of triangle.\nPrint area = (base * height) / 2",
        testCases: [
          { input: "10 4", output: "20", hidden: false },
          { input: "6 2", output: "6", hidden: false },
          { input: "8 3", output: "12", hidden: true },
          { input: "5 2", output: "5", hidden: true },
          { input: "7 6", output: "21", hidden: true },
        ],
      },

      /* LEVEL 4 */

      {
        id: 4,
        title: "Even or Odd",
        description: "Read integer N.\nPrint EVEN or ODD.",
        testCases: [
          { input: "4", output: "EVEN", hidden: false },
          { input: "9", output: "ODD", hidden: false },
          { input: "0", output: "EVEN", hidden: true },
          { input: "1", output: "ODD", hidden: true },
          { input: "100", output: "EVEN", hidden: true },
        ],
      },

      /* LEVEL 5 */

      {
        id: 5,
        title: "Factorial",
        description: "Read N and print N factorial.",
        constraints: "0 ≤ N ≤ 20",
        testCases: [
          { input: "5", output: "120", hidden: false },
          { input: "3", output: "6", hidden: false },
          { input: "0", output: "1", hidden: true },
          { input: "6", output: "720", hidden: true },
          { input: "7", output: "5040", hidden: true },
        ],
      },
    ],
  },

  /* ======================= POOL 3 ======================= */

  {
    poolNumber: 3,
    questions: [
      {
        id: 1,
        title: "Simple Greeting",
        description: "Read a name and print: Hi!! @<name>",
        testCases: [
          { input: "Tom", output: "Hi!! @Tom", hidden: false },
          { input: "Ana", output: "Hi!! @Ana", hidden: false },
          { input: "Leo", output: "Hi!! @Leo", hidden: true },
          { input: "Max", output: "Hi!! @Max", hidden: true },
          { input: "Ivy", output: "Hi!! @Ivy", hidden: true },
        ],
      },

      {
        id: 2,
        title: "Book Pages Average",
        description:
          "A student reads pages of 3 books. Input three integers and print average pages.",
        testCases: [
          { input: "100 200 300", output: "200", hidden: false },
          { input: "50 50 50", output: "50", hidden: false },
          { input: "10 20 30", output: "20", hidden: true },
          { input: "5 10 15", output: "10", hidden: true },
          { input: "9 9 9", output: "9", hidden: true },
        ],
      },

      {
        id: 3,
        title: "Hours to Minutes",
        description: "Read hours and convert to minutes.",
        testCases: [
          { input: "2", output: "120", hidden: false },
          { input: "5", output: "300", hidden: false },
          { input: "1", output: "60", hidden: true },
          { input: "10", output: "600", hidden: true },
          { input: "3", output: "180", hidden: true },
        ],
      },

      {
        id: 4,
        title: "Maximum of Three",
        description: "Read three integers and print the maximum.",
        testCases: [
          { input: "3 7 5", output: "7", hidden: false },
          { input: "1 2 3", output: "3", hidden: false },
          { input: "9 4 6", output: "9", hidden: true },
          { input: "0 0 0", output: "0", hidden: true },
          { input: "8 2 1", output: "8", hidden: true },
        ],
      },

      {
        id: 5,
        title: "Sum of Digits",
        description: "Read integer N and print sum of digits.",
        testCases: [
          { input: "123", output: "6", hidden: false },
          { input: "999", output: "27", hidden: false },
          { input: "10", output: "1", hidden: true },
          { input: "101", output: "2", hidden: true },
          { input: "5678", output: "26", hidden: true },
        ],
      },
    ],
  },

  /* ======================= POOL 4 ======================= */

  {
    poolNumber: 4,
    questions: [
      {
        id: 1,
        title: "Cool Greeting",
        description: "Read a name and print: Hey!! %<name>",
        testCases: [
          { input: "Sam", output: "Hey!! %Sam", hidden: false },
          { input: "Lily", output: "Hey!! %Lily", hidden: false },
          { input: "Alex", output: "Hey!! %Alex", hidden: true },
          { input: "Noah", output: "Hey!! %Noah", hidden: true },
          { input: "Zoe", output: "Hey!! %Zoe", hidden: true },
        ],
      },

      {
        id: 2,
        title: "Rectangle Perimeter Story",
        description:
          "A farmer built a rectangular field.\nInput length and width.\nPrint perimeter.",
        testCases: [
          { input: "10 5", output: "30", hidden: false },
          { input: "4 4", output: "16", hidden: false },
          { input: "6 3", output: "18", hidden: true },
          { input: "2 8", output: "20", hidden: true },
          { input: "7 1", output: "16", hidden: true },
        ],
      },

      {
        id: 3,
        title: "Minutes to Hours",
        description: "Read minutes and convert to hours.",
        testCases: [
          { input: "120", output: "2", hidden: false },
          { input: "60", output: "1", hidden: false },
          { input: "180", output: "3", hidden: true },
          { input: "240", output: "4", hidden: true },
          { input: "300", output: "5", hidden: true },
        ],
      },

      {
        id: 4,
        title: "Minimum of Three",
        description: "Read three integers and print the minimum.",
        testCases: [
          { input: "3 7 5", output: "3", hidden: false },
          { input: "10 2 9", output: "2", hidden: false },
          { input: "5 5 5", output: "5", hidden: true },
          { input: "9 1 4", output: "1", hidden: true },
          { input: "6 7 8", output: "6", hidden: true },
        ],
      },

      {
        id: 5,
        title: "Print Primes upto N",
        description:
          "Read N and print all prime numbers from 2 to N (inclusive).\nSeparate by space.",
        testCases: [
          { input: "10", output: "2 3 5 7", hidden: false },
          { input: "5", output: "2 3 5", hidden: false },
          { input: "2", output: "2", hidden: true },
          { input: "3", output: "2 3", hidden: true },
          { input: "7", output: "2 3 5 7", hidden: true },
        ],
      },
    ],
  },
];
