const mongoose = require(`mongoose`);

const userDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide user name'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        validate: {
            validator: function(value) {
                return this.phone.length === 10 && !isNaN(this.phone);
            },
            message: "Please enter a valid phone number",
        },
    },
    location: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true,
    },
});

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide book name'],
        trim: true,
    },
    author: {
        type: String,
        trim: true,
        required: [true, 'Please provide author name'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide price of the book'],
    },
    edition: {
        type:Number,
        required: [true, 'Please provide edition'],
    },
    old: {
        type: Number,
        required: [true, 'Please provide the number of purchase years'],
    },
    description: {
        type: String,
        minlength: 30,
        maxlength: 1000,
        trim: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['sold', 'not-Sold'],
        default: 'not-Sold',
    },
    userDetails: userDetailsSchema,
});

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        enum: {
            values: [
                'Fiction',
                'Non-fiction',
                'Mystery',
                'Thriller',
                'Romance',
                'Science Fiction (Sci-Fi)',
                'Fantasy',
                'Horror',
                'Historical Fiction',
                'Biography/Autobiography',
                'Self-help',
                'Business/Finance',
                'Travel',
                'Cooking/Food',
                'Art/Photography',
                'History',
                'Philosophy',
                'Religion/Spirituality',
                'Poetry',
                "Children's Literature/YA (Young Adult)"
              ],
              message: `{VALUE} is not supported`,
        },
    },
    books: [bookSchema],
}, {timestamps: true});


module.exports = mongoose.model(`Book`, categorySchema);