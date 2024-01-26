const express = require('express');
const app = express();
const router = express.Router();
const port = 4000;
const mongoDB = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "secret";
const twilio = require('twilio');
const accountSid = 'AC95eb4bc976a7d1c3fdf010af6d15342f';
const authToken = 'b64dda4842088d6763a17dee4f6600aa';

const { Traveler,Trips,Feedback,Admin } = require('./models/Schema');

const twilioClient = twilio(accountSid, authToken);

mongoDB();   
app.use(express.json());


app.post('/geofence-event', async (req, res) => {
    const { eventType, geofenceId, location, timestamp,rec_mail } = req.body;
  
    // Handle the geofence event
    console.log(`Received ${eventType} event for geofence ${geofenceId} at ${location.lat}, ${location.lng} - ${timestamp}, ${rec_mail}`);
  
    // Send WhatsApp notification
    await sendWhatsAppNotification(eventType, geofenceId, location, timestamp);
  
    // Respond to the mobile app
    res.status(200).send('Geofence event received');
  });

    
  async function sendWhatsAppNotification(eventType, geofenceId, location, timestamp,recWhatsappNumber) {
    try {
      const messageBody = `Your ride is ready to Geofence event (${eventType})}`;
  
      // Replace 'whatsapp:+1234567890' with the recipient's phone number in E.164 format
      const recipientPhoneNumber = 'whatsapp:+919652066986';
  
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

    app.post('/signupuser',async (req,res)=>{
        console.log("Called");
        
        let {email,name,password,whatsapp_number,licenseNumber} = req.body;
        const salt = await bcrypt.genSalt(10)
        let trips = [];
    const hash = await bcrypt.hash(password, salt)
        try {
            await Traveler.create({
                name:name,
                password:hash,
                email:email,
                whatsapp_number:whatsapp_number,
                licenseNumber:licenseNumber,
                trips:trips
            })
            console.log("Success");
            res.json({success:true});
        } catch (error) {
            console.log("db error"+error);
            res.json({success:false});
        }
    });

    app.post('/loginuser',async (req,res)=>{

        let email = req.body.email;
        try {
            let userData = await Traveler.findOne({email});
            if(!userData){
            return res.status(400).json({errors:"Try logging with right credentials"});
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
            if( !pwdCompare ){
            console.log(req.body.password +" "+userData.password);
            return res.status(400).json({errors:"Try logging1 with right credentials"});
            }

            const data = {
            user:{
                id:userData.id
            }
            }
            const authToken = jwt.sign(data,jwtSecret);
            return res.json({success:true,userData,authToken:authToken});
        } catch (error) {
            console.log("db error"+error);
            res.json({success:false});
        }
    });
 
  app.post('/loginadmin',async (req,res)=>{
     let email = req.body.email;
    try {
        let userData = await Admin.findOne({email});
        if(!userData){
        return res.status(400).json({errors:"Try logging with right credentials"});
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
        if( !pwdCompare ){
        console.log(req.body.password +" "+userData.password);
        return res.status(400).json({errors:"Try logging1 with right credentials"});
        }

        const data = {
        user:{
            id:userData.id
        }
        }
        const authToken = jwt.sign(data,jwtSecret);
        return res.json({success:true,authToken:authToken});
  } catch (error) {
        console.log("db error"+error);
        res.json({success:false});
    }});


    app.post('/addtrip',async (req,res)=>{
        let {driverName,driverPhoneNumber,cabNumber,startlocation,endlocation,status,numberofCompanions,companions,startTime,endTime,Feedback} = req.body;
        try {
            await Trips.create({
                driverName:driverName,
                driverPhoneNumber:driverPhoneNumber,
                cabNumber:cabNumber,
                startlocation:startlocation,
                endlocation:endlocation,
                status:status,
                numberofCompanions:numberofCompanions,
                companions:companions,
                startTime:startTime,
                endTime:endTime,
                Feedback:Feedback,
            })
            console.log("Success");  
            res.json({success:true});
        } catch (error) {
            console.log("db error"+error);
            res.json({success:false});
        }
      });

      app.post('/addfeedback',async (req,res)=>{
        let {to,from,review} = req.body;
        try {
            await Feedback.create({
                to:to,
                from:from,
                review:review,
            })
            console.log("Success");
            res.json({success:true});
        } catch (error) {
            console.log("db error"+error);
            res.json({success:false});
        }
      });

      app.get('/gettrips',async (req,res)=>{
        try {
            let tripsData = await Trips.find();
            console.log("Success");
            res.json({success:true,tripsData});
        } catch (error) {
            console.log("db error"+error);
            res.json({success:false});
        }
      });

        //get feedback of particular trip from its id
        app.get('/getfeedback/:id',async (req,res)=>{
            try {
                let feedbackData = await Feedback.find({to:req.params.id});
                console.log("Success");
                res.json({success:true,feedbackData});
            } catch (error) {
                console.log("db error"+error);
                res.json({success:false});
            }});

        app.get('/getfeedback',async (req,res)=>{
        try {
            let feedbackData = await Feedback.find();
            console.log("Success");
            res.json({success:true,feedbackData});
        } catch (error) {
            console.log("db error"+error);
            res.json({success:false});
        }});

    
        app.get('/gettravelers',async (req,res)=>{
            try {
                let travelersData = await Traveler.find();
                console.log("Success");
                res.json({success:true,travelersData});
            } catch (error) {
                console.log("db error"+error);
                res.json({success:false});
            }});
            
      
app.get('/',(req,res)=>{
    res.send("Hello World");    
})
 


app.listen(port,()=>{
    console.log("Server is running on port 4000");
})