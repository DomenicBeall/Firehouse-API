const express = require('express');
const housecontroller = require('../controller/houseController');
const userController = require('../controller/userController');
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

// Gets all houses
router.get('/', async (req, res) => {
    const data = await housecontroller.getAll();
    res.status(200).json(data);
});

// Gets a house by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const house = await housecontroller.getById(id);
    res.status(200).json(house);
});

// Creates a new house
router.post('/', async (req, res) => {
    const { creatorId, ...data } = req.body;   

    const house = await housecontroller.create(data);
    await userController.joinHouse(creatorId, house.dataValues.id);

    res.status(201).json(house);
})

// Updates a house
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    
    await housecontroller.update(id, data);

    res.status(200).json("Patch successful");
})

// Deletes a house by id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    await housecontroller.delete(id);

    res.sendStatus(200);
});

// Deletes a user from a house
router.delete('/:hid/user/:uid/', async (req, res) => {
    const hid = req.params.hid;
    const uid = req.params.uid;

    await userController.leaveHouse(uid, hid);

    res.status(200).json("Delete successful!");
});

module.exports = router;