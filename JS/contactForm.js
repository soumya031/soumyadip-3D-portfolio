// Enhanced Contact Form System with EmailJS Integration
class ContactFormManager {
    constructor() {
        this.form = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        // Initialize EmailJS
        this.initEmailJS();
        this.setupForm();
        this.setupValidation();
        this.setupAutoSave();
        this.setupCharacterCount();
    }

    initEmailJS() {
        // Disable EmailJS - messages will only be stored locally
        console.log('📧 EmailJS disabled - messages will be stored locally only');
        this.emailJSEnabled = false;
    }

    setupForm() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        // Add form event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.addEventListener('input', (e) => this.handleInput(e));
        this.form.addEventListener('focusout', (e) => this.handleBlur(e));

        // Add character count displays
        this.addCharacterCounters();
        
        // Load saved data
        this.loadSavedData();
    }

    setupValidation() {
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    setupAutoSave() {
        // Auto-save form data every 5 seconds
        setInterval(() => {
            this.saveFormData();
        }, 5000);
    }

    setupCharacterCount() {
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('input', (e) => {
                this.updateCharacterCount(e.target);
            });
        }
    }

    addCharacterCounters() {
        const messageField = document.getElementById('message');
        if (messageField) {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.textContent = '0/1000';
            messageField.parentNode.appendChild(counter);
        }
    }

    updateCharacterCount(field) {
        const counter = field.parentNode.querySelector('.char-counter');
        if (counter) {
            const count = field.value.length;
            const maxLength = field.getAttribute('maxlength') || 1000;
            counter.textContent = `${count}/${maxLength}`;
            
            // Change color based on usage
            if (count > maxLength * 0.8) {
                counter.style.color = '#ff6b6b';
            } else if (count > maxLength * 0.6) {
                counter.style.color = '#ffd93d';
            } else {
                counter.style.color = '#6bcf7f';
            }
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.removeFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Name can only contain letters and spaces';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'phone':
                if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;

            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters long';
                }
                break;

            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        // Apply validation result
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.showFieldSuccess(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    showFieldSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
        
        // Remove error message
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    removeFieldError(field) {
        field.classList.remove('error', 'success');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    handleInput(event) {
        const field = event.target;
        this.validateField(field);
        this.saveFormData();
    }

    handleBlur(event) {
        const field = event.target;
        this.validateField(field);
    }

    handleSubmit(event) {
    event.preventDefault();
    
        if (this.isSubmitting) {
            return;
        }

        // Validate all fields
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fix the errors in the form', 'error');
        return;
    }

        this.submitForm();
    }

    async submitForm() {
        this.isSubmitting = true;
        this.showLoadingState();

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Add metadata
            data.timestamp = new Date().toISOString();
            data.userAgent = navigator.userAgent;
            data.referrer = document.referrer;

            // Send email using EmailJS
            await this.sendEmail(data);
    
            // Store in localStorage as backup
            this.storeContactData(data);
    
            // Show success message
            this.showNotification('Message saved successfully! Use "View Messages" to see all stored messages.', 'success');
    
            // Reset form
            this.resetForm();

            // Clear saved data
            this.clearSavedData();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to save message. Please try again.', 'error');
        } finally {
            this.isSubmitting = false;
            this.hideLoadingState();
        }
    }

    async sendEmail(data) {
        // Store message locally only - no email sending
        console.log('📝 Storing message locally...');
        
        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('✅ Message stored successfully');
        return { status: 'stored_locally' };
    }

    storeContactData(data) {
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push(data);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    saveFormData() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        localStorage.setItem('contactFormDraft', JSON.stringify(data));
    }

    loadSavedData() {
        const savedData = localStorage.getItem('contactFormDraft');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = this.form.querySelector(`[name="${key}"]`);
                    if (field && data[key]) {
                        field.value = data[key];
                        this.updateCharacterCount(field);
                    }
                });
            } catch (error) {
                console.error('Error loading saved form data:', error);
            }
        }
    }

    clearSavedData() {
        localStorage.removeItem('contactFormDraft');
    }

    resetForm() {
        this.form.reset();
        
        // Clear validation states
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            this.removeFieldError(field);
            this.updateCharacterCount(field);
        });

        // Reset character counters
        const counters = this.form.querySelectorAll('.char-counter');
        counters.forEach(counter => {
            counter.textContent = '0/1000';
            counter.style.color = '#6bcf7f';
        });
    }

    showLoadingState() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        }
    }

    hideLoadingState() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Message';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        gsap.fromTo(notification, 
            { x: 300, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
        
        // Auto remove after 5 seconds
    setTimeout(() => {
            if (notification.parentElement) {
                gsap.to(notification, {
                    x: 300,
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (notification.parentElement) {
                            notification.parentElement.removeChild(notification);
                        }
                    }
                });
            }
    }, 5000);
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

    // Utility methods
    exportContacts() {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        if (contacts.length === 0) {
            this.showNotification('No contacts to export', 'info');
            return;
        }

        const csvContent = this.convertToCSV(contacts);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showNotification('Contacts exported successfully!', 'success');
    }

    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header] || '';
                return `"${value.toString().replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    getContactStats() {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        return {
            total: contacts.length,
            thisMonth: contacts.filter(c => {
                const contactDate = new Date(c.timestamp);
                const now = new Date();
                return contactDate.getMonth() === now.getMonth() && 
                       contactDate.getFullYear() === now.getFullYear();
            }).length,
            lastWeek: contacts.filter(c => {
                const contactDate = new Date(c.timestamp);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return contactDate >= weekAgo;
            }).length
        };
    }

    // View stored contact messages
    viewStoredMessages() {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        
        if (contacts.length === 0) {
            this.showNotification('No stored messages found.', 'info');
            return;
        }

        // Create modal to display messages
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="contact-modal-content">
                <div class="contact-modal-header">
                    <h3>Stored Contact Messages (${contacts.length})</h3>
                    <button class="modal-close" onclick="this.closest('.contact-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="contact-modal-body">
                    ${contacts.map((contact, index) => `
                        <div class="contact-message">
                            <div class="message-header">
                                <strong>${contact.name}</strong> (${contact.email})
                                <span class="message-date">${new Date(contact.timestamp).toLocaleString()}</span>
                            </div>
                            <div class="message-subject"><strong>Subject:</strong> ${contact.subject}</div>
                            ${contact.phone ? `<div class="message-phone"><strong>Phone:</strong> ${contact.phone}</div>` : ''}
                            <div class="message-content">${contact.message}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="contact-modal-footer">
                    <button class="btn btn-secondary" onclick="window.contactFormManager.exportContacts()">
                        <i class="fas fa-download"></i> Export CSV
                    </button>
                    <button class="btn btn-primary" onclick="window.contactFormManager.clearAllMessages()">
                        <i class="fas fa-trash"></i> Clear All
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate modal in
        gsap.fromTo(modal, 
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
        );
    }

    clearAllMessages() {
        if (confirm('Are you sure you want to delete all stored messages?')) {
            localStorage.removeItem('contacts');
            this.showNotification('All messages cleared.', 'success');
            document.querySelector('.contact-modal')?.remove();
        }
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and store the contact form manager globally
    window.contactFormManager = new ContactFormManager();
    console.log('✅ Contact Form Manager initialized');
});

