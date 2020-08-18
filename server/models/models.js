const { Pool } = require('pg');

const PG_URI = 'postgres://gsuhxhlq:eY1yIjNdQnykWHWayH-_9WcqQzfxjt0o@raja.db.elephantsql.com:5432/gsuhxhlq';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
