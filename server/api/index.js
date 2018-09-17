const router = require('express').Router()
const sequelize = require ('sequelize')
const { Product } = require('../db/models.js')

router.get('/products', (req, res, next) => {
    Product.findAll()
    .then (data => res.send(data))
    .catch(next)
})

router.delete('/products/:id', (req, res, next) => {
    console.log(req.params.id)

    Product.destroy({where:
        {id: req.params.id}
    })
    .then (() => res.sendStatus(204))
    .catch(next)
})

router.post('/products', (req,res,next)=> {
    Product.create(req.body)
    .then(data => res.send(data))
    .catch(next)
})

module.exports = router
