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

// const updateBook = async(req, res) => {
//     const {category, name, author, price, edition, old, description} = req.body;
//     const {categoryId, bookId} = req.params;
//     if (!category || !name || !author || !price || !edition || !old || !description) {
//       throw new customError.BadRequestError(`Please provide all the credentials`);
//     }
//     const Books = await Book.findOne({ _id: categoryId });
//     if (!Books) {
//       throw new customError.notFoundError(
//         `No books available with the given category`
//       );
//     }
//     const bookIndex = Books.books.findIndex(
//       (book) => book._id.toString() === bookId
//     );
//     if (bookIndex === -1) {
//       throw new customError.notFoundError(`No book found with the given ID`);
//     }
//     const image = Books.books[bookIndex].image;
//     const updatedBook = Books.books[bookIndex];
//     Books.books.splice(bookIndex, 1);
//     // console.log(Image);
//     const booksArray = Books.books;
//     await Books.save();
    
//     if(booksArray.length === 0) {
//         const categoryDelete = await Book.findOneAndDelete({_id: categoryId});
//     }

//     const userDetails = {
//         name: updatedBook.userDetails.name,
//         phone: updatedBook.userDetails.phone,
//         location: updatedBook.userDetails.location,
//         user: updatedBook.userDetails.user,
//     }

//     const bookDetails = {
//       name: name,
//       author: author,
//       price: price,
//       edition: edition,
//       old: old,
//       image: image,
//       useDetails: userDetails,
//       description: description,
//       _id: bookId,
//     };

//     console.log(bookDetails);

//     let bookCategory = await Book.findOne({ category: category });
//     if (!bookCategory) {
//       bookCategory = await Book.create({ category: category });
//     }

//     const books = [...bookCategory.books, bookDetails];
//     bookCategory.books = books;

//     await bookCategory.save();
//     res
//       .status(StatusCodes.CREATED)
//       .json({ categoryId: categoryId, category: category, book: bookDetails });
// }

// const updateBook = async (req, res) => {
//   const { category, name, author, price, edition, old, description } = req.body;
//   const { categoryId, bookId } = req.params;
//   if (
//     !category ||
//     !name ||
//     !author ||
//     !price ||
//     !edition ||
//     !old ||
//     !description
//   ) {
//     throw new customError.BadRequestError(`Please provide all the credentials`);
//   }
//   const Books = await Book.findOne({ _id: categoryId });
//   if (!Books) {
//     throw new customError.notFoundError(
//       `No books available with the given category`
//     );
//   }
//   const bookIndex = Books.books.findIndex(
//     (book) => book._id.toString() === bookId
//   );
//   if (bookIndex === -1) {
//     throw new customError.notFoundError(`No book found with the given ID`);
//   }
//   const image = Books.books[bookIndex].image;
//   const updatedBook = Books.books[bookIndex];
//   Books.books.splice(bookIndex, 1);
  
//   if (Books.category !== category) {
//     const oldCategory = await Book.findOne({ category:  Books.category });
//     if (oldCategory) {
//       const oldBookIndex = oldCategory.books.findIndex(
//         (book) => book._id.toString() === bookId
//       );
//       if (oldBookIndex !== -1) {
//         oldCategory.books.splice(oldBookIndex, 1);
//         await oldCategory.save();
//       }
//     }
//   }

//   // Add the updated book to the new category
//   let bookCategory = await Book.findOne({ category: category });
//   if (!bookCategory) {
//     bookCategory = await Book.create({ category: category });
//   }

//   const userDetails = {
//     name: updatedBook.userDetails.name,
//     phone: updatedBook.userDetails.phone,
//     location: updatedBook.userDetails.location,
//     user: req.user.userId,
//   };

//   const bookDetails = {
//     name: name,
//     author: author,
//     price: price,
//     edition: edition,
//     old: old,
//     image: image,
//     useDetails: userDetails,
//     description: description,
//     _id: bookId,
//   };

//   const booksArray = bookCategory.books;
//   await Books.save();

//   if (booksArray.length === 0) {
//     const categoryDelete = await Book.findOneAndDelete({ _id: categoryId });
//   }

//   const books = [...bookCategory.books, bookDetails];
//   bookCategory.books = books;

//   await bookCategory.save();
//   res
//     .status(StatusCodes.CREATED)
//     .json({ categoryId: categoryId, category: category, book: bookDetails });
// };


// const getAllBooks = async (req, res) => {
//   const { search, minPrice, maxPrice, location } = req.query;
//   const queryObject = {};

//   if (search) {
//     queryObject["books.name"] = { $regex: search, $options: "i" };
//   }

//   if (minPrice !== undefined && maxPrice !== undefined) {
//     queryObject["books.price"] = {
//       $gte: parseFloat(minPrice),
//       $lte: parseFloat(maxPrice),
//     };
//   } else if (minPrice !== undefined) {
//     queryObject["books.price"] = { $gte: parseFloat(minPrice) };
//   } else if (maxPrice !== undefined) {
//     queryObject["books.price"] = { $lte: parseFloat(maxPrice) };
//   }

