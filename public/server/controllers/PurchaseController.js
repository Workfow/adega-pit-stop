const fs = require("fs");
const path = require("path");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

module.exports = {
  async store(req, resp) {
    const { description, value, products, provider } = req.body;
    const invoice = req.file?.filename;

    const currentProducts = JSON.parse(products);

    const dbPurchase = await Purchase.findOne({
      where: { description },
    });

    if (dbPurchase) {
      return resp.json({ error: "Compra ja cadastrada no sistema" });
    } else {
      try {

        let productsArr = [];

        for (let i = 0; i < currentProducts.length; i++) {
          const currentProduct = await Product.findOne({
            where: { id: currentProducts[i].value },
          });

          productsArr.push(currentProduct);

          const currentAmount = currentProduct.amount;

          await Product.update(
            {
              amount: currentAmount + currentProducts[i].amount,
              cost: currentProducts[i].cost
            },
            { where: { id: currentProducts[i].value } }
          );
        }

        const purchase = await Purchase.create({ invoice, description, value, provider, products: productsArr });

        return resp.json(purchase);
      } catch (error) {
        console.log("Erro aqui ", error);
      }
    }
  },

  async index(req, resp) {
    const { order } = req.query;
    const purchases = await Purchase.findAll({
      order: [['created_at', order]]
    });

    if (purchases.length == 0) {
      return resp.json({ message: "Nenhuma compra cadastrada ainda" });
    }

    const purchasesValue = purchases.map((item) => {
      return item.value;
    });

    const totalValue = purchasesValue.reduce((acc, cur) => {
      return acc + cur;
    });

    return resp.json({ purchases, totalValue });
  },

  async update(req, resp) {
    const { id } = req.params;
    const { description, value } = req.body;
    const invoice = req.file?.filename;

    if (invoice) {
      const file = await Purchase.findOne({
        attributes: ["invoice"],
        where: { id },
      });

      await Purchase.update(
        {
          invoice,
          description,
          value,
        },
        { where: { id } }
      );

      const removePath = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `invoices/${file.invoice}`
      );
      fs.unlinkSync(removePath);
    } else {
      await Purchase.update(
        {
          description,
          value,
        },
        { where: { id } }
      );
    }

    return resp.json({ message: "Compra Atualizada com sucesso" });
  },

  async destroy(req, resp) {
    const { id } = req.params;

    const file = await Purchase.findOne({
      attributes: ["invoice"],
      where: { id },
    });

    await Purchase.destroy({
      where: { id },
    });

    if (file.invoice) {
      const removePath = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `invoices/${file.invoice}`
      );

      fs.unlinkSync(removePath);
    }

    return resp.json({ message: "Compra excluída com sucesso" });
  },
};
