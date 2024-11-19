// public/Routes/Route.js
const express = require('express');
const router = express.Router();
// Import the getUser function from the controller
const { getUser  , createUser , getalldata , get_update_data ,update , Deleted} = require('../controller/User');  

// Example route
router.route('/').get(getUser).post(createUser);


router.route('/read').get(getalldata)
router.route('/update/:id').get(get_update_data).put(update);
// Correct DELETE Route Setup
router.route('/delete/:id').delete(Deleted);  // If using POST




// Export the router
module.exports = router;
