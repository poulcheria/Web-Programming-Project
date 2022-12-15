const express= require('express');
const exphbs= require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const express= require('express');
const exphbs= require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const { Sequelize, DataTypes } = require('sequelize');





const sequelize = new Sequelize('database_name', 'username', 'password', {
    dialect: 'sqlite',
    storage: './db.sqlite'
  })

// define the "fetch_date" table
const FetchDate = sequelize.define('fetch_date', {
  fetch_date: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
});

// define the "products" table
const Products = sequelize.define('products', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  subcategory: {
    type: DataTypes.STRING
  }
});

// define the "categories" table
const Categories = sequelize.define('categories', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  
  // define the "subcategories" table
  const Subcategories = sequelize.define('subcategories', {
    name: {
      type: DataTypes.STRING
    },
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });
  
  // create associations between the tables
  Categories.hasMany(Subcategories, { as: 'subcategories', foreignKey: 'categoryId' });
  Subcategories.belongsTo(Categories, { as: 'category', foreignKey: 'categoryId' });
  // Define the model for the data to be inserted
  

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
    }
  });

  

  const Prices = sequelize.define('prices', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    item_id: {
      type: Sequelize.INTEGER,
      foreignKey: true
    },
    price1: {
      type: Sequelize.FLOAT,
    },
    price2: {
      type: Sequelize.FLOAT,
    },
    price3: {
      type: Sequelize.FLOAT,
    },
    price4: {
      type: Sequelize.FLOAT,
    },
    price5: {
      type: Sequelize.FLOAT,
    }
  });

  // one item has many prices
  Items.hasMany(Prices, { as: 'prices', foreignKey: 'item_id' });

  

//   // create the tables in the database
  sequelize.sync()
    .then(() => console.log('Tables created successfully'))
    .catch(err => console.error('Error creating tables:', err));


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
  

  const fs = require('fs');




  const dataitems = JSON.parse(fs.readFileSync('items.json', 'utf8'));
  
  //console.log(dataitems);
  // Products.bulkCreate(dataitems.).then(() => console.log("Products have been saved"));
  // Categories.bulkCreate(dataitems["categories"]).then(() => console.log("Categories have been saved"));

  
  Items.bulkCreate(dataitems)
      .then(() => {
          console.log("Items have been saved------------------------------")
          console.log(Items[0].id);
        })
      .catch(error => {
          console.error('Error finding users:', error);
        });
  
  
  const dataprices=JSON.parse(fs.readFileSync('prices.json', 'utf8'));

 
  
  // Use your models in your Express.js routes
/*app.get('/users', (req, res) => {
  User.findAll().then(users => {
    res.json(users)
  })
})*/
 

