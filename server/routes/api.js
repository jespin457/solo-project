const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/', appController.getUsers, appController.getReccs, (req, res) => {
  return res.status(200).set('Content-Type', 'json/application').json({'doesnt': 'matter'})
});

router.post('/addUser', appController.addUser, (req, res) => {
  console.log(res.locals.added);
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.added);
});

router.post('/addSong', appController.addSong, (req, res) => {
  // console.log(res.locals.added);
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.added);
});

module.exports = router;