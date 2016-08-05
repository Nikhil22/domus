'use strict';

const config = require('../config/config');
const twilio = require('twilio')(config.twilio.ACCOUNT_SID, config.twilio.AUTH_TOKEN);
const msgCtrl = require('./message');

exports.sendMessage = ({ to, body }) => new Promise((resolve, reject) => {
    twilio.sendMessage({to, from: config.twilio.phoneNumber, body}, (err, response) => {
        if (!!err) {
            return reject(err);
        }
        resolve(response);
    });
});

exports.messageRecieved = (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send('<Response/>'); // stops twilio response

    if (!req || !req.body) {
        // TODO: error handle
        return;
    }
    const body = req.body;
    body.src = 'twilio';

    msgCtrl.checkRegisteredUser(body);
};
