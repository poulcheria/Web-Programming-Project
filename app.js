const express= require('express');
const exphbs= require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    dialect: 'sqlite',
    storage: './db.sqlite'
  })

  const Email = Sequelize.STRING.extend({
    validate: {
      isEmail: true
    }
  });
  
  // Define your database models
  const User = sequelize.define('user', {
    user_id: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: {
      type: Email,
      unique: true
    },
    tokens: Sequelize.INTEGER,
    score: Sequelize.INTEGER
  })

  //offer model
  const offer = sequelize.define('offer',{
    offer_id:Sequelize.INTEGER,
    like_diskile: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    offer_price: Sequelize.INTEGER,
    stock: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    user_id_like: Sequelize.ARRAY(Sequelize.INTEGER),
    user_id_dislike: Sequelize.ARRAY(Sequelize.INTEGER),
    company_name: Sequelize.STRING,
    pois_id: Sequelize.INTEGER,
    item_id: Sequelize.INTEGER

  })

  const item = sequelize.define('item',{
    item_id: Sequelize.INTEGER,
    category :Sequelize.STRING,
    sub_category :Sequelize.STRING,
    price: Sequelize.INTEGER,
    location: Sequelize.ARRAY(Sequelize.INTEGER),
    company_name: Sequelize.STRING,
    pois_id: Sequelize.INTEGER
  })
  const pois = sequelize.define('pois',{

    company_name: Sequelize.STRING,
    location: Sequelize.ARRAY(Sequelize.INTEGER),
    company_type: Sequelize.STRING,
    pois_id: Sequelize.INTEGER
  })

  


   
  // Sync your models with the database
  sequelize.sync()
  
  // Use your models in your Express.js routes
/*app.get('/users', (req, res) => {
  User.findAll().then(users => {
    res.json(users)
  })
})*/
 
// test database

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//server
const PORT = process.env.PORT || 4242;

app.listen(PORT, console.log(`Server started on port ${PORT}`));     

