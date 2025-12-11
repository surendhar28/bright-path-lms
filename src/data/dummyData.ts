// Dummy credentials shown on login page
export const CREDENTIALS = {
  learner: { email: "learner@example.com", password: "123456" },
  admin: { email: "admin@example.com", password: "admin123" },
};

// User profiles
export const users = {
  learner: {
    id: "u1",
    name: "Jordan Blake",
    email: "learner@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "learner",
    department: "Computer Science",
    section: "CS-A",
    joinedDate: "2024-01-15",
    streak: 5,
    totalCoins: 125,
    averageScore: 92,
    coursesCompleted: 5,
    highestQuizScore: 98,
    skills: ["Python", "JavaScript", "SQL", "Cybersecurity", "Data Structures"],
  },
  admin: {
    id: "a1",
    name: "Dr. Sarah Mitchell",
    email: "admin@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    role: "admin",
    department: "Computer Science",
    designation: "Senior Professor",
  },
};

// Course categories/domains
export const domains = [
  { id: "cybersecurity", name: "Cybersecurity", color: "purple", icon: "Shield" },
  { id: "python", name: "Python", color: "blue", icon: "Code" },
  { id: "java", name: "Java", color: "pink", icon: "Coffee" },
  { id: "cpp", name: "C++", color: "green", icon: "Terminal" },
  { id: "sql", name: "SQL", color: "teal", icon: "Database" },
  { id: "dsa", name: "DSA", color: "yellow", icon: "GitBranch" },
  { id: "design", name: "Design", color: "pink", icon: "Palette" },
  { id: "web", name: "Web Development", color: "blue", icon: "Globe" },
];

// Courses data
export const courses = [
  {
    id: "c1",
    title: "Introduction to Cybersecurity",
    domain: "cybersecurity",
    description: "Learn the fundamentals of cybersecurity including threat analysis, network security, and ethical hacking basics.",
    duration: "8 hours",
    level: "Beginner",
    instructor: "Dr. Sarah Mitchell",
    rating: 4.8,
    enrolledCount: 1250,
    isPremium: false,
    price: 0,
    progress: 23,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop",
    gradient: "gradient-card-purple",
    learningOutcomes: [
      "Understand core cybersecurity concepts and CIA triad",
      "Identify common web vulnerabilities",
      "Perform basic penetration testing",
      "Implement security best practices",
    ],
    topics: [
      {
        id: "t1",
        title: "Basics of Cybersecurity",
        duration: "2h 30m",
        completed: true,
        subtopics: [
          { id: "s1", title: "What is Cybersecurity?", type: "reading", duration: "15m", completed: true },
          { id: "s2", title: "CIA Triad Explained", type: "video", duration: "25m", completed: true },
          { id: "s3", title: "Real-world Attack Scenarios", type: "video", duration: "30m", completed: true },
          { id: "s4", title: "Topic Mini-Quiz", type: "quiz", duration: "10m", completed: true, questions: 5 },
        ],
      },
      {
        id: "t2",
        title: "Web Attacks",
        duration: "3h",
        completed: false,
        subtopics: [
          { id: "s5", title: "SQL Injection Basics", type: "reading", duration: "20m", completed: true },
          { id: "s6", title: "DVWA Walkthrough", type: "video", duration: "45m", completed: false },
          { id: "s7", title: "BurpSuite Tutorial", type: "video", duration: "40m", completed: false },
          { id: "s8", title: "Topic Mini-Quiz", type: "quiz", duration: "10m", completed: false, questions: 5 },
        ],
      },
      {
        id: "t3",
        title: "Networking Essentials",
        duration: "2h 30m",
        completed: false,
        subtopics: [
          { id: "s9", title: "Protocol Overview", type: "reading", duration: "25m", completed: false },
          { id: "s10", title: "Packet Capture Demo", type: "video", duration: "35m", completed: false },
          { id: "s11", title: "Topic Mini-Quiz", type: "quiz", duration: "10m", completed: false, questions: 5 },
        ],
      },
    ],
  },
  {
    id: "c2",
    title: "English for IT",
    domain: "web",
    description: "Master technical English communication for the IT industry.",
    duration: "6 hours",
    level: "Beginner",
    instructor: "Prof. Emma Wilson",
    rating: 4.7,
    enrolledCount: 890,
    isPremium: false,
    price: 0,
    progress: 96,
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=200&fit=crop",
    gradient: "gradient-card-green",
    learningOutcomes: ["Technical writing", "Presentation skills", "Documentation"],
    topics: [],
  },
  {
    id: "c3",
    title: "App Design",
    domain: "design",
    description: "Create beautiful and functional mobile app designs.",
    duration: "10 hours",
    level: "Intermediate",
    instructor: "Jane Cooper",
    rating: 4.9,
    enrolledCount: 2100,
    isPremium: false,
    price: 0,
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    gradient: "gradient-card-teal",
    learningOutcomes: ["UI/UX principles", "Figma mastery", "Prototyping"],
    topics: [],
  },
  {
    id: "c4",
    title: "Design Management",
    domain: "design",
    description: "Lead design teams and manage creative projects effectively.",
    duration: "12 hours",
    level: "Advanced",
    instructor: "Michael Chen",
    rating: 4.6,
    enrolledCount: 650,
    isPremium: true,
    price: 49,
    progress: 10,
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop",
    gradient: "gradient-card-yellow",
    learningOutcomes: ["Team leadership", "Project management", "Design systems"],
    topics: [],
  },
  {
    id: "c5",
    title: "Python for Data Science",
    domain: "python",
    description: "Master Python programming for data analysis and machine learning.",
    duration: "15 hours",
    level: "Intermediate",
    instructor: "Dr. Alan Turing",
    rating: 4.9,
    enrolledCount: 3500,
    isPremium: true,
    price: 79,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop",
    gradient: "gradient-card-blue",
    learningOutcomes: ["NumPy & Pandas", "Data visualization", "ML basics"],
    topics: [],
  },
  {
    id: "c6",
    title: "Full-Stack Advanced",
    domain: "web",
    description: "Build complete web applications from frontend to backend.",
    duration: "20 hours",
    level: "Advanced",
    instructor: "Prof. John Smith",
    rating: 4.8,
    enrolledCount: 1800,
    isPremium: true,
    price: 99,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
    gradient: "gradient-card-pink",
    learningOutcomes: ["React/Next.js", "Node.js", "Database design"],
    topics: [],
  },
];

