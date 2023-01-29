const { UserModel, BookModel } = require("../models");

const IssuedBook = require("../dto/book-dto");

exports.getAllBooks = async (req, res) => {
  //returns all the lines that we are finding
  const books = await BookModel.find();
  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  }
  return res.status(200).json({
    success: true,
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "This book is not available",
    });
  }
  return res.status(200).json({
    success: true,
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await BookModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  const bookIssued = users.map((each) => new IssuedBook(each));
  if (bookIssued.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No book has been issued",
    });
  }
  return res.status(200).json({
    success: true,
    data: bookIssued,
  });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  // const book = books.find((each) => each.id === id);
  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No Data was Provided",
    });
  }

  await BookModel.create(data);
  const allBooks = await BookModel.find();
  // if(book)
  // {
  //     return res.status(404).json({
  //         success:false,
  //         message:"Book Already Exists with same ID"
  //     });
  // }
  return res.status(200).json({
    success: true,
    data: allBooks,
  });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  res.status(200).json({
    success: true,
    data: updatedBook,
  });
};

exports.deleteBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.deleteOne({ _id: id });
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not Found",
    });
  }
  return res.status(200).json({
    success: true,
    data: book,
  });
};

// module.exports = { getAllBooks, getSingleBookById };
