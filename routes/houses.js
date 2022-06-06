const { response } = require('express');
const express = require('express');
const db = require('../database');
const { House } = db.models;

/* Contains all routes for House Endpoint 
   Supported routes for this endpoint are
   - get
    args: id
    returns: 200 (sucess), house object
    route: /house/:id
   - post
    args: body house object
    returns: 201 (created)
    route: /house
   - patch
    args: id, object (of attributes to update in body)
    returns: 200 (success)
    route: /house/:id
   - delete
    args: id
    returns: 200 (success)
    route: house/:id
*/

const router = express.Router();

router.get('/house/:id', async (req, res) => {
    const id = req.params.id;
    const house = await House.findByPk(id);
    res.status(200).json(house);
    
});

router.post('/house', async (req, res) => {
    const data = req.body;
    const house = await House.create(data);
    res.sendStatus(201);
})

router.patch('/house/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const house = await House.findByPk(id);
    await house.update(data);
    await house.save();
    res.sendStatus(200);
})

router.delete('/house/:id', async (req, res) => {
    const id = req.params.id;
    const house = await House.findByPk(id);
    await house.destroy();
    res.sendStatus(200);
})

module.exports = router;