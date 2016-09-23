'use strict';

const convoTemplates = require('../config/templates');
const twilioCtrl = require('./twilio');
const userCtrl = require('./user');
const mongoose = require('mongoose');
const moment = require('moment');
const User = mongoose.model('User');
const Convo = mongoose.model('Convo');

const saveMessage = ({ number, src, msg, id }) => {
    let convo;
    let type;

    if (!!id || id === 0) {
        type = 'sent';
    }

    User.findOne({number}).lean()
    .then((user) => {
        convo = new Convo({u: user._id, msg, to: number, src, date: new Date()});
        if (!!type) {
            convo.id = id;
        }
        return convo.save();
    })
    .then(() => {
        if (!!type) {
            User.update({number}, {lastRecvdMsg: convo._id, lastRecvdMsgDate: new Date()}).exec();
        }
    })
    .catch((ex) => {
        // TODO: error handle
    });
};

const sendMessage = ({ number, src, msg, id}) => {
    twilioCtrl.sendMessage({to: number, body: msg})
    .then(() => {
        saveMessage({number, src, msg, id});
    })
    .catch((ex) => {
        // TODO: error handle
    });
};

const sendDefaultMessage = ({ number, src }) => {
    sendMessage({number, src, msg: convoTemplates.default.text, id: convoTemplates.default.text});
};

const sendWelcomeMessage = exports.sendWelcomeMessage = ({ number, src }) => {
    const msg = `${convoTemplates.welcome.link}/${number}`;
    sendMessage({number, src, msg, id: convoTemplates.welcome.id});
};

const processDefaultMessage = ({ number, src, msg }) => {

};

const processListingMessage = ({ number, src, msg, lastRecvdMsg }) => {

};

const processMessage = ({ number, msg, src, lastRecvdMsg }) => {
    const lastId = lastRecvdMsg.id;
    if (lastId === 1) { // response to welcome message

    } else if (lastId === 2) { //response to default message
        processDefaultMessage({number, src, msg});
    } else if (lastId === 3) { //response to listing message
        processListingMessage({number, src, msg, lastRecvdMsg});
    } else { //don't know -> ping us
        // TODO: error
    }
};

const processLastSentMessage = ({ number, lastRecvdMsg, lastRecvdMsgDate, msg, isOnboarded }) => {
    const src = lastRecvdMsg.src;

    if (msg.toLowerCase().indexOf('help') !== -1) {
        sendDefaultMessage({number, src});
    } else if (!isOnboarded) {
        sendWelcomeMessage({number, src});
    } else if (isOnboarded && !!lastRecvdMsg && moment(lastRecvdMsgDate).isAfter(moment().subtract(6, 'hours'))) {
        processMessage({number, msg, src, lastRecvdMsg});
    } else {
        sendDefaultMessage({number, src});
    }
};

exports.checkRegisteredUser = ({ From: from, Body: message, src }) => {
    const number = from;
    userCtrl.getUserDetails({number})
    .then((user) => {
        if (!user) {
            return userCtrl.addUser({number, src});
        } else {
            user.msg = message;
            processLastSentMessage(user);
        }
    })
    .then(() => {
        saveMessage({number, src, msg: message});
    })
    .catch((ex) => {
        // TODO: error handle
    });
};
