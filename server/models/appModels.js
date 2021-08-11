const { Pool } = require('pg');

const PG_URI = 'postgres://tyxiivvl:efE3KdbI73h2ndqHgyW_rL8JX3wRi8vM@chunee.db.elephantsql.com/tyxiivvl';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};