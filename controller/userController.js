const db = require('../database');
const { House, User, House_Users } = db.models;

const userController = {
   joinHouse: async (userId, houseId) => {      
      // TODO: Move this into a separate function
      const user = await User.findOrCreate({
         where: {
            userId
         }
      });

      const house = await House.findByPk(houseId);

      await house.addUser(user, { through: House_Users });
   },
   leaveHouse: async (userId, houseId) => {
      await House_Users.findOne({ where: { userId: userId, houseId: houseId}});
      await houseUserEntry.destroy();
   }
};

module.exports = userController;