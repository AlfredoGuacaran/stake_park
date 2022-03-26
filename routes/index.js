const { getUsuariosDB } = require('../db/gets.js');

const renderIndex = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    const usuarioActual = req.session.usuario;
    const usuarios = await getUsuariosDB();
    res.render('index.html', { errors, success, usuarios, usuarioActual });
  } catch (error) {
    console.log(error);
    res.redirect('/index');
  }
};

module.exports = { renderIndex };
