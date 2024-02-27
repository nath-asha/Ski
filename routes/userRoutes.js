// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
