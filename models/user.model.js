'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    number: String,
    name: String,
    preferences: {type: Schema.ObjectId, ref: 'Preference'},
    lastRecvdMsg: {type: Schema.ObjectId, ref: 'Convo'},
    lastRecvdMsgDate: Date,
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

UserSchema.index({ number: 1 });
mongoose.model('User', UserSchema);
