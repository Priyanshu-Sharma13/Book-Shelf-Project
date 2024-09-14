const customError = require(`../errors`);
const {StatusCodes} = require(`http-status-codes`);
const Book = require(`../models/Books`);
const Filter = require(`../models/Filter`);
const fs = require(`fs`);
const cloudinary = require(`cloudinary`).v2;

let Image = "";

const createBook = async(req, res) => {
    const {category, name, author, price, edition, old, description, userName, userPhone, userLocation} = req.body;
    if(!category || !name || !author || !price || !edition || !old || !description || !userName || !userPhone || !userLocation) {
        // console.log("sullad");
        throw new customError.BadRequestError(`Please provide all the credentials`);
    }
    const userDetails = {
        name: userName,
        phone: userPhone, 
        location: userLocation,
        user: req.user.userId,
    };
    // console.log(Image);

    const bookDetails = {
        name: name,
        author: author,
        price: price,
        edition: edition,
        old: old,
        description: description,
        image: Image,
        userDetails: userDetails
    }

    let bookCategory = await Book.findOne({category: category});
    if(!bookCategory) {
        bookCategory = await Book.create({category: category});
    }

    const books = [...bookCategory.books, bookDetails];
    bookCategory.books = books;

    await bookCategory.save();
    bookCategory = await Book.findOne({category: category});
    const categoryId = bookCategory._id;
    const bookIdfind = bookCategory.books[bookCategory.books.length - 1]._id;

    console.log(categoryId, bookIdfind);
    const addBook = await Filter.create({
      categoryId: categoryId,
      category: category,
      bookId: bookIdfind,
      name: name,
      author: author,
      price: price,
      edition: edition,
      old: old,
      description: description,
      image: Image,
      userName: userName,
      userPhone: userPhone,
      userLocation: userLocation,
      user: req.user.userId,
    });
    

    res.status(StatusCodes.CREATED).json({category: category, bookDetails});
}


const getSingleBook = async (req, res) => {
  const { categoryId, bookId } = req.params;
  const Books = await Book.findOne({ _id: categoryId });
  if (!Books) {
    throw new customError.notFoundError(
      `No books available with the given category`
    );
  }
  const book = Books.books.find((book) => book._id.toString() === bookId);
  if (!book) {
    throw new customError.notFoundError(`No book found`);
  }
  res.status(StatusCodes.OK).json({ book });
};


const deleteBook = async(req, res) => {
    const {categoryId, bookId} = req.params;
    const category = await Book.findOne({_id: categoryId});
    if(!category) {
        throw new customError.notFoundError(`No books available with the given category`);
    }
    const bookIndex = category.books.findIndex(book => book._id.toString() === bookId);
    if(bookIndex === -1) {
        throw new customError.notFoundError(`No book found with the given ID`);
    }
    category.books.splice(bookIndex, 1);
    await category.save();

    if(category.books.length === 0) {
        const category = await Book.findOneAndDelete({_id: categoryId});
    }
    const deleteFromFilters = await Filter.findOneAndDelete({bookId: bookId, categoryId: categoryId});
    res.status(StatusCodes.OK).json({ message: 'Book deleted successfully' });
}

const getCurrentUserBooks = async (req, res) => {
  const currentUserBooks = [];
  const books = await Book.find({});

  if (!books || books.length === 0) {
    throw new customError.notFoundError(`No books available`);
  }

  const {search, minPrice, maxPrice, location} = req.query;

  const queryObject = {
    user: req.user.userId,
  };

  if(search) {
    queryObject.name = {$regex: search, $options: `i`};
  }
  if(minPrice !== undefined && maxPrice!== undefined) {
    queryObject.price = { $gte: minPrice, $lte: maxPrice };
  }
  else if(minPrice !== undefined) {
    queryObject.price = {$gte: minPrice};
  }
  else if(maxPrice !== undefined) {
    queryObject.price = {$lte: maxPrice};
  }
  if(location) {
    queryObject.userLocation = {$regex: location, $options: `i`};
  }

  let result = Filter.find(queryObject);

  const filterBooks = await result;

  res.status(StatusCodes.OK).json({books: filterBooks});

};

const uploadBookImage = async(req, res) => {
    if(!req.files || !req.files.image || !req.files.image.tempFilePath) {
        throw new customError.BadRequestError("Invalid file upload request");
    }
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'Book-Images-Book-Store'
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    Image = result.secure_url;
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url}});
}

