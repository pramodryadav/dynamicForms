// /config/db.js

const mysql = require('mysql2/promise');

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 3306  // Default port is 3306 if not specified
        });
        console.log('MySQL Connected...');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
