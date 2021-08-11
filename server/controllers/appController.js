const db = require('../models/appModels.js'); //used to deploy queries to ElephantDB

const appController = {};

appController.logSucc = (req, res, next) => {
  // async function log() {
  //   try {
  //     console.log(req.body);
  //   } catch(err) {
  //     console.log('Error within appController!: ', err);
  //   }
  // }
  console.log('request is as follows: ', req.body);
  return next();
}

appController.addUser = (req, res, next) => {
  const query = `INSERT INTO users (username, email)
  VALUES ($1, $2) RETURNING *`

  const values = [req.body.username, req.body.email];

  async function insertUser() {
    await db.query(query, values, (err, queryRes) => {
      // res.locals.added = queryRes.rows[0];
      if (err) {
        console.log('Error occured within addUser!');
        return next(err);
      }
      res.locals.added = queryRes.rows[0];
      console.log('appController, line 31', res.locals.added);
      return next();
    });
  }

  insertUser();
}

appController.getUsers = (req, res, next) => {
  console.log('within appController.getUsers');
  return next();
}

appController.getReccs = (req, res, next) => {
  console.log('within appController.getReccs');
  return next();
}

appController.addSong = (req, res, next) => {
  const query = `INSERT INTO songs (title, artist, releaseYear)
  VALUES ($1, $2, $3) RETURNING *`

  const values = [req.body.title, req.body.artist, req.body.releaseYear];

  console.log(values);

  async function insertSong() {
    await db.query(query, values, (err, queryRes) => {
      // res.locals.added = queryRes.rows[0];
      if (err) {
        console.log('Error occured within addSong!');
        return next(err);
      }
      res.locals.added = queryRes.rows[0];
      console.log('appController, line 44', res.locals.added);
      return next();
    });
  }

  insertSong();
}

appController.getSong = (req, res, next) => {
  const query = `SELECT songs.*, (title, artist, releaseYear)
  VALUES ($1, $2) RETURNING *`

  const values = [req.body.title, req.body.artist];

  console.log(values);

  async function retrSong() {
    await db.query(query, values, (err, queryRes) => {
      // res.locals.added = queryRes.rows[0];
      if (err) {
        console.log('Error occured within addSong!');
        return next(err);
      }
      res.locals.added = queryRes.rows[0];
      console.log('appController, line 44', res.locals.added);
      return next();
    });
  }

  retrSong();
}

module.exports = appController;
