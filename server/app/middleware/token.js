const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({status:"error", msg: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // Check if the error is due to an expired token
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({status:"error", msg: 'Token has expired' });
            }
            return res.status(403).json({satus:"error", msg: 'Failed to authenticate token' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = {
    verifyToken
}


