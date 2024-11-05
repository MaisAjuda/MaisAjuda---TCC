const Router = require('express').Router()
const { Route } = require('react-router-dom')
const ControllerAssistencia = require('./Controllers/ControllerAssistência')
const ControllerCliente = require('./Controllers/ControllerCliente')
const ConstrollerCliente = require('./Controllers/ControllerCliente')
const ControllerCuidado = require('./Controllers/ControllerCuidado')
const ControllerCuidador = require('./Controllers/ControllerCuidador')
const ControllerNotificacao = require('./Controllers/ControllerNotificacao')

Router.post('/cliente', ControllerCliente.criarCliente)
Router.put('/cliente', ControllerCliente.alterarCliente)
Router.delete('/cliente', ControllerCliente.deleteCliente)
Router.get('/cliente', ConstrollerCliente.getcliente)

Router.get('/cuidador', ControllerCuidador.getCuidador)
Router.post('/cuidador/login', ControllerCuidador.loginCuidador)
Router.post('/cuidador', ControllerCuidador.criarCuidador)
Router.put('/cuidador', ControllerCuidador.alterarCuidador)
Router.delete('/cuidador', ControllerCuidador.deletarCuidador)

Router.post('/cuidado', ControllerCuidado.criarCuidado)
Router.get('/cuidado', ControllerCuidado.getCuidados)
Router.put('/cuidado', ControllerCuidado.alterarCuidado)
Router.delete('/cuidado', ControllerCuidado.deleteCuidado)

Router.post('/assistencia', ControllerAssistencia.criarAssistencia)
Router.get('/assistencia', ControllerAssistencia.getAssistencia)
Router.put('/assistencia', ControllerAssistencia.alterarAssistencia)
Router.delete('/assistencia', ControllerAssistencia.deletarAssistencia)

Router.post('/notificacao', ControllerNotificacao.createNotify)
Router.get('/notificacao', ControllerNotificacao.getNotify)
Router.put('/notificacao', ControllerNotificacao.alterarNotificacao)
Router.delete('/notificacao', ControllerNotificacao.deletarNotificação)

module.exports = Router
