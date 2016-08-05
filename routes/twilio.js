'use strict';

module.exports = function (app) {
    const twilioCtrl = require('../controllers/twilio');

    app.route('/twilio/messageRecieved').post(twilioCtrl.messageRecieved);
};
