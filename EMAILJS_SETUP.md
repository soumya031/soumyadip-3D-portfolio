# EmailJS Setup Guide

This guide will help you set up EmailJS to send contact form messages directly to your email account.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your email account (soumyadipsaha743@gmail.com)
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Message from {{from_name}}

Hello Soumyadip,

You have received a new message from your portfolio website:

**From:** {{from_name}}
**Email:** {{from_email}}
**Phone:** {{from_phone}}
**Subject:** {{subject}}

**Message:**
{{message}}

---
Sent from: {{referrer}}
Time: {{timestamp}}
User Agent: {{user_agent}}
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Your Code

Replace the placeholder values in `JS/contactForm.js`:

```javascript
// In the initEmailJS() method:
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");

// In the sendEmail() method:
const response = await emailjs.send(
    'YOUR_ACTUAL_SERVICE_ID',    // Replace with your service ID
    'YOUR_ACTUAL_TEMPLATE_ID',   // Replace with your template ID
    templateParams
);
```

## Step 6: Test the Setup

1. Start your local server: `python -m http.server 8000`
2. Open your portfolio: `http://localhost:8000`
3. Go to the Contact section
4. Fill out and submit the form
5. Check your email (soumyadipsaha743@gmail.com) for the message

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined"**
   - Make sure the EmailJS script is loaded in your HTML
   - Check the browser console for errors

2. **"Service ID not found"**
   - Verify your Service ID is correct
   - Make sure your email service is properly connected

3. **"Template ID not found"**
   - Verify your Template ID is correct
   - Check that the template is published

4. **"Public Key invalid"**
   - Verify your Public Key is correct
   - Make sure you're using the Public Key, not Private Key

### Testing Without EmailJS:

If you want to test the form without setting up EmailJS, you can temporarily comment out the EmailJS initialization:

```javascript
initEmailJS() {
    // Temporarily disable EmailJS for testing
    // emailjs.init("YOUR_PUBLIC_KEY");
    console.log('EmailJS disabled for testing');
}
```

## Security Notes

- The Public Key is safe to use in client-side code
- Never expose your Private Key
- EmailJS has rate limiting on free accounts (200 emails/month)
- Consider upgrading to a paid plan for production use

## Alternative Solutions

If you prefer not to use EmailJS, you can also:

1. **Use a backend server** (Node.js, Python, PHP)
2. **Use Netlify Forms** (if hosting on Netlify)
3. **Use Formspree** (similar to EmailJS)
4. **Use Google Forms** (redirect to Google Form)

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Community: https://community.emailjs.com/
- Free tier limits: 200 emails/month 