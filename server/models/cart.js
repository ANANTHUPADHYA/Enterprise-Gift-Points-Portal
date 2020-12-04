const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const products = require('./products');

const cartProductSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
});
const cartSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    products: [cartProductSchema]
});
const CartItem = mongoose.model('CartItem', cartSchema);

module.exports = CartItem;