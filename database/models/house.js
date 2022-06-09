/* Contains data model for the houses table */

const users = require("./users");

module.exports = (sequelize, Sequelize) => {
    const House = sequelize.define('house', {
        name: {
            type: Sequelize.STRING,
            unique: true
        }, 
    });

    return House;
};