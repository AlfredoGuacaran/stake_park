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

module.exports = { renderRegistro };
