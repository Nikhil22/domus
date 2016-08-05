'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MissedListingSchema = new Schema({
    u: {type: Schema.ObjectId, ref: 'User'},
    l: [Number] //listings - array of SQL ids of listings
});

MissedListingSchema.index({ u: 1 });

mongoose.model('Convo', MissedListingSchema);
