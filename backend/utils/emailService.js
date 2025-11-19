const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send order confirmation email
 * @param {Object} orderData - Order information
 * @returns {Promise} Email sending result
 */
async function sendOrderConfirmationEmail(orderData) {
    try {
        const { email, firstName, lastName, orderId, items, total } = orderData;

        // Format order items for email
        const itemsList = items.map(item => 
            `- ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
        ).join('\n');

        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #e74c3c; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background-color: #f9f9f9; }
                    .order-details { background-color: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    .total { font-size: 20px; font-weight: bold; color: #e74c3c; margin-top: 15px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Order Confirmation</h1>
                    </div>
                    <div class="content">
                        <h2>Thank you for your order, ${firstName}!</h2>
                        <p>Your order has been confirmed and will be delivered soon.</p>
                        
                        <div class="order-details">
                            <h3>Order Details</h3>
                            <p><strong>Order ID:</strong> ${orderId}</p>
                            <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
                            
                            <h4>Items Ordered:</h4>
                            <pre style="white-space: pre-wrap;">${itemsList}</pre>
                            
                            <div class="total">
                                <p>Total Amount: ₹${total}</p>
                            </div>
                        </div>
                        
                        <p>We'll send you another email when your order is shipped.</p>
                        <p>If you have any questions, please contact our support team.</p>
                    </div>
                    <div class="footer">
                        <p>CampusKart - Your Campus Essentials Store</p>
                        <p>© 2024 CampusKart. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const emailText = `
Order Confirmation - CampusKart

Thank you for your order, ${firstName}!

Order ID: ${orderId}
Order Date: ${new Date().toLocaleString()}

Items Ordered:
${itemsList}

Total Amount: ₹${total}

Your order will be delivered within 3-5 business days.

Thank you for shopping with CampusKart!
        `;

        const { data, error } = await resend.emails.send({
            from: 'CampusKart <onboarding@resend.dev>', // Update with your verified domain
            to: email,
            subject: `Order Confirmation - ${orderId}`,
            html: emailHtml,
            text: emailText,
        });

        if (error) {
            console.error('Resend email error:', error);
            throw error;
        }

        console.log('Order confirmation email sent successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw error;
    }
}

/**
 * Send welcome email after signup
 * @param {Object} userData - User information
 * @returns {Promise} Email sending result
 */
async function sendWelcomeEmail(userData) {
    try {
        const { email, name } = userData;

        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #e74c3c; color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; background-color: #f9f9f9; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to CampusKart!</h1>
                    </div>
                    <div class="content">
                        <h2>Hello ${name}!</h2>
                        <p>Thank you for joining CampusKart. We're excited to have you!</p>
                        <p>Start shopping for all your campus essentials at student-friendly prices.</p>
                        <p>Happy Shopping!</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const { data, error } = await resend.emails.send({
            from: 'CampusKart <onboarding@resend.dev>',
            to: email,
            subject: 'Welcome to CampusKart!',
            html: emailHtml,
        });

        if (error) {
            console.error('Resend email error:', error);
            return { success: false, error };
        }

        console.log('Welcome email sent successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, error };
    }
}

module.exports = {
    sendOrderConfirmationEmail,
    sendWelcomeEmail
};

