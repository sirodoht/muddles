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
      console.log('muddles:', muddles);
      Object.assign(res.locals, {
        title: 'readAll',
        subtitle: 'The list of the things that we messed up.',
        muddles,
      });
      return muddles.getUser();
    })
    .then(function (users) {
      console.log('users', users);
      res.render('muddles');
    });
};

muddleCtrl.read = function (req, res) {
  models.Muddle.findOne({
    where: { id: req.params.muddleId }
  })
    .then(function (muddle) {
      Object.assign(res.locals, {
        title: 'readOne',
        subtitle: 'The one of the things that we messed up.',
        muddle,
      });
      return muddle.getUser();
    })
    .then(function (user) {
      if (user) {
        Object.assign(res.locals, {
          author: user.username,
          authorLink: user.profile,
        });
      } else {
        Object.assign(res.locals, {
          anon: true,
        });
      }
      res.render('muddle');
    });
};
