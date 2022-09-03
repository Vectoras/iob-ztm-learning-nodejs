// importing module
const ordersModel = require('./orders.model');

// exporting
module.exports = {
  Query: {
    orders: () => {
      return ordersModel.getAllOrders();
    },
  },
};
