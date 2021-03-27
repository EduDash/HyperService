const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, 'config', '.env'),
});

const sanitize = require('express-mongo-sanitize');
const cors = require('cors');
const { dbConnect } = require('./config/db.config');
const HyperSchema = require('./models/Hyperlink');

dbConnect();

const app = express();

app.use(sanitize());
app.use(cors());
app.use(express.json());

let cache = {};

app.get('/:hyper', async (req, res, next) => {
  try {
    const hyper = req.params.hyper;
    if (cache[hyper]) return res.redirect(cache[hyper]);
    console.log(`Cache miss ${req.params.hyper}`);
    const foundLink = await HyperSchema.findOne({ name: hyper });
    if (!foundLink) {
      return res.redirect(`https://edudash.org`);
    } else {
      cache[hyper] = foundLink.href;
      return res.redirect(foundLink.href);
    }
  } catch (ex) {
    res.redirect(`https://edudash.org`);
  }
});

app.put('/:hyper', async (req, res, next) => {
  try {
    if (
      req.headers.authorization === null ||
      req.headers.authorization !== process.env.ADMIN_KEY
    )
      return res.status(401).json({
        success: false,
        error: '401: Unauthorized',
      });
    if (!req.body.href) {
      return res.status(400).json({
        success: false,
        message: 'path `href` required',
      });
    }
    const preExisting = await HyperSchema.findOne({
      name: req.params.hyper,
    });
    if (preExisting) {
      await preExisting.updateOne({
        href: req.body.href,
      });
      cache[req.params.hyper] = req.body.href;
      res.status(200).json({ success: true });
    } else {
      await HyperSchema.create({
        name: req.params.hyper,
        href: req.body.href,
      });
      return res.status(200).json({
        success: true,
      });
      cache[req.body.name] = req.body.href;
    }
  } catch (ex) {
    console.log(ex);
    res.status(200).json({
      success: false,
    });
  }
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`[Hyper] Listening on port ${process.env.PORT}`);
  }
});
