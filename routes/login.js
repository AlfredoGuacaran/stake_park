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

module.exports = { renderLogin };