// Fallback initialization
if (document.readyState === 'loading') {
    // DOM is still loading
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.contactFormManager) {
            window.contactFormManager = new ContactFormManager();
            console.log('✅ Contact Form Manager initialized (fallback)');
        }
    });
} else {
    // DOM is already loaded
    if (!window.contactFormManager) {
        window.contactFormManager = new ContactFormManager();
        console.log('✅ Contact Form Manager initialized (immediate)');
    }
}

// Global function for form submission (for backward compatibility)
window.submitContact = function(event) {
    if (window.contactFormManager) {
        window.contactFormManager.handleSubmit(event);
    } else {
        console.error('Contact form manager not initialized');
        // Try to initialize if not already done
        window.contactFormManager = new ContactFormManager();
        window.contactFormManager.handleSubmit(event);
    }
};

window.exportContacts = function() {
    if (window.contactFormManager) {
        window.contactFormManager.exportContacts();
    }
};

// Add contact form styles
const contactFormStyles = `
.field-error {
    color: #ff6b6b;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    display: none;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #ff6b6b;
    box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
}

.form-group input.success,
.form-group textarea.success {
    border-color: #6bcf7f;
    box-shadow: 0 0 10px rgba(107, 207, 127, 0.3);
}

.char-counter {
    text-align: right;
    font-size: 0.8rem;
    color: #6bcf7f;
    margin-top: 0.5rem;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--background-darker);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 1rem 1.5rem;
    color: var(--text-primary);
    z-index: 10000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification-success {
    border-color: #6bcf7f;
    background: rgba(107, 207, 127, 0.1);
}

.notification-error {
    border-color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
}

.notification-warning {
    border-color: #ffd93d;
    background: rgba(255, 217, 61, 0.1);
}

.notification-info {
    border-color: var(--primary-color);
    background: rgba(0, 255, 255, 0.1);
}

.notification-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.notification-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
}

.contact-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
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
`;

// Inject contact form styles
const contactFormStyleSheet = document.createElement('style');
contactFormStyleSheet.textContent = contactFormStyles;
document.head.appendChild(contactFormStyleSheet);