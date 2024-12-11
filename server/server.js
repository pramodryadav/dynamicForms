const app = require('./app');

const PORT = process.env.PORT || 7609;

app.listen(PORT, () => {
    console.log(`Audit Analytics Server listening on port ${PORT}`);
});