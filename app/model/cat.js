const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CatSchema = new Schema({
    id: String,
    color: String,
    foodId: String
})
module.exports = mongoose.model('cat', CatSchema, 'cat');