const express = require('express');
const db = require('./db');
const Sequelize = require('sequelize');
const Plant = require("./models").Plant;
const multer = require('multer');
//const upload = multer({ dest: 'uploads/'});

const app = express();

app.use('/uploads', express.static('uploads'));
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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

app.get('/api/plants', (req,res) => {
  Plant.findAll().then(plants => {
    res.json(plants);
  });
});

app.post('/api/plants', upload.single('avatar'), (req,res) => {
   
  console.log(req.file)
  console.log(req.body)
  const plant = {
    name: req.body.name, 
    type: req.body.type,
    waterFrequency: req.body.waterFrequency || 7,
    lastWatered: req.body.lastWatered || 0, 
    meter: 4,
    image: req.file.path
  }

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
// File structure clean up 
// CSS, front end looks like crap
// uploading to CDN 
// Water meter 