require('dotenv').config();
const twilio = require('twilio');

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // ✅ Fetch Twilio Credentials from Vercel Environment Variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const twilioClient = twilio(accountSid, authToken);

    try {
        const { recipient } = req.body; // Accept recipient number from request

        if (!recipient) {
            return res.status(400).json({ error: "Recipient phone number is required" });
        }

        const call = await twilioClient.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml', // Twilio XML file
            to: recipient, // Use dynamic number from request
            from: twilioPhoneNumber
        });

        res.json({ success: true, callSid: call.sid });
    } catch (error) {
        console.error("Error making call:", error);
        res.status(500).json({ error: error.message });
    }
};
