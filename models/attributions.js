const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const attributionSchema = new Schema({
    title: String,
    artist: String,
    url: String,
    description: String,
    image: String,
})

module.exports = mongoose.model('Attributions', attributionSchema)