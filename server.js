const express = require('express');
const app = express();
const db = require('./db');
const Sequelize = require('sequelize');

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

app.get('/api/plants', (req,res) => {
  Plant.findAll().then(plants => {
    console.log(plants)
    res.send(plants)
    // res.json({
    //   plants: "I got plants"
    // });
  })
});

const Plant = db.define('plant', {
  plantName: {
    type: Sequelize.STRING
  },
  plantType: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
// Plant.sync({force: true}).then(() => {
//   //Table created
//   return Plant.create({
//     plantName: 'Beauregard',
//     plantType: 'Golden Pothos'
//   });
// });



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});