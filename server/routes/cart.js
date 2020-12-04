var express = require('express');
var cartRouter = express.Router();
const CartItems = require('../models/cart');
const Users = require('../models/users');
const authenticate = require('../authenticate');
const nodemailer = require('nodemailer');
const cors = require('./cors');
const config = require('../config');
const path = require('path');
const Product = require('../models/products');
const Category = require('../models/categories');
var uuid = require('uuid');
const transport = nodemailer.createTransport(config.nodemailer_config);


cartRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    CartItems.find({ email: req.query.email })
        .populate({
            path: 'products.product',
            model: 'Product',
            populate: {
                path: 'category',
                model: 'Category'
            }
        })
        .then((items) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const response = { 'success': true, 'data': items };
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});
cartRouter.get('/count', authenticate.verifyUser, (req, res, next) => {
    CartItems.findOne({ email: req.query.email }).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (resp) {
                const response = { 'success': true, 'data': resp.products.length };
                res.json(response);
            } else {
                const response = { 'success': false, 'data': 'No products added to cart' };
                res.json(response);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});
cartRouter.post('/addToCart', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    CartItems.find({ email: req.query.email })
        .then((cartItems) => {
            if (cartItems.length) {
                CartItems.find({ $and: [{ email: req.query.email }, { products: { $elemMatch: { product: req.body.product } } }] })
                    .then((existingProd) => {
                        if (existingProd.length) {
                            CartItems.update({ email: req.query.email, 'products.product': req.body.product }, { $inc: { 'products.$.quantity': 1 } })
                                .then((resp) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    const response = { 'success': true, 'data': 'Product is added to the cart successfully' };
                                    res.json(response);
                                }, (err) => next(err));
                        } else {
                            CartItems.updateOne({ email: req.query.email }, { $push: { products: req.body } })
                                .then((resp) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    const response = { 'success': true, 'data': 'Product is added to the cart successfully' };
                                    res.json(response);
                                }, (err) => next(err));
                        }
                    });
            } else {
                CartItems.create({ 'email': req.query.email })
                    .then((cartOfUser) => {
                        cartOfUser.products.push(req.body);
                        cartOfUser.save()
                            .then((resp) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                const response = { 'success': true, 'data': 'Product is added to the cart successfully' };
                                res.json(response);
                            }, (err) => next(err));
                    }, (err) => next(err));
            }
        }, (err) => next(err))
});

cartRouter.put('/updateQuantity/:productId', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    CartItems.update({ email: req.query.email, 'products.product': req.params.productId }, { $set: { 'products.$.quantity': req.body.quantity } })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const response = { 'success': true, 'data': 'Updated cart successfully' };
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});
cartRouter.delete('/deleteProduct/:productId', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    CartItems.update({ email: req.query.email }, { $pull: { 'products': { 'product': req.params.productId } } })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const response = { 'success': true, 'data': 'Deleted product successfully' };
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});

cartRouter.post('/checkout', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    var relativePath = path.relative(__dirname, './server/public/images/yoyo.png');
    var id = uuid.v4();
    var mailOptions = {
        from: req.body.firstname + ' ' + req.body.lastname + '<' + req.query.email + '>',
        to: req.body.email,
        subject: 'Yoyo Gift Card',
        html: '<b>Hey there! </b><br> Congratulations!! Your friend ' + req.body.firstname + ' ' + req.body.lastname + ' has gifted you a gift card!!! <br /><br /> Please use following code to avail the gift card:' + id + '<br/><br /> Following are the gifts you can buy: ' + req.body.prodList + ' <br/><br /> <b>Message from your friend:</b><i>' + req.body.message + '</i><br/><br/><br/><b>Happy Shopping!! </b> ',
        attachments: [{
            filename: 'yoyo.png',
            path: relativePath
        }]
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            const response = { 'success': false, 'data': `Email could not sent due to error:${error}` };
            res.json(response);
        }
        CartItems.update({ email: req.query.email }, { $set: { products: [] } })
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                const response = { 'success': true, 'data': 'Sent gift cards successfully' };
                res.json(response);
            }, (err) => next(err));
        /* Users.update({ email: req.user.email }, { $set: { yoyoPoints: req.body.remainingPoints } })
            .then((resp) => {
                CartItems.update({ email: req.user.email }, { $set: { products: [] } })
                    .then(resp => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        const response = { 'success': true, 'data': 'Sent gift cards successfully' };
                        res.json(response);
                    }, (err) => next(err));
            }, (err) => next(err)); */
        const response = { 'success': true };
        res.json(response);
    });


});

module.exports = cartRouter;