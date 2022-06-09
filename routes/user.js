const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const db = require('../database');
const { House, User } = db.models;

const router = express.Router();


// Gets a user and all houses associated with them.
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const data = await User.findOne({ where: {
        user_id: id,
    }, include: House});
    res.status(200).json(data)
});

module.exports = router;