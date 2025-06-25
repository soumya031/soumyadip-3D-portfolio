# Soumyadip Saha - 3D Portfolio

A modern, interactive 3D portfolio website showcasing full-stack development skills with engaging animations, interactive games, and a comprehensive blog system.

## 🌟 Features

### 🎨 Modern Design
- **Cyberpunk Aesthetic**: Dark theme with neon accents and gradient effects
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: GSAP-powered animations for seamless transitions
- **3D Background**: Three.js powered floating particles and geometric shapes

### 🧭 Enhanced Navigation
- **Smooth Scrolling**: Seamless section transitions
- **Keyboard Navigation**: Arrow keys for section navigation
- **Touch Support**: Swipe gestures for mobile devices
- **Progress Indicator**: Visual scroll progress bar
- **Mobile Menu**: Collapsible navigation for mobile devices

### 🏠 Home Section
- **Hero Animation**: Animated title with floating tech icons
- **Tech Stack Display**: Interactive technology tags
- **Call-to-Action Buttons**: Smooth navigation to key sections
- **Scroll Indicator**: Visual cue for content exploration

### 👤 About Section
- **Profile Information**: Professional background and skills
- **Skill Cards**: Interactive skill display with progress bars
- **Social Links**: Direct links to professional profiles
- **Status Indicator**: Real-time availability status

### 💼 Work Section
- **Project Showcase**: Detailed project cards with technologies
- **Category Filtering**: Filter projects by technology stack
- **Interactive Cards**: Hover effects and project links
- **Technology Badges**: Visual technology indicators

### 📝 Blog System
- **Dynamic Content**: Auto-generated blog posts
- **Category Filtering**: Filter posts by topic
- **Search Functionality**: Real-time search through posts
- **Post Modals**: Detailed post viewing with explanations
- **Share Features**: Social media sharing capabilities
- **Load More**: Pagination for better performance

### 🎮 Interactive Games
- **Snake Game**: Classic snake with modern graphics
- **Cricket Game**: Virtual cricket match simulation
- **Football Game**: Penalty shootout challenge
- **Tic Tac Toe**: Strategic thinking game
- **Score Tracking**: Persistent high scores
- **Game Statistics**: Performance tracking

### 🧠 Quiz System
- **Multiple Categories**: Programming, Frontend, Backend, DevOps
- **Difficulty Levels**: Easy, Medium, Hard questions
- **Detailed Explanations**: Educational explanations for answers
- **Progress Tracking**: Quiz history and statistics
- **AI Recommendations**: Personalized learning suggestions
- **Performance Analytics**: Category-wise performance breakdown

### 📞 Contact System
- **Form Validation**: Real-time input validation
- **Auto-Save**: Form data persistence
- **Character Counting**: Message length tracking
- **Success Notifications**: User feedback system
- **Data Export**: Contact data export functionality
- **Statistics**: Contact form analytics

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and modern structure
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modern JavaScript with classes and modules
- **Three.js**: 3D graphics and animations
- **GSAP**: Professional animations and transitions
- **Font Awesome**: Icon library

### Libraries & Frameworks
- **Three.js r128**: 3D graphics rendering
- **GSAP 3.12.2**: Animation library
- **ScrollTrigger**: Scroll-based animations
- **Font Awesome 6.4.0**: Icon system

### Development Features
- **Modular Architecture**: Organized code structure
- **ES6 Classes**: Object-oriented programming
- **Local Storage**: Data persistence
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Efficient animations and rendering

## 📁 Project Structure

```
3d-portfolio/
├── index.html              # Main HTML file
├── CSS/
│   └── style.css           # Main stylesheet
├── JS/
│   ├── main.js             # Main application controller
│   ├── navigation.js       # Navigation system
│   ├── threeDScene.js      # 3D background animations
│   ├── contactForm.js      # Contact form management
│   ├── blog.js             # Blog system
│   ├── quiz.js             # Quiz system
│   └── games/
│       ├── snakeGame.js    # Snake game
│       ├── cricketGame.js  # Cricket game
│       ├── footballGame.js # Football game
│       └── ticTacToe.js    # Tic Tac Toe game
├── assets/
│   ├── front/              # Frontend assets
│   └── images/             # Image assets
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (for development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/soumya031/3d-portfolio.git
   cd 3d-portfolio
   ```

