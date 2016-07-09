const models = require('../models');

const failureCtrl = module.exports = {};

failureCtrl.register = function (req, res) {
  console.log('req.body:', req.body);
  models.Failure.create(req.body)
    .then(function () {
      res.redirect('/list');
    });
};
