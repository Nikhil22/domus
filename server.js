'use strict';

var express  = require('express'),
    app      = express(),
    port     = 3000,
    mongoose = require('mongoose'),
    config   = require('./config/config');

//mongodb
mongoose.connect(config.mongo, (err) => {
    if (!!err) {
        console.log(`Error connecting to MongoDB: ${err}`);
        return;
    }
    console.log('Connected to MongoDB');
});

//models
require('./models/user.model');
require('./models/preference.model');
require('./models/convo.model');
require('./models/listing.model');
require('./models/usermissedlisting.model');

//route files
require('./routes/twilio')(app);
require('./routes/onboarding')(app);

app.use((req, res) => {
    res.send('Oops, page not found');
});

module.exports = app;

app.listen(port);