// Reading content for courses
export const readingContent = {
  s1: {
    title: "What is Cybersecurity?",
    content: `
## Introduction to Cybersecurity

Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.

### Why is Cybersecurity Important?

In today's connected world, everyone benefits from advanced cyber defense programs. At an individual level, a cybersecurity attack can result in everything from identity theft to extortion attempts, to the loss of important data like family photos.

### Key Concepts

**1. Threat Actors**
- Hackers (White hat, Black hat, Grey hat)
- Nation-states
- Organized crime groups
- Insider threats

**2. Attack Vectors**
- Phishing emails
- Malware distribution
- Social engineering
- Network exploitation

**3. Defense Mechanisms**
- Firewalls
- Intrusion Detection Systems (IDS)
- Encryption
- Access controls

### The Security Mindset

Thinking like a defender means understanding:
- What assets need protection
- Who might want to attack them
- How attacks might be carried out
- What controls can prevent or detect attacks
    `,
  },
  s5: {
    title: "SQL Injection Basics",
    content: `
## SQL Injection Fundamentals

SQL injection is a code injection technique that exploits security vulnerabilities in an application's database layer. It occurs when user input is incorrectly filtered or not strongly typed.

### How SQL Injection Works

When a web application uses user-supplied data in SQL queries without proper sanitization:

\`\`\`sql
-- Vulnerable query
SELECT * FROM users WHERE username = '$username' AND password = '$password'

-- Malicious input
username: admin'--
password: anything

-- Resulting query
SELECT * FROM users WHERE username = 'admin'--' AND password = 'anything'
\`\`\`

### Types of SQL Injection

**1. In-band SQLi (Classic)**
- Error-based SQLi
- Union-based SQLi

**2. Inferential SQLi (Blind)**
- Boolean-based blind
- Time-based blind

**3. Out-of-band SQLi**
- DNS exfiltration
- HTTP requests

### Prevention Techniques

1. **Parameterized Queries**
\`\`\`python
cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
\`\`\`

2. **Input Validation**
3. **Least Privilege Principle**
4. **Web Application Firewalls**
    `,
  },
};

