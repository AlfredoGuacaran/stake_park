const { actualizarUsuarioDB } = require('../db/posts.js');
const { eliminarUsuarioDB } = require('../db/deletes.js');
const { getUsuarioDB } = require('../db/gets.js');

const fs = require('fs');
const bcrypt = require('bcrypt');

const renderDatos = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    const usuarioActual = req.session.usuario;
    res.render('datos.html', { errors, success, usuarioActual });
  } catch (error) {
    console.log(error);
    res.redirect('/datos');
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuarioActual = req.session.usuario;

    const {
      email,
      nombre,
      password,
      passwordConfirm,
      anosExperiencia,
      especialidad,
    } = req.body;

    //confirmacion de password
    if (password != passwordConfirm) {
      req.flash('errors', 'Contraseñas con coinciden');
      return res.redirect('/datos');
    }
    const passwordCrypt = await bcrypt.hash(password, 10);

    const actualizacion = await actualizarUsuarioDB(
      email,
      nombre,
      passwordCrypt,
      anosExperiencia,
      especialidad,
      usuarioActual.email
    );

    if (!actualizacion.ok) {
      req.flash('errors', 'Error al actualizar los datos');
      return res.redirect('/datos');
    }

    const usuarioDB = await getUsuarioDB(email);
    req.session.usuario = usuarioDB.usuario;

    req.flash('success', 'Datos actualizados con exito');
    res.redirect('/datos');
  } catch (error) {
    console.log(error);
    res.redirect('/datos');
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuarioActual = req.session.usuario;
    const passwordAcutal = usuarioActual.password;

    const { email, password, passwordConfirm } = req.body;

    //confirmacion de password
    if (password != passwordConfirm) {
      req.flash('errors', 'Contraseñas con coinciden');
      return res.redirect('/datos');
    }

    const passwordValida = await bcrypt.compare(password, passwordAcutal);
    // const passwordValida = false;

    if (!passwordValida || email != usuarioActual.email) {
      res.json('Contraseñas no coinciden');
      return;
    }

    const eliminacion = await eliminarUsuarioDB(email);

    if (!eliminacion.ok) {
      res.json('Error al eliminar el usuario');
      return;
    }

    fs.unlink(`static/fotos_perfil/${usuarioActual.foto}`, err => {
      if (err) throw err;
      res.redirect('/login/salir');
      console.log('Ususario eliminado');
    });
  } catch (error) {
    console.log(error.message);
    res.redirect('/datos');
  }
};

module.exports = { renderDatos, actualizarUsuario, eliminarUsuario };
