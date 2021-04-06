const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");

module.exports = {
  async store(req, resp) {
    const { barcode, name, cost, price, amount, category_id } = req.body;
    const icon = req.file?.filename;

    const dbProductBarcode = await Product.findOne({
      where: { barcode },
    })

    const dbProductName = await Product.findOne({
      where: { name },
    });

    if (dbProductName ) {
      return resp.json({ error: "Já existe um produto com este nome no estoque." });
    } else if (dbProductBarcode) {
      return resp.json({ error: "Já existe um produto com este código de barras no estoque."})
    } else {
      const product = await Product.create({ barcode, icon, name, cost, price, amount, category_id });

      return resp.json(product);
    }
  },

  async index(req, resp) {
    const { barcode } = req.query;
    if(barcode) {
      const product = await Product.findOne({
        where: { barcode }
      })

      return resp.json(product);
    }
    const products = await Product.findAll();

    if (products.length === 0) {
      return resp.json({ message: "Nenhum produto encontrado no estoque" });
    }

    return resp.json(products);
  },

  async indexCategory(req, resp) {
    const { id } = req.params;

    const products = await Product.findAll({
      where: {
        category_id: id
      }
    })

    return resp.json(products);

  },

  async update(req, resp) {
    const { id } = req.params;
    const { name, cost, price, amount, category_id } = req.body;
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
          cost,
          price,
          amount,
          category_id
        },
        { where: { id } }
      );

      const removePath = path.resolve(__dirname, '..', '..', 'uploads', `images/${file.icon}`)

      fs.unlinkSync(removePath);
    } else {
      await Product.update({
        name,
        cost,
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

    const removePath = path.resolve(__dirname, '..', '..', 'uploads', `images/${file.icon}`)

    fs.unlinkSync(removePath);

    return resp.json({ message: "Produto removido com sucesso" });
  },
};
