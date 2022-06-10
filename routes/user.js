const { response } = require('express');
const { Router } = require('express');
const express = require('express');
const { send } = require('express/lib/response');
const res = require('express/lib/response');
const db = require('../database');
const { House, User, House_Users } = db.models;

const router = express.Router();

// Gets a user and all houses associated with them.
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const data = await User.findOne({ where: { user_id: id,}, include: House });
    res.status(200).json(data)
});

// Adds a user to another house
router.post('/user', async (req, res) => {
    const data = await House_Users.create(req.body);
    res.status(200).json(data)
})

// Deletes a house
router.delete('/user/:uid/house/:hid', async (req, res) => {
    const uid = req.params.uid;
    const hid = req.params.hid;
    const houseUserEntry = await House_Users.findOne({ where: { userId: uid, houseId: hid}});
    await houseUserEntry.destroy();
    res.sendStatus(200);
})

module.exports = router;