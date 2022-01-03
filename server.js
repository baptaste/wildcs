require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 1234;
const router = require('./api/router');
const multer = require('multer');
const bodyParser = multer();
const app = express();

app.use(express.json());
app.use(express.static('assets'));
app.use( cors('http://localhost:1234/') );
app.use( bodyParser.none() );
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});