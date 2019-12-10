import express from 'express';
import { join } from 'path';
import config from '../config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { __express } from 'ejs';

import App from '../components/App';

const app = express();

app.set('view engine', 'ejs');
app.set('views', join('build', 'views'));

app.use(express.static('build'));

app.engine('.ejs', __express);

app.get('/', (req, res) => {
  res.render('index', {
    year: new Date().getUTCFullYear(),
    root: renderToString(
      <App />
    ),
    version: config.version
  })
});

app.listen(config.port, () => {
  console.log(`App listen ${config.port}.`);
});
