const models = require('../models');

const failureCtrl = module.exports = {};

failureCtrl.new = function (req, res) {
  models.Failure.create(req.body)
    .then(function () {
      res.redirect('/list');
    });
};

failureCtrl.list = function (req, res) {
  models.Failure.findAll()
    .then(function (failures) {
      res.render('failures', {
        brand: 'Muddles',
        title: 'readAll',
        subtitle: 'The list of the things that suck.',
        failures,
      });
    });
};

failureCtrl.read = function (req, res) {
  models.Failure.findOne({
    where: { id: req.params.failureId }
  })
    .then(function (failure) {
      res.render('failure', {
        brand: 'Muddles',
        title: 'readOne',
        subtitle: 'The one of the things that suck.',
        failure,
      });
    });
};
