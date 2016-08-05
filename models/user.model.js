'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    number: String,
    name: String,
    preferences: {type: Schema.ObjectId, ref: 'PreferenceSchema'},
    lastRecdMsg: {type: Schema.ObjectId, ref: 'ConvoSchema'},
    lastRecdMsgDate: Date,
    d: { //deleted
        type: Boolean,
        default: false
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    src: {
        type: String,
        enum: ['twilio']
    }
});

mongoose.model('User', UserSchema);
