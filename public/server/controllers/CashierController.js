const Cashier = require("../models/Cashier");
const Actions = require("../models/Actions");

module.exports = {
  async index(req, resp) {
    const cashier = await Cashier.findAll();

    return resp.json(cashier[0]);
  },

  async store(req, resp) {
    const { value, is_open, message } = req.body;

    const dbCashier = await Cashier.findAll();

    if (!dbCashier[0]) {
      const cashier = await Cashier.create({ value, isOpen: is_open });
      await Actions.create({ description: message });

      return resp.json(cashier);
    }

    const cashier = await Cashier.update(
      { value, isOpen: is_open },
      {
        where: { id: dbCashier[0].id },
      }
    );
    await Actions.create({ description: message });

    return resp.json(cashier);
  },
};
