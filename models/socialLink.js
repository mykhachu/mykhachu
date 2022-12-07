const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const socialsSchema = new Schema({
    title: String,
    url: String,
    description: String,
})

module.exports = mongoose.model('Social', socialsSchema)