const express = require('express');

const appController = require('../controllers/appController');

const router = express.Router();

// USER ROUTES ==================================

router.post('/loginUser', appController.loginUser, (req, res) => {
  if (!res.locals.loginStatus.userFound) {
    return res.status(404).set('Content-Type', 'text/plain').send('Login failed!');
  }
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.loginStatus);
})

router.post('/addUser', appController.addUser, (req, res) => {
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.added);
});

// RATING ROUTES ==================================

router.post('/addRating', appController.addRating, (req, res) => {
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.added);
});

router.patch('/updateRating', appController.updateRating, (req, res) => {
  if (!res.locals.patchStatus) {
    return res.status(404).set('Content-Type', 'text/plain').send('Rating update failed!');
  }
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.patchStatus);
});

router.delete('/deleteRating', appController.deleteRating, (req, res) => {
  if (!res.locals.deleteStatus) {
    return res.status(404).set('Content-Type', 'text/plain').send('Rating delete failed!');
  }
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.deleteStatus);
});

router.get('/getUserRatings', appController.getUserRatings, (req, res) => {
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.myRatings);
});

// SONG ROUTES ==================================

router.post('/addSong', appController.addSong, (req, res) => {
  return res.status(200).set('Content-Type', 'json/application').json(res.locals.added);
});

module.exports = router;