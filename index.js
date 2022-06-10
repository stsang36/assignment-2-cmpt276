const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/histogram', (req, res) => res.render('pages/histogram'))
app.get('/form', (req, res) => res.render('pages/form'))
app.get('/display', async (req, res) => {
  try {
    const client = await pool.connect();
    const data = await client.query('SELECT * FROM data');
    res.render('pages/display', { data: data.rows })
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.post('/changeuser', async (req, res) => {
  try{
    let name = req.body.serv_name;
    let weight = req.body.serv_weight;
    let height = req.body.serv_height;
    let hairColor = req.body.serv_hColor;
    let gpa = req.body.serv_gpa;

    const client = await pool.connect();
    const result = await client.query('INSERT INTO student_table(name, weight, height, hairColor, gpa) VALUES($1, $2, $3, $4, $5)', [name, weight, height, hairColor, gpa]);
    const results = { 'results': (result) ? result.rows : null};
    client.release();

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }

  res.send('bruh');
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));