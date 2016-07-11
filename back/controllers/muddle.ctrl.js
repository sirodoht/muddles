const models = require('../models');

const muddleCtrl = module.exports = {};

muddleCtrl.create = function (req, res) {
  var newMuddle = null;
  models.Muddle.create(req.body)
    .then(function (muddle) {
      if (req.user) {
        newMuddle = muddle;
        return models.User.findOne({
          where: { id: req.user.id }
        });
      } else {
        res.redirect('/readAll');
      }
    })
    .then(function (user) {
      user.addMuddle(newMuddle);
      res.redirect('/readAll');
    });
};

muddleCtrl.list = function (req, res) {
  models.Muddle.findAll({
    attributes: ['id', 'title', 'symptoms'],
    order: [['createdAt', 'DESC']],
    include: [{
      model: models.User,
      attributes: ['username', 'profile'],
    }],
    raw: true,
  })
    .then(function (muddles) {
      muddles.forEach(function (m) {
        if (m['User.username']) {
          m.author = m['User.username'];
          delete m['User.username'];
          m.authorLink = m['User.profile'];
          delete m['User.profile'];
        } else {
          delete m['User.username'];
          delete m['User.profile'];
          m.anon = true;
        }
      });
      console.log(muddles);
      res.render('muddles', {
        title: 'readAll',
        subtitle: 'The list of the things that we messed up.',
        muddles,
      });
    });
};

muddleCtrl.read = function (req, res) {
  models.Muddle.findOne({
    where: {
      id: req.params.muddleId,
    },
  })
    .then(function (muddle) {
      const rawMuddle = {
        title: muddle.title,
        symptoms: muddle.symptoms,
        hotfix: muddle.hotfix,
        description: muddle.description,
      };
      Object.assign(res.locals, {
        title: 'readOne',
        subtitle: 'The one of the things that we messed up.',
        muddle: rawMuddle,
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
