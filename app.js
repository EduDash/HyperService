const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, 'config', '.env'),
});

const sanitize = require('express-mongo-sanitize');
const cors = require('cors');

const app = express();

app.use(sanitize());
app.use(cors());

const cache = {};

app.get('/:hyper', async (req, res, next) => {
  const hyper = req.params.hyper;
  if (cache[hyper]) return res.redirect(cache[hyper]);

  res.end();
  // res.redirect(`https://docs.edudash.org`);
});

app.put('/:hyper', async (req, res, next) => {
  if (req.headers['authorization'] !== process.env.ADMIN_KEY)
    return res.redirect('https://www.edudash.org/');
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`[Hyper] Listening on port ${process.env.PORT}`);
  }
});
