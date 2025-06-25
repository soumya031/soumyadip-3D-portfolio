// Navigation Functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll to the top of the section
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Resume Download
function downloadResume() {
    const resumeContent = `
SOUMYADIP SAHA
Fresh Graduate | Software Developer

CONTACT INFORMATION
Email: soumyadip@email.com
Phone: +91-XXXXXXXXXX
LinkedIn: linkedin.com/in/soumyadip-saha-
Location: Kolkata, West Bengal, India

EDUCATION
Bachelor's Degree in Computer Science
Graduation Year: 2024
CGPA: 8.5/10

TECHNICAL SKILLS
• Programming Languages: JavaScript, Python, Java, C++
• Frontend: React, Angular, Vue.js, HTML5, CSS3
• Backend: Node.js, Express.js, Django, Flask
• Databases: MongoDB, MySQL, PostgreSQL
• Tools: Git, Docker, AWS, Firebase

PROJECTS
1. E-Commerce Platform
   - Full-stack web application
   - Technologies: React, Node.js, MongoDB
   
2. Task Management App
   - Mobile-responsive application
   - Technologies: Vue.js, Express.js, Socket.io

3. ML Prediction Model
   - Machine learning implementation
   - Technologies: Python, TensorFlow, Pandas

ACHIEVEMENTS
• Completed multiple online certifications
• Active contributor to open-source projects
• Strong problem-solving and analytical skills
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Soumyadip_Saha_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Resume downloaded successfully!');
}
// In navigation.js
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Enhanced Navigation System
class NavigationController {
    constructor() {
        this.currentSection = 'home';
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollBehavior();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
    }

    setupNavigation() {
        // Handle navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.navigateToSection(targetSection);
                // If on mobile, close menu with animation
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu(true);
                }
            });
        });

        // Handle direct anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigateToSection(targetId);
            });
        });

        // Handle button navigation
        document.querySelectorAll('[data-section]').forEach(element => {
            element.addEventListener('click', (e) => {
                const targetSection = element.getAttribute('data-section');
                if (targetSection) {
                    this.navigateToSection(targetSection);
                }
            });
        });
    }

    setupScrollBehavior() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        const threshold = 100;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class to navbar
            if (scrollTop > threshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > threshold) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only handle keyboard navigation when not in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateToPreviousSection();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateToNextSection();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navigateToSection('home');
                    break;
                case 'Escape':
                    this.closeMobileMenu();
                    break;
            }
        });
    }

    setupTouchNavigation() {
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - next section
                this.navigateToNextSection();
            } else {
                // Swipe down - previous section
                this.navigateToPreviousSection();
            }
        }
    }

    navigateToSection(sectionId) {
        if (this.isScrolling || sectionId === this.currentSection) {
            return;
        }

        this.isScrolling = true;
        this.currentSection = sectionId;

        // Update active section
        this.updateActiveSection(sectionId);
        
        // Update navigation
        this.updateNavigation(sectionId);
        
        // Animate transition
        this.animateSectionTransition(sectionId);

        // Reset scrolling flag
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    updateActiveSection(sectionId) {
        // Remove active class from all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Add active class to target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    updateNavigation(sectionId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current nav link
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    animateSectionTransition(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        // Fade out current content
        const currentActive = document.querySelector('.section.active');
        if (currentActive && currentActive !== targetSection) {
            gsap.to(currentActive, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }

        // Fade in new content
        gsap.fromTo(targetSection, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                ease: "power2.out",
                delay: 0.2
            }
        );

        // Animate section content
        const elements = targetSection.querySelectorAll('.container > *');
        gsap.from(elements, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3
        });
    }

    navigateToNextSection() {
        const sections = ['home', 'about', 'work', 'blog', 'games', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        this.navigateToSection(sections[nextIndex]);
    }

    navigateToPreviousSection() {
        const sections = ['home', 'about', 'work', 'blog', 'games', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        this.navigateToSection(sections[prevIndex]);
    }

    closeMobileMenu(animated = false) {
        const navLinks = document.getElementById('nav-links');
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (navLinks) {
            if (animated) {
                navLinks.classList.add('closing');
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    navLinks.classList.remove('closing');
                }, 300); // match CSS transition duration
            } else {
                navLinks.classList.remove('active');
                navLinks.classList.remove('closing');
            }
        }
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
        }
    }

    // Utility methods
    getCurrentSection() {
        return this.currentSection;
    }

    isSectionActive(sectionId) {
        return this.currentSection === sectionId;
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add .mobile-device class to <body> for mobile optimizations
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
    }
    window.navigationController = new NavigationController();
});

// Global navigation functions
window.showSection = function(sectionId) {
    if (window.navigationController) {
        window.navigationController.navigateToSection(sectionId);
    }
};

window.scrollToTop = function() {
    if (window.navigationController) {
        window.navigationController.scrollToTop();
    }
};

window.scrollToElement = function(elementId) {
    if (window.navigationController) {
        window.navigationController.scrollToElement(elementId);
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationController;
}
