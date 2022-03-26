const { crearUsuarioDB } = require('../db/posts.js');
const bcrypt = require('bcrypt');

const renderRegistro = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    res.render('registro.html', { errors, success });
  } catch (error) {
    console.log(error);
    res.redirect('/registro');
  }
};

const crearUsuario = async (req, res) => {
  try {
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
      req.flash('errros', 'Contraseñas con coinciden');
      return res.redirect('/registro');
    }

    const passwordCrypt = await bcrypt.hash(password, 10);

    //confirmacion de imagen
    const fotoPerfil = req.files.fotoperfil;
    const formatoFoto = fotoPerfil.name.split('.').slice(-1)[0];
    const formatosValidos = ['jpg', 'png', 'jpeg', 'bmp'];
    if (!formatosValidos.includes(formatoFoto)) {
      req.flash('errors', 'Formato invalido de imagen');
      res.redirect('/registro');
      return;
    }

    const nuevoUsuario = await crearUsuarioDB(
      email,
      nombre,
      passwordCrypt,
      anosExperiencia,
      especialidad,
      `${email}.${formatoFoto}`
    );

    if (!nuevoUsuario.ok) {
      req.flash('errors', nuevoUsuario.error);
      res.redirect('/registro');
      return;
    }
    fotoPerfil.mv(`static/fotos_perfil/${email}.${formatoFoto}`, error => {
      console.log('Imagen guardada');
    });
    req.flash('success', 'Usuario registrado con exito');
    res.redirect('/registro');
  } catch (error) {
    console.log(error);
    res.redirect('/registro');
  }
};

module.exports = { renderRegistro, crearUsuario };
