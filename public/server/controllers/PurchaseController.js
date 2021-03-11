const fs = require("fs");
const path = require("path");
const Purchase = require("../models/Purchase");

module.exports = {
  async store(req, resp) {
    const { description, value } = req.body;
    const invoice = req.file?.filename;

    const dbPurchase = await Purchase.findOne({
      where: { description },
    });

    if (dbPurchase) {
      return resp.json({ error: "Compra ja cadastrada no sistema" });
    } else {
      const purchase = await Purchase.create({ invoice, description, value });

      return resp.json(purchase);
    }
  },

  async index(req, resp) {
    const purchases = await Purchase.findAll();

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
        '..',
        'src',
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

    const removePath = path.resolve(
      __dirname,
      "..",
      "..",
      '..',
      'src',
      "uploads",
      `invoices/${file.invoice}`
    );

    fs.unlinkSync(removePath);

    return resp.json({ message: "Compra excluída com sucesso" })
  },
};
