const Sequelize = require("sequelize");
const db_config = require('../config/db_config');

/* Module provides database backbone and an interface to all defiend data models. */

// Configures a instance of Sequelize for export.
const sequelize = new Sequelize(db_config);

// Object provides all sequelize interfaces in single place for convient export.
const db = {
    Sequelize,
    sequelize,
    models: {},
};

/* Add models to the db object Below */
db.models.House = require('./models/house')(sequelize, Sequelize);

// For debug purposes sync is set to rebuild the datebase on every run.
db.sequelize.sync({force: true})

module.exports = db;