const express = require('express');
const router = express.Router();
const { renderAdmin } = require('./routes/admin.js');
const { renderDatos } = require('./routes/datos.js');
const { renderIndex } = require('./routes/index.js');
const { renderLogin } = require('./routes/login.js');
const { renderRegistro } = require('./routes/registro.js');
const { postUser, getUser, getUsers, putUser } = require('./db.js');

router.get('/admin', renderAdmin);
router.get('/datos', renderDatos);
router.get('/index', renderIndex);
router.get('/login', renderLogin);
router.get('/registro', renderRegistro);
router.get('/', renderIndex);

module.exports = router;
