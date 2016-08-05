'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConvoSchema = new Schema({
    u: {type: Schema.ObjectId, ref: 'UserSchema'},
    msg: String,
    to: String,
    src: {
        type: String,
        enum: ['twilio']
    }
});
//msg, to, src

mongoose.model('Convo', ConvoSchema);
