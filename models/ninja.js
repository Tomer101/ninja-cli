const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//create Schema for ninja
const NinjaSchema = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    rank: {type:String},
    attack: {type:String}
});

// Compile model from schema and export it
const Ninja = mongoose.model('ninja',NinjaSchema);
module.exports = Ninja;