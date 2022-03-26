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

module.exports = { renderDatos };
