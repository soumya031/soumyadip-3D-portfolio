// Enhanced Blog System
class BlogManager {
    constructor() {
        this.posts = [];
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.filteredPosts = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadBlogPosts();
        this.setupEventListeners();
        this.renderPosts();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchPosts(e.target.value);
            });
        }

        // Category filters
        document.querySelectorAll('.blog-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-posts');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }
    }

    loadBlogPosts() {
        // Sample blog posts data
        this.posts = [
            {
                id: 1,
        title: "Getting Started with React Hooks",
                excerpt: "An in-depth guide to understanding and implementing React Hooks in modern web applications. Learn about useState, useEffect, and custom hooks.",
                content: "React Hooks have revolutionized how we write functional components in React. They allow us to use state and other React features without writing class components...",
                category: "frontend",
                tags: ["React", "JavaScript", "Hooks", "Frontend"],
                author: "Soumyadip Saha",
                date: "2024-01-15",
                readTime: "8 min read",
                image: "react-hooks.jpg",
                featured: true
            },
            {
                id: 2,
                title: "Machine Learning for Beginners",
                excerpt: "A beginner-friendly introduction to machine learning concepts and practical implementation using Python and popular libraries.",
                content: "Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed...",
                category: "ai-ml",
                tags: ["Python", "Machine Learning", "AI", "Data Science"],
                author: "Soumyadip Saha",
                date: "2024-01-10",
                readTime: "12 min read",
                image: "ml-basics.jpg",
                featured: false
            },
            {
                id: 3,
        title: "The Future of Web Development",
                excerpt: "Exploring upcoming trends and technologies that will shape the future of web development in 2024 and beyond.",
                content: "Web development is constantly evolving with new technologies and frameworks emerging regularly. Let's explore what's coming next...",
                category: "trends",
                tags: ["Web Development", "Trends", "Technology", "Future"],
                author: "Soumyadip Saha",
                date: "2024-01-05",
                readTime: "10 min read",
                image: "web-future.jpg",
                featured: true
            },
            {
                id: 4,
                title: "Building Scalable Node.js Applications",
                excerpt: "A comprehensive guide to building robust backend systems with Node.js, Express, and best practices for scalability.",
                content: "Node.js has become the go-to platform for building scalable backend applications. Here's how to build applications that can handle growth...",
                category: "backend",
                tags: ["Node.js", "Express", "Backend", "Scalability"],
                author: "Soumyadip Saha",
                date: "2024-01-01",
                readTime: "15 min read",
                image: "nodejs-scalable.jpg",
                featured: false
            },
            {
                id: 5,
                title: "Advanced CSS Techniques for Modern UIs",
                excerpt: "Master advanced CSS techniques including Grid, Flexbox, animations, and modern layout patterns for stunning user interfaces.",
                content: "CSS has evolved significantly over the years. Modern CSS provides powerful tools for creating beautiful and responsive user interfaces...",
                category: "frontend",
                tags: ["CSS", "Frontend", "UI/UX", "Design"],
                author: "Soumyadip Saha",
                date: "2023-12-28",
                readTime: "14 min read",
                image: "css-techniques.jpg",
                featured: false
            },
            {
                id: 6,
                title: "Database Design Best Practices",
                excerpt: "Learn essential database design principles, normalization techniques, and optimization strategies for better performance.",
                content: "Good database design is crucial for application performance and maintainability. Here are the best practices you should follow...",
                category: "database",
                tags: ["Database", "SQL", "Design", "Performance"],
                author: "Soumyadip Saha",
                date: "2023-12-25",
                readTime: "11 min read",
                image: "database-design.jpg",
                featured: false
            },
            {
                id: 7,
                title: "Introduction to TypeScript",
                excerpt: "A practical guide to TypeScript for JavaScript developers, covering types, interfaces, and advanced features.",
                content: "TypeScript adds static typing to JavaScript, making it more robust and maintainable. Let's explore its key features...",
                category: "frontend",
                tags: ["TypeScript", "JavaScript", "Frontend", "Development"],
                author: "Soumyadip Saha",
                date: "2023-12-20",
                readTime: "13 min read",
                image: "typescript-intro.jpg",
                featured: true
            },
            {
                id: 8,
                title: "DevOps Practices for Modern Development",
                excerpt: "Essential DevOps practices including CI/CD, containerization, and cloud deployment strategies.",
                content: "DevOps has become essential for modern software development. Here's how to implement effective DevOps practices...",
                category: "devops",
                tags: ["DevOps", "CI/CD", "Docker", "Cloud"],
                author: "Soumyadip Saha",
                date: "2023-12-15",
                readTime: "16 min read",
                image: "devops-practices.jpg",
                featured: false
            }
        ];

        this.filteredPosts = [...this.posts];
    }

    renderPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;
    
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        blogContainer.innerHTML = '';

        if (postsToShow.length === 0) {
            blogContainer.innerHTML = `
                <div class="no-posts">
                    <i class="fas fa-search"></i>
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        postsToShow.forEach(post => {
            const postElement = this.createPostElement(post);
            blogContainer.appendChild(postElement);
        });

        this.updateLoadMoreButton();
        this.animatePosts();
    }

    createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        postElement.setAttribute('data-category', post.category);
        postElement.setAttribute('data-id', post.id);

        const tagsHTML = post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
        const featuredBadge = post.featured ? '<span class="featured-badge">Featured</span>' : '';

        postElement.innerHTML = `
            ${featuredBadge}
            <div class="blog-image">
                <div class="blog-placeholder">${post.title.charAt(0)}</div>
            </div>
            <div class="blog-content">
            <div class="blog-meta">
                    <span class="blog-category">${this.getCategoryName(post.category)}</span>
                    <span class="blog-date">${this.formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${tagsHTML}
                </div>
                <div class="blog-actions">
                    <button class="btn btn-small" onclick="blogManager.readPost(${post.id})">
                        <i class="fas fa-book-open"></i> Read More
                    </button>
                    <button class="btn btn-small btn-secondary" onclick="blogManager.sharePost(${post.id})">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        `;

        return postElement;
    }

    getCategoryName(category) {
        const categories = {
            'frontend': 'Frontend',
            'backend': 'Backend',
            'ai-ml': 'AI/ML',
            'database': 'Database',
            'devops': 'DevOps',
            'trends': 'Trends'
        };
        return categories[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    searchPosts(query) {
        if (!query.trim()) {
            this.filteredPosts = [...this.posts];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredPosts = this.posts.filter(post => 
                post.title.toLowerCase().includes(searchTerm) ||
                post.excerpt.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        this.currentPage = 1;
        this.renderPosts();
    }

    filterByCategory(category) {
        // Update active filter button
        document.querySelectorAll('.blog-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        if (category === 'all') {
            this.filteredPosts = [...this.posts];
        } else {
            this.filteredPosts = this.posts.filter(post => post.category === category);
        }

        this.currentPage = 1;
        this.renderPosts();
    }

    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-posts');
        if (!loadMoreBtn) return;

        const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
        
        if (this.currentPage >= totalPages) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    readPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        // Create modal for reading post
        this.showPostModal(post);
    }

    showPostModal(post) {
        const modal = document.createElement('div');
        modal.className = 'blog-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${post.title}</h2>
                    <button class="modal-close" onclick="this.closest('.blog-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="post-meta">
                        <span class="post-author">By ${post.author}</span>
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        <span class="post-read-time">${post.readTime}</span>
                    </div>
                    <div class="post-content">
                        <p>${post.content}</p>
                        <p>This is a preview of the full article. The complete content would include detailed explanations, code examples, and practical implementations.</p>
                    </div>
                    <div class="post-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="blogManager.sharePost(${post.id})">
                        <i class="fas fa-share"></i> Share Post
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.blog-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Animate modal
        gsap.fromTo(modal.querySelector('.modal-content'), 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
    }

    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: window.location.href + `#blog-${post.id}`
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            const url = shareData.url;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Link copied to clipboard!', 'success');
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
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
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }

    animatePosts() {
        const posts = document.querySelectorAll('.blog-card');
        gsap.from(posts, {
        duration: 0.8,
        y: 50,
        opacity: 0,
            stagger: 0.1,
        ease: "power2.out"
    });
}

    refreshPosts() {
    // Simulate loading new posts
        this.showNotification('Refreshing posts...', 'info');
        
    setTimeout(() => {
            // Add a new post to simulate refresh
        const newPost = {
                id: this.posts.length + 1,
            title: "New Post: " + new Date().toLocaleDateString(),
                excerpt: "This is a newly added post to demonstrate the refresh functionality.",
                content: "This post was added dynamically to show how the blog system can handle new content...",
                category: "trends",
                tags: ["New", "Dynamic", "Update"],
                author: "Soumyadip Saha",
                date: new Date().toISOString().split('T')[0],
                readTime: "3 min read",
                image: "new-post.jpg",
                featured: false
            };

            this.posts.unshift(newPost);
            this.filteredPosts = [...this.posts];
            this.currentPage = 1;
            this.renderPosts();
            
            this.showNotification('Posts refreshed successfully!', 'success');
        }, 1000);
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
});

