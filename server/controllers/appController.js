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

appController.getUsers = (req, res, next) => {
  console.log('within appController.getUsers');
  return next();
}

appController.getReccs = (req, res, next) => {
  console.log('within appController.getReccs');
  return next();
}

appController.addSong = (req, res, next) => {
  const query = `INSERT INTO songs (_id, title, artist, releaseYear)
  VALUES ($1 $2 $3 $4) RETURN *`

  const values = [req.body._id, req.body.title, req.body.artist, req.body.releaseYear];

  console.log(values);

  async function insertSong() {
    await db.query(query, values, (err, queryRes) => {
      // res.locals.added = queryRes.rows[0];
      if (err) {
        console.log('Error occured within addSong!');
        return next(err);
      }
    });
    return next();
  }

  insertSong();
}

module.exports = appController;