// Quiz questions for courses
export const quizQuestions = {
  s4: [
    {
      id: "q1",
      question: "What does CIA stand for in cybersecurity?",
      options: [
        "Central Intelligence Agency",
        "Confidentiality, Integrity, Availability",
        "Computer Information Architecture",
        "Cyber Intelligence Analysis",
      ],
      correct: 1,
      difficulty: "easy",
      explanation: "CIA Triad represents the three core principles of information security.",
    },
    {
      id: "q2",
      question: "Which type of hacker operates with malicious intent?",
      options: ["White hat", "Black hat", "Grey hat", "Blue hat"],
      correct: 1,
      difficulty: "easy",
      explanation: "Black hat hackers exploit vulnerabilities for personal gain or malicious purposes.",
    },
    {
      id: "q3",
      question: "What is social engineering?",
      options: [
        "Building social media platforms",
        "Psychological manipulation to gain information",
        "Engineering social networks",
        "Creating fake social profiles",
      ],
      correct: 1,
      difficulty: "medium",
      explanation: "Social engineering involves manipulating people into divulging confidential information.",
    },
    {
      id: "q4",
      question: "Which protocol is used for secure web browsing?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correct: 2,
      difficulty: "easy",
      explanation: "HTTPS (HTTP Secure) encrypts data between browser and server using TLS/SSL.",
    },
    {
      id: "q5",
      question: "What is a zero-day vulnerability?",
      options: [
        "A vulnerability discovered on day zero of software release",
        "A vulnerability unknown to the software vendor",
        "A vulnerability that takes zero days to exploit",
        "A vulnerability in day-trading software",
      ],
      correct: 1,
      difficulty: "hard",
      explanation: "Zero-day vulnerabilities are unknown to those who should be interested in mitigating them.",
    },
  ],
};

// Practice problems for coding
export const practiceProblems = [
  {
    id: "p1",
    title: "Two Sum",
    difficulty: "Easy",
    domain: "dsa",
    subdomain: "Arrays",
    acceptance: 49.2,
    submissions: 12500000,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Your code here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
    }
};`,
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
  },
  {
    id: "p2",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    domain: "dsa",
    subdomain: "DP",
    acceptance: 36.8,
    submissions: 4302348,
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.`,
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: "",
      },
    ],
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
    starterCode: {
      python: `def longestPalindrome(s):
    # Your code here
    pass`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Your code here
    }
};`,
    },
    testCases: [
      { input: ["babad"], expected: "bab" },
      { input: ["cbbd"], expected: "bb" },
    ],
  },
  {
    id: "p3",
    title: "Valid Parentheses",
    difficulty: "Easy",
    domain: "dsa",
    subdomain: "Stacks",
    acceptance: 42.5,
    submissions: 8900000,
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      { input: 's = "()"', output: "true", explanation: "" },
      { input: 's = "()[]{}"', output: "true", explanation: "" },
      { input: 's = "(]"', output: "false", explanation: "" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    starterCode: {
      python: `def isValid(s):
    # Your code here
    pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
    }
};`,
    },
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
    ],
  },
];

// DSA subdomains
export const dsaSubdomains = [
  "Arrays",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Hash Tables",
  "Trees",
  "Heaps",
  "Graphs",
  "Tries",
  "DSU",
  "Sorting",
  "Searching",
  "Recursion",
  "DP",
  "Greedy",
  "DFS",
  "BFS",
  "Dijkstra",
  "Bellman-Ford",
  "Floyd-Warshall",
  "Prim",
  "Kruskal",
  "Two Pointers",
  "Sliding Window",
  "Prefix Sums",
  "Bit Manipulation",
  "Number Theory",
  "Backtracking",
  "Divide & Conquer",
];

// Certificates
export const certificates = [
  {
    id: "cert1",
    title: "Introduction to IT Fundamentals",
    issueDate: "2023-10-15",
    certificateId: "IT-2023-00023",
    instructor: "Dr. Sarah Mitchell",
  },
  {
    id: "cert2",
    title: "Basics of Design Principles – Beginner",
    issueDate: "2023-10-01",
    certificateId: "BDP-2023-00033",
    instructor: "Jane Cooper",
  },
];

// Exams data
export const exams = [
  {
    id: "e1",
    title: "Cybersecurity Fundamentals Assessment",
    course: "Introduction to Cybersecurity",
    duration: 60,
    totalQuestions: 30,
    type: "mixed",
    status: "upcoming",
    scheduledDate: "2024-12-20",
    proctored: true,
  },
  {
    id: "e2",
    title: "Python Programming Test",
    course: "Python for Data Science",
    duration: 45,
    totalQuestions: 25,
    type: "mcq",
    status: "completed",
    score: 88,
    completedDate: "2024-12-05",
    proctored: false,
  },
  {
    id: "e3",
    title: "DSA Coding Challenge",
    course: "Data Structures & Algorithms",
    duration: 90,
    totalQuestions: 5,
    type: "coding",
    status: "completed",
    score: 92,
    completedDate: "2024-11-28",
    proctored: true,
  },
];

// MCQ exam questions
export const examQuestions = [
  {
    id: "eq1",
    section: "Aptitude",
    question: "In a certain school, 20% of students are below 8 years of age. The number of students above 8 years of age is 2/3 of the number of students of 8 years of age which is 48. What is the total number of students in the school?",
    options: ["72", "80", "120", "150", "100"],
    correct: 2,
    marks: 1,
  },
  {
    id: "eq2",
    section: "Aptitude",
    question: "If 6 workers can complete a job in 8 days, how many workers are needed to complete the same job in 4 days?",
    options: ["10", "12", "14", "16"],
    correct: 1,
    marks: 1,
  },
  {
    id: "eq3",
    section: "Aptitude",
    question: "A train travels at 60 km/h. How long will it take to travel 180 km?",
    options: ["2 hours", "3 hours", "4 hours", "5 hours"],
    correct: 1,
    marks: 1,
  },
  {
    id: "eq4",
    section: "Verbal",
    question: 'Choose the correct synonym for "Ephemeral":',
    options: ["Permanent", "Transient", "Eternal", "Constant"],
    correct: 1,
    marks: 1,
  },
  {
    id: "eq5",
    section: "Verbal",
    question: "Select the grammatically correct sentence:",
    options: [
      "Neither of the boys have done their homework",
      "Neither of the boys has done his homework",
      "Neither of the boys has done their homework",
      "Neither of the boys have done his homework",
    ],
    correct: 1,
    marks: 1,
  },
];

// Admin - Students list
export const students = [
  { id: "STU001", name: "Jordan Blake", email: "jordan@example.com", department: "Computer Science", section: "CS-A", progress: 78 },
  { id: "STU002", name: "Emma Wilson", email: "emma@example.com", department: "Computer Science", section: "CS-A", progress: 92 },
  { id: "STU003", name: "Michael Chen", email: "michael@example.com", department: "Computer Science", section: "CS-B", progress: 65 },
  { id: "STU004", name: "Sarah Johnson", email: "sarah@example.com", department: "Information Technology", section: "IT-A", progress: 88 },
  { id: "STU005", name: "David Kim", email: "david@example.com", department: "Information Technology", section: "IT-A", progress: 71 },
  { id: "STU006", name: "Lisa Anderson", email: "lisa@example.com", department: "Computer Science", section: "CS-B", progress: 95 },
  { id: "STU007", name: "James Brown", email: "james@example.com", department: "Information Technology", section: "IT-B", progress: 82 },
  { id: "STU008", name: "Emily Davis", email: "emily@example.com", department: "Computer Science", section: "CS-A", progress: 76 },
];

// Psychometric data
export const psychometricData = {
  logicalReasoning: 85,
  verbalAbility: 78,
  codingAptitude: 92,
  problemSolving: 88,
  analyticalThinking: 82,
  creativity: 75,
  personality: {
    openness: 85,
    conscientiousness: 78,
    extraversion: 65,
    agreeableness: 82,
    neuroticism: 35,
  },
  cognitiveHeatmap: [
    [85, 78, 92, 88],
    [82, 75, 80, 85],
    [90, 88, 95, 82],
    [78, 82, 85, 90],
  ],
  insights: [
    "Strong analytical and problem-solving capabilities",
    "Above average coding aptitude - consider advanced programming courses",
    "Communication skills could be improved with practice",
    "High potential for technical leadership roles",
  ],
};

// Project templates
export const projectTemplates = [
  {
    id: "proj1",
    title: "Data Analysis with Python",
    description: "Analyze a dataset using pandas, matplotlib, and seaborn.",
    cells: [
      { id: "c1", type: "markdown", content: "# Data Analysis Project\n\nIn this project, we will analyze a sample dataset." },
      { id: "c2", type: "code", content: "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Load sample data\ndata = pd.DataFrame({\n    'x': range(10),\n    'y': [2, 4, 5, 4, 5, 6, 7, 8, 9, 10]\n})\nprint(data.head())" },
      { id: "c3", type: "markdown", content: "## Visualization\n\nLet's create a simple plot of our data." },
      { id: "c4", type: "code", content: "plt.figure(figsize=(10, 6))\nplt.plot(data['x'], data['y'], marker='o')\nplt.title('Sample Data Visualization')\nplt.xlabel('X Values')\nplt.ylabel('Y Values')\nplt.grid(True)\nplt.show()" },
    ],
  },
];
