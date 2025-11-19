# Email Setup Instructions

## ✅ Resend Package Installed
The `resend` package has been installed in the backend.

## 📝 Create .env File

Since `.env` files are protected, you need to create it manually:

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Create a new file named `.env`** (with the dot at the beginning)

3. **Add the following content:**
   ```
   RESEND_API_KEY=re_YURGRiGm_6D7YvAMdShZkPjt91WgJycWi
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/campuskart
   ```

4. **Save the file**

## 📧 Email Functionality

### What's Implemented:

1. **Order Confirmation Email**
   - Automatically sent when an order is placed
   - Includes order details, items, and total
   - Sent to customer's email address

2. **Welcome Email**
   - Sent after user signup
   - Welcomes new users to CampusKart

### Email Service Location:
- **File**: `backend/utils/emailService.js`
- **Functions**:
  - `sendOrderConfirmationEmail()` - Sends order confirmation
  - `sendWelcomeEmail()` - Sends welcome email

### How It Works:

1. **Order Placement:**
   - User places order in checkout
   - Order is saved to MongoDB
   - Backend automatically sends confirmation email via Resend
   - Email includes order details and receipt

2. **User Signup:**
   - User creates account
   - Account is saved to MongoDB
   - Backend automatically sends welcome email

## 🔧 Testing Email

### Test Order Email:
1. Place an order through checkout
2. Check the email address used in checkout
3. You should receive an order confirmation email

### Test Welcome Email:
1. Create a new account
2. Check the email address used for signup
3. You should receive a welcome email

## ⚠️ Important Notes

1. **Email Sender:**
   - Currently using: `onboarding@resend.dev`
   - For production, you should:
     - Verify your domain in Resend
     - Update the `from` field in `emailService.js`
     - Use: `CampusKart <noreply@yourdomain.com>`

2. **Email Failures:**
   - If email sending fails, the order/user creation still succeeds
   - Errors are logged to console but don't block the operation

3. **Resend Limits:**
   - Free tier: 3,000 emails/month
   - Check your Resend dashboard for usage

## 🐛 Troubleshooting

### Emails Not Sending:
1. Check if `.env` file exists and has correct API key
2. Verify API key is correct in Resend dashboard
3. Check server console for error messages
4. Verify email address is valid

### API Key Issues:
1. Go to https://resend.com/api-keys
2. Verify your API key is active
3. Make sure it's correctly set in `.env` file

## 📋 Email Templates

The email templates are HTML formatted and include:
- Order confirmation with all details
- Welcome message for new users
- Professional styling with CampusKart branding

You can customize the templates in `backend/utils/emailService.js`.

