const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
    bookDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },

    issueDate: {
        type: Date,
        default: Date.now()
    },
    returnDate: {
        type: Date,
        default: Date.now() + 14 * 24 * 60 * 60 * 1000
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});


module.exports = mongoose.model("Borrow", borrowSchema);