
const express = require('express');
const port = 3000
const path = require('path')
const api = require('./server/routes/teamAPI')


const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',api)

app.listen(port, function () {
    console.log(`Server Running on port : ${port}`)
})

