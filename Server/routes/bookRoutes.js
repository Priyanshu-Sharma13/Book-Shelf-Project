const express = require(`express`);
const router = express.Router();
const { createBook,
        getAllBooks,
        getAllCategoryBooks,
        getSingleBook,
        deleteBook,
        getCurrentUserBooks,
        uploadBookImage,
        updateBook,
    } = require(`../controllers/bookController`);
const {authenticateUser, authorisePermission} = require(`../middleware/authentication`);


router.route(`/`).get(getAllBooks).post(authenticateUser, createBook);
router.route(`/cuurentUserBooks`).get(authenticateUser, getCurrentUserBooks);
router.route(`/upload`).post(authenticateUser, uploadBookImage);
router.route(`/:categoryId`).get(getAllCategoryBooks);
router.route(`/:categoryId/:bookId`).get(getSingleBook).delete(authenticateUser, deleteBook).patch(authenticateUser, updateBook);

module.exports = router;