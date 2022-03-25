const renderDatos = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    res.render('datos.html', { errors, success });
  } catch (error) {
    console.log(error);
    res.redirect('/datos');
  }
};

module.exports = { renderDatos };
