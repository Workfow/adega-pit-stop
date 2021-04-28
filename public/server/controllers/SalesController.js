const Sales = require('../models/Sales');
const Product = require('../models/Product');
const Cashier = require('../models/Cashier');

module.exports = {
  async store(req, resp) {
    const { description, value, products } = req.body;

    for(let i = 0; i < products.length; i++) {
      const currentProduct = await Product.findOne({
        where: { id: products[i].id}
      })

      const currentAmount = currentProduct.amount;
      
      await Product.update({
        amount: currentAmount - products[i].amount
      }, { where: { id: products[i].id}})
    }

    const sale = await Sales.create({
      description,
      value
    })

    const dbCashier = await Cashier.findAll();

    let cashierValue = dbCashier[0].value + value;

    if(dbCashier[0].is_open) {
      await Cashier.update({ value: cashierValue }, {
        where: { id: dbCashier[0].id }
      })
    }

    return resp.json(sale);
  },

  async index(req, resp) {
    const sales = await Sales.findAll();

    const salesValue = sales.map(item => {
      return item.value;
    })

    const totalValue = salesValue.reduce((acc, cur) => acc + cur);

    return resp.json({sales, totalValue});
  },

  async update(req, resp) {
    const { id } = req.params;
    const { description, value } = req.body;

   try {
    await Sales.update({
      description,
      value
    }, { where : { id }})

    return resp.json({ message: 'Venda atualizada com sucesso'})
   } catch (err) {
     return resp.json({ error: 'Erro ao atualizar venda'})
   }
    
  },

  async destroy(req, resp) {
    const { id } = req.params;
    
    try {
      await Sales.destroy({
        where: { id }
      })
  
      return resp.json({ message: 'Venda excluída com sucesso'})
    } catch (err) {
      return resp.json({ error: 'Erro ao excluir venda'})
    }
  }
}