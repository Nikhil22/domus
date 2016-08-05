'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConvoSchema = new Schema({
    u: {type: Schema.ObjectId, ref: 'UserSchema'},
    template: {type: Schema.ObjectId, ref: 'ConvoTemplateSchema'},
    msg: String,
    to: String,
    src: {
        type: String,
        enum: ['twilio']
    }
});

mongoose.model('Convo', ConvoSchema);
