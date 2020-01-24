const { Op } = require('sequelize')
const User = require('../models/User')

module.exports = {
  async show (req, res) {
    console.log('BUNDUNHA')
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@junior.com'
        }
      }, 
      include: [
        { association: 'addresses', where: { street: 'Rua teste' } },
        {
          association: 'techs',
          where: {
            name: {
              [Op.iLike]: '%React%'
            }
          },
          through: { attributes: [] }
        },
      ]
    })

    return res.json(users)
  }
}