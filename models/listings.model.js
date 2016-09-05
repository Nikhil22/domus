'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    city: String,
    hood: String, //neighbourhood
    street: String,
    intx: String, //intersection
    address: String,
    zip: String,
    loc : {
        type: [Number],
        index : '2d'
    },
    bdgt: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 999999999
        }
    },
    bdrm: Number,
    den: Number,
    bath: Number,
    amenties: [String],
    exposure: String,
    name: String
});

ListingSchema.index({ u: 1 });

mongoose.model('Listing', ListingSchema);