// Global blog functions
window.refreshBlogPosts = function() {
    if (window.blogManager) {
        window.blogManager.refreshPosts();
    }
};

window.loadMorePosts = function() {
    if (window.blogManager) {
        window.blogManager.loadMorePosts();
    }
};

// Add blog-specific styles
const blogStyles = `
.blog-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
}

.modal-content {
    position: relative;
    background: var(--background-darker);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    max-width: 800px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
    color: var(--text-primary);
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: rgba(255, 0, 0, 0.1);
    color: #ff0000;
}

.modal-body {
    padding: 2rem;
}

.post-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.post-content {
    line-height: 1.8;
    margin-bottom: 2rem;
}

.modal-footer {
    padding: 2rem;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.blog-image {
    height: 200px;
    background: linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px 15px 0 0;
    margin: -2rem -2rem 1rem -2rem;
}

.blog-placeholder {
    font-size: 4rem;
    color: var(--primary-color);
    font-weight: bold;
}

.blog-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
}

.blog-category {
    color: var(--primary-color);
    font-weight: bold;
}

.blog-tags {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}

.blog-tag {
    background: rgba(0, 255, 255, 0.1);
    color: var(--primary-color);
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.7rem;
    border: 1px solid var(--border-color);
}

.blog-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.featured-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--gradient-rainbow);
    color: #000;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.7rem;
    font-weight: bold;
    z-index: 1;
}

.no-posts {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
}

.no-posts i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}
`;

// Inject blog styles
const blogStyleSheet = document.createElement('style');
blogStyleSheet.textContent = blogStyles;
document.head.appendChild(blogStyleSheet);