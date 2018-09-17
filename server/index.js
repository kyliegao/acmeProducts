const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 2345
const { db, Product, seed } = require('./db/models.js')

//body-parsing middle-ware

app.use(express.json())

//static file-serving middle-ware
app.use('/dist', express.static(path.join(__dirname, '../dist')))


//main GET route
app.get ('/', ( req,res, next ) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

//api routes
app.use('/api', require('./api/index.js'))


//error catching middleware

app.use ((err, req, res,next) => {
    console.log(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send (err.message || 'Internal server error.')
})


//initialize server

const init = () => {
    db.sync({force:true})
    .then (() => seed())
    .then(() => app.listen(PORT, () => {`app is listening on ${PORT}`}))
}

init ()