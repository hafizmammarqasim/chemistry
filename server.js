import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import morgan from 'morgan';

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sample Q&A data
const questionsAnswers = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "The capital of France is Paris, known as the 'City of Light' and famous for the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral."
  },
  {
    id: 2,
    question: "How does photosynthesis work?",
    answer: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water. During this process, plants capture light energy and convert it into chemical energy stored in glucose, releasing oxygen as a byproduct."
  },
  {
    id: 3,
    question: "What are the main principles of design?",
    answer: "The main principles of design include balance, contrast, emphasis, proportion, hierarchy, repetition, rhythm, pattern, white space, movement, variety, and unity. These principles guide designers in creating visually appealing and effective compositions."
  },
  {
    id: 4,
    question: "How does cloud computing work?",
    answer: "Cloud computing works by enabling on-demand access to shared computing resources (like servers, storage, databases, networking, software) over the internet. Instead of owning and maintaining physical infrastructure, users can rent access to applications and storage from a cloud service provider, paying only for what they use."
  },
  {
    id: 5,
    question: "What is the theory of relativity?",
    answer: "Einstein's theory of relativity consists of two parts: Special Relativity (1905) and General Relativity (1915). Special Relativity states that the laws of physics are the same for all non-accelerating observers and that the speed of light is constant regardless of the observer's motion. General Relativity explains that gravity is not a force but a curvature of spacetime caused by mass and energy."
  },
  {
    id: 6,
    question: "How does artificial intelligence learn?",
    answer: "Artificial intelligence learns through various methods including supervised learning (training on labeled data), unsupervised learning (finding patterns in unlabeled data), reinforcement learning (learning through trial and error with rewards), and deep learning (using neural networks with multiple layers). These approaches allow AI systems to improve their performance over time based on experience and data."
  }
];

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Q&A Slider',
    questionsAnswers 
  });
});

// API Routes for potential AJAX
app.get('/api/questions', (req, res) => {
  res.json(questionsAnswers);
});

app.get('/api/questions/:id', (req, res) => {
  const question = questionsAnswers.find(q => q.id === parseInt(req.params.id));
  if (!question) return res.status(404).json({ message: 'Question not found' });
  res.json(question);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});