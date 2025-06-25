# EmailJS Setup Guide for Your Portfolio

Follow these steps to set up EmailJS so contact form messages are sent directly to your email.

## Step 1: Create EmailJS Account

1. **Go to EmailJS:** https://www.emailjs.com/
2. **Click "Sign Up"**
3. **Choose Free Plan** (200 emails/month)
4. **Enter your details:**
   - Email: `soumyadipsaha743@gmail.com`
   - Password: (create a secure password)
5. **Verify your email** (check your inbox)

## Step 2: Add Gmail Service

1. **Login to Dashboard:** https://dashboard.emailjs.com/
2. **Click "Email Services"** in left sidebar
3. **Click "Add New Service"**
4. **Select "Gmail"**
5. **Click "Connect Account"**
6. **Sign in with:** `soumyadipsaha743@gmail.com`
7. **Grant permissions** to EmailJS
8. **Copy your Service ID** (looks like `service_abc123`)

## Step 3: Create Email Template

1. **Click "Email Templates"** in left sidebar
2. **Click "Create New Template"**
3. **Fill in the details:**
   - **Template Name:** `Portfolio Contact Form`
   - **Subject:** `New Contact Form Message from {{from_name}}`
4. **Copy this template content:**

```
Hello Soumyadip,

You have received a new message from your portfolio website:

**From:** {{from_name}}
**Email:** {{from_email}}
**Phone:** {{from_phone}}
**Subject:** {{subject}}

**Message:**
{{message}}

---
**Additional Information:**
- Sent from: {{referrer}}
- Time: {{timestamp}}
- User Agent: {{user_agent}}
```

5. **Click "Save"**
6. **Copy your Template ID** (looks like `template_xyz789`)

## Step 4: Get Your Public Key

1. **Click "Account"** in left sidebar
2. **Click "API Keys"**
3. **Copy your Public Key** (looks like `user_abc123def456`)

## Step 5: Update Configuration File

1. **Open the file:** `emailjs-config.js`
2. **Replace the placeholder values:**

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "user_abc123def456",     // ← Your actual Public Key
    SERVICE_ID: "service_abc123",        // ← Your actual Service ID
    TEMPLATE_ID: "template_xyz789",      // ← Your actual Template ID
    TO_EMAIL: "soumyadipsaha743@gmail.com"
};
```

## Step 6: Test the Setup

1. **Start your server:**
   ```bash
   python -m http.server 8000
   ```

2. **Open your portfolio:**
   ```
   http://localhost:8000
   ```

3. **Go to Contact section**

4. **Fill out and submit the form**

5. **Check your email:** `soumyadipsaha743@gmail.com`

## Troubleshooting

### If you see "EmailJS not configured":
- Make sure you updated `emailjs-config.js` with your actual credentials
- Check that the file is saved
- Refresh the page

### If you see "Service ID not found":
- Verify your Service ID is correct
- Make sure Gmail service is connected properly

### If you see "Template ID not found":
- Verify your Template ID is correct
- Make sure the template is saved and published

### If emails don't arrive:
- Check your spam folder
- Verify the template content is correct
- Check EmailJS dashboard for any errors

## Your Credentials Summary

After setup, you should have:
- **Public Key:** `user_...` (from API Keys)
- **Service ID:** `service_...` (from Email Services)
- **Template ID:** `template_...` (from Email Templates)

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Community: https://community.emailjs.com/
- Free tier: 200 emails/month

## Security Notes

- ✅ Public Key is safe to use in client-side code
- ❌ Never share your Private Key
- ✅ Free tier is sufficient for portfolio use 