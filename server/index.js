const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routers');

const PORT = 3030;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/src')));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
