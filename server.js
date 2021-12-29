require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 1234;
// const router = require('./api/router');
const app = express();

app.use(express.static('assets'));

// app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});