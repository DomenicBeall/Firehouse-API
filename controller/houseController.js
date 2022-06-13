const db = require('../database');
const { House, User, House_Users } = db.models;

module.exports = {
   getAll: async () => {
      return House.findAll({include: User});
   },
   getById: async (houseId) => {
      return House.findByPk(houseId, { include: User});
   },
   create: async (data) => {
      return House.create(data, {
         include: [ User ],
      });
   },
   update: async (houseId, data) => {
      const house = await House.findByPk(houseId);

      await house.update(data);
      await house.save();
   },
   delete: async (houseId) => {
      const house = await House.findByPk(houseId);
      
      await house.destroy();
      await House_Users.destroy({ where: { houseId: houseId}});
   }
};