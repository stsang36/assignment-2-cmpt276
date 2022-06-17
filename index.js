const express = require('express');
const cool = require('cool-ascii-faces');
const funny = require('awesome-dev-jokes');
const validateColor = require('validate-color').default;
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, //FOR LOCAL TESTING ONLY ON WSL2! || 'postgresql://postgres:root@winhost:5432/postgres',
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
    const results = {'results': (result) ? result.rows : null, 'joke': funny.getRandomJoke()};
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
    res.render('pages/display',results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});
app.post('/changeuser', async (req, res) => {

  try{
    let name = req.body.serv_name.trim();
    let weight = req.body.serv_weight.trim();
    let height = req.body.serv_height.trim();
    let hairColor = req.body.serv_hColor.trim();
    let gpa = req.body.serv_gpa.trim();
    let face = cool();

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    hairColor = hairColor.charAt(0).toUpperCase() + hairColor.slice(1).toLowerCase();

    if (name === "") {
      throw ("Name cannot be blank");
    } else if (weight < 0 || weight === "" || isNaN(weight)) {
      throw ("Weight must be a positive number");

    } else if (height < 0 || height === "" || isNaN(height)) {
      throw ("Height must be a positive number");

    } else if (validateColor(hairColor) === false) {
      throw ("Hair color must be a valid color");

    } else if (gpa < 0 || gpa > 4 || gpa === "" || isNaN(gpa)) {
      throw ("GPA must be a number between 0 and 4");

    } else {
      const client = await pool.connect();

      if (req.body.action === "add") {

        const exists = client.query('SELECT EXISTS(SELECT * FROM student_table WHERE name = $1)', [name],  async (err, result) => {

          if (err) {
            throw err;
          }
          let exists = result.rows[0].exists;

          if (!exists) {
            const result = await client.query('INSERT INTO student_table(name, weight, height, hair_color, gpa, face) VALUES($1, $2, $3, $4, $5, $6)', [name, weight, height, hairColor, gpa, face]);
          } else {
            const result = await client.query('UPDATE student_table SET weight = $1, height = $2, hair_color = $3, gpa = $4 WHERE name = $5', [weight, height, hairColor, gpa, name]);
          }
        });

      } else if (req.body.action === "delete") {
        const result = await client.query('DELETE FROM student_table WHERE name = $1', [name]);
      }
      client.release();
      res.redirect('/form');
    }
  } catch (err) {
    res.status(400).send(err);
  }

  res.end();

  return;
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
