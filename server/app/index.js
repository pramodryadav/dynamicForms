require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/auditRoutes");
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

app.use('/docqfacts/api/auth', authRoutes);
app.use('/docqfacts/api/audit', auditRoutes);
app.use('/docqfacts/api/app', appDataRoutes);

// serving the react app and static files
app.use('/cust-docs', express.static(path.join(__dirname, './customerdata')));

app.use("/docqfacts", express.static(path.join(__dirname, '../../build')));

app.get(`/docqfacts/*`, (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});



module.exports = app

