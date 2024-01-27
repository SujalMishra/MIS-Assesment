const twilio = require('twilio');
const accountSid = 'AC95eb4bc976a7d1c3fdf010af6d15342f';
const authToken = 'b64dda4842088d6763a17dee4f6600aa';

const twilioClient = twilio(accountSid, authToken);

const geoSend = async (req, res) => {
    const { eventType, geofenceId, location, timestamp, phone_num } = req.body;

    // Handle the geofence event
    console.log(`Received ${eventType} event for geofence ${geofenceId} at ${location.lat}, ${location.lng} - ${timestamp}, ${phone_num}`);

    // Send WhatsApp notification
    console.log(eventType, geofenceId, location, timestamp, phone_num);
    await sendWhatsAppNotification(eventType, geofenceId, location, timestamp, phone_num);

    // Respond to the mobile app
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