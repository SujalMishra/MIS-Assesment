const twilio = require('twilio');
require('dotenv').config();
const accountSid = process.env.Twilio_Sid; 
const authToken = process.env.Twilio_Token;
const twilioClient = twilio(accountSid, authToken);

const geoSend = async (req, res) => {
    const { eventType, geofenceId, location, timestamp, phone_num } = req.body;

    
    console.log(`Received ${eventType} event for geofence ${geofenceId} at ${location.lat}, ${location.lng} - ${timestamp}, ${phone_num}`);

    
    console.log(eventType, geofenceId, location, timestamp, phone_num);
    await sendWhatsAppNotification(eventType, geofenceId, location, timestamp, phone_num);

   
    res.status(200).send('Geofence event received');
};


async function sendWhatsAppNotification(eventType, geofenceId, location, timestamp, recWhatsappNumber) {
    try {
        const messageBody = `Your ride is ready to Geofence event (${eventType})}`;

        // Replace 'whatsapp:+1234567890' with the recipient's phone number in E.164 format
        const recipientPhoneNumber = `whatsapp:+91${recWhatsappNumber}`;

        await twilioClient.messages.create({
            from: 'whatsapp:+14155238886', // Replace with your Twilio WhatsApp Business number
            body: messageBody,
            to: recipientPhoneNumber,
        });

        console.log('WhatsApp notification sent successfully.');
    } catch (error) {
        console.error('Error sending WhatsApp notification:', error);
    }
}

module.exports = { geoSend };