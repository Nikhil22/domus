'use strict';

const msgCtrl = require('./message');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUserDetails = ({ number }) => new Promise((resolve, reject) => {
    User.findOne({number}).populate('preferences').populate('lastRecvdMsg').lean()
    .then((user) => {
        resolve(user);
    })
    .catch((ex) => {
        reject(ex);
    });
});

exports.addUser = ({ number, src }) => new Promise((resolve, reject) => {
    let user = new User({number, src});
    user.save()
    .then(() => {
        msgCtrl.sendWelcomeMessage({number, src});
        resolve();
    })
    .catch((ex) => {
        reject(ex);
    });
});
