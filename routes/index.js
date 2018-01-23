var express = require('express');
var fs = require('fs');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/listUsers', function (req, res) {
  // fs.readFile( __dirname + "/../" + "users.json", 'utf8', function (err, data) {
  //     // console.log( data );
  //     res.end( data );
  // });

  // open the database
  let db = new sqlite3.Database('../users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the users database.');
  });

  let sql = `SELECT DISTINCT name FROM users`;
 
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });

  // close the database connection
  db.close();

  res.end("users listed successfully.");

});

var user = {
  "user4" : {
     "name" : "mohit",
     "password" : "password4",
     "profession" : "teacher",
     "id": 4
  }
}

router.post('/addUser', function (req, res) {
  // open the database
  let db = new sqlite3.Database('../users.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the users database.');
  });

  let sql = `CREATE TABLE IF NOT EXISTS users(name text)`;

  db.run(sql, [], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`created table "users"`);
  });

  // First read existing users.
  // fs.readFile( __dirname + "/../" + "users.json", 'utf8', function (err, data) {
  //     data = JSON.parse( data );
  //     data["user4"] = req.body[Object.keys(req.body)[0]];
  //     // console.log( data );
  //     res.end( JSON.stringify(data));
  // });
  
  sql = 'INSERT INTO users values (?)';

  db.run(sql, [req.body[Object.keys(req.body)[0]]["name"]], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  // close the database connection
  db.close();

  res.end("user added successfully.");
 
});

router.get('/:id', function (req, res) {
  // First read existing users.
  // fs.readFile( __dirname + "/../" + "users.json", 'utf8', function (err, data) {
  //    var users = JSON.parse( data );
  //    var user = users["user" + req.params.id] 
  //    console.log( user );
  //    res.end( JSON.stringify(user));
  // });

  // open the database
  let db = new sqlite3.Database('../users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the users database.');
  });

  let sql = `SELECT DISTINCT name FROM users WHERE rowid = ` + req.params.id ;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });

  // close the database connection
  db.close();

  res.end("users retrieved successfully.");

});

var id = 2;

router.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/../" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
});

module.exports = router;
