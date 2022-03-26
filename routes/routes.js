const express = require('express');
const router = express.Router();
const { renderAdmin } = require('./admin.js');
const { renderDatos } = require('./datos.js');
const { renderIndex } = require('./index.js');
const { renderLogin } = require('./login.js');
const { renderRegistro, crearUsuario } = require('./registro.js');
const { loguearUsuario, salirUsuario } = require('./login.js');

//renders
router.get('/admin', renderAdmin);
router.get('/datos', renderDatos);
router.get('/index', renderIndex);
router.get('/login', renderLogin);
router.get('/registro', renderRegistro);
router.get('/', renderIndex);
//metodos
router.post('/registro', crearUsuario);
router.post('/login', loguearUsuario);
router.get('/login/salir', salirUsuario);

module.exports = router;
