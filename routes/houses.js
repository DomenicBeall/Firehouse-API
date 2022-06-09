const { response } = require('express');
const express = require('express');
const db = require('../database');
const { House, User } = db.models;

/* Contains all routes for 'house' Endpoint. 
   Supported routes for this endpoint are as follows,
   - get
    args: None
    returns: 200 (success), list of all house objects

   - get
    args: id
    returns: 200 (sucess), house object
    route: /house/:id

   - post
    args: object (house)
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

router.get('/house', async (req, res) => {
    // TODO - add query parameter
    const data = await House.findAll({include: User});
    res.status(200).json(data);
});

router.get('/house/:id', async (req, res) => {
    const id = req.params.id;
    const house = await House.findByPk(id, { include: User});
    res.status(200).json(house);
    
});

router.post('/house', async (req, res) => {
    const data = req.body;
    const house = await House.create(data, {
        include: [ User ],
    });
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