const express = require("express")
const passport = require("passport")
const router = express.Router()
const Stripe = require('stripe');
const { isVerified, isLoggedIn, validateUser } = require("../middleware");
const accountSid = "AC168fe5d7f7067f06ca42a2a7098c446f";
const authToken = "e609ca769227a898e5d2c8eef3342279";
const client = require('twilio')(accountSid, authToken);

const User = require("../models/users")
const Book = require("../models/books")
const Borrow = require("../models/borrow")
// auth routes  

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/', badRequestMessage: 'Missing username or password.',
    failureFlash: true
}), (req, res) => {
    try {
        const redirectUrl = req.session.returnTo || '/';
        delete req.session.returnTo;
        req.flash('success', 'Logged In Successfully!');
        res.redirect(redirectUrl);
    }
    catch (e) {
        req.flash('error', 'Wrong Username Or Password!');

    }
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out!');
    res.redirect('/');
})

//verification routes

router.get('/verify', (req, res) => {
    console.log(req.user._id)
    res.render('verify')
})


router.post('/register', validateUser, async (req, res, next) => {
    const { fName, lName, email, phoneNumber, username, password } = req.body.users;
    const user = new User({ fName, lName, email, phoneNumber, username });
    const registeredUser = await User.register(user, password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/')
        }
    });
    req.login(registeredUser, err => {
        if (err) return req.flash('error', err.message);
        req.flash('success', 'Registered Successfully, Please verify your email to proceed!');

        client.verify.services('VA758873ecc9e16ade3f935c5b59985c2f')
            .verifications
            .create({ to: req.user.email, channel: 'email' })
            .then(verification => console.log(verification.sid));

        res.redirect('/verify');
    })




})

router.post('/verify', isLoggedIn, async (req, res) => {
    const { verification_code } = req.body
    try {
        client.verify.services('VA758873ecc9e16ade3f935c5b59985c2f')
            .verificationChecks
            .create({ to: req.user.email, code: verification_code })
            .then(async verification_check => {
                if (verification_check.status === 'approved') {
                    console.log('gud')
                    await User.findByIdAndUpdate(req.user._id, { isVerified: true });
                    req.flash('success', 'Verification Successfully');
                    res.redirect('/');
                } else {
                    req.flash('error', 'Wrong code!');
                    res.redirect('/verify');

                }

            });
    }
    catch (e) {
        console.log(e)
    }
})


// book borrowing routes

router.get("/user/dashboard", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const borrow = await Borrow.find({ "owner": req.user._id }).populate('bookDetails');
        res.render("user/index", { user, user2: borrow });
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
});

//borrow a book
router.post("/books/:bookId/borrow/:user_id", isLoggedIn, isVerified, async (req, res, next) => {
    if (req.user.isSubscribed === 'none' || req.user.isSubscribed === 'pending') {
        if (req.user.borrowedBooks.length >= 3) {
            req.flash("warning", "Non Subscribers can't borrow more than 3 books at a time");
            return res.redirect("back");
        }
    } else {
        if (req.user.borrowedBooks.length >= 5) {
            req.flash("warning", "Student Subscribers cannot borrow more than 5 books at a time");
            return res.redirect("back");
        }
    }

    try {
        const book = await Book.findById(req.params.bookId);
        const user = await User.findById(req.params.user_id);
        book.stock -= 1;
        const borrow = new Borrow({
            bookDetails: book._id,
            owner: user._id
        });
        user.borrowedBooks.push(book._id);
        console.log()
        await borrow.save();
        await user.save();
        await book.save();

        res.redirect(`/books`);
    } catch (err) {
        console.log(err);
    }
});

//return a book
router.post("/books/:bookId/return", isLoggedIn, isVerified, async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const index = req.user.borrowedBooks.indexOf(req.params.bookId);
        const book = await Book.findById(bookId);
        book.stock += 1;
        await book.save();
        const borrow = await Borrow.findOne({ "owner": req.user._id });
        await borrow.remove();
        req.user.borrowedBooks.splice(index, 1);
        await req.user.save();
        res.redirect("/user/dashboard");
    } catch (err) {
        console.log(err);
    }
}
);



module.exports = router;