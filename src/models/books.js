const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
    },
    ISBN: {
        type: Number,
    },

    category: {
        type: String,
    },

    description: {
        type: String,
    },
    stock: {
        type: Number,
    },

});

bookSchema.index({ '$**': 'text' });



module.exports = mongoose.model('Book', bookSchema);
