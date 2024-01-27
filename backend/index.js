const express = require('express');
const app = express();

const port = 4000;

const mongoDB = require('./db');

mongoDB();
app.use(express.json());

app.use('/user', require('./routes/user'));

app.use('/admin', require('./routes/admin'));

app.use('/feedback', require('./routes/feedback'));

app.use('/trip', require('./routes/trip'));

app.use('/traveler', require('./routes/traveler'));

app.use('/geofence', require('./routes/geoFence'));

app.use('/book', require('./routes/book'));

app.use('/status', require('./routes/status'));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is running on port 4000");
})