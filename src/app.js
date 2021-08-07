const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require("connect-flash");
//models
const User = require('./models/users');
const userRoutes = require("./routes/users")

const bookRoutes = require("./routes/books")
const subRoutes = require("./routes/subscription")
const adminRoutes = require("./routes/admin")



mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connected")
    })
    .catch(err => {
        console.log(`mongo error ${err}`)
    })

const app = express();
app.use(flash());
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)

    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    next();
});

//Routes
app.use(userRoutes);
app.use(bookRoutes);
app.use(subRoutes);
app.use(adminRoutes);


app.get('/', (req, res) => {
    res.render('index');
})

const port = process.env.PORT
app.listen(port, () => {
    console.log('listening')
})