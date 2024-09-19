const Router = require('express').Router()
const ControllerCliente = require('./Controllers/ControllerCliente')
const ConstrollerCliente = require('./Controllers/ControllerCliente')

Router.post('/login', ControllerCliente.loginCliente)
Router.post('/cliente', ControllerCliente.criarCliente)
Router.put('/cliente', ControllerCliente.alterarCliente)
Router.get('/', ConstrollerCliente.getClientes)

module.exports = Router
