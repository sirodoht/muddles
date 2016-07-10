const express = require('express');
const router = express.Router();
const passport = require('passport');

const indexCtrl = require('../controllers/index.ctrl');
const userCtrl = require('../controllers/user.ctrl');
const muddleCtrl = require('../controllers/muddle.ctrl');

router.get('/', indexCtrl.getIndex);

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', userCtrl.logout);

router.post('/muddle', muddleCtrl.create);

router.get('/readAll', muddleCtrl.list);
router.get('/readOne/:muddleId', muddleCtrl.read);

module.exports = router;
