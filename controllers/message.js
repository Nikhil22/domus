'use strict';

const twilioCtrl = require('./twilio');
const userCtrl = require('./user');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const saveMessage = ({ number, src, msg }) => {
    User.findOne({number}).lean()
    .then((user) => {
        let convo = new Convo({u: user._id, msg, to: number, src});
        return convo.save();
    })
    .then(() => {
        User.update({number}, {lastRecdMsg: convo._id, lastRecdMsgDate: new Date()}).exec();
    })
    .catch((ex) => {
        // TODO: error handle
    });
};

const sendMessage = ({ number, src, msg}) => {
    twilioCtrl.sendMessage({to: number, body: msg})
    .then(() => {
        saveMessage({number, src, msg});
    })
    .catch((ex) => {
        // TODO: error handle
    })
};

const processLastSentMessage = ({ number, lastRecdMsg }) => {

};

exports.checkRegisteredUser = ({ From: from, Body: message, src }) => {
    userCtrl.getUserDetails({number: from})
    .then((user) => {
        if (!user) {
            userCtrl.addUser({number: from, src})
        } else {
            processLastSentMessage(user);
        }
    })
    .catch((ex) => {
        // TODO: error handle
    });
};

exports.sendWelcomeMessage = ({ number, src }) => {
    // TODO: debug
    const msg = 'onboarding link';
    sendMessage({number, src, msg});
};
