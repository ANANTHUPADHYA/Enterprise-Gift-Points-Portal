var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const url = require('./config');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
var passport = require('passport');
var authenticate = require('./authenticate');
const cartRouter = require('./routes/cart');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
var connect = mongoose.connect(url.mongoNewUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
var app = express();


connect.then((db) => {
    console.log("Connected correctly to database");
}, (err) => { console.log(err); });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Multer module for handling multi part file upload.
const storage = multer.diskStorage({
    destination: './files',
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

app.use(multer({ storage: storage }).single('file'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/categories', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    const status = err.status >= 100 && err.status < 600 ? err.code : 500
    let errMsg = '';
    if (err.name === 'MongoError' && err.code === 11000) {
        errMsg = 'There was a duplicate key error';
    } else if (err.error && err.error.message || err.message) {
        errMsg = err.message ? err.message : err.error.message;
    } else {
        errMsg = 'Internal Server Error';
    }
    res.status(status);
    res.send({
        success: false,
        error: errMsg
    });
});
module.exports = app;