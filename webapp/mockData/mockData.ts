export interface Book {
  id: string
  title: string
  author: string
  cover: string
  description: string
  genre: string
  rating: number
  questionCount: number
}

export interface Question {
  id: string
  bookId: string
  userId: string
  userName: string
  userAvatar: string
  title: string
  content: string
  votes: number
  answerCount: number
  views: number
  tags: string[]
  createdAt: string
}

export interface Answer {
  id: string
  questionId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  votes: number
  isAccepted: boolean
  createdAt: string
}

export interface User {
  id: string
  name: string
  avatar: string
  bio: string
  reputation: number
  questionsAsked: number
  answersGiven: number
  joinedDate: string
  badges: string[]
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/great-gatsby-book-cover.png",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    genre: "Classic Literature",
    rating: 4.5,
    questionCount: 234,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    cover: "/1984-book-cover-dystopian.jpg",
    description: "A dystopian social science fiction novel and cautionary tale about totalitarianism.",
    genre: "Science Fiction",
    rating: 4.7,
    questionCount: 567,
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/to-kill-a-mockingbird-cover.png",
    description: "A novel about racial injustice and childhood innocence in the American South.",
    genre: "Classic Literature",
    rating: 4.8,
    questionCount: 423,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/pride-and-prejudice-cover.png",
    description: "A romantic novel of manners that critiques the British landed gentry at the end of the 18th century.",
    genre: "Romance",
    rating: 4.6,
    questionCount: 389,
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "/the-hobbit-book-cover-fantasy.jpg",
    description: "A fantasy novel about the quest of home-loving Bilbo Baggins to win a share of treasure.",
    genre: "Fantasy",
    rating: 4.7,
    questionCount: 678,
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "/catcher-in-the-rye-cover.png",
    description: "A story about teenage rebellion and alienation narrated by Holden Caulfield.",
    genre: "Classic Literature",
    rating: 4.2,
    questionCount: 312,
  },
]

export const mockQuestions: Question[] = [
  {
    id: "1",
    bookId: "1",
    userId: "1",
    userName: "Sarah Johnson",
    userAvatar: "/diverse-woman-avatar.png",
    title: "What does the green light symbolize in The Great Gatsby?",
    content:
      "I've read the book twice and I keep seeing references to the green light at the end of Daisy's dock. What is Fitzgerald trying to convey with this symbol?",
    votes: 45,
    answerCount: 8,
    views: 1234,
    tags: ["symbolism", "themes", "analysis"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    bookId: "1",
    userId: "2",
    userName: "Michael Chen",
    userAvatar: "/man-avatar.png",
    title: "Why is Nick Carraway considered an unreliable narrator?",
    content: "Many critics say Nick is unreliable. What evidence supports this interpretation?",
    votes: 32,
    answerCount: 5,
    views: 892,
    tags: ["narrator", "character-analysis"],
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    bookId: "2",
    userId: "3",
    userName: "Emma Davis",
    userAvatar: "/professional-woman-avatar.png",
    title: "How does Newspeak control thought in 1984?",
    content: "Can someone explain the relationship between language and thought control in Orwell's dystopia?",
    votes: 67,
    answerCount: 12,
    views: 2341,
    tags: ["language", "themes", "dystopia"],
    createdAt: "2024-01-13",
  },
]

export const mockAnswers: Answer[] = [
  {
    id: "1",
    questionId: "1",
    userId: "4",
    userName: "Dr. James Wilson",
    userAvatar: "/professor-avatar.png",
    content:
      "The green light is one of the most important symbols in the novel. It represents Gatsby's hopes and dreams for the future, particularly his desire to reunite with Daisy. The light is located at the end of Daisy's dock, symbolizing how his dream is always just out of reach, visible but unattainable. It also represents the broader American Dream - the idea that anyone can achieve their goals through hard work, but the reality is often more complex and elusive.",
    votes: 89,
    isAccepted: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    questionId: "1",
    userId: "5",
    userName: "Literary Scholar",
    userAvatar: "/scholar-avatar.jpg",
    content:
      "Building on the previous answer, the green light also symbolizes money and materialism. Green is the color of money, and Gatsby's pursuit of wealth is ultimately in service of winning Daisy back. The fact that the light is green connects his romantic dream with the corrupting influence of wealth.",
    votes: 34,
    isAccepted: false,
    createdAt: "2024-01-15",
  },
]

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/diverse-woman-avatar.png",
    bio: "Literature enthusiast with a passion for classic novels and contemporary fiction. Always eager to discuss symbolism and themes.",
    reputation: 2847,
    questionsAsked: 23,
    answersGiven: 156,
    joinedDate: "2023-03-15",
    badges: ["Top Contributor", "Helpful", "Scholar"],
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/man-avatar.png",
    bio: "PhD student in English Literature. Specializing in 20th century American novels.",
    reputation: 1923,
    questionsAsked: 45,
    answersGiven: 89,
    joinedDate: "2023-06-20",
    badges: ["Curious Mind", "Active Member"],
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "/professional-woman-avatar.png",
    bio: "Book club organizer and avid reader. Love discussing dystopian fiction and science fiction.",
    reputation: 3421,
    questionsAsked: 67,
    answersGiven: 234,
    joinedDate: "2022-11-08",
    badges: ["Top Contributor", "Helpful", "Dedicated", "Scholar"],
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    avatar: "/professor-avatar.png",
    bio: "Professor of English Literature with 20 years of teaching experience. Passionate about helping students understand classic literature.",
    reputation: 8956,
    questionsAsked: 12,
    answersGiven: 567,
    joinedDate: "2022-01-10",
    badges: ["Expert", "Top Contributor", "Mentor", "Scholar", "Dedicated"],
  },
]