const indexCtrl = module.exports = {};

indexCtrl.getIndex = function (req, res) {
  res.render('index', {
    brand: '',
    title: 'Muddles.',
    subtitle: 'Things that suck.'
  });
};
