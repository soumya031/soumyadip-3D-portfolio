// Enhanced Quiz System
class QuizManager {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 0;
        this.quizHistory = [];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.loadQuestions();
        this.setupEventListeners();
        this.loadQuizHistory();
        this.generateNewQuiz();
    }

    setupEventListeners() {
        // Category filters
        document.querySelectorAll('.quiz-category').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.getAttribute('data-category');
                this.setCategory(category);
            });
        });

        // Quiz controls
        const newQuestionBtn = document.getElementById('new-question');
        const aiRecommendationBtn = document.getElementById('ai-recommendation');
        const showStatsBtn = document.getElementById('show-stats');

        if (newQuestionBtn) {
            newQuestionBtn.addEventListener('click', () => this.generateNewQuiz());
        }
        if (aiRecommendationBtn) {
            aiRecommendationBtn.addEventListener('click', () => this.getAIRecommendation());
        }
        if (showStatsBtn) {
            showStatsBtn.addEventListener('click', () => this.showQuizStats());
        }
    }

    loadQuestions() {
        this.questions = [
            // Programming Fundamentals
    {
        question: "What is the most popular programming language in 2024?",
        options: ["JavaScript", "Python", "Java", "C++"],
        correct: 1,
                category: "programming",
                explanation: "Python has become the most popular programming language due to its versatility in web development, data science, AI/ML, and automation.",
                difficulty: "easy"
            },
            {
                question: "Which of the following is NOT a JavaScript framework?",
                options: ["React", "Angular", "Vue.js", "Django"],
                correct: 3,
                category: "frontend",
                explanation: "Django is a Python web framework, not a JavaScript framework. React, Angular, and Vue.js are all JavaScript frameworks.",
                difficulty: "medium"
    },
    {
        question: "What does API stand for?",
                options: ["Application Programming Interface", "Automated Program Integration", "Advanced Programming Instructions", "Application Process Interface"],
                correct: 0,
                category: "programming",
                explanation: "API stands for Application Programming Interface, which allows different software applications to communicate with each other.",
                difficulty: "easy"
            },
            {
                question: "Which data structure operates on LIFO principle?",
                options: ["Queue", "Stack", "Array", "Linked List"],
                correct: 1,
                category: "programming",
                explanation: "A Stack operates on LIFO (Last In, First Out) principle, meaning the last element added is the first one to be removed.",
                difficulty: "medium"
            },
            {
                question: "What is the purpose of CSS Grid?",
                options: ["Database management", "Layout system", "JavaScript framework", "Backend framework"],
                correct: 1,
                category: "frontend",
                explanation: "CSS Grid is a powerful layout system that allows you to create two-dimensional layouts for web pages.",
                difficulty: "medium"
            },
            {
                question: "Which HTTP method is used to create new resources?",
                options: ["GET", "POST", "PUT", "DELETE"],
                correct: 1,
                category: "backend",
                explanation: "POST is used to create new resources, while GET retrieves data, PUT updates existing resources, and DELETE removes resources.",
                difficulty: "easy"
            },
            {
                question: "What is the primary purpose of Docker?",
                options: ["Version control", "Containerization", "Database management", "Code compilation"],
                correct: 1,
                category: "devops",
                explanation: "Docker is a platform for developing, shipping, and running applications in containers, ensuring consistency across different environments.",
                difficulty: "medium"
            },
            {
                question: "Which database is considered a NoSQL database?",
                options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
                correct: 2,
                category: "database",
                explanation: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, unlike traditional relational databases.",
                difficulty: "medium"
            },
            {
                question: "What is the main advantage of using TypeScript over JavaScript?",
                options: ["Faster execution", "Static typing", "Smaller file size", "Better browser support"],
                correct: 1,
                category: "frontend",
                explanation: "TypeScript adds static typing to JavaScript, which helps catch errors during development and improves code maintainability.",
                difficulty: "medium"
            },
            {
                question: "Which algorithm is used for sorting in most programming languages?",
                options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
                correct: 1,
                category: "programming",
                explanation: "Quick Sort is commonly used in most programming languages due to its efficient average-case performance of O(n log n).",
                difficulty: "hard"
            },
            {
                question: "What is the purpose of a CDN?",
                options: ["Code deployment", "Content delivery", "Database backup", "Email service"],
                correct: 1,
                category: "devops",
                explanation: "A CDN (Content Delivery Network) is used to deliver content to users from servers located closer to them, improving load times.",
                difficulty: "medium"
            },
            {
                question: "Which of the following is a state management library for React?",
                options: ["Redux", "Express", "Axios", "Lodash"],
        correct: 0,
                category: "frontend",
                explanation: "Redux is a popular state management library for React applications, helping manage application state in a predictable way.",
                difficulty: "medium"
            },
            {
                question: "What does REST stand for in REST API?",
                options: ["Remote State Transfer", "Representational State Transfer", "Resource State Transfer", "Request State Transfer"],
                correct: 1,
                category: "backend",
                explanation: "REST stands for Representational State Transfer, which is an architectural style for designing networked applications.",
                difficulty: "medium"
            },
            {
                question: "Which programming paradigm does React follow?",
                options: ["Object-Oriented", "Functional", "Procedural", "Logic"],
                correct: 1,
                category: "frontend",
                explanation: "React follows a functional programming paradigm, emphasizing the use of pure functions and immutable data.",
                difficulty: "medium"
            },
            {
                question: "What is the purpose of Git?",
                options: ["Code compilation", "Version control", "Database management", "Web hosting"],
                correct: 1,
                category: "devops",
                explanation: "Git is a distributed version control system that tracks changes in source code during software development.",
                difficulty: "easy"
            }
        ];

        this.totalQuestions = this.questions.length;
    }

    setCategory(category) {
        this.currentCategory = category;
        
        // Update active category button
        document.querySelectorAll('.quiz-category').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.generateNewQuiz();
    }

    generateNewQuiz() {
        let availableQuestions = this.questions;
        
        // Filter by category if not 'all'
        if (this.currentCategory !== 'all') {
            availableQuestions = this.questions.filter(q => q.category === this.currentCategory);
        }
        
        if (availableQuestions.length === 0) {
            this.showNoQuestionsMessage();
            return;
        }
        
        // Select random question
        this.currentQuestion = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[this.currentQuestion];
        
        this.displayQuestion(question);
        this.clearResult();
    }

    displayQuestion(question) {
        const questionElement = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('quiz-options');
        
        if (questionElement) {
            questionElement.textContent = question.question;
        }
        
        if (optionsContainer) {
    optionsContainer.innerHTML = '';
    
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'quiz-option';
                optionElement.textContent = option;
                optionElement.setAttribute('data-index', index);
                optionElement.addEventListener('click', () => this.selectAnswer(index));
                optionsContainer.appendChild(optionElement);
            });
        }

        // Add difficulty indicator
        this.addDifficultyIndicator(question.difficulty);
    }

    addDifficultyIndicator(difficulty) {
        const questionContainer = document.getElementById('quiz-container');
        let indicator = questionContainer.querySelector('.difficulty-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'difficulty-indicator';
            questionContainer.insertBefore(indicator, questionContainer.firstChild);
        }
        
        const colors = {
            easy: '#6bcf7f',
            medium: '#ffd93d',
            hard: '#ff6b6b'
        };
        
        indicator.innerHTML = `
            <span style="color: ${colors[difficulty]}">
                <i class="fas fa-star"></i> ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
        `;
    }

    selectAnswer(selectedIndex) {
        const question = this.getCurrentQuestion();
        if (!question) return;

        const resultDiv = document.getElementById('quiz-result');
        const options = document.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Highlight correct and incorrect answers
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        // Show result
        if (selectedIndex === question.correct) {
            this.score++;
            resultDiv.innerHTML = `
                <div class="result-correct">
                    <i class="fas fa-check-circle"></i>
                    <h3>Correct!</h3>
                    <p>Well done! You got it right.</p>
                    <div class="explanation">
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="result-incorrect">
                    <i class="fas fa-times-circle"></i>
                    <h3>Incorrect</h3>
                    <p>The correct answer is: <strong>${question.options[question.correct]}</strong></p>
                    <div class="explanation">
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                </div>
            `;
        }

        // Save quiz result
        this.saveQuizResult(question, selectedIndex, selectedIndex === question.correct);

        // Auto-generate new question after delay
        setTimeout(() => {
            this.generateNewQuiz();
        }, 4000);
    }

    getCurrentQuestion() {
        let availableQuestions = this.questions;
        if (this.currentCategory !== 'all') {
            availableQuestions = this.questions.filter(q => q.category === this.currentCategory);
        }
        return availableQuestions[this.currentQuestion];
    }

    clearResult() {
        const resultDiv = document.getElementById('quiz-result');
        if (resultDiv) {
            resultDiv.innerHTML = '';
        }
        
        // Clear option styling
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
    }

    showNoQuestionsMessage() {
        const questionElement = document.getElementById('quiz-question');
        const optionsContainer = document.getElementById('quiz-options');
        
        if (questionElement) {
            questionElement.textContent = "No questions available for this category.";
        }
        
        if (optionsContainer) {
            optionsContainer.innerHTML = `
                <div class="no-questions">
                    <i class="fas fa-info-circle"></i>
                    <p>Try selecting a different category or check back later for new questions.</p>
                </div>
            `;
        }
    }

    getAIRecommendation() {
        const recommendations = [
            {
                title: "Frontend Development",
                content: "Focus on React, Vue.js, and modern CSS. Learn TypeScript for better code quality and maintainability.",
                icon: "fas fa-palette"
            },
            {
                title: "Backend Development",
                content: "Master Node.js, Python (Django/Flask), and database design. Learn about APIs and microservices architecture.",
                icon: "fas fa-server"
            },
            {
                title: "AI/ML Specialization",
                content: "Study Python, TensorFlow, and data science fundamentals. Focus on practical projects and real-world applications.",
                icon: "fas fa-brain"
            },
            {
                title: "DevOps & Cloud",
                content: "Learn Docker, Kubernetes, AWS/Azure, and CI/CD pipelines. Understanding infrastructure is crucial for modern development.",
                icon: "fas fa-cloud"
            },
            {
                title: "Full-Stack Development",
                content: "Combine frontend and backend skills. Learn about system design, scalability, and user experience optimization.",
                icon: "fas fa-code"
            }
        ];
        
        const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
    const resultDiv = document.getElementById('quiz-result');
    
        resultDiv.innerHTML = `
            <div class="ai-recommendation">
                <div class="recommendation-header">
                    <i class="${randomRec.icon}"></i>
                    <h3>${randomRec.title}</h3>
                </div>
                <p>${randomRec.content}</p>
                <div class="recommendation-tips">
                    <strong>Quick Tips:</strong>
                    <ul>
                        <li>Build real projects to apply your knowledge</li>
                        <li>Contribute to open source projects</li>
                        <li>Stay updated with industry trends</li>
                        <li>Network with other developers</li>
                    </ul>
            </div>
            </div>
        `;
    }

    saveQuizResult(question, selectedAnswer, isCorrect) {
        const result = {
            question: question.question,
            selectedAnswer: question.options[selectedAnswer],
            correctAnswer: question.options[question.correct],
            isCorrect: isCorrect,
            category: question.category,
            difficulty: question.difficulty,
            timestamp: new Date().toISOString()
        };

        this.quizHistory.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(this.quizHistory));
    }

    loadQuizHistory() {
        const saved = localStorage.getItem('quizHistory');
        if (saved) {
            this.quizHistory = JSON.parse(saved);
        }
    }

    showQuizStats() {
        if (this.quizHistory.length === 0) {
            this.showNotification('No quiz history available yet. Take some quizzes first!', 'info');
            return;
        }

        const stats = this.calculateStats();
        const resultDiv = document.getElementById('quiz-result');
        
        resultDiv.innerHTML = `
            <div class="quiz-stats">
                <h3><i class="fas fa-chart-bar"></i> Your Quiz Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">${stats.totalQuizzes}</div>
                        <div class="stat-label">Total Quizzes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.correctAnswers}</div>
                        <div class="stat-label">Correct Answers</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.accuracy}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${stats.favoriteCategory}</div>
                        <div class="stat-label">Favorite Category</div>
                    </div>
                </div>
                <div class="category-breakdown">
                    <h4>Performance by Category:</h4>
                    ${this.generateCategoryBreakdown(stats.categoryStats)}
            </div>
            </div>
        `;
    }
    
    calculateStats() {
        const totalQuizzes = this.quizHistory.length;
        const correctAnswers = this.quizHistory.filter(result => result.isCorrect).length;
        const accuracy = totalQuizzes > 0 ? Math.round((correctAnswers / totalQuizzes) * 100) : 0;
        
        // Category statistics
        const categoryStats = {};
        this.quizHistory.forEach(result => {
            if (!categoryStats[result.category]) {
                categoryStats[result.category] = { total: 0, correct: 0 };
            }
            categoryStats[result.category].total++;
            if (result.isCorrect) {
                categoryStats[result.category].correct++;
            }
        });

        // Find favorite category
        let favoriteCategory = 'None';
        let maxQuizzes = 0;
        Object.keys(categoryStats).forEach(category => {
            if (categoryStats[category].total > maxQuizzes) {
                maxQuizzes = categoryStats[category].total;
                favoriteCategory = category.charAt(0).toUpperCase() + category.slice(1);
            }
        });

        return {
            totalQuizzes,
            correctAnswers,
            accuracy,
            favoriteCategory,
            categoryStats
        };
    }

    generateCategoryBreakdown(categoryStats) {
        let html = '';
        Object.keys(categoryStats).forEach(category => {
            const stats = categoryStats[category];
            const accuracy = Math.round((stats.correct / stats.total) * 100);
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            
            html += `
                <div class="category-stat">
                    <div class="category-name">${categoryName}</div>
                    <div class="category-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${accuracy}%"></div>
                        </div>
                        <span class="category-accuracy">${accuracy}%</span>
                    </div>
                    <div class="category-count">${stats.correct}/${stats.total}</div>
                </div>
            `;
        });
        return html;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
        </div>
    `;
        
        document.body.appendChild(notification);
        
        gsap.fromTo(notification, 
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
        );
        
        setTimeout(() => {
            gsap.to(notification, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    if (notification.parentElement) {
                        notification.parentElement.removeChild(notification);
                    }
                }
            });
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize quiz manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizManager = new QuizManager();
});

// Global quiz functions
window.generateNewQuiz = function() {
    if (window.quizManager) {
        window.quizManager.generateNewQuiz();
    }
};

window.getAIRecommendation = function() {
    if (window.quizManager) {
        window.quizManager.getAIRecommendation();
    }
};

window.showQuizStats = function() {
    if (window.quizManager) {
        window.quizManager.showQuizStats();
    }
};

// Add quiz-specific styles
const quizStyles = `
.quiz-category {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;
}

.quiz-category.active,
.quiz-category:hover {
    background: var(--primary-color);
    color: #000;
    border-color: var(--primary-color);
}

.difficulty-indicator {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.quiz-option {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid var(--border-color);
    padding: 1.2rem;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.quiz-option:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: var(--primary-color);
    transform: scale(1.02);
    box-shadow: 0 10px 30px var(--shadow-color);
}

.quiz-option.correct {
    background: rgba(107, 207, 127, 0.2);
    border-color: #6bcf7f;
    color: #6bcf7f;
}

.quiz-option.incorrect {
    background: rgba(255, 107, 107, 0.2);
    border-color: #ff6b6b;
    color: #ff6b6b;
}

.result-correct,
.result-incorrect {
    text-align: center;
    padding: 2rem;
    border-radius: 15px;
    margin-top: 2rem;
}

.result-correct {
    background: rgba(107, 207, 127, 0.1);
    border: 1px solid #6bcf7f;
    color: #6bcf7f;
}

.result-incorrect {
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid #ff6b6b;
    color: #ff6b6b;
}

.result-correct i,
.result-incorrect i {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.explanation {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    text-align: left;
}

.ai-recommendation {
    background: rgba(0, 255, 255, 0.1);
    border: 1px solid var(--primary-color);
    border-radius: 15px;
    padding: 2rem;
    margin-top: 2rem;
}

.recommendation-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.recommendation-header i {
    font-size: 2rem;
}

.recommendation-tips {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
}

.recommendation-tips ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
}

.recommendation-tips li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
}

.recommendation-tips li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--primary-color);
}

.quiz-stats {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 2rem;
    margin-top: 2rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.stat-item {
    text-align: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
}

.stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

.category-breakdown {
    margin-top: 2rem;
}

.category-breakdown h4 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.category-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.category-name {
    color: var(--text-primary);
    font-weight: bold;
    min-width: 100px;
}

.category-progress {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 1rem;
}

.progress-bar {
    flex: 1;
    height: 8px;
    background: rgba(0, 255, 255, 0.2);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--primary-color);
    transition: width 0.5s ease;
}

.category-accuracy {
    color: var(--primary-color);
    font-weight: bold;
    min-width: 40px;
}

.category-count {
    color: var(--text-secondary);
    font-size: 0.9rem;
    min-width: 60px;
    text-align: right;
}

.no-questions {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
}

.no-questions i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.quiz-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}
`;

// Inject quiz styles
const quizStyleSheet = document.createElement('style');
quizStyleSheet.textContent = quizStyles;
document.head.appendChild(quizStyleSheet);