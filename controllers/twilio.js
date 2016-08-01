'use strict';

const config = require('../config/config');
const twilio = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN);
const sqlCtrl = require('./sql');

const sendMessage = exports.sendMessage = ({ to, from, msg }) => {
    return new Promise((resolve, reject) => {
        twilio.sendMessage({
            to: to,
            from: config.phoneNumber,
            body: msg
        }, (err, response) => {
            if (!!err) {
                reject(err);
            }
            resolve(response);
        });
    });
};

exports.messageRecieved = (req, res) => {

};
