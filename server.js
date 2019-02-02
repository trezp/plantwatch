const express = require('express');
const db = require('./db');
const Sequelize = require('sequelize');
const Plant = require("./models").Plant;
const multer = require('multer');
const upload = multer({ dest: '/client/public/uploads/'});

const app = express();
app.use(express.json());

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

db 
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());

app.get('/api/plants', (req,res) => {
  Plant.findAll().then(plants => {
    res.json(plants);
  });
});

app.post('/api/plants', (req,res) => {
  const plant = {
    name: req.body.name, 
    type: req.body.type,
    waterFrequency: req.body.waterFrequency || 7,
    lastWatered: req.body.lastWatered || 0, 
    meter: 4,
    image: req.file
  }

  console.log(plant)
  Plant
    .create(plant)
    .then(() => {
      res.status(201).json(plant);
    });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

//TODO 
// Form submit errors first time 
// Image uploader doesn't work 