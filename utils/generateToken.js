const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const secretKey = process.env.secret_key;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1y' });
    return token;
}

module.exports = generateToken;