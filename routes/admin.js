const renderAdmin = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    res.render('admin.html', { errors, success });
  } catch (error) {
    console.log(error);
    res.redirect('/admin');
  }
};

module.exports = { renderAdmin };
