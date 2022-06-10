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
db.models.User = require('./models/users')(sequelize, Sequelize);

db.models.House_Users = db.sequelize.define("House_User", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

// Set up many-to-many associations
db.models.House.belongsToMany(db.models.User, { through: db.models.House_Users });
db.models.User.belongsToMany(db.models.House, { through: db.models.House_Users });

// For debug purposes sync is set to rebuild the datebase on every run.
db.sequelize.sync({force: true});


module.exports = db;