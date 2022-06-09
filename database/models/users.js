module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        user_id: {
            type: Sequelize.STRING,
            unique: true
        },
    });
    
    return User;
};