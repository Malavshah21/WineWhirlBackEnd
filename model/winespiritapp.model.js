const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Wine = new Schema({
    name: {
        type: String, 
    },
    price:{
        type: Number,
    },
    cardholdername:{
        type:String,
    },
    quantity: {
        type:Number,
    },
    datePurchased :{
         type: Date,
    },
    expirationDate: {
        type: Date,
    },
    wineType: {
        type: String,
    },

});

module.exports = mongoose.model('Wine', Wine);