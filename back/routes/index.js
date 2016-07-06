const express = require('express');
const router = express.Router();
const passport = require('passport');

const indexCtrl = require('../controllers/index.ctrl');
const userCtrl = require('../controllers/user.ctrl');

router.get('/', indexCtrl.getIndex);
router.get('/login', userCtrl.getLogin);

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('success');
    res.redirect('/');
  });

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);


router.get('/register', userCtrl.getRegister);

router.get('/:user', userCtrl.getUser);

module.exports = router;
