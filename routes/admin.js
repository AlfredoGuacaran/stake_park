const { getUsuariosDB } = require('../db/gets.js');
const { validarUsuarioDB } = require('../db/puts.js');

const renderAdmin = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    const usuarioActual = req.session.usuario;

    const usuarios = await getUsuariosDB();
    res.render('admin.html', { errors, success, usuarios, usuarioActual });
  } catch (error) {
    console.log(error);
    res.redirect('/admin');
  }
};

const validarUsuario = async (req, res) => {
  try {
    const { id, auth } = req.body;

    const updateUser = await validarUsuarioDB(id, auth);

    if (!updateUser.ok) {
      req.flash('errors', updateUser.error);
      return res.send(updateUser.error);
    }

    req.flash('success', 'Usuario actualizado con exito');
    res.send('Usuario actualizado con exito');
  } catch (error) {
    console.log(error);
    req.flash('errors', error.message);
    res.redirect('/admin');
  }
};

module.exports = { renderAdmin, validarUsuario };
