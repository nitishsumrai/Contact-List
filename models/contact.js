//  require mongoose
const mongoose = require('mongoose');

// schema of the contact collection
const contactSchema = mongoose.Schema({
    //  fields of Document
    name: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    }
});

// creating collection contact
const contact = mongoose.model('Contact',contactSchema);

module.exports = contact;