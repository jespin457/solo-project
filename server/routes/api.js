const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/', appController.getUsers, appController.getReccs, (req, res) => {
  return res.status(200).set('Content-Type', 'json/application').json({'doesnt': 'matter'})
});

router.post('/addSong', appController.addSong, (req, res) => {
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.added);
});

router.get('/blah', appController.logSucc, (req, res) => {
  return res.status(200).set('Content-Type', 'text/plain').send("success call into api!");
});


module.exports = router;