// backend/controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = function(req, res) {
    const { name, username, password } = req.body;

     // Check if the username already exists
     User.findOne({ username })
     .then(existingUser => {
         if (existingUser) {
             return res.status(400).json({ error: 'Username is already taken' });
         }

         // If username is not taken, create a new user
         const newUser = new User({ name, username, password });

         newUser.save()
             .then(() => res.status(201).json({ message: 'User registered successfully' }))
             .catch(err => res.status(500).json({ error: err.message }));
     })
     .catch(err => res.status(500).json({ error: err.message }));
};

// Login a user
exports.loginUser = function(req, res) {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            user.comparePassword(password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Incorrect password' });
                    }

                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.json({ message: 'Login successful', token });
                })
                .catch(err => res.status(500).json({ error: err.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Add a book to user's favorites
exports.addToFavorites = (req, res) => {
    const userId = req.userId;
    const { bookId, title, subtitle, publisher, authors, thumbnail, description } = req.body;

    console.log("Attempting to add favorite book:", {
        bookId, title, subtitle, publisher, authors, thumbnail, description
    });

    //Check if the book already exists within the user's favorite books
    User.findOne({ _id: userId, 'favorites.bookId': bookId })
        .then(user => {
            if (user) {
                return;
            }

            //If the book does not exist, add it to the user's favorite books
            return User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        favorites: {
                            bookId,
                            title,
                            subtitle,
                            publisher,
                            authors,
                            thumbnail,
                            description,
                        }
                    }
                },
                { new: true }
            );
        })
        .then(updatedUser => {
            res.status(200).json({ message: 'Book added to favorites', favorites: updatedUser.favorites });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to add book to favorites' });
        });
};


//Fetches all the user's favorite books
exports.getFavoriteBooks = (req, res) => {
    const userId = req.userId;

    User.findById(userId)
        .then(user => {
            res.status(200).json({ favorites: user.favorites });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

//Remove favorite book
exports.removeFavoriteBook = (req, res) => {
    const userId = req.userId;
    const { bookId } = req.body;

    User.findByIdAndUpdate(
        userId,
        { $pull: { favorites: { bookId } } },
        { new: true }
    )
    .then(() => {
        res.status(200).json({ message: 'Book successfully removed from favorites' });
    })
    .catch(error => {
        res.status(500).json({ error });
    });
};

// Logout user
exports.logout = (req, res) => {
    // req.logout(); // This assumes you're using a middleware like Passport.js for authentication
    res.status(200).json({ message: 'Logged out successfully' });
};

