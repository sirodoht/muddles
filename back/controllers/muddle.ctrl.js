const models = require('../models');

const muddleCtrl = module.exports = {};

muddleCtrl.create = function (req, res) {
  models.Muddle.create(req.body)
    .then(function () {
      res.redirect('/readAll');
    });
};

muddleCtrl.list = function (req, res) {
  models.Muddle.findAll({
    order: [['createdAt', 'DESC']]
  })
    .then(function (muddles) {
      res.render('muddles', {
        title: 'readAll',
        subtitle: 'The list of the things that we messed up.',
        muddles,
      });
    });
};

muddleCtrl.read = function (req, res) {
  models.Muddle.findOne({
    where: { id: req.params.muddleId }
  })
    .then(function (muddle) {
      res.render('muddle', {
        title: 'readOne',
        subtitle: 'The one of the things that suck.',
        muddle,
      });
    });
};
