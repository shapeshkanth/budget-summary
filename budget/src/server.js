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
  database: 'budget',
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

//today income insert the table //---------------------------------------------------------------------
app.post('/income', (req, res) => {
  const { income_name, amount } = req.body;
  const sql = 'INSERT INTO income_temp (income_name, amount) VALUES (?, ?)';
  connection.query(sql, [income_name, amount], (err, result) => {
    if (err) {
      console.error('Error creating income:', err);
      res.status(500).send('Error creating income');


      
      return;
    }
    console.log('Income created successfully');
    res.status(201).send('Income created successfully');
    const sql4= 'UPDATE income SET amount = (SELECT SUM(amount) FROM income_temp) WHERE id = (SELECT MAX(id) FROM income);';
    connection.query(sql4, (err, result) => { 
  });
  });

  

});

///select or print today income//-----------------------------------------------------------------------------------

app.get('/income', (req, res) => {
  const sql = 'SELECT * FROM income_temp';
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
  const sql = 'SELECT * FROM income_temp ORDER BY amount DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});

///update today income//---------------------------------------------------------------------------------
app.put('/income/:id', (req, res) => {
  const incomeId = req.params.id;
  const { income_name, amount } = req.body;
  const sql = 'UPDATE income_temp SET income_name = ?, amount = ? WHERE id = ?';
  connection.query(sql, [income_name, amount, incomeId], (err, result) => {
    if (err) {
      console.error('Error updating income:', err);
      res.status(500).send('Error updating income');
      return;
    }
    console.log('Income updated successfully');
    res.status(200).send('Income updated successfully');
    const sql3= 'UPDATE income SET amount = (SELECT SUM(amount) FROM income_temp) WHERE id = (SELECT MAX(id) FROM income);';
    connection.query(sql3, (err, result) => { 
  });
  });
});

///delete today income //-------------------------------------------------------------------------------

app.delete('/income/:id', (req, res) => {
  const incomeId = req.params.id;
  const sql = 'DELETE FROM income_temp WHERE id = ?';
  connection.query(sql, [incomeId], (err, result) => {
    if (err) {
      console.error('Error deleting income:', err);
      res.status(500).send('Error deleting income');
      return;
    }
    console.log('Income deleted successfully');
    res.status(200).send('Income deleted successfully');
    const sql2= 'UPDATE income SET amount = (SELECT SUM(amount) FROM income_temp) WHERE id = (SELECT MAX(id) FROM income);';
    connection.query(sql2, (err, result) => { 
  });
  });
});

//index page  graph//-------------------------------------------------------------------------

app.get('/income__', (req, res) => {
  const sql = 'SELECT id, expences_name, SUM(amount) AS amount FROM expences_temp GROUP BY expences_name ORDER BY SUM(amount) DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});

//print expences //-----------------------------------------------------------------------------------------

app.get('/expences', (req, res) => {
  const sql = 'SELECT * FROM expences_temp ORDER BY amount DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching expences:', err);
      res.status(500).send('Error fetching expences');
      return;
    }
    res.status(200).json(results);
  });
});
///insert the expences//------------------------------------------------------------------------------------
app.post('/expences', (req, res) => {
  const { expences_name, amount } = req.body;
  const sql = 'INSERT INTO expences_temp (expences_name, amount) VALUES (?, ?)';
  connection.query(sql, [expences_name, amount], (err, result) => {
    if (err) {
      console.error('Error creating expences:', err);
      res.status(500).send('Error creating expences');
      return;
    }
    console.log('expences created successfully');
    res.status(201).send('expences created successfully');
    const sql6= "UPDATE expences SET food = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'food'), 0),medicine = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'medicine'), 0),travel = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'travel'), 0),shoping = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'shopping'), 0),others = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'others'), 0) + COALESCE((SELECT SUM(expences_temp.amount) FROM expences_temp LEFT JOIN suggestions ON suggestions.name = expences_temp.expences_name WHERE suggestions.name IS NULL), 0) WHERE id = (SELECT MAX(id) FROM expences)";
    connection.query(sql6, (err, result) => { 
  });
  });

});

///update todat expences//--------------------------------------------------------------------------------

app.put('/expences/:id', (req, res) => {
  const expId = req.params.id;
  const { expences_name, amount } = req.body;
const sql = 'UPDATE expences_temp SET expences_name = ?, amount = ? WHERE id = ?';
  connection.query(sql, [expences_name, amount, expId], (err, result) => {
    if (err) {
      console.error('Error updating :', err);
      res.status(500).send('Error updating expences');
      return;
    }
    console.log('expences updated successfully');
    res.status(200).send('expences updated successfully');
    const sql7= "UPDATE expences SET food = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'food'), 0),medicine = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'medicine'), 0),travel = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'travel'), 0),shoping = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'shopping'), 0),others = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'others'), 0) + COALESCE((SELECT SUM(expences_temp.amount) FROM expences_temp LEFT JOIN suggestions ON suggestions.name = expences_temp.expences_name WHERE suggestions.name IS NULL), 0) WHERE id = (SELECT MAX(id) FROM expences)";
    connection.query(sql7, (err, result) => { 
  });
  });
});

