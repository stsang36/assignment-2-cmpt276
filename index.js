const express = require('express');
const validateColor = require('validate-color').default;
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, //|| 'postgresql://postgres:root@winhost:5432/postgres',
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
app.get('/form', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM student_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/form', results);
    client.release();
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});
app.get('/form/display', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM student_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/display', results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send(err);
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
    res.send(err);
  }
})

app.post('/changeuser', async (req, res) => {

  try{
    let name = req.body.serv_name;
    let weight = req.body.serv_weight;
    let height = req.body.serv_height;
    let hairColor = req.body.serv_hColor;
    let gpa = req.body.serv_gpa;

    if (name == "") {
      res.send("Name cannot be blank");
      return;
    } else if (weight < 0 || weight === "") {
      res.send("Weight must be greater than 0");
      return;
    } else if (height < 0 || height === "") {
      res.send("Height must be greater than 0");
      return;
    } else if (validateColor(hairColor) === false) {
      res.send("Hair color must be a valid CSS color");
      return;
    } else if (gpa < 0 || gpa > 4 || gpa === "") {
      res.send("GPA must be between 0 and 4");
      return;
    } else {

      const client = await pool.connect();
      console.log(req.body);

      if (req.body.action === "add") {
        const result = await client.query('INSERT INTO student_table(name, weight, height, hair_color, gpa) VALUES($1, $2, $3, $4, $5)', [name, weight, height, hairColor, gpa]);
      } else if (req.body.action === "delete") {
        const result = await client.query('DELETE FROM student_table WHERE name = $1', [name]);
      }
      client.release();
      res.redirect('/form');
    }
  } catch (err) {
    console.error(err);
  }

  res.end();

  return;
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
