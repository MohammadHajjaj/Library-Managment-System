const express = require("express")
const router = express.Router()
const passport = require("passport")
const { isAdmin } = require("../middleware")
const User = require("../models/users")
const Book = require("../models/books")


//admin auth
router.get("/admin/login", (req, res, next) => {
	res.render("admin/login")
})

router.post("/admin/login", passport.authenticate("local", {
	successRedirect: "/admin",
	failureRedirect: "/auth/login",
}), (req, res) => {
});

router.get("/admin/logout", (req, res, next) => {
	req.logout();
	res.redirect("/");
});


router.get("/admin/signup", (req, res, next) => {
	res.render("admin/signup");
});

router.post("/admin/signup", async (req, res, next) => {
	try {
		if (req.body.adminCode === 'admin') {
			const { username, email, password } = req.body;
			const user = new User({ username, email, isAdmin: true });
			const registeredUser = await User.register(user, password);
			req.login(registeredUser, err => {
				if (err) return next(err);
				req.flash('success', 'Registered Successfully!');
				res.redirect('/');
			})
		}
		else {
			req.flash("error", "Incorrect Secret code");
			return res.redirect("/");
		}
	}
	catch (err) {
		console.log(err)
		return res.render("admin/adminSignup");
	}
});

//get subscription requests
router.get("/admin/subrequests", isAdmin, async (req, res, next) => {
	try {

		const users = await User.find({ 'isSubscribed': 'pending' })
		res.render('admin/requests', { users: users });

	} catch (err) {
		console.log(err);
	}
});

//give subscription
router.get("/admin/users/subrequests/:user_id", isAdmin, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.user_id);
		if (user.isSubscribed === 'pending') {
			user.isSubscribed = 'student';
			await user.save();
			req.flash("success", `Added Subscription!`);
			res.redirect("/admin/subrequests");
		}
	} catch (err) {
		console.log(err);
	}
});


//get all books
router.get("/admin/books", isAdmin, async (req, res, next) => {
	try {
		const books = await Book.find({})
		res.render("admin/books", { books });
	} catch (err) {
		return res.redirect('/');
	}
});

// show search results for books
router.post("/admin/books", isAdmin, async (req, res, next) => {
	if (req.body.searchValue == "") {
		return res.redirect('/books');
	}
	else {
		searchValue = req.body.searchValue.toLowerCase()
	}
	try {
		const books = await Book.find({ $text: { $search: searchValue } })
		res.render("books/all", { books })
	} catch (err) {
		console.log(err)
	}
});

//update book page
router.get("/admin/book/:bookId/update", isAdmin, async (req, res, next) => {

	try {
		const bookId = req.params.bookId;
		const book = await Book.findById(bookId);

		res.render('admin/book', { book })
	} catch (err) {
		console.log(err);

	}
});

router.post("/admin/book/:bookId/update", isAdmin, async (req, res, next) => {

	try {
		const bookDetails = req.body.book;
		const bookId = req.params.bookId;
		await Book.findByIdAndUpdate(bookId, bookDetails);
		res.redirect("/admin/books");
	} catch (err) {
		console.log(err);

	}
});

router.get("/admin/book/:bookId/delete", isAdmin, async (req, res, next) => {
	try {
		const bookId = req.params.bookId;
		const book = await Book.findById(bookId);
		await book.remove();
		req.flash("success", `Deleted ${book.title}`);
		res.redirect('/admin/books');

	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

router.get("/admin/books/add", isAdmin, (req, res, next) => {
	res.render("admin/addBook");
});

router.post("/admin/books/add", isAdmin, async (req, res, next) => {
	try {
		const bookDetails = req.body.book;
		const new_book = new Book(bookDetails);
		await new_book.save();
		req.flash("success", `Created Book ${new_book.title}`);
		res.redirect("/admin/books");
	} catch (err) {
		console.log(err);
	}
});






module.exports = router;