///delete today expences//----------------------------------------------------------------------------

app.delete('/expences/:id', (req, res) => {
  const expId = req.params.id;
const sql = 'DELETE FROM expences_temp WHERE id = ?';
  connection.query(sql, [expId], (err, result) => {
    if (err) {
      console.error('Error deleting expences:', err);
      res.status(500).send('Error deleting expences');
      return;
    }
    console.log('expences deleted successfully');
    res.status(200).send('expences deleted successfully');
    const sql8= "UPDATE expences SET food = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'food'), 0),medicine = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'medicine'), 0),travel = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'travel'), 0),shoping = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'shopping'), 0),others = COALESCE((SELECT SUM(expences_temp.amount) FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name WHERE suggestions.category = 'others'), 0) + COALESCE((SELECT SUM(expences_temp.amount) FROM expences_temp LEFT JOIN suggestions ON suggestions.name = expences_temp.expences_name WHERE suggestions.name IS NULL), 0) WHERE id = (SELECT MAX(id) FROM expences)";
    connection.query(sql8, (err, result) => { 
  });
  });
});

app.get('/income_graph', (req, res) => {
  const sql = 'SELECT * FROM expences order by id desc limit 15';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching expences:', err);
      res.status(500).send('Error fetching expences');
      return;
    }
    res.status(200).json(results);
  });
});

//summary page// expences table

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
    FROM expences;
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

app.get('/in_groupby', (req, res) => {
  const sql = 'SELECT suggestions.category,SUM(expences_temp.amount) AS total_amount FROM suggestions JOIN expences_temp ON suggestions.name = expences_temp.expences_name GROUP BY suggestions.category';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching income:', err);
      res.status(500).send('Error fetching income');
      return;
    }
    res.status(200).json(results);
  });
});

//signin//--------------------------------------

app.post('/signup', (req, res) => {
  const { username, userid,  email, password, birthdate } = req.body;
  const query = `INSERT INTO student (username, userid,  email, password, birthdate) VALUES (?, ?, ?, ?, ?)`;
  
  

  connection.query(query, [username, userid,  email, password, birthdate], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.send({ success: true, id: result.insertId });
  });

  const sql4 = `SET GLOBAL event_scheduler = ON`;

  connection.query(sql4, (err, result) => {
  });
  const sql3 = `CREATE EVENT IF NOT EXISTS update_income ON SCHEDULE EVERY 1 DAY STARTS CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 2 MINUTE DO INSERT INTO income (amount) VALUES (0)`;
connection.query(sql3, (err, result) => {
});
const sql5 = `CREATE EVENT IF NOT EXISTS update_expense ON SCHEDULE EVERY 1 DAY STARTS CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 2 MINUTE DO INSERT INTO Expences (date, food, travel, medicine, shoping, others) VALUES (CURRENT_DATE, 0, 0, 0, 0, 0)`;
connection.query(sql5, (err, result) => {
});
const sql6 = `CREATE EVENT IF NOT EXISTS delete_income ON SCHEDULE EVERY 1 DAY STARTS CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 23 HOUR + INTERVAL 55 MINUTE DO DELETE FROM income_temp`;
connection.query(sql6, (err, result) => {
});
const sql7 = `CREATE EVENT IF NOT EXISTS delete_expense ON SCHEDULE EVERY 1 DAY STARTS CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 23 HOUR + INTERVAL 55 MINUTE DO DELETE FROM expences_temp`;
connection.query(sql7, (err, result) => {
});



});

//login//---------------------------------------------------------

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

//suggestions//----------------------------------

app.get('/exp', (req, res) => {
  const query = 'SELECT * FROM suggestions';
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
  const query = 'INSERT INTO suggestions (name, amount, category) VALUES (?, ?, ?)';
  connection.query(query, [name, amount, category], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, name, amount, category });
  });
});



app.get('/api/balance', (req, res) => {
  const sqlExp = 'SELECT SUM(food + travel + shoping + medicine + others) AS total_exp FROM expences';
  const sqlInc = 'SELECT SUM(amount) AS total_inc FROM income';

  connection.query(sqlExp, (err, resultExp) => {
    if (err) throw err;
    const totalExp = resultExp[0].total_exp !== null ? resultExp[0].total_exp : 0;

    connection.query(sqlInc, (err, resultInc) => {
      if (err) throw err;
      const totalInc = resultInc[0].total_inc !== null ? resultInc[0].total_inc : 0;

      let balance = totalInc - totalExp;
      if (balance < 0) {
        balance = 0;
      }

      res.json({ balance: balance });
    });
  });
});
app.use(bodyParser.json());



app.get('/last-expense', (req, res) => {
  const query = 'SELECT food, travel, shoping, medicine FROM expences ORDER BY id DESC LIMIT 1';
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});
// Endpoint to fetch user details
app.get('/log', (req, res) => {
  const query = 'SELECT * FROM student';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
