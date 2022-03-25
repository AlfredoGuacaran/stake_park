const renderIndex = async (req, res) => {
  try {
    const errors = req.flash('errors');
    const success = req.flash('success');
    res.render('index.html', { errors, success });
  } catch (error) {
    console.log(error);
    res.redirect('/index');
  }
};

module.exports = { renderIndex };
