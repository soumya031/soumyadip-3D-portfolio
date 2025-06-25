// Main Application Controller
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initLoadingScreen();
        this.initScrollProgress();
        this.initBackToTop();
        this.initMobileMenu();
        this.initAnimations();
        this.loadHighScores();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Window events
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
            this.updateActiveNavLink();
            this.toggleBackToTop();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Work filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterWork(e.target.getAttribute('data-filter'));
            });
        });

        // Skill bars animation
        this.initSkillBars();
    }

    initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            this.isLoading = false;
            this.init3DScene();
            this.animateHeroSection();
        }, 2000);
    }

    init3DScene() {
        if (typeof init3D === 'function') {
    init3D();
  }
    }

    animateHeroSection() {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .floating-icon');
        
        gsap.from(heroElements, {
            duration: 1,
      y: 50,
      opacity: 0,
            stagger: 0.2,
      ease: "power2.out"
    });

        // Animate floating icons
        gsap.to('.floating-icon', {
            y: -20,
            duration: 2,
            ease: "power1.inOut",
            stagger: 0.5,
            repeat: -1,
            yoyo: true
        });
    }

    initScrollProgress() {
        this.scrollProgressBar = document.getElementById('scroll-progress');
    }

    updateScrollProgress() {
        if (!this.scrollProgressBar) return;

        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        this.scrollProgressBar.style.width = scrollPercent + '%';
    }

    initBackToTop() {
        this.backToTopBtn = document.getElementById('back-to-top');
        if (this.backToTopBtn) {
            this.backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    toggleBackToTop() {
        if (!this.backToTopBtn) return;

        if (window.pageYOffset > 300) {
            this.backToTopBtn.classList.add('visible');
        } else {
            this.backToTopBtn.classList.remove('visible');
        }
    }

    initMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
    });
  });
        }
    }

    navigateToSection(sectionId) {
        // Update active section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        this.currentSection = sectionId;
        this.animateSection(sectionId);
    }

    animateSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const elements = section.querySelectorAll('.container > *');
        
        gsap.from(elements, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
    }

    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = level + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    filterWork(category) {
        const workCards = document.querySelectorAll('.work-card');
        const filterBtns = document.querySelectorAll('.filter-btn');

        // Update active filter button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${category}"]`).classList.add('active');

        // Filter work cards
        workCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                gsap.to(card, {
                    duration: 0.5,
                    opacity: 1,
                    scale: 1,
                    ease: "power2.out"
                });
            } else {
                gsap.to(card, {
                    duration: 0.5,
                    opacity: 0,
                    scale: 0.8,
                    ease: "power2.in",
                    onComplete: () => {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    loadHighScores() {
        // Load high scores from localStorage
        const scores = {
            snake: localStorage.getItem('snakeHighScore') || 0,
            cricket: localStorage.getItem('cricketBestScore') || 0,
            football: localStorage.getItem('footballGoals') || 0,
            tictactoe: localStorage.getItem('tictactoeWins') || 0
        };

        // Update display
        document.getElementById('snake-high-score').textContent = scores.snake;
        document.getElementById('cricket-best-score').textContent = scores.cricket;
        document.getElementById('football-goals').textContent = scores.football;
        document.getElementById('tictactoe-wins').textContent = scores.tictactoe;
    }

    downloadResume() {
        try {
            // Prevent default link behavior
            if (event) {
                event.preventDefault();
            }
            
            const filePath = 'assets/images/soumyadip_resume.pdf';
            console.log('Attempting to download resume from:', filePath);
            
            // Check if file exists (basic check)
            fetch(filePath, { method: 'HEAD' })
                .then(response => {
                    console.log('File check response:', response.status, response.statusText);
                    if (response.ok) {
                        // File exists, proceed with download
                        console.log('File found, initiating download...');
                        const link = document.createElement('a');
                        link.href = filePath;
                        link.download = 'Soumyadip_Saha_Resume.pdf';
                        link.target = '_blank';
                        
                        // Add link to document and trigger download
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        // Show success notification
                        this.showNotification('Resume downloaded successfully!', 'success');
                        console.log('Download initiated successfully');
                    } else {
                        throw new Error(`File not found: ${filePath} (Status: ${response.status})`);
                    }
                })
                .catch(error => {
                    console.error('Error checking file:', error);
                    this.showNotification(`Resume file not found. Error: ${error.message}`, 'error');
                });
                
        } catch (error) {
            console.error('Error downloading resume:', error);
            this.showNotification(`Error downloading resume: ${error.message}`, 'error');
        }
    }

    handleResize() {
        // Handle responsive behavior
        const debouncedResize = this.debounce(() => {
            // Reinitialize any components that need resize handling
            if (typeof handleResize === 'function') {
                handleResize();
            }
        }, 250);

        debouncedResize();
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Global utility functions
window.showSection = function(sectionId) {
    if (window.portfolioApp) {
        window.portfolioApp.navigateToSection(sectionId);
    }
};

window.downloadResume = function(event) {
    if (event) {
        event.preventDefault();
    }
    if (window.portfolioApp) {
        window.portfolioApp.downloadResume();
    } else {
        // Fallback if app is not initialized
        const filePath = 'assets/images/soumyadip_resume.pdf';
        console.log('Fallback: Attempting to download resume from:', filePath);
        
        fetch(filePath, { method: 'HEAD' })
            .then(response => {
                console.log('Fallback: File check response:', response.status, response.statusText);
                if (response.ok) {
                    console.log('Fallback: File found, initiating download...');
                    const link = document.createElement('a');
                    link.href = filePath;
                    link.download = 'Soumyadip_Saha_Resume.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    console.log('Fallback: Download initiated successfully');
                } else {
                    throw new Error(`File not found: ${filePath} (Status: ${response.status})`);
                }
            })
            .catch(error => {
                console.error('Fallback: Error downloading resume:', error);
                alert(`Error downloading resume: ${error.message}`);
            });
    }
};