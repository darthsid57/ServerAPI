const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'traseable'
});

console.log(connection);

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('go to /users to see users')
});

app.get('/users/add', (req, res) => {
  const { user_id, user_firstname, user_lastname, user_pin, usertype, usercompany, user_created_at, user_last_login, user_status } = req.query;
  const INSERT_USER_QUERY = `INSERT INTO users
  (user_id,
    user_firstname,
    user_lastname,
    user_pin,
    usertype,
    usercompany,
    user_created_at,
    user_last_login,
    user_status) VALUES
    ('${user_id}',
      ${user_firstname},
      ${user_lastname},
      ${user_pin},
      ${usertype},
      ${usercompany},
      ${user_created_at},
      ${user_last_login},
      ${user_status},
  )`;
  connection.query(INSERT_USER_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('successfully added user')
    }
  });
});

// app.post('/new', function (req, res, next){
//   connection.query('insert into users(user_id, user_firstname) values('' + req.body.user_id+'')', function(error, results, fields){
//     if(error) throw error;
//     res.send(JSON.stringify(results));
//   });
// });

app.get('/userss', function(req, res, next) {
    connection.query('select * from users', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
    if(err){
      return res.send(err);
    }
    else{
      return res.json({
        data: results
      })
    }
  });
});

app.listen(4000, () => {
  console.log(`Projects Server listening on port 4000`)
});
