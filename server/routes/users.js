var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
var User = require('../models/users');
const cors = require('./cors');
router.use(express.json());
/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
    User.find({})
        .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.get('/userDetails/:email', cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
    User.findOne({ email: req.params.email })
        .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, data: users });
        }, (err) => next(err))
        .catch((err) => next(err));
});


router.post('/signup', cors.corsWithOptions, (req, res, next) => {
    User.register(new User({ email: req.body.email }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                console.log("error", err)
                res.json({ err: err });
            } else {
                if (req.body.firstname)
                    user.firstname = req.body.firstname;
                if (req.body.lastname)
                    user.lastname = req.body.lastname;
                if (req.body.yoyoPoints)
                    user.yoyoPoints = req.body.yoyoPoints;
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        console.log("user not saved", err);
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        console.log("user not saved", res);
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                });
            }
        });
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {

    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

module.exports = router;