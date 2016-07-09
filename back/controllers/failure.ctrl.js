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
      res.json(failures);
    });
};
