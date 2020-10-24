/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// These are our required libraries to make the server work.

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post((req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    res.send('Hello World');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
