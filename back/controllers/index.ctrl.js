const indexCtrl = module.exports = {};

indexCtrl.getIndex = function (req, res) {
  res.render('index', {
    frontpage: true,
    title: 'Muddles.',
  });
};
