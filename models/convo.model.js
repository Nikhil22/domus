'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConvoSchema = new Schema({
    u: {type: Schema.ObjectId, ref: 'User'},
    msg: String,
    to: String,
    src: {
        type: String,
        enum: ['twilio']
    },
    id: Number,
    date: Date
});

ConvoSchema.index({ u: 1 });
ConvoSchema.index({ id: 1 });

mongoose.model('Convo', ConvoSchema);
