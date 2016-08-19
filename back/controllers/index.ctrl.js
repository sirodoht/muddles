const indexCtrl = module.exports = {};

indexCtrl.getIndex = function (req, res) {
  res.render('index', {
    frontpage: true,
    title: 'Muddles.',
    subtitle: 'Document your technical failures',
  });
};
