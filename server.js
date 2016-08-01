'use strict';

var express = require('express'),
    app     = express(),
    port    = 3000;

//route files
require('./routes/twilio')(app);

app.use(function(req, res) {
    res.send('Oops, page not found');
});

module.exports = app;

app.listen(port);
