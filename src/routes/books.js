const express = require("express")

const router = express.Router()
const Book = require('../models/books');



router.get("/books", async (req, res, next) => {
    try {
        const books = await Book.find({})
        res.render("books/all", { books })
    } catch (err) {
        console.log(err)
    }
})

router.post("/books", async (req, res, next) => {
    if (req.body.searchValue === "") {
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
})

router.get('/book/:id', async (req, res,) => {
    const book = await Book.findById(req.params.id)
    res.render('books/show', { book });
});

router.get('/', async (req, res) => {
    const books = await Book.find({})
    res.render('index', { books });
})
module.exports = router;