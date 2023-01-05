const express = require('express');
const bodyParse = require('body-parser')
require('dotenv').config();

// const PORT = process.env.PORT

const path = require('path');

const app = express();

app.use(bodyParse.json());
app.use('/', express.static(path.join(__dirname, "../public")));


const PORT = 5000;
app.listen(PORT, () => {
    console.log('rodando in port: 5000')
})