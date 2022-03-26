const { getUsuariosDB } = require('../db/gets.js');

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

module.exports = { renderAdmin };
