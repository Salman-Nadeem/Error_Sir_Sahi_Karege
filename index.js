// index.js
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

app.set('view engine', 'ejs');


// Set the views directory
app.set('views', path.join(__dirname, 'public', 'views'));

app.use(express.static(path.join()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))



// Import the routes from Route.js
const userRoutes = require('./public/Routes/Route');
const {DbConnection} = require('./public/Config/Db');
DbConnection();




// Register the routes with Express app
app.use('/', userRoutes);  // Routes will now be prefixed with "/api"
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
