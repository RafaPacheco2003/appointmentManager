const bcrypt = require('bcrypt');
const { InvalidCredentialsException } = require('../exceptions/authException');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const verifyPassword = async (password, hashedPassword) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) throw new InvalidCredentialsException();
};

module.exports = {
    hashPassword,
    comparePassword,
    verifyPassword
};
