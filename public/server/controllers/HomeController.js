const Product = require("../models/Product");
const Purchase = require("../models/Purchase");

module.exports = {
  async product(req, resp) {
    const products = await Product.findAll({
      limit: 5,
      order: [['created_at', 'DESC']]
    })

    return resp.json(products);
  },
  
  async purchase(req, resp) {
    const purchases = await Purchase.findAll({
      limit: 5,
      order: [['created_at', 'DESC']]
    })

    return resp.json(purchases);
  }
};
