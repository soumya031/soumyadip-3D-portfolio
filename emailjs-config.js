// EmailJS Configuration
// ⚠️ EmailJS is currently DISABLED - messages are stored locally only

const EMAILJS_CONFIG = {
    // Your EmailJS Public Key (from Account > API Keys)
    PUBLIC_KEY: "43gZGsmkKC5JxNheB", // ✅ Configured but disabled
    
    // Your EmailJS Service ID (from Email Services)
    SERVICE_ID: "service_lka7poc", // ✅ Configured but disabled
    
    // Your EmailJS Template ID (from Email Templates)
    TEMPLATE_ID: "template_hfn6go4", // ✅ Configured but disabled
    
    // Your email address where messages will be sent
    TO_EMAIL: "soumyadipsaha743@gmail.com"
};

// ⚠️ EmailJS is DISABLED - Contact form messages are stored locally only
// To enable email sending, uncomment the emailjs.init() line in contactForm.js
// The contact form will now save messages locally and you can view them using "View Messages"

console.log('📧 EmailJS Configuration Loaded (Disabled Mode)');
console.log('💾 Messages will be stored locally - use "View Messages" to see them'); 