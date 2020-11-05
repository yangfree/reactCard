const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');
const index = require('./router/index');
const { apiurl } = require('./router/const');
const app = express()
const PORT = 13000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', index)

app.listen(PORT, () => {
    const programPath = path.join(__dirname);
    const nodeVersion = process.versions.node;
    console.table([{ path: programPath }, { node: nodeVersion }, { host: apiurl }, { port: PORT }]);
})


