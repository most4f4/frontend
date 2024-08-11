// backend/routes/useraroutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authenticate');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Add to favorites
router.post('/addToFavorites', authenticateUser, userController.addToFavorites);

//Fetch user's favorite books
router.get('/favorites', authenticateUser, userController.getFavoriteBooks);

//Remove favorite book
router.post('/removeFavoriteBook', authenticateUser, userController.removeFavoriteBook);

// Logout
router.post('/logout', authenticateUser, userController.logout);

module.exports = router;