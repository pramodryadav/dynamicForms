require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/auditRoutes");
const appDataRoutes = require("./routes/appDataRoutes");
const projectRoutes = require("./routes/projectRoutes");
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

app.use('/docufacts/api/auth', authRoutes); //append docufacts for development environment
app.use('/docufacts/api/audit', auditRoutes); //append docufacts for development environment
app.use('/docufacts/api/app', appDataRoutes); //append docufacts for development environment
app.use('/docufacts/api/project',projectRoutes) //append docufacts for development environment

// serving the react app and static files
app.use('/cust-docs', express.static(path.join(__dirname, './customerdata')));

app.use("/docufacts/", express.static(path.join(__dirname, '../../build'))); //append docufacts for development environment

app.get(`/docufacts/*`, (req, res) => { //append docufacts for development environment
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});



module.exports = app

