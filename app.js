const express= require('express');
const exphbs= require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cors= require('cors');



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

  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
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
  
  
  const fs = require('fs');




  //const dataitems = JSON.parse(fs.readFileSync('items.json', 'utf8'));
  
  //console.log(dataitems);
  //Products.bulkCreate(dataitems.).then(() => console.log("Products have been saved"));
  //Categories.bulkCreate(dataitems["categories"]).then(() => console.log("Categories have been saved"));
/*
  
  Items.bulkCreate(items)
      .then(() => {
          console.log("Items have been saved----------------------------------------------------------------------------------------------------")
          console.log(Items[0].id);
        })
      .catch(error => {
          console.error('Error finding users:', error);
        });
  
  
  const dataprices=JSON.parse(fs.readFileSync('prices.json', 'utf8'));

 */
  
  // Use your models in your Express.js routes
app.get('/users', (req, res) => {
  User.findAll().then(users => {
    res.json(users)
  })
})
 

//signup-------
app.post('/signup', (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  
  Users.create({ name, email, password })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.json({ success: false, error: error.message });
    });
});






//login------
app.post('/login', (req, res) => {
  const {name,email, password} = req.body;
  Users.findOne({
    where: {
      name,
      email,
      password
    }
  })
  .then(user => {
    if (user) {
      // user exists, log them in
      res.send({success: true});
      console.log('User found');
      //window.location.href='http://127.0.0.1:4242/Map.html';
      
    }else {
      // user does not exist, show error message
      res.send({success: false});
      console.log('User does not exist')
    }
  })
});


//myaccount-----
app.post('/myaccount', (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  Users.update({ name, email, password }, { where: { id: 1} })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.json({ success: false, error: error.message });
    });
});


// Set up an API endpoint to retrieve the data
app.get('/myaccount', (req, res) => {
  const {name,email, password} = req.query;
  Users.findOne({ name, email, password }, { where: { id: 1} })
    .then((users) => {
      console.log(users);
      res.json({ success: true, users: users });
      
    })
    .catch((error) => {
      console.error(error);
      res.json({ success: false, error: error.message });
    });
});



//items
app.get('/itemspage', async (req, res) => {
  const items = await Items.findAll();
  res.json(items)
});

/*
app.get('/itemspage', async (req, res) => {
  const { category, subcategory } = req.query;
  let items = [];
  if (category && subcategory) {
    items = await Items.findAll({
      where: {
        category_name: category,
        subcategory_name: subcategory
      }
    });
  } else if (category) {
    items = await Items.findAll({
      where: {
        category_name: category
      }
    });
  } else if (subcategory) {
    items = await Items.findAll({
      where: {
        subcategory_name: subcategory
      }
    });
  } else {
    items = await Items.findAll();
  }
  res.json(items);
});
*/






//Leaderboard endpoint
app.get('/leaderboard', async (req, res) => {
  // Find the top 3 users with the highest scores
  const topUsers = await Users.findAll({
    order: [['score', 'DESC']],
    limit: 3
  });

  // Send the top users as the response
  res.send(topUsers);
});




//server
const PORT = process.env.PORT || 4242;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));     

