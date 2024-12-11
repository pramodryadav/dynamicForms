const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.body; // Extract ID from the request body
        if (!id) {
            return cb(new Error('ID is required')); // Handle missing ID
        }
        
        const customerDir = path.join(__dirname, '..', 'customerdata', `customer${id}`);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(customerDir)) {
            fs.mkdirSync(customerDir, { recursive: true });
        }

        cb(null, customerDir);  // Save file in the directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  // Save file with its original name
    }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = upload;
