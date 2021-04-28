const Actions = require('../models/Actions');

module.exports = {
  async index(req, resp) {
    const actions = await Actions.findAll({
      limit: 5,
      order: [['created_at', 'DESC']]
    });

    return resp.json(actions);
  }
}