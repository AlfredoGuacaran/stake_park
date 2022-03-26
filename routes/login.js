const { getUsuarioDB } = require('../db/gets.js');
const bcrypt = require('bcrypt');

const renderLogin = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    res.render('login.html', { errors, success });
  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
};

const loguearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioDB = await getUsuarioDB(email);

    if (!usuarioDB.ok) {
      req.flash('errors', 'Usuario no existe o contraseña invalida');
      res.redirect('/login');
      return;
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuarioDB.usuario.password
    );

    if (!passwordValida) {
      req.flash('errors', 'Usuario no existe o contraseña invalida');
      res.redirect('/login');
      return;
    }

    req.session.usuario = usuarioDB.usuario;
    res.redirect('/index');
  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
};

const salirUsuario = async (req, res) => {
  try {
    req.session.usuario = '';
    res.redirect('/index');
  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
};

module.exports = { renderLogin, loguearUsuario, salirUsuario };
