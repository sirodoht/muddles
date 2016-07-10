const express = require('express');
const router = express.Router();
const passport = require('passport');

const indexCtrl = require('../controllers/index.ctrl');
const userCtrl = require('../controllers/user.ctrl');
const failureCtrl = require('../controllers/failure.ctrl');

router.get('/', indexCtrl.getIndex);
router.get('/login', userCtrl.getLogin);

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('req.isAuthenticated():', req.isAuthenticated());
    console.log('req.session.save:', req.session.save);
    req.session.reload();
    req.session.save();
    req.session.user = req.user;
    res.redirect('/');
  });

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.post('/new', failureCtrl.new);

router.get('/readAll', failureCtrl.list);
router.get('/readOne/:failureId', failureCtrl.read);

router.get('/register', userCtrl.getRegister);

router.get('/:user', userCtrl.getUser);

module.exports = router;
