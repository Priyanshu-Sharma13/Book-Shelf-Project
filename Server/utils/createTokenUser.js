const createTokenUser = (user) => {
    return {name: user.name, userId: user._id, phone: user.phone, email: user.email, age: user.age, location: user.location, image: user.image, role: user.role};
}

module.exports = createTokenUser;