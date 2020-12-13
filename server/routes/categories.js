const express = require('express');
const categoryRouter = express.Router();
const Categories = require('../models/categories');
const authenticate = require('../authenticate');
const cors = require('./cors');
categoryRouter.use(express.json());
categoryRouter.route('/')
.get(cors.corsWithOptions, (req, res, next) => {
    Categories.find({})
     .then((categories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const response = {"success":true,"data":categories};
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});
categoryRouter.route('/count')
.get(cors.corsWithOptions, (req, res, next) => {
    Categories.find({}).count()
     .then((categories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const response = {"success":true,"data":categories};
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});
categoryRouter.route('/addCategory')
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Categories.create(req.body)
     .then((item) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const response = {"success":true,"data":"Category added successfully"};
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});
categoryRouter.route('/deleteCategory/:categoryId')
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Categories.findByIdAndRemove(req.params.categoryId)
     .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const response = {"success":true,"data":"Category deleted successfully"};
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});

categoryRouter.route('/updateCategory/:categoryId')
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Categories.findByIdAndUpdate(req.params.categoryId, {$set: req.body})
     .then((item) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const response = {"success":true,"data":"Category updated successfully"};
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = categoryRouter;