const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const routes = require('./routes');
const session = require('express-session');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(flash());

app.use(
  session({
    secret: 'mi-clave',
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 * 24 }, // 1 día
    resave: false,
  })
);

nunjucks.configure('views', {
  express: app,
  autoescape: true,
  noCache: false,
  watch: true,
});

app.use('/', routes);

app.listen(3000, () => console.log('Servidor en puerto 3000'));
