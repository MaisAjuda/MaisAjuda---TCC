const Router = require('express').Router()
const ControllerCliente = require('./Controllers/ControllerCliente')
const ConstrollerCliente = require('./Controllers/ControllerCliente')
const ControllerCuidador = require('./Controllers/ControllerCuidador')

Router.post('/login', ControllerCliente.loginCliente)
Router.post('/cliente', ControllerCliente.criarCliente)
Router.put('/cliente', ControllerCliente.alterarCliente)
Router.delete('/cliente', ControllerCliente.deleteCliente)
Router.get('/', ConstrollerCliente.getClientes)

Router.post('/loginCui', ControllerCuidador.loginCuidador)
Router.get('/cuidador', ControllerCuidador.getCuidador)
Router.post('/cuidador', ControllerCuidador.criarCuidador)
Router.put('/cuidador', ControllerCuidador.alterarCuidador)
Router.delete('/cuidador', ControllerCuidador.deletarCuidador)

module.exports = Router
