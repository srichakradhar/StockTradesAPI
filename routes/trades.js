var express = require('express');
var router = express.Router();

// Routes related to trades

router.post('/trades', function(req, res, next) {
    // open the database
  let db = new sqlite3.Database('../stocks.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the stocks database.');
  });
  let user_sql = `CREATE TABLE IF NOT EXISTS users(id integer PRIMARY KEY, name TEXT NOT NULL`;
  let sql = `CREATE TABLE IF NOT EXISTS stocks(id integer PRIMARY KEY, type TEXT NOT NULL, user INTEGER, stock_symbol TEXT NOT NULL, stock_quantity INTEGER, stock_price REAL, trade_timestamp TEXT, FOREIGN KEY(user) REFERENCES users(id))`;

  db.run(user_sql, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`created table "users"`);
  });
  
  db.run(sql, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`created table "stocks"`);
  });
  
  user_sql = 'INSERT INTO users values (?, ?)';
  sql = 'INSERT INTO stocks values (?, ?, ?, ?, ?)';

  var user_id = 1;

  db.run(user_sql, [req.body["user"]["id"], req.body["user"]["name"]], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted into users with rowid ${this.lastID}`);
    user_id = this.lastID;
  });

  db.run(sql, [req.body["id"], req.body["type"], user_id, req.body["stock_symbol"], req.body["stock_quantity"], req.body["stock_price"], req.body["trade_timestamp"]], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted into stocks with rowid ${this.lastID}`);
  });

  // close the database connection
  db.close();

  res.end("user added successfully.");
})

module.exports = router;