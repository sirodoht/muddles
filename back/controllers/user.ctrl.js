const userCtrl = module.exports = {};

userCtrl.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};
