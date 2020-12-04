exports.verifyUser = (req, res, next) => {
    console.log(req.headers)
    if (req.headers['authorization']) {
        next();
    } else {
        const err = new Error('Session Expired');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = (req, res, next) => {

    if (req.query.admin === 'true') {
        next();
    } else {
        const err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};