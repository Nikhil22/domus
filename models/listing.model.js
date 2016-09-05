'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    city: String,
    hood: String, //neighbourhood
    street: String,
    address: String,
    zip: String,
    loc : {
        type: [Number],
        index : '2d'
    },
    price: Number,
    bdrm: Number,
    den: Number,
    bath: Number,
    amenties: [String],
    exposure: String,
    name: String
});

ListingSchema.index({ u: 1 });

mongoose.model('Listing', ListingSchema);
