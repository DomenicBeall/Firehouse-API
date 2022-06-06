/* Contains data model for the houses table */

module.exports = (sequelize, Sequelize) => {
    const House = sequelize.define('house', {
        name: {
            type: Sequelize.STRING,
        },
    });
    return House;
};