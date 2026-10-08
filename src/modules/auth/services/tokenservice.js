const jwt = require('jsonwebtoken');

const getSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in the environment variables.');
    }
    return secret;
};

const getRefreshSecret = () => {
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_REFRESH_SECRET is not defined in the environment variables.');
    }
    return secret;
};

const createAccessToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            name: user.name,
        },
        getSecret(),
        {
            subject: user.id,
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        }
    );
};

const createRefreshToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
        },
        getRefreshSecret(),
        {
            subject: user.id,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        }
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, getSecret());
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, getRefreshSecret());
};

const decodeToken = (token) => {
    return jwt.decode(token, { complete: true });
};

const decodeAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, getSecret());
        return {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            iat: decoded.iat,
            exp: decoded.exp,
        };
    } catch (error) {
        throw new Error('Token inválido o expirado.');
    }
};

const decodeRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, getRefreshSecret());
        return {
            id: decoded.sub,
            email: decoded.email,
            iat: decoded.iat,
            exp: decoded.exp,
        };
    } catch (error) {
        throw new Error('Refresh token inválido o expirado.');
    }
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeToken,
    decodeAccessToken,
    decodeRefreshToken,
};
