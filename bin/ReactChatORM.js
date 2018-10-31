'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//connection to the database
mongoose.connect('mongodb://db/reactChat')

let messageSchema = new Schema({
    email: String,
    message: String,
    createdAt: {type: Date, default: Date.now}
})

//creating model
let Message = mongoose.model('Message', messageSchema);

module.exports = Message;