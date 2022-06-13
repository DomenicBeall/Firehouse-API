module.exports = (sequelize, Sequelize) => {
    const House_User = sequelize.define("House_User", {}, { timestamps: false })
    
    return House_User;
};