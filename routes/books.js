const express = require("express");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById } = require("../controllers/book-controller");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const {UserModel, BookModel} = require("../models");

const router = express.Router();

router.get('/',getAllBooks);

router.get('/:id',getSingleBookById);  

router.get('/issued/by-user', getAllIssuedBooks);

router.post("/", addNewBook);

router.put("/:id", updateBookById);

router.delete("/:id",deleteBookById);



module.exports = router;