const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const aboutSchema = new Schema({
    title: String,
    body: String,
})

module.exports = mongoose.model('About', aboutSchema)