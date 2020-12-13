const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('./categories');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: false,
        default: 0
    },

    image: {
        type: String,
        required: true,
        default: ''
    }

});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;