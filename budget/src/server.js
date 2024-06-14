// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'income_db',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/income', (req, res) => {
  const { income_name, amount } = req.body;

  const sql = 'INSERT INTO income (income_name, amount) VALUES (?, ?)';
  connection.query(sql, [income_name, amount], (err, result) => {
    if (err) {
      console.error('Error creating income:', err);
      res.status(500).send('Error creating income');
      return;
    }
    console.log('Income created successfully');
    res.status(201).send('Income created successfully');
  });
});

app.get('/income', (req, res) => {
  const sql = 'SELECT * FROM income';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});
app.get('/income_graph', (req, res) => {
  const sql = 'SELECT * FROM summary';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});
app.get('/income_', (req, res) => {
  const sql = 'SELECT * FROM income ORDER BY amount DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});
app.get('/income__', (req, res) => {
  const sql = 'SELECT id, income_name, SUM(amount) AS amount FROM income GROUP BY income_name ORDER BY SUM(amount) DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});
app.get('/in_groupby', (req, res) => {
  const sql = 'SELECT income_name, SUM(amount) AS total_amount FROM income GROUP BY income_name';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});

app.put('/income/:id', (req, res) => {
  const incomeId = req.params.id;
  const { income_name, amount } = req.body;

  const sql = 'UPDATE income SET income_name = ?, amount = ? WHERE id = ?';
  connection.query(sql, [income_name, amount, incomeId], (err, result) => {
    if (err) {
      console.error('Error updating income:', err);
      res.status(500).send('Error updating income');
      return;
    }
    console.log('Income updated successfully');
    res.status(200).send('Income updated successfully');
  });
});

app.delete('/income/:id', (req, res) => {
  const incomeId = req.params.id;

  const sql = 'DELETE FROM income WHERE id = ?';
  connection.query(sql, [incomeId], (err, result) => {
    if (err) {
      console.error('Error deleting income:', err);
      res.status(500).send('Error deleting income');
      return;
    }
    console.log('Income deleted successfully');
    res.status(200).send('Income deleted successfully');
  });
});

app.get('/summary/aggregates', (req, res) => {
  const sql = `
    SELECT 
      MIN(food) AS min_food,
      MAX(food) AS max_food,
      AVG(food) AS avg_food,
      SUM(food) AS sum_food,
      MIN(travel) AS min_travel,
      MAX(travel) AS max_travel,
      AVG(travel) AS avg_travel,
      SUM(travel) AS sum_travel,
      MIN(shoping) AS min_shoping,
      MAX(shoping) AS max_shoping,
      AVG(shoping) AS avg_shoping,
      SUM(shoping) AS sum_shoping,
      MIN(medicine) AS min_medicine,
      MAX(medicine) AS max_medicine,
      AVG(medicine) AS avg_medicine,
      SUM(medicine) AS sum_medicine
    FROM summary;
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching aggregates:', err);
      res.status(500).json({ error: 'Error fetching aggregates' });
      return;
    }
    res.status(200).json(results[0]);
  });
});


app.post('/signup', (req, res) => {
  const { username, userid,  email, password, birthdate } = req.body;
  const query = `INSERT INTO student (username, userid,  email, password, birthdate) VALUES (?, ?, ?, ?, ?)`;
  
  // Assuming `connection` is defined and exported from your database connection module

  connection.query(query, [username, userid,  email, password, birthdate], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.send({ success: true, id: result.insertId });
  });
});



app.post('/login', (req, res) => {
  const { userid, password } = req.body;
  const query = 'SELECT username, email FROM student WHERE userid = ? AND password = ?';
  connection.query(query, [userid, password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
          const { username, email } = results[0];
          res.json({ success: true, message: 'Login successful', username, email });
      } else {
          res.json({ success: false, message: 'Invalid credentials' });
      }
  });
});


app.get('/exp', (req, res) => {
  const query = 'SELECT * FROM expenses';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});


app.post('/addExpense', (req, res) => {
  const { name, amount, category } = req.body;
  const query = 'INSERT INTO expenses (name, amount, category) VALUES (?, ?, ?)';
  connection.query(query, [name, amount, category], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, name, amount, category });
  });
});

app.use(bodyParser.json());

// Endpoint to fetch user details


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