const getAllCategoryBooks = async (req, res) => {
    const { categoryId } = req.params;
    const queryObject = {
      categoryId: categoryId,
    }
    const {search, minPrice, maxPrice, location} = req.query;
    if(search) {
      queryObject.name = {$regex: search, $options: `i`};
    }
    if(minPrice !== undefined && maxPrice !== undefined) {
      queryObject.price = {$gte: minPrice, $lte: maxPrice};
    }
    else if(minPrice !== undefined) {
      queryObject.price = {$gte: minPrice};
    }
    else if(maxPrice !== undefined) {
      queryObject.price = {$lte: maxPrice};
    }
    if(location) {
      queryObject.userLocation = {$regex: location, $options: `i`};
    }

    let result = Filter.find(queryObject);
    const books = await result;
    const category = books[0].category;
    const userId = books[0].user;
    console.log(category);
    if(books.length === 0) {
      throw new customError.notFoundError("No books found");
    }

    const transformedData = books.reduce((acc, book) => {
      const existingCategory = acc.find(
        (category) => category._id === book.categoryId
      );

      if (existingCategory) {
        existingCategory.books.push({
          _id: book.bookId,
          name: book.name,
          author: book.author,
          price: book.price,
          edition: book.edition,
          old: book.old,
          description: book.description,
          image: book.image,
          status: book.status,
          userDetails: {
            name: book.userName,
            phone: book.userPhone,
            location: book.userLocation,
            user: book.user,
          },
        });
      } else {
        acc.push({
          _id: book.categoryId,
          category: book.category,
          books: [
            {
              _id: book.bookId,
              name: book.name,
              author: book.author,
              price: book.price,
              edition: book.edition,
              old: book.old,
              description: book.description,
              image: book.image,
              status: book.status,
              userDetails: {
                name: book.userName,
                phone: book.userPhone,
                location: book.userLocation,
                user: book.user,
              },
            },
          ],
        });
      }

      return acc;
    }, []);

    res.status(StatusCodes.OK).json({ books: transformedData });
};

const getAllBooks = async (req, res) => {
  const queryObject = {};
  const {search, minPrice, maxPrice, location} = req.query;
  if (search) {
    queryObject.name = { $regex: search, $options: `i` };
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    queryObject.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice !== undefined) {
    queryObject.price = { $gte: minPrice };
  } else if (maxPrice !== undefined) {
    queryObject.price = { $lte: maxPrice };
  }
  if (location) {
    queryObject.userLocation = { $regex: location, $options: `i` };
  }

  let result = Filter.find(queryObject);
  const books = await result;
  if(books.length === 0) {
    throw new customError.notFoundError("No Books uploaded yet");
  }
  
  const transformedData = books.reduce((acc, book) => {
    const existingCategoryIndex = acc.findIndex(
      (category) => category._id === book.categoryId
    );

    if (existingCategoryIndex !== -1) {
      acc[existingCategoryIndex].books.push({
        _id: book.bookId,
        name: book.name,
        author: book.author,
        price: book.price,
        edition: book.edition,
        old: book.old,
        description: book.description,
        image: book.image,
        status: book.status,
        userDetails: {
          name: book.userName,
          phone: book.userPhone,
          location: book.userLocation,
          user: book.user,
        },
      });
    } else {
      acc.push({
        _id: book.categoryId,
        category: book.category, // Include category name here
        books: [
          {
            _id: book.bookId,
            name: book.name,
            author: book.author,
            price: book.price,
            edition: book.edition,
            old: book.old,
            description: book.description,
            image: book.image,
            status: book.status,
            userDetails: {
              name: book.userName,
              phone: book.userPhone,
              location: book.userLocation,
              user: book.user,
            },
          },
        ],
      });
    }

    return acc;
  }, []);


  res.status(StatusCodes.OK).json({ books: transformedData });
};

const updateBook = async (req, res) => {
  const { category, name, author, price, edition, old, description } = req.body;
  const { categoryId, bookId } = req.params;

  if (
    !category ||
    !name ||
    !author ||
    !price ||
    !edition ||
    !old ||
    !description
  ) {
    throw new customError.BadRequestError(`Please provide all the credentials`);
  }

  const initialCategory = await Book.findOne({ _id: categoryId });

  if (!initialCategory) {
    throw new customError.notFoundError("No books found with this category");
  }

  const bookIndex = initialCategory.books.findIndex(
    (book) => book._id.toString() === bookId
  );

  if (bookIndex === -1) {
    throw new customError.notFoundError("No book found with this ID");
  }
  const userPhone = initialCategory.books[bookIndex].userDetails.phone;
  const userLocation = initialCategory.books[bookIndex].userDetails.location;

  console.log(userPhone, userLocation);

  initialCategory.books.splice(bookIndex, 1);

  await initialCategory.save();

  let newCategory = await Book.findOne({ category: category });

  if (!newCategory) {
    newCategory = await Book.create({ category: category });
  }

  const userDetails = {
    name: req.user.name,
    phone: userPhone,
    location: userLocation,
    user: req.user.userId,
  }

  const updatedBook = {
    _id: bookId,
    name: name,
    author: author,
    price: price,
    edition: edition,
    old: old,
    description: description,
    userDetails: userDetails,
  };

  newCategory.books.push(updatedBook);

  await newCategory.save();
  newCategory = await Book.findOne({category: category});
  const newCategoryId = newCategory._id;
  console.log(newCategory);

  const filterBooks = await Filter.findOne({categoryId: categoryId, bookId: bookId});
  filterBooks.categoryId = newCategoryId;
  filterBooks.category = category;
  filterBooks.name = name;
  filterBooks.author = author;
  filterBooks.price = price;
  filterBooks.edition = edition;
  filterBooks.old = old;
  filterBooks.description = description;
  await filterBooks.save();
// category, name, author, price, edition, old, description
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Book Updated", Books: newCategory });
};


module.exports = {
  createBook,
  getAllBooks,
  getAllCategoryBooks,
  getSingleBook,
  deleteBook,
  getCurrentUserBooks,
  uploadBookImage,
  updateBook,
};
