const ExpressError = require('./expressError');
const { sendVerificationEmail } = require("../emails/account")
const Joi = require('joi');
const { number } = require('joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));

const userRegisterSchema = Joi.object({
    users: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        fName: Joi.string().required(),
        lName: Joi.string().required(),
        phoneNumber: myCustomJoi.string().phoneNumber({ defaultCountry: 'JO', strict: true })
    }).required()
});

module.exports.validateUser = (req, res, next) => {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        if (msg == '"users.email" must be a valid email') {
            req.flash('error', 'Please enter a valid email!')
        }
        else if (msg == '""users.phoneNumber"" did not seem to be a phone number') {
            req.flash('error', 'Please enter a valid Jordanian Number!')

        }
        else {
            req.flash('error', msg)

        }


        res.redirect("/");

    } else {
        next();
    }
}


module.exports.isVerified = function (req, res, next) {
    if (req.isAuthenticated() && req.user.isVerified) {
        return next();
    }
    sendVerificationEmail(req.user.email)
    req.flash("error", "You need to verify your account before proceeding. ");
    res.redirect("/verify");
};

module.exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in first");
    res.redirect("/");
};



module.exports.isAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    req.flash("error", "Only Librarians can access this route");
    res.redirect("/");
};

