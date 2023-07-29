const express = require('express');
const exphbs = require('express-handlebars');

const jwt = require('jsonwebtoken');
const verifyJWT = require('./auth.js');

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const schedule = require('node-schedule')



const app = express();
app.use(cors());


const { Sequelize, DataTypes } = require('sequelize');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


const sequelize = new Sequelize('database_name', 'username', 'password', {
  dialect: 'sqlite',
  storage: './db.sqlite'
})


//-------DATABASE TABLES----------
const fs = require('fs');

//ITMES JSON
const dataitems = JSON.parse(fs.readFileSync('items.json', 'utf8'));

//PRICES JSON
const dataprices = JSON.parse(fs.readFileSync('prices.json', 'utf8'));


//POIS JSON
const geojsoncontents = fs.readFileSync('new_data.geojson', 'utf8');

// Parse the string into a JavaScript object
const geojsondata = JSON.parse(geojsoncontents);
const geojsonObjects = geojsondata.features;


//Define Items table
const Items = sequelize.define('items', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  subcategory: {
    type: Sequelize.STRING,
  },
  subcategory_name: {
    type: Sequelize.STRING,
  },
  category_name: {
    type: Sequelize.STRING,
  },
  average_price: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
});


//Create Items table
async function createItemsTable() {
  // Delete the Users table if it exists and create it again
  await Items.sync({ force: true });


  await Items.bulkCreate(dataitems)
    .then(() => {
      console.log("Items have been saved---------------------------------------------------------------")
      //console.log(Items[0].id);
    })
    .catch(error => {
      console.error('Error:', error);
    });

}
//createItemsTable();


//define prices table
const Prices = sequelize.define('prices', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  item_id: {
    type: Sequelize.INTEGER,
    foreignKey: true
  },
  price: {
    type: Sequelize.FLOAT,
  }
});

//Item has many prices
Items.hasMany(Prices, { as: 'prices', foreignKey: 'item_id' });


async function createPricesTable() {

  await Prices.sync({ force: true });


  const priceHistory = dataprices.data.map(item => {
    return item.prices.map(price => {
      return {
        item_id: item.id,
        date: price.date,
        price: price.price
      }
    });
  }).flat();

  await Prices.bulkCreate(priceHistory)
    .then(() => {
      console.log("Price history records have been saved");
    })
    .catch(error => {
      console.error('Error:', error);
    });

}
//createPricesTable();




//define Users table
const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.INTEGER,
  },
  token_balance: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,

  }
});

//create users table
async function createUsersTable() {
  await Users.sync({ force: true });

  // Insert test values into the Users table
  const newUsers = [
    {
      username: 'Admin',
      email: 'admin@email.com',
      password: '1234',
      admin: true
    },
    {
      username: 'Nikos',
      email: 'nikos@example.com',
      password: 'password',
      score: 20
    },
    {
      username: 'spiros',
      email: 'spiros@example.com',
      password: 'password',
      score: 7
    },
    {
      username: 'Niki',
      email: 'Niki@example.com',
      password: 'password',
      score: 11
    },

    {
      username: 'Giwrgos',
      email: 'giwrgos@example.com',
      password: 'password',
      score: 7
    },
    {
      username: 'Elenh',
      email: 'elenh@example.com',
      password: 'password',
      score: 5
    },

    {
      username: 'Tassos',
      email: 'tassos@example.com',
      password: 'password',
      score: 15
    },
    {
      username: 'kwstas',
      email: 'kwstas@example.com',
      password: 'password',
      score: 19
    },
    {
      username: 'Poulcheria',
      email: 'poulcheria@example.com',
      password: 'password',
      score: 10
    },
    {
      username: 'Bob',
      email: 'Bob@example.com',
      password: 'password',
      score: 18
    },
    {
      username: 'John',
      email: 'john@example.com',
      password: 'password',
      score: 17
    },
    {
      username: 'Eric',
      email: 'eric@example.com',
      password: 'password',
      score: 10
    },
    {
      username: 'Steven',
      email: 'steven@example.com',
      password: 'password',
      score: 18
    }
  ];
  await Users.bulkCreate(newUsers)
    .then(() => {
      console.log("users created---------------------------------------");
    });
}

//createUsersTable();


//define Offers table
const Offers = sequelize.define('offers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    foreignKey: true
  },
  item_id: {
    type: Sequelize.INTEGER,
    foreignKey: true
  },
  itempois_id: {
    type: Sequelize.INTEGER,
    foreignKey: true
  },
  shop_id: {
    type: Sequelize.STRING,
  },
  offer_price: {
    type: Sequelize.INTEGER,
  },
  price_before_offer: {
    type: Sequelize.INTEGER,
  },
  like_count: {
    type: Sequelize.INTEGER,
  },
  dislike_count: {
    type: Sequelize.INTEGER,
  },
  stock_status: {
    type: Sequelize.STRING,
    defaultValue: "In stock",

  }

});



//User has many offers
Users.hasMany(Offers, { as: 'offers', foreignKey: 'user_id' });
//Items.hasMany(Offers, { as: 'offers', foreignKey: 'item_id' });




//create offers table
async function createOffersTable() {
  await Offers.sync({ force: true });
  //test offers



}
//createOffersTable();


//define GeoJSON table for POIS

