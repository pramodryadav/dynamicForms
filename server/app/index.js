require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/docuFactsRoutes");
const appDataRoutes = require("./routes/appDataRoutes");
const connectDB = require("./config/db")

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
connectDB();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// API routes

app.use('/api/auth', authRoutes); //append docufacts for development environment
app.use('/docufacts/api/docufacts', auditRoutes); //append docufacts for development environment
app.use('/docufacts/api/app', appDataRoutes); //append docufacts for development environment

// serving the react app and static files
app.use('/cust-docs', express.static(path.join(__dirname, './customerdata')));

app.use("/", express.static(path.join(__dirname, '../../build'))); //append docufacts for development environment

app.get(`/*`, (req, res) => { //append docufacts for development environment
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});



module.exports = app

