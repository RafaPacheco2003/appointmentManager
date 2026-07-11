const User = require('../../user/models/userModel');
const { hashPassword } = require('./passwordService');

const createUserWithrolee = async (
    rolee,
    userData,
    transaction
) => {

    const { password, ...rest } = userData;

    const hashedPassword = await hashPassword(password);


    return User.create(
        {
            ...rest,
            password: hashedPassword,
            role: rolee
        },
        {
            transaction
        }
    );
};

module.exports = {
    createUserWithrolee
};
