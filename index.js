const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    return self.connection.dropDatabase();
  })
  .then(x => {
    //console.log(`Connected to the database: "${x.connections[0].name}"`);
    console.log('Connection has been established'); // to check connection on console
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Zurek',
      level: 'Easy Peasy',
      ingredients: ['Flour', 'Potato', 'Carrot', 'Eggs'],
      cuisine: 'Polish',
      dishType: 'Dish',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/%C5%BBurek_w_chlebku.JPG/250px-%C5%BBurek_w_chlebku.JPG',
      duration: 40,
      creator: 'Diogo',
      created: Date()
    });
  })
  .then(recipeDocument => {
    console.log(recipeDocument);
  })
  .then(x => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log('Recipe is updated');
  })
  .then(Disconnect => {
    console.log('Disconnected');
    return mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
