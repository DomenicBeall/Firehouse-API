const express = require('express');
const userController = require('../controller/userController');
const db = require('../database');
const { House, User } = db.models;

const router = express.Router();

// Gets a user and all houses associated with them.
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const data = await User.findOne({ where: { userId: id,}, include: House });
    
    res.status(200).json(data)
});

// Adds a user to another house
router.post('/', async (req, res) => {
    const { userId, houseId } = req.body;

    const data = await userController.joinHouse(userId, houseId);

    res.status(200).json(data)
})

module.exports = router;