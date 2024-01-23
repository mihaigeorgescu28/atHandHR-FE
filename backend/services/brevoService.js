// brevoService.js
import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; // Use process.env to access environment variables;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();



class BrevoService {
    async sendPasswordResetEmail(email, fullName) {
        const sendSmtpEmail = {
            to: [{ email, name: fullName }],
            templateId: 2, // Replace with your templateId
            params: { fullName },
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
            }
        };

        try {
            const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log('Brevo API called successfully. Returned data:', data);
            return { status: 200, data: { message: 'User password successfully reset' } };
        } catch (error) {
            console.error('Error sending email through Brevo API:', error);
            return { status: 500, data: { error: 'Failed to reset user password. Please try again later.' } };
        }
    }

    // Other methods for interacting with the Brevo API
}

export default new BrevoService();
