const Category = require('../models/Category');

module.exports = {
  async index(req, resp) {
    const categories = await Category.findAll();

    return resp.json(categories);
  },

  async indexOne(req, resp) {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id} 
    })

    return resp.json(category);
  },

  async store(req, resp) {
    const { name } = req.body;

    const category = Category.create({
      name
    });

    return resp.json(category);
  },

  async destroy(req, resp ) {
    const { id } = req.params;

    await Category.destroy({
      where: { id }
    })
  }
}