const GeoJSON = sequelize.define('geojson', {
  type: {
    type: Sequelize.STRING,
  },
  properties: {
    type: Sequelize.JSON,
  },
  geometry: {
    type: Sequelize.JSON,
  },
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});
//create GeoJSON table
async function createPOISTable() {

  await GeoJSON.sync({ force: true });

  await GeoJSON.bulkCreate(geojsonObjects)
    .then(() => {
      console.log("POIS created---------------------------------------");
    });
}

//createPOISTable();




const ItemConnectPOIS = sequelize.define('itempois', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  item_id: {
    type: Sequelize.INTEGER,
    foreignKey: true

  },
  pois_id: {
    type: Sequelize.STRING,
    foreignKey: true
  }
});
//create GeoJSON table
async function ItemConnectPois() {

  await ItemConnectPOIS.sync({ force: true });

  // Connect items that beong to some POIS
  const newConnect = [
    { item_id: 288, pois_id: 'node_354449389' }, 
  { item_id: 388, pois_id: 'node_354449389' }, 
  { item_id: 39, pois_id: 'node_354449389' },  
  { item_id: 134, pois_id: 'node_354449389' }, 
  { item_id: 154, pois_id: 'node_360217468' }, 
  { item_id: 311, pois_id: 'node_360217468' }, 
  { item_id: 1205, pois_id: 'node_360217468' },
  { item_id: 388, pois_id: 'node_360217468' }, 
  { item_id: 134, pois_id: 'node_360226900' }, 
  { item_id: 39, pois_id: 'node_360226900' },  
  { item_id: 40, pois_id: 'node_360226900' },
  { item_id: 26, pois_id: 'node_360226900' },
  { item_id: 102, pois_id: 'node_364381224' },
  { item_id: 1017, pois_id: 'node_364381224' },
  { item_id: 1205, pois_id: 'node_364381224' },
  { item_id: 298, pois_id: 'node_364381224' },
  { item_id: 311, pois_id: 'node_364463568' },
  { item_id: 28, pois_id: 'node_364463568' },
  { item_id: 61, pois_id: 'node_364463568' },
  { item_id: 488, pois_id: 'node_364463568' },
  { item_id: 288, pois_id: 'node_598279836' },
  { item_id: 488, pois_id: 'node_598279836' },
  { item_id: 28, pois_id: 'node_598279836' },
  { item_id: 19, pois_id: 'node_598279836' },
  { item_id: 713, pois_id: 'node_633369803' },
  { item_id: 95, pois_id: 'node_633369803' },
  { item_id: 311, pois_id: 'node_633369803' },
  { item_id: 156, pois_id: 'node_633369803' },
  { item_id: 134, pois_id: 'node_980515550' },
  { item_id: 27, pois_id: 'node_980515550' },
  { item_id: 298, pois_id: 'node_980515550' },
  { item_id: 148, pois_id: 'node_980515550' },
  { item_id: 95, pois_id: 'node_1643373636' },
  { item_id: 13, pois_id: 'node_1643373636' },
  { item_id: 388, pois_id: 'node_1643373636' },
  { item_id: 154, pois_id: 'node_1643373636' },
  { item_id: 392, pois_id: 'node_1643373639' },
  { item_id: 7, pois_id: 'node_1643373639' },
  { item_id: 7, pois_id: 'node_1643373639' },
  { item_id: 255, pois_id: 'node_1643373639' },
  { item_id: 1017, pois_id: 'node_1643713403' },
  { item_id: 316, pois_id: 'node_1643713403' },
  { item_id: 19, pois_id: 'node_1643713403' },
  { item_id: 342, pois_id: 'node_1643713403' },
  { item_id: 350, pois_id: 'node_1643713405' },
  { item_id: 154, pois_id: 'node_1643713405' },
  { item_id: 26, pois_id: 'node_1643713405' },
  { item_id: 39, pois_id: 'node_1643713405' },
  { item_id: 388, pois_id: 'node_1643713406' },
  { item_id: 222, pois_id: 'node_1643713406' },
  { item_id: 71, pois_id: 'node_1643713406' },
  { item_id: 251, pois_id: 'node_1643713406' },
  { item_id: 71, pois_id: 'node_1643818244' },
  { item_id: 79, pois_id: 'node_1643818244' },
  { item_id: 470, pois_id: 'node_1643818244' },
  { item_id: 154, pois_id: 'node_1643818244' },
  { item_id: 713, pois_id: 'node_1643818267' },
  { item_id: 141, pois_id: 'node_1643818267' },
  { item_id: 27, pois_id: 'node_1643818267' },
  { item_id: 19, pois_id: 'node_1643818267' },
  { item_id: 13, pois_id: 'node_1643818277' },
  { item_id: 222, pois_id: 'node_1643818277' },
  { item_id: 134, pois_id: 'node_1643818277' },
  { item_id: 134, pois_id: 'node_1643818277' },
  { item_id: 71, pois_id: 'node_1643818281' },
  { item_id: 141, pois_id: 'node_1643818281' },
  { item_id: 388, pois_id: 'node_1643818281' },
  { item_id: 102, pois_id: 'node_1643818281' },
  { item_id: 392, pois_id: 'node_1643825320' },
  { item_id: 251, pois_id: 'node_1643825320' },
  { item_id: 350, pois_id: 'node_1643825320' },
  { item_id: 95, pois_id: 'node_1643825320' },
  { item_id: 39, pois_id: 'node_1643889596' },
  { item_id: 470, pois_id: 'node_1643889596' },
  { item_id: 13, pois_id: 'node_1643889596' },
  { item_id: 79, pois_id: 'node_1643889596' },
  { item_id: 134, pois_id: 'node_1657132006' },
  { item_id: 71, pois_id: 'node_1657132006' },
  { item_id: 342, pois_id: 'node_1657132006' },
  { item_id: 19, pois_id: 'node_1657132006' },
  { item_id: 19, pois_id: 'node_1657132008' },
  { item_id: 255, pois_id: 'node_1657132008' },
  { item_id: 342, pois_id: 'node_1657132008' },
  { item_id: 154, pois_id: 'node_1657132008' },
  { item_id: 251, pois_id: 'node_1657962066' },
  { item_id: 134, pois_id: 'node_1657962066' },
  { item_id: 392, pois_id: 'node_1657962066' },
  { item_id: 27, pois_id: 'node_1657962066' },
  { item_id: 342, pois_id: 'node_1695934267' },
  { item_id: 134, pois_id: 'node_1695934267' },
  { item_id: 39, pois_id: 'node_1695934267' },
  { item_id: 229, pois_id: 'node_1695934267' },
  { item_id: 13, pois_id: 'node_1763830009' },
  { item_id: 388, pois_id: 'node_1763830009' },
  { item_id: 288, pois_id: 'node_1763830009' },
  { item_id: 470, pois_id: 'node_1763830009' },
  { item_id: 40, pois_id: 'node_1763830474' },
  { item_id: 102, pois_id: 'node_1763830474' },
  { item_id: 350, pois_id: 'node_1763830474' },
  { item_id: 316, pois_id: 'node_1763830474' },
  { item_id: 251, pois_id: 'node_1770994538' },
  { item_id: 713, pois_id: 'node_1770994538' },
  { item_id: 251, pois_id: 'node_1770994538' },
  { item_id: 71, pois_id: 'node_1770994538' },
  { item_id: 71, pois_id: 'node_1771512424' },
  { item_id: 39, pois_id: 'node_1771512424' },
  { item_id: 388, pois_id: 'node_1771512424' },
  { item_id: 148, pois_id: 'node_1771512424' },
  { item_id: 311, pois_id: 'node_1815896581' },
  { item_id: 156, pois_id: 'node_1815896581' },
  { item_id: 29, pois_id: 'node_1815896581' },
  { item_id: 342, pois_id: 'node_1815896581' },
  { item_id: 102, pois_id: 'node_1971240515' },
  { item_id: 141, pois_id: 'node_1971240515' },
  { item_id: 19, pois_id: 'node_1971240515' },
  { item_id: 39, pois_id: 'node_1971240515' },
  { item_id: 102, pois_id: 'node_1971240518' },
  { item_id: 394, pois_id: 'node_1971240518' },
  { item_id: 470, pois_id: 'node_1971240518' },
  { item_id: 311, pois_id: 'node_1971240518' },
  { item_id: 7, pois_id: 'node_1971247760' },
  { item_id: 316, pois_id: 'node_1971247760' },
  { item_id: 229, pois_id: 'node_1971247760' },
  { item_id: 353, pois_id: 'node_1971247760' },
  { item_id: 394, pois_id: 'node_1971249846' },
  { item_id: 13, pois_id: 'node_1971249846' },
  { item_id: 311, pois_id: 'node_1971249846' },
  { item_id: 316, pois_id: 'node_1971249846' },
  { item_id: 29, pois_id: 'node_1997401665' },
  { item_id: 350, pois_id: 'node_1997401665' },
  { item_id: 1017, pois_id: 'node_1997401665' },
  { item_id: 311, pois_id: 'node_1997401665' },
  { item_id: 79, pois_id: 'node_1997401682' },
  { item_id: 19, pois_id: 'node_1997401682' },
  { item_id: 229, pois_id: 'node_1997401682' },
  { item_id: 251, pois_id: 'node_1997401682' },
  { item_id: 713, pois_id: 'node_3144355008' },
  { item_id: 39, pois_id: 'node_3144355008' },
  { item_id: 29, pois_id: 'node_3144355008' },
  { item_id: 342, pois_id: 'node_3144355008' },
  { item_id: 40, pois_id: 'node_3354481184' },
  { item_id: 255, pois_id: 'node_3354481184' },
  { item_id: 154, pois_id: 'node_3354481184' },
  { item_id: 222, pois_id: 'node_3354481184' },
  { item_id: 298, pois_id: 'node_4101518891' },
  { item_id: 7, pois_id: 'node_4101518891' },
  { item_id: 1205, pois_id: 'node_4101518891' },
  { item_id: 141, pois_id: 'node_4101518891' },
  { item_id: 394, pois_id: 'node_4356067891' },
  { item_id: 251, pois_id: 'node_4356067891' },
  { item_id: 222, pois_id: 'node_4356067891' },
  { item_id: 28, pois_id: 'node_4356067891' },
  { item_id: 194, pois_id: 'node_4356183595' },
  { item_id: 251, pois_id: 'node_4356183595' },
  { item_id: 311, pois_id: 'node_4356183595' },
  { item_id: 488, pois_id: 'node_4356183595' },
  { item_id: 28, pois_id: 'node_4357098895' },
  { item_id: 353, pois_id: 'node_4357098895' },
  { item_id: 61, pois_id: 'node_4357098895' },
  { item_id: 95, pois_id: 'node_4357098895' },
  { item_id: 470, pois_id: 'node_4357217589' },
  { item_id: 1205, pois_id: 'node_4357217589' },
  { item_id: 27, pois_id: 'node_4357217589' },
  { item_id: 288, pois_id: 'node_4357217589' },
  { item_id: 156, pois_id: 'node_4357425491' },
  { item_id: 298, pois_id: 'node_4357425491' },
  { item_id: 229, pois_id: 'node_4357425491' },
  { item_id: 251, pois_id: 'node_4357425491' },
  { item_id: 255, pois_id: 'node_4357589496' },
  { item_id: 29, pois_id: 'node_4357589496' },
  { item_id: 311, pois_id: 'node_4357589496' },
  { item_id: 288, pois_id: 'node_4357589496' },
  { item_id: 342, pois_id: 'node_4358244594' },
  { item_id: 61, pois_id: 'node_4358244594' },
  { item_id: 222, pois_id: 'node_4358244594' },
  { item_id: 71, pois_id: 'node_4358244594' },
  { item_id: 148, pois_id: 'node_4372108797' },
  { item_id: 194, pois_id: 'node_4372108797' },
  { item_id: 194, pois_id: 'node_4372108797' },
  { item_id: 251, pois_id: 'node_4372108797' },
  { item_id: 251, pois_id: 'node_4484528391' },
  { item_id: 13, pois_id: 'node_4484528391' },
  { item_id: 288, pois_id: 'node_4484528391' },
  { item_id: 19, pois_id: 'node_4484528391' },
  { item_id: 222, pois_id: 'node_4752810729' },
  { item_id: 154, pois_id: 'node_4752810729' },
  { item_id: 71, pois_id: 'node_4752810729' },
  { item_id: 156, pois_id: 'node_4752810729' },
  { item_id: 311, pois_id: 'node_4931300543' },
  { item_id: 353, pois_id: 'node_4931300543' },
  { item_id: 61, pois_id: 'node_4931300543' },
  { item_id: 95, pois_id: 'node_4931300543' },
  { item_id: 28, pois_id: 'node_4953268497' },
  { item_id: 28, pois_id: 'node_4953268497' },
  { item_id: 288, pois_id: 'node_4953268497' },
  { item_id: 1205, pois_id: 'node_4953268497' },
  { item_id: 156, pois_id: 'node_4969309651' },
  { item_id: 194, pois_id: 'node_4969309651' },
  { item_id: 1205, pois_id: 'node_4969309651' },
  { item_id: 316, pois_id: 'node_4969309651' },
  { item_id: 298, pois_id: 'node_5005384516' },
  { item_id: 298, pois_id: 'node_5005384516' },
  { item_id: 298, pois_id: 'node_5005384516' },
  { item_id: 154, pois_id: 'node_5005384516' },
  { item_id: 194, pois_id: 'node_5005409493' },
  { item_id: 251, pois_id: 'node_5005409493' },
  { item_id: 288, pois_id: 'node_5005409493' },
  { item_id: 342, pois_id: 'node_5005409493' },
  { item_id: 19, pois_id: 'node_5005409494' },
  { item_id: 229, pois_id: 'node_5005409494' },
  { item_id: 148, pois_id: 'node_5005409494' },
  { item_id: 342, pois_id: 'node_5005409494' },
  { item_id: 27, pois_id: 'node_5005409495' },
  { item_id: 251, pois_id: 'node_5005409495' },
  { item_id: 352, pois_id: 'node_5005409495' },
  { item_id: 141, pois_id: 'node_5005409495' },
  { item_id: 19, pois_id: 'node_5005476710' },
  { item_id: 40, pois_id: 'node_5005476710' },
  { item_id: 79, pois_id: 'node_5005476710' },
  { item_id: 352, pois_id: 'node_5005476710' },
  { item_id: 29, pois_id: 'node_5005476711' },
  { item_id: 350, pois_id: 'node_5005476711' },
  { item_id: 353, pois_id: 'node_5005476711' },
  { item_id: 71, pois_id: 'node_5005476711' },
  { item_id: 251, pois_id: 'node_5132918123' },
  { item_id: 29, pois_id: 'node_5132918123' },
  { item_id: 29, pois_id: 'node_5132918123' },
  { item_id: 7, pois_id: 'node_5132918123' },
  { item_id: 27, pois_id: 'node_5164678230' },
  { item_id: 194, pois_id: 'node_5164678230' },
  { item_id: 229, pois_id: 'node_5164678230' },
  { item_id: 350, pois_id: 'node_5164678230' },
  { item_id: 394, pois_id: 'node_5164741179' },
  { item_id: 488, pois_id: 'node_5164741179' },
  { item_id: 71, pois_id: 'node_5164741179' },
  { item_id: 713, pois_id: 'node_5164741179' },
  { item_id: 388, pois_id: 'node_5350727524' },
  { item_id: 13, pois_id: 'node_5350727524' },
  { item_id: 251, pois_id: 'node_5350727524' },
  { item_id: 154, pois_id: 'node_5350727524' },
  { item_id: 229, pois_id: 'node_5396345464' },
  { item_id: 353, pois_id: 'node_5396345464' },
  { item_id: 392, pois_id: 'node_5396345464' },
  { item_id: 353, pois_id: 'node_5396345464' },
  { item_id: 19, pois_id: 'node_5620198221' },
  { item_id: 394, pois_id: 'node_5620198221' },
  { item_id: 95, pois_id: 'node_5620198221' },
  { item_id: 392, pois_id: 'node_5620198221' },
  { item_id: 350, pois_id: 'node_5620208927' },
  { item_id: 353, pois_id: 'node_5620208927' },
  { item_id: 95, pois_id: 'node_5620208927' },
  { item_id: 102, pois_id: 'node_5620208927' },
  { item_id: 154, pois_id: 'node_5783486253' },
  { item_id: 134, pois_id: 'node_5783486253' },
  { item_id: 194, pois_id: 'node_5783486253' },
  { item_id: 27, pois_id: 'node_5783486253' },
  { item_id: 251, pois_id: 'node_5909978406' },
  { item_id: 141, pois_id: 'node_5909978406' },
  { item_id: 27, pois_id: 'node_5909978406' },
  { item_id: 388, pois_id: 'node_5909978406' },
  { item_id: 134, pois_id: 'node_7673935764' },
  { item_id: 154, pois_id: 'node_7673935764' },
  { item_id: 148, pois_id: 'node_7673935764' },
  { item_id: 102, pois_id: 'node_7673935764' },
  { item_id: 19, pois_id: 'node_7673976786' },
  { item_id: 102, pois_id: 'node_7673976786' },
  { item_id: 13, pois_id: 'node_7673976786' },
  { item_id: 311, pois_id: 'node_7673976786' },
  { item_id: 154, pois_id: 'node_7673986831' },
  { item_id: 79, pois_id: 'node_7673986831' },
  { item_id: 1205, pois_id: 'node_7673986831' },
  { item_id: 1017, pois_id: 'node_7673986831' },
  { item_id: 61, pois_id: 'node_7674120315' },
  { item_id: 394, pois_id: 'node_7674120315' },
  { item_id: 222, pois_id: 'node_7674120315' },
  { item_id: 316, pois_id: 'node_7674120315' },
  { item_id: 148, pois_id: 'node_7677225097' },
  { item_id: 61, pois_id: 'node_7677225097' },
  { item_id: 194, pois_id: 'node_7677225097' },
  { item_id: 61, pois_id: 'node_7677225097' },
  { item_id: 342, pois_id: 'node_7914886761' },
  { item_id: 102, pois_id: 'node_7914886761' },
  { item_id: 713, pois_id: 'node_7914886761' },
  { item_id: 27, pois_id: 'node_7914886761' },
  { item_id: 298, pois_id: 'node_8214753473' },
  { item_id: 352, pois_id: 'node_8214753473' },
  { item_id: 222, pois_id: 'node_8214753473' },
  { item_id: 134, pois_id: 'node_8214753473' },
  { item_id: 713, pois_id: 'node_8214854586' },
  { item_id: 102, pois_id: 'node_8214854586' },
  { item_id: 311, pois_id: 'node_8214854586' },
  { item_id: 229, pois_id: 'node_8214854586' },
  { item_id: 95, pois_id: 'node_8214887295' },
  { item_id: 392, pois_id: 'node_8214887295' },
  { item_id: 1205, pois_id: 'node_8214887295' },
  { item_id: 316, pois_id: 'node_8214887295' },
  { item_id: 141, pois_id: 'node_8214887306' },
  { item_id: 352, pois_id: 'node_8214887306' },
  { item_id: 71, pois_id: 'node_8214887306' },
  { item_id: 342, pois_id: 'node_8214887306' },
  { item_id: 251, pois_id: 'node_8214910532' },
  { item_id: 392, pois_id: 'node_8214910532' },
  { item_id: 156, pois_id: 'node_8214910532' },
  { item_id: 352, pois_id: 'node_8214910532' },
  { item_id: 134, pois_id: 'node_8215010716' },
  { item_id: 350, pois_id: 'node_8215010716' },
  { item_id: 229, pois_id: 'node_8215010716' },
  { item_id: 222, pois_id: 'node_8215010716' },
  { item_id: 713, pois_id: 'node_8215157448' },
  { item_id: 352, pois_id: 'node_8215157448' },
  { item_id: 39, pois_id: 'node_8215157448' },
  { item_id: 1017, pois_id: 'node_8215157448' },
  { item_id: 13, pois_id: 'node_8753329904' },
  { item_id: 156, pois_id: 'node_8753329904' },
  { item_id: 154, pois_id: 'node_8753329904' },
  { item_id: 316, pois_id: 'node_8753329904' },
  { item_id: 13, pois_id: 'node_8753329905' },
  { item_id: 26, pois_id: 'node_8753329905' },
  { item_id: 229, pois_id: 'node_8753329905' },
  { item_id: 28, pois_id: 'node_8753329905' },
  { item_id: 40, pois_id: 'node_8777081651' },
  { item_id: 388, pois_id: 'node_8777081651' },
  { item_id: 61, pois_id: 'node_8777081651' },
  { item_id: 134, pois_id: 'node_8777081651' },
  { item_id: 342, pois_id: 'node_8777171555' },
  { item_id: 316, pois_id: 'node_8777171555' },
  { item_id: 61, pois_id: 'node_8777171555' },
  { item_id: 1017, pois_id: 'node_8777171555' },
  { item_id: 134, pois_id: 'node_8805335004' },
  { item_id: 1017, pois_id: 'node_8805335004' },
  { item_id: 29, pois_id: 'node_8805335004' },
  { item_id: 29, pois_id: 'node_8805335004' },
  { item_id: 28, pois_id: 'node_8805467220' },
  { item_id: 470, pois_id: 'node_8805467220' },
  { item_id: 392, pois_id: 'node_8805467220' },
  { item_id: 298, pois_id: 'node_8805467220' },
  { item_id: 251, pois_id: 'node_8806495733' },
  { item_id: 61, pois_id: 'node_8806495733' },
  { item_id: 156, pois_id: 'node_8806495733' },
  { item_id: 141, pois_id: 'node_8806495733' },
  { item_id: 79, pois_id: 'node_9651304117' },
  { item_id: 229, pois_id: 'node_9651304117' },
  { item_id: 61, pois_id: 'node_9651304117' },
  { item_id: 39, pois_id: 'node_9651304117' },
  { item_id: 39, pois_id: 'node_9785182275' },
  { item_id: 470, pois_id: 'node_9785182275' },
  { item_id: 13, pois_id: 'node_9785182275' },
  { item_id: 298, pois_id: 'node_9785182275' },
  { item_id: 7, pois_id: 'node_9785182280' },
  { item_id: 316, pois_id: 'node_9785182280' },
  { item_id: 1205, pois_id: 'node_9785182280' },
  { item_id: 392, pois_id: 'node_9785182280' },
  { item_id: 27, pois_id: 'node_9785335420' },
  { item_id: 61, pois_id: 'node_9785335420' },
  { item_id: 316, pois_id: 'node_9785335420' },
  { item_id: 352, pois_id: 'node_9785335420' }
  ];
  await ItemConnectPOIS.bulkCreate(newConnect)
    .then(() => {
      console.log("ITEMS CONNECTED WITH POIS---------------------------------------");
    });
}

//ItemConnectPois();
Offers.hasMany(ItemConnectPOIS, { as: 'itempois', foreignKey: 'itempois_id' });




// sync database -- create tables in database
sequelize.sync()
  .then(() => console.log('Tables created successfully'))
  .catch(err => console.error('Error creating tables:', err));





//--Tokens---------------------------------------------------------------------

// Create a function for distributing tokens to users
function distributeTokens() {
  // Get the total number of registered users
  Users.count()
    .then((totalUsers) => {
      // Calculate the total number of tokens to be created
      let totalTokens = totalUsers * 100
      // Reserve 20% of the tokens for future use
      let reservedTokens = totalTokens * 0.2
      // Distribute the remaining 80% of the tokens to users
      let distributedTokens = totalTokens - reservedTokens

      // Get the evaluation score for each user
      Users.findAll()
        .then((users) => {
          // Loop through each user
          users.forEach((user) => {
            // Calculate the number of tokens to be distributed to the user
            let userTokens = Math.round(distributedTokens * (user.score / 100))
            // Update the user's token balance in the database
            Users.update({ token_balance: user.token_balance + userTokens }, { where: { id: user.id } })
          })
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      console.error(err)
    })
}

// Set up a schedule to run the distributeTokens function at the end of each month
const rule = new schedule.RecurrenceRule();
rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
rule.date = 31;
rule.hour = 23;
rule.minute = 59;

//const j = schedule.scheduleJob(rule, distributeTokens);

//---------------------------------------------------------------------------------------------

//--Score--------------------------------------------------------------------------------------

function calculateScoreLikeDislike() {
  // Find all the users

  console.log('i am niki ');
  Users.findAll()
    .then(users => {
      users.forEach(user => {
        // Find all the offers made by the user
        Offers.findAll({ where: { user_id: user.id } })
          .then(offers => {
            let likeCount = 0;
            let dislikeCount = 0;
            offers.forEach(offer => {
              likeCount += offer.like_count;
              dislikeCount += offer.dislike_count;
            });
            // Calculate the user's score
            user.score += likeCount * 5;
            user.score -= dislikeCount * 1;
            // Save the updated user to the database
            user.save()
              .then(() => {
                console.log(`Score for user ${user.username} updated successfully`);
              })
              .catch(err => {
                console.error(err);
              })
          })
      })
    })
}


//------------------------------
//--average price calculation--


function calculateAveragePrice() {
  sequelize.query(`UPDATE items SET average_price = (SELECT AVG(offer_price) FROM offers WHERE item_id = items.id)`)
    .then(() => {
      console.log("Average prices on items filled successfully");

    })
    .catch(err => {
      console.error(err);

    });
}

//---------------------------------

function calculateScoreOffer() {

  console.log('i am poul ');
  Users.findAll()
    .then(users => {
      users.forEach(user => {
        // Find all the offers made by the user
        Offers.findAll({ where: { user_id: user.id } })
          .then(offers => {


            offers.forEach(offer => {
              Items.findAll({ where: { id: offer.item_id } })
                .then(item => {



                  let AveragePrice = item.average_price;
                  if (offer.offer_price < AveragePrice * 0.8) {
                    user.score += 50;
                  }


                  else if (offer.offer_price < AveragePrice * 0.2) {
                    user.score += 20;
                  }

                  user.save()
                  .then(() => {
                    console.log(`Score for user ${user.username} updated successfully`);
                  })
                  .catch(err => {
                    console.error(err);
                  })
                });

            
            })
          })
      })

    })

}







//--------ENDPOINTS--------------





//Log in endpoint
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;
  Users.findOne({
    where: {
      username,
      email,
      password
    }
  })
    .then(user => {
      if (user) {
        // user exists, log them in
        if (user.admin == false) {
          console.log(user.id)
          res.send({
            admin: false,
            success: true,
            token: jwt.sign({ id: user.id }, "veryverysecret")
          });
        }
        else {
          console.log(user.id)
          res.send({
            admin: true,
            success: true,
            token: jwt.sign({ id: user.id }, "veryverysecret")
          });
        }

        console.log('User found');
        //window.location.href='http://127.0.0.1:4242/Map.html';

      } else {
        // user does not exist, show error message
        res.status(401).send({ success: false });
        console.log('User does not exist')
      }
    })
});

//Sing up endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  Users.create({
    username,
    email,
    password
  })
    .then(user => {
      if (user) {
        // user created, return JWT token
        res.send({
          success: true,
          token: jwt.sign({ id: user.id }, "veryverysecret")
        });
        console.log('User created');
      } else {
        // user not created, show error message
        res.status(401).send({ success: false });
        console.log('User not created');
      }
    });
});


app.get('/myaccount', verifyJWT, (req, res) => {
  const userid = req.userId;
  console.log(userid);
  Users.findOne({ where: { id: userid } }).then((user) => {
    // Render the account page with the user's data
    res.json(user);
  });
});

app.post('/myaccount', (req, res) => {
  console.log(req.body);

  const { username, email, password } = req.body;

  Users.update({ username, email, password }, { where: { username: username } })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.json({ success: false, error: error.message });
    });
});

//Leaderboard endpoint
app.get('/leaderboard', async (req, res) => {

  // Get the page number and the number of items per page from the query parameters
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const count = await Users.count();
  const totalPages = Math.ceil(count / limit);

  // Find the top users with the highest scores
  const topUsers = await Users.findAll({
    where: { admin: false },
    order: [['score', 'DESC']],
    offset: (page - 1) * limit,
    limit: limit,
    totalPages
  });

  // Send the top users as the response
  res.send(topUsers);
});

//Offers endpoint
app.get("/offers/:shopID", async function (req, res) {
  let shopID = req.params.shopID

  try {
    let offers = await Offers.findAll({
      raw: true,
      where: {
        shop_id: shopID
      }
    })

    let offrs = []

    for (let i in offers) {

      let shop_name = await GeoJSON.findOne({
        raw: true,
        where:
          { id: offers[i].shop_id }
      })

      shop_name = JSON.parse(shop_name.properties).name

      console.log(shop_name)

      let item_name = await Items.findOne({
        raw: true,
        where:
          { id: offers[i].item_id }
      })

      let username = await Users.findOne({
        where: {
          id: offers[i].user_id
        }
      })


      let new_offer = {
        shop_name: shop_name,
        item_name: item_name.name,
        user_name: username.username,
        like_count: offers[i].like_count,
        dislike_count: offers[i].dislike_count,
        offer_price: offers[i].offer_price,
        offer_id: offers[i].id,
        stock_status: offers[i].stock_status

      }


      offrs.push(new_offer)


    }

    console.log(offers, offrs)

    res.json(offrs);

  } catch (error) {

    console.error("Error getting offers:", error);
    res.sendStatus(500);
  }

});

//like dislike
app.post('/offers/like/:id', (req, res) => {
  const offerId = req.params.id;

  Offers.findByPk(offerId)
    .then(offer => {
      if (!offer) {
        res.status(404).send({ error: 'Offer not found' });
        return;
      }

      offer.update({ like_count: offer.like_count + 1 })
        .then(() => {
          res.send({ like_count: offer.like_count + 1 });

        });
    });
});

app.post('/offers/dislike/:id', (req, res) => {
  const offerId = req.params.id;

  Offers.findByPk(offerId)
    .then(offer => {
      if (!offer) {
        res.status(404).send({ error: 'Offer not found' });
        return;
      }

      offer.update({ dislike_count: offer.dislike_count + 1 })
        .then(() => {
          res.send({ dislike_count: offer.dislike_count + 1 });
        });
    });
});

app.post('/offers/outofstock/:id', (req, res) => {
  const offerId = req.params.id;

  Offers.findByPk(offerId)
    .then(offer => {
      if (!offer) {
        res.status(404).send({ error: 'Offer not found' });
        return;
      }

      offer.update({ stock_status: "Out of stock" })
        .then(() => {
          res.send({ stock_status: "Out of stock" });
        });
    });
});

//items endpoint
// category sub-category filtering
app.get('/itemspage', async (req, res) => {


  const { category, subcategory, shop_id } = req.query;


  console.log(category, subcategory, shop_id);

  let item_ids = await sequelize.query(`SELECT itempois.item_id FROM itempois
  LEFT JOIN items ON itempois.item_id = items.id
  WHERE itempois.pois_id = '${shop_id}'`)

  console.log(item_ids[0])


  console.log(item_ids[0].map(item => item.item_id))

  let where_clause = {
    where: {
      id: item_ids[0].map(item => item.item_id),
    }
  }


  if (category == 'Όλα' && subcategory == 'Όλα') { }
  else if (category != 'Όλα' && subcategory == 'Όλα') {
    where_clause.where.category_name = category;
  } else {
    where_clause.where.category_name = category;
    where_clause.where.subcategory_name = subcategory;
  }

  let items = await Items.findAll(
    where_clause
  );



  console.log(items)

  res.json(items);






});


//search filtering
app.get("/search", async (req, res) => {
  const { name, shop_id } = req.query;

  let items = await sequelize.query(`SELECT * FROM itempois
  JOIN items ON itempois.item_id = items.id
  WHERE itempois.pois_id = '${shop_id}'`)


  let re = new RegExp(name)
  let filteredItems = items[0].filter((item) => {
    return re.test(item.name)
  })

  console.log(filteredItems);
  res.json(filteredItems);
});


app.post('/newoffer', verifyJWT, async (req, res) => {
  try {
    const { item_id, price, shop_id } = req.body;
    // create a new offer in the offers table
    const newOffer = await Offers.create({
      user_id: req.userId,
      item_id,
      shop_id: shop_id,
      offer_price: price,
      like_count: 0,
      dislike_count: 0,
      createdAt: new Date()
    });
    res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
  } catch (error) {
    // handle the error
    res.status(500).json({ message: 'Failed to create offer', error });
  }
});


app.get("/Map", function (req, res) {
  GeoJSON.findAll()
    .then(geojsons => {
      res.json(geojsons);
      console.log(geojsons);
    })
    .catch(error => {
      console.error("Error getting geojsons:", error);
      res.sendStatus(500);
    });
});


app.get("/Map/:id", async function (req, res) {
  try {
    //select all shops with offers
    let pois = await sequelize.query(`SELECT offers.shop_id FROM offers WHERE offers.shop_id NOTNULL`);

    console.log(pois);

    res.json(pois);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/mappp/:category", async function (req, res) {
  //   //select all shops with offers
  //   let shop_ids=await sequelize.query(`SELECT itempois.pois_id FROM itempois JOIN offers on itempois.id=offers.itempois_id
  //   WHERE itempois.id=offers.itempois_id`)
  //   //selete items that belong to shops with offers
  //  let item_ids = await sequelize.query(`SELECT itempois.item_id FROM itempois
  //   JOIN items ON itempois.item_id = items.id
  //   WHERE itempois.pois_id = '${shop_ids}'`)

  //   console.log(item_ids[0].map(item => item.item_id))

  //   let where_clause =  {
  //                         where: {
  //                           id: item_ids[0].map(item => item.item_id),
  //                         }
  //                       }


  //   if(category == 'Όλα' && subcategory == 'Όλα'){}
  //   else if(category != 'Όλα' && subcategory == 'Όλα'){
  //       where_clause.where.category_name = category;  
  //   }else{
  //     where_clause.where.category_name = category;  
  //     where_clause.where.subcategory_name = subcategory;  
  //   }

  //   let items = await Items.findAll(
  //    where_clause
  //   );

  //   console.log(items)

  //   //select shops that contain items with specific category
  //   let shop_categ=await sequelize.query(`SELECT itempois.pois_id FROM itempois 
  //   WHERE itempois.item_id='${items.id}'`)
  //   console.log(shop_categ)


  let filtered_shops = await GeoJSON.findAll({
    include: [
      {
        model: ItemConnectPOIS,
        // where:{
        //   category_name:  "Τρόφιμα"
        // }
      }
    ]
  })

  console.log(filtered_shops)
  res.json(filtered_shops);

});


//----------ADMIN--------
//--------------------------------------------------------
//items
app.get("/adminitems", function (req, res) {
  Items.findAll()
    .then(items => {
      res.json(items);
    })
    .catch(error => {
      console.error("Error getting offers:", error);
      res.sendStatus(500);
    });
});

app.delete('/adminitems/:id', (req, res) => {
  Items.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json({ message: 'Item deleted successfully.' });
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

app.post('/adminitems', (req, res) => {
  Items.create({
    id: req.body.id,
    name: req.body.name,
    category_name: req.body.category_name,
    subcategory_name: req.body.subcategory_name,
    category: req.body.category,
    subcategory: req.body.subcategory
  })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ message: 'Error creating item' }));
});


app.put('/adminitems/:id', (req, res) => {
  Items.update({
    name: req.body.name,
    category_name: req.body.category_name,
    subcategory_name: req.body.subcategory_name
  }, {
    where: { id: req.params.id }
  })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ message: 'Error updating item' }));
});



//pois

app.get("/adminpois", function (req, res) {
  GeoJSON.findAll()
    .then(pois => {
      res.json(pois);
    })
    .catch(error => {
      console.error("Error getting offers:", error);
      res.sendStatus(500);
    });
});



app.delete('/adminpois/:id', (req, res) => {
  GeoJSON.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json({ message: 'Pois deleted successfully.' });
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});


app.post('/adminpois', (req, res) => {
  GeoJSON.create({
    id: req.body.id,
    properties: '{"shop":"' + req.body.type + '","name":' + req.body.name + '"}',
    geometry: '{"type":"Point","coordinates":[' + req.body.location + ' "]}'
  })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ message: 'Error creating item' }));
});

app.put('/adminpois/:id', (req, res) => {
  GeoJSON.update({
    id: req.body.id,
    properties: '{"shop":"' + req.body.type + '","name":' + req.body.name + '"}',
    geometry: '{"type":"Point","coordinates":[' + req.body.location + ' "]}'
  }, {
    where: { id: req.params.id }
  })
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ message: 'Error updating item' }));
});







//-------SERVER-------
const PORT = process.env.PORT || 4242;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    calculateAveragePrice();
    calculateScoreLikeDislike();
    calculateScoreOffer();
    distributeTokens();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });