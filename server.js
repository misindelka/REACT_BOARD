const jsonServer = require('json-server')
const express = require('express')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router('data/database.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3004

server.use(express.static('dist'))
server.use(middlewares)
server.use('/api', router)
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})

server.listen(port)
