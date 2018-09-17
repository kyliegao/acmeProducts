const Sequelize = require('sequelize')
const pg = require('pg')

db = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost:5432/acmeproducts')

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    rating:{
        type: Sequelize.INTEGER
    }
})

const seed = () => {
    Promise.all([
        Product.create({name: 'AlpacaMyBags', rating: 3}),
        Product.create({name: 'DontBossanovaMeAround', rating: 5}),
        Product.create({name: 'NowMuseumNowNot', rating: 4}),
        Product.create({name: 'MeetMeOnTheStarFerry', rating: 2}),
        Product.create({name: 'MyPrivateJet', rating: 5})
    ])
    .then( data => console.log ('SEEDS HAVE BEEN PLANTED'))
    .catch( ex => console.log(ex) )
}

module.exports = {
    db,
    Product,
    seed
}