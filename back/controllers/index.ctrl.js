const indexCtrl = module.exports = {};

indexCtrl.getIndex = function (req, res) {
  res.render('index', {
    noNavbarBrand: true,
    title: 'Muddles.',
    subtitle: 'Things that suck.'
  });
};
