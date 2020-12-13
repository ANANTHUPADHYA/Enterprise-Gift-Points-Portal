var express = require('express');
var productsRouter = express.Router();
const Products = require('../models/products');
const authenticate = require('../authenticate');
const cors = require('./cors');
const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('../config.js');
const { S3 } = require('aws-sdk');


function uploadFile(filename, fileDirectoryPath) {
    AWS.config.update({
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const s3 = new AWS.S3();


    return new Promise(function(resolve, reject) {
        fs.readFile(fileDirectoryPath.toString(), function(err, data) {
            if (err) { reject(err); }
            s3.putObject({
                Bucket: process.env.S3_BUCKET,
                Key: filename,
                Body: data
            }, function(err, data) {
                if (err) reject(err);
                resolve(data);

            });
        });
    });
}



/* GET users listing. */
productsRouter.get('/', cors.corsWithOptions, (req, res, next) => {
    Products.find({}).populate('category').then((products) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const response = { "success": true, "data": products };
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});

productsRouter.get('/count', cors.corsWithOptions, (req, res, next) => {
    Products.find({}).count().then((products) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const response = { "success": true, "data": products };
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});

productsRouter.post('/addProduct', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, async function(req, res, next) {
    console.log(req.file)
    const size = req.file.size / 1024 / 1024;
    if (size <= 10) {
        let response = await uploadFile(req.file.originalname, req.file.path);
        if (response) {
            let params = {}
            params['image'] = process.env.CLOUD_FRONT_URL + '/' + req.file.originalname;
            params['discount'] = req.body.discount;
            params['name'] = req.body.name;
            params['category'] = req.body.category;
            params['price'] = req.body.price;
            params['description'] = req.body.description;
            Products.create(params).then((item) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    const response = { "success": true, "data": "Inserted successfully" };
                    res.json(response);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    }
});

productsRouter.delete('/deleteProduct/:productId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findByIdAndRemove(req.params.productId).then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const response = { "success": true, "data": "Deleted product successfully" };
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});

productsRouter.put('/editProduct/:productId', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.findByIdAndUpdate(req.params.productId, { $set: req.body })
        .then((item) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            const response = { "success": true, "data": "Updated Successfully" };
            res.json(response);
        })
        .catch((err) => next(err));
});


module.exports = productsRouter;