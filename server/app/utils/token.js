const jwt = require('jsonwebtoken');

// Example JWT token

const decodeJWTToken = (token) => {

    try {
        // Decode the token without verifying the signature
        const decoded = jwt.decode(token, { complete: true });

        // Check if the token was decoded and if it has a payload
        if (decoded && decoded.payload) {
           
            return decoded.payload;
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        console.error('Failed to decode token:', error.message);
        return null; // Return null if decoding fails
    }
}

const crypto = require('crypto');

function decodeToken(token) {

    try {
        const encKey = process.env.ENC_KEY;
        
        if (!encKey) {
            throw new Error('Encryption key is not defined.');
        }
        const hashKey = crypto.createHash('md5').update(encKey + token).digest('hex');
        // Split the token into parts
        const tokenArr = token.split('.');
        if (tokenArr.length < 2) {
            throw new Error('Invalid token format.');
        }
        // Decode Base64 parts
        const header = JSON.parse(Buffer.from(tokenArr[0], 'base64').toString('utf8'));
        const payload = JSON.parse(Buffer.from(tokenArr[1], 'base64').toString('utf8'));
        payload["hashkey"] = hashKey;

        return payload;
    } catch (error) {
        return null;
    }

}

function isValidToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return !!decoded;  // If decoded successfully, return true
    } catch (err) {
        return false;  // Token is invalid or expired
    }
}


module.exports = {
    decodeToken,
    isValidToken,
    decodeJWTToken
}