//   if (location) {
//     queryObject["books.userDetails.location"] = {
//       $regex: location,
//       $options: "i",
//     };
//   }

    // create filter based on name of the book
    // console.log("search: " , search);
    // if (search) {
    //     queryObject.books = {$regex: search, $options: 'i'};
    // }
    // console.log("queryObject: ", queryObject);
    // create filter based on price of the book
    // if (minPrice !== undefined && maxPrice !== undefined) {
    //     queryObject['books.price'] = {$gte: parseFloat(minPrice), $lte: parseFloat(maxPrice)};
    // } else if (minPrice !== undefined) {
    //     queryObject['books.price'] = {$gte: parseFloat(minPrice)};
    // } else if (maxPrice !== undefined) {
    //     queryObject['books.price'] = {$lte: parseFloat(maxPrice)};
    // }
    // // create filter based on location of the book
    // if (location) {
    //     queryObject['books.userDetails.location'] = {$regex: location, $options: 'i'};
    // }


//   const result = await Book.find(queryObject);

//   res.status(StatusCodes.OK).json({ result });
// };

// const getAllCategoryBooks = async (req, res) => {
//     const {search, minPrice, maxPrice, location} = req.query;
//     const { categoryId } = req.params;
//     const queryObject = {
//         _id: categoryId,
//     }
//     if(search) {
//         queryObject['books.name'] = {$regex: search, $option: 'i'};
//     }
//     if(minPrice != undefined && maxPrice != undefined) {
//         queryObject['books.price'] = {$gte: parseFloat(minPrice), $lte: parseFloat(maxPrice)};
//     }
//     else if(minPrice != undefined) {
//         queryObject['books.price'] = {$get: parseFloat(minPrice)};
//     }
//     else if(maxPrice != undefined) {
//         queryObject['books.price'] = {$let: parseFloat(maxPrice)};
//     }
//     if(location) {
//         queryObject['books.userDetails.location'] = {$regex: location, $option: 'i'};
//     }
//     let result = Book.find(queryObject);
//     const books = await result;
//     if (books.length === 0) {
//         throw new customError.notFoundError(`No book found with the asked category`);
//     }
//     res.status(StatusCodes.OK).json(books);
// };

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


// const getSingleBook = async(req, res) => {
//     const {categoryId, bookId} = req.params;
//     const Books = await Book.findOne({_id: categoryId});
//     if(!Books) {
//         throw new customError.notFoundError(`No books available with the given category`);
//     }
//     const book = Books.books.find(book => book._id.toString() === bookId);
//     if(!book) {
//         throw new customError.notFoundError(`No book found`);
//     }
//     res.status(StatusCodes.OK).json({book});
// }

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

// const getCurrentUserBooks = async (req, res) => {
//   const currentUserBooks = [];
//   const books = await Book.find({});
//   if (!books || books.length === 0) {
//     throw new customError.notFoundError(`No books available`);
//   }
// //   console.log(req.user.userId);
//   books.forEach((category) => {
//     const categoryId = category._id;
//     const categoryName = category.category;

//     if (!category.books || category.books.length === 0) {
//       console.log("empty books");
//       return; // Exit current iteration if books array is empty
//     }

//     category.books.forEach((book) => {
//       if (
//         book &&
//         book.userDetails &&
//         book.userDetails.user &&
//         req.user.userId &&
//         book.userDetails.user.toString() === req.user.userId.toString()
//       ) {
//         console.log(book.userDetails.user.toString(), req.user.userId);
//         const bookObj = {
//           categoryId: categoryId,
//           categoryName: categoryName,
//           BookName: book.name,
//           BookAuthor: book.author,
//           BookImage: book.image,
//           BookPrice: book.price,
//           BookEdition: book.edition,
//           BookOld: book.old,
//           BookDescription: book.description,
//           bookId: book._id,
//           userName: book.userDetails.name,
//           userPhone: book.userDetails.phone,
//           userLocation: book.userDetails.location,
//         };
//         console.log(bookObj);
//         currentUserBooks.push(bookObj);
//       }
//     });
//   });
//   if (currentUserBooks.length === 0) {
//     throw new customError.notFoundError(`No books uploaded yet`);
//   }
//   res.status(StatusCodes.OK).json({ currentUserBooks });
// };

const getCurrentUserBooks = async (req, res) => {
  const currentUserBooks = [];
  const books = await Book.find({});

  if (!books || books.length === 0) {
    throw new customError.notFoundError(`No books available`);
  }

  const {search, minPrice, maxPrice, location} = req.query;

  // const currentUserFilterBooks = await Filter.find({user: req.user.userId});
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

  /*
  books.forEach((category) => {
    const categoryId = category._id;
    const categoryName = category.category;

    if (!category.books || category.books.length === 0) {
      return; 
    }

    category.books.forEach((book) => {
      if (
        book &&
        book.userDetails &&
        book.userDetails.user &&
        req.user.userId &&
        book.userDetails.user.toString() === req.user.userId.toString()
      ) {
        const bookObj = {
          categoryId: categoryId,
          categoryName: categoryName,
          BookName: book.name,
          BookAuthor: book.author,
          BookImage: book.image,
          BookPrice: book.price,
          BookEdition: book.edition,
          BookOld: book.old,
          BookDescription: book.description,
          bookId: book._id,
          userName: book.userDetails.name,
          userPhone: book.userDetails.phone,
          userLocation: book.userDetails.location,
        };
        currentUserBooks.push(bookObj);
      }
    });
  });

  if (currentUserBooks.length === 0) {
    throw new customError.notFoundError(`No books uploaded yet`);
  }

  res.status(StatusCodes.OK).json({ currentUserBooks });
  */
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
    // const books = await Book.find({ _id: categoryId });
    // if (books.length === 0) {
    //     throw new customError.notFoundError("No book found with the asked category");
    // }
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
    console.log(book);
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

// const updateBooks = async(req, res) => {
//     const {category, name, author, price, edition, old, description} = req.body;
//     const {categoryId, bookId} = req.params;
//     if (!category || !name || !author || !price || !edition || !old || !description) {
//       throw new customError.BadRequestError(`Please provide all the credentials`);
//     }
//     const BooksWithGivenCategory = await Book.findOne({_id: categoryId});
//     if(!BooksWithGivenCategory) {
//         throw new customError.notFoundError("No books found with this category");
//     }
//     // console.log(BooksWithGivenCategory.books.category);
//     // console.log(BooksWithGivenCategory.books.books.length);
//     if (!BooksWithGivenCategory || !BooksWithGivenCategory.books) {
//       throw new customError.notFoundError("No books found with this category");
//     }
//     const initialCategory = BooksWithGivenCategory.category;

//     if(initialCategory === category) {
//         const bookIndex = BooksWithGivenCategory.books.findIndex(book => book._id.toString() === bookId);
//         if(bookIndex === -1) {
//             throw new customError.notFoundError("No book found with this ID");
//         }
//         BooksWithGivenCategory.books.name = name;
//         BooksWithGivenCategory.books.author = author;
//         BooksWithGivenCategory.books.price = price;
//         BooksWithGivenCategory.books.edition = edition;
//         BooksWithGivenCategory.books.old = old;
//         BooksWithGivenCategory.books.description = description;

//         await BooksWithGivenCategory.save();
//         return res.status(StatusCodes.OK).json({msg: "Book Updated", Books: BooksWithGivenCategory});
//     }

//     const bookIndex = BooksWithGivenCategory.books.findIndex(
//       (book) => book._id.toString() === bookId
//     );
//     console.log(bookIndex);
//     if(bookIndex === -1) {
//         throw new customError.notFoundError("No book found with this ID");
//     }
//     const book = BooksWithGivenCategory.books[bookIndex];
//     // BooksWithGivenCategory.books.splice(bookIndex, 1);

//     const updatedBooksArray = initialCategory.books.filter(
//       (book) => book._id.toString() !== bookId
//     );

//     // Ensure that the book was found and removed
//     if (updatedBooksArray.length === initialCategory.books.length) {
//       throw new customError.notFoundError("No book found with this ID");
//     }

//     initialCategory.books = updatedBooksArray;

//     const newCategoryBook = await Book.findOne({category: category});
//     if(!newCategoryBook) {
//         const newCategory = await Book.create({category: category});

//         book.name = name;
//         book.author = author;
//         book.price = price;
//         book.edition = edition;
//         book.old = old;
//         book.description = description;

//         newCategory.books.push(book);
//         await newCategory.save();
//         return res.status(StatusCodes.OK).json({msg: "Book Updated", Books: newCategory});
//     }

//     book.name = name;
//     book.author = author;
//     book.price = price;
//     book.edition = edition;
//     book.old = old;
//     book.description = description;

//     const updatedBookArray = [...newCategoryBook.books, book];
//     newCategoryBook.books = updatedBookArray;


    
//     await newCategoryBook.save();
//     return res.status(StatusCodes.OK).json({ msg: "Book Updated", Books: newCategoryBook });
// }
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


/*
  const userDetails = {
    name: updatedBook.userDetails.name,
    phone: updatedBook.userDetails.phone,
    location: updatedBook.userDetails.location,
    user: req.user.userId,
  };

  const bookDetails = {
    name: name,
    author: author,
    price: price,
    edition: edition,
    old: old,
    image: image,
    useDetails: userDetails,
    description: description,
    _id: bookId,
  };
*/

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