2. Open `index.html` in a web browser or serve locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## 🎯 Key Features Explained

### 3D Background System
The Three.js-powered background creates an immersive experience with:
- Floating geometric particles
- Dynamic color transitions
- Responsive to window resizing
- Performance optimized rendering

### Navigation System
Advanced navigation with:
- Smooth section transitions
- Keyboard shortcuts (Arrow keys, Home, Escape)
- Touch gestures for mobile
- Auto-hide navbar on scroll
- Active section highlighting

### Blog Management
Comprehensive blog system featuring:
- Dynamic post generation
- Category-based filtering
- Real-time search
- Post sharing capabilities
- Reading statistics

### Quiz Engine
Educational quiz system with:
- Multiple difficulty levels
- Category-based questions
- Detailed explanations
- Performance tracking
- AI-powered recommendations

### Contact Management
Professional contact system including:
- Form validation
- Auto-save functionality
- Data export capabilities
- Contact analytics
- Success notifications

## 🎮 Games Overview

### Snake Game
- Classic snake gameplay
- Score tracking
- High score persistence
- Responsive controls
- Modern visual effects

### Cricket Game
- Virtual cricket simulation
- Multiple shot types
- Commentary system
- Score tracking
- Realistic gameplay

### Football Game
- Penalty shootout
- Direction-based shooting
- Goal tracking
- Visual feedback
- Score persistence

### Tic Tac Toe
- Strategic gameplay
- Win detection
- Draw handling
- Statistics tracking
- Responsive design

## 📊 Performance Features

- **Lazy Loading**: Images and content loaded on demand
- **Optimized Animations**: 60fps smooth animations
- **Efficient Rendering**: Optimized Three.js rendering
- **Memory Management**: Proper cleanup and garbage collection
- **Responsive Images**: Optimized for different screen sizes

## 🔧 Customization

### Colors and Themes
Modify CSS variables in `style.css`:
```css
:root {
    --primary-color: #00ffff;
    --secondary-color: #ff00ff;
    --accent-color: #ffff00;
    --success-color: #00ff00;
    --background-dark: #0a0a0a;
    --text-primary: #e0e0e0;
}
```

### 3D Background
Adjust particle settings in `threeDScene.js`:
```javascript
// Number of particles
const particleCount = 150;

// Particle colors
const colors = [0x00ffff, 0xff00ff, 0xffff00, 0x00ff00, 0xff0080];

// Animation speed
const animationSpeed = 0.02;
```

### Content Management
- **Blog Posts**: Add new posts in `blog.js`
- **Quiz Questions**: Extend questions array in `quiz.js`
- **Projects**: Update work section in `index.html`
- **Skills**: Modify skills grid in `index.html`

## 📱 Browser Support

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+
- **Mobile Browsers**: iOS Safari 13+, Chrome Mobile 80+

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)
4. Access via `https://username.github.io/repository-name`

### Netlify
1. Connect GitHub repository to Netlify
2. Build command: (leave empty for static site)
3. Publish directory: `.` (root)
4. Deploy automatically on push

### Vercel
1. Import GitHub repository to Vercel
2. Framework preset: Other
3. Build command: (leave empty)
4. Output directory: `.`
5. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Soumyadip Saha**
- Email: soumyadip@email.com
- LinkedIn: [linkedin.com/in/soumyadip-saha-](https://www.linkedin.com/in/soumyadip-saha-/)
- GitHub: [github.com/soumya031](https://github.com/soumya031)

## 🙏 Acknowledgments

- **Three.js**: 3D graphics library
- **GSAP**: Animation library
- **Font Awesome**: Icon library
- **Google Fonts**: Typography
- **CDN Services**: Fast content delivery

## 📈 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] More interactive 3D elements
- [ ] Additional games and quizzes
- [ ] Blog CMS integration
- [ ] Contact form backend integration
- [ ] Performance analytics
- [ ] PWA capabilities
- [ ] Multi-language support

---

⭐ **Star this repository if you found it helpful!** 
