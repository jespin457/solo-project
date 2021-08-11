const { Pool } = require('pg');

const PG_URI = 'postgres://vwrjbjna:rlE1AMPPPpqv2-pnkK4PABlAxPNWV8hN@chunee.db.elephantsql.com/vwrjbjna';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};