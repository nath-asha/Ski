const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Missing Authorization Header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Missing Token' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decodedToken.id);
        if (!req.user) {
            return res.status(401).json({ error: 'Invalid Token' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};
