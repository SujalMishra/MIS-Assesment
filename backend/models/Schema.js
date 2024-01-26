const mongoose = require("mongoose");
const { Schema } = mongoose;

const RideSchema = new Schema({
    driverName: { type: String, required: true,},
    driverPhoneNumber: { type: String, required: true,},
    cabNumber: {type: String, required: true,},
    startlocation: { type: String, required: true,},
    endlocation: { type: String, required: true,},
});

const feedbackSchema = new Schema({
  to: { type: String, required: true,},
  from: { type: String, required: true,},
  review: { type: String, required: true,},
});

const AdminSchema = new Schema({
    name: { type: String, required: true,},
    email: { type: String, required: true,},
    password: { type: String, required: true,},
});
const TravelerSchema = new Schema({
    name: { type: String,required: true,},
    email:{ type: String, required: true,},
    whatsapp_number: { type: Number, required: true,},
    licenseNumber: { type: String, required: true,default: "NA",},
    password: { type: String, required: true,},
    rides:[],
});

const TripsSchema = new Schema({
    driverName: { type: String, required: true,},
    driverPhoneNumber: { type: String, required: true,},
    cabNumber: { type: String, required: true,},
    startlocation: { type: String, required: true,},
    endlocation: { type: String, required: true,},
    status: { type: String, required: true,},
    numberofCompanions: { type: Number, required: true,},
    companions: [{email: { type: String, required: true,},}],
    startTime: { type: Date,required: true,},
    endTime: { type: Date,required: true,},
    Feedback: [feedbackSchema],
});
module.exports = {
    Ride: mongoose.model("Ride", RideSchema),
    Feedback: mongoose.model("Feedback", feedbackSchema),
    Admin: mongoose.model("Admin", AdminSchema),
    Traveler: mongoose.model("Traveler", TravelerSchema),
    Trips: mongoose.model("Trips", TripsSchema)
};

