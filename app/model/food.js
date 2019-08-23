const mongoose = require('mongoose');

const Schema = mongoose.Schema
const FoodSchema = new Schema({
    id: Number,
    name: String
})
module.exports = mongoose.model('book', FoodSchema, 'food')