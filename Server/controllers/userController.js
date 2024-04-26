const User = require(`../models/User`);
const {StatusCodes} = require(`http-status-codes`);
const customError = require(`../errors`);
const cloudinary = require(`cloudinary`).v2;
const fs = require(`fs`);

const getAllUser = async(req, res) => {
    const users = await User.find({role: `user`}).select(`-password`);
    res.status(StatusCodes.OK).json({users});
}

const getSingleUser = async(req, res) => {
    const {id: userId} = req.params;
    const user = await User.findOne({_id: userId}).select(`-password`);
    if(!user) {
        throw new customError.notFoundError(`No user found`);
    }
    res.status(StatusCodes.OK).json({user});
}

const getCurrUser = async(req, res) => {
    res.status(StatusCodes.OK).json({user: req.user});
}

const updateUser = async(req, res) => {
    const {name, age, phone, location} = req.body;
    if(!name || !age || !phone || !location) {
        throw new customError.BadRequestError(`Please provide all the credentials`);
    }
    const user = await User.findOne({_id: req.user.userId});
    user.age = age;
    user.name = name;
    user.phone = phone;
    user.location = location;
    await user.save();
    res.status(StatusCodes.OK).json({user});
}

const uploadImage = async(req,res)=>{
    if(!req.files || !req.files.image || !req.files.image.tempFilePath) {
        throw new customError.BadRequestError("Invalid file upload request");
    }
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'Profile-Images-Book-Store'
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    const user = await User.findOne({_id: req.user.userId});
    if(!user) {
        throw new customError.BadRequestError(`No user Found`);
    }
    user.image = result.secure_url;
    await user.save();
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url}});
}

module.exports = {
    getAllUser,
    getSingleUser,
    getCurrUser,
    updateUser,
    uploadImage,
};