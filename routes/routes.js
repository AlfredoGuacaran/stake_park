const express = require('express');
const router = express.Router();
const { renderAdmin } = require('./admin.js');
const {
  renderDatos,
  actualizarUsuario,
  eliminarUsuario,
} = require('./datos.js');
const { renderIndex } = require('./index.js');
const { renderLogin } = require('./login.js');
const { renderRegistro, crearUsuario } = require('./registro.js');
const { loguearUsuario, salirUsuario } = require('./login.js');
const { validarUsuario } = require('./admin.js');

function protectRute(req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    req.flash('errors', 'No tienes permisos para acceder, inicia sesion');
    res.redirect('/login');
  }
}

function protectRuteAdmin(req, res, next) {
  if (req.session.usuario.admin) {
    next();
  } else {
    req.flash('errors', 'No tienes permisos para acceder, inicia sesion');
    res.redirect('/login');
  }
}

//renders
router.get('/admin', protectRuteAdmin, renderAdmin);
router.get('/datos', protectRute, renderDatos);
router.get('/index', renderIndex);
router.get('/login', renderLogin);
router.get('/registro', renderRegistro);
router.get('/', renderIndex);
//metodos
router.post('/registro', crearUsuario);
router.post('/login', loguearUsuario);
router.get('/login/salir', salirUsuario);
router.post('/datos/actualizar', actualizarUsuario);
router.post('/datos/eliminar', eliminarUsuario);
router.put('/admin', validarUsuario);

module.exports = router;
