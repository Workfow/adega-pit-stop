const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");

module.exports = {
  async store(req, resp) {
    const { name, price, amount } = req.body;
    const icon = req.file?.filename;

    const dbProduct = await Product.findOne({
      where: { name },
    });

    if (dbProduct) {
      return resp.json({ error: "Produto já está cadastrado no estoque" });
    } else {
      const product = await Product.create({ icon, name, price, amount });

      return resp.json(product);
    }
  },

  async index(req, resp) {
    const products = await Product.findAll();

    if (products.length === 0) {
      return resp.json({ message: "Nenhum produto encontrado no estoque" });
    }

    return resp.json(products);
  },

  async update(req, resp) {
    const { id } = req.params;
    const { name, price, amount } = req.body;
    const icon = req.file?.filename;

    if (icon) {
      const file = await Product.findOne({
        attributes: ['icon'],
        where: { id }
      })

      await Product.update(
        {
          icon,
          name,
          price,
          amount,
        },
        { where: { id } }
      );

      const removePath = path.resolve(__dirname, '..', '..', '..', 'src', 'uploads', `images/${file.icon}`)

      fs.unlinkSync(removePath);
    } else {
      await Product.update({
        name,
        price,
        amount
      }, {where: { id }})
    }

    return resp.json({ message: "Produto atualizado com sucesso" });
  },

  async destroy(req, resp) {
    const { id } = req.params;

    const file = await Product.findOne({
      attributes: ['icon'],
      where: { id }
    })

    await Product.destroy({
      where: { id },
    });

    const removePath = path.resolve(__dirname, '..', '..', '..', 'src', 'uploads', `images/${file.icon}`)

    fs.unlinkSync(removePath);

    return resp.json({ message: "Produto removido com sucesso" });
  },
};
