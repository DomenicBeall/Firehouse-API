module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        userId: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
    });
    
    return User;
};