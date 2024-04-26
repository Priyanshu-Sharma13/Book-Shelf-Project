const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const validator = require(`validator`);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: [30, `Name should be within 30 characters`],
        required: [true, `Please provide name`],
    },
    email: {
        type: String,
        required: [true, `Please provide email address`],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address',
        },
        unique: true,
    },
    password: {
        type: String,
        minlength: [8, `Password should be minimum 8 length long`],
        required: [true, `Please provide password`],
    },
    age: {
        type: Number,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/drnrsxnx9/image/upload/v1710584153/Profile-Images-Book-Store/istockphoto-1495088043-612x612_lcg4lr.jpg',
    },
    phone: {
        type: String,
        validate: {
            validator: function(value) {
                return this.phone.length === 10 && !isNaN(this.phone);
            },
            message: "Please enter a valid phone number",
        },
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },
}, {timestamps: true});

userSchema.pre(`save`, async function() {
    if(!this.isModified(`password`))    return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model(`User`, userSchema);