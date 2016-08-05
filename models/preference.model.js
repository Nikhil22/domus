'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//city, neighbourhood, street, intersection, address, budget, bedrooms, den, bath, amenities, exposure, condo name
const PreferenceSchema = new Schema({

});

mongoose.model('Preference', PreferenceSchema);
