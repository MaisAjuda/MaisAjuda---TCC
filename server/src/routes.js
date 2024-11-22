const Router = require('express').Router()
const express = require('express')
const ControllerAssistencia = require('./Controllers/ControllerAssistência')
const ControllerCliente = require('./Controllers/ControllerCliente')
const ControllerCuidado = require('./Controllers/ControllerCuidado')
const ControllerCuidador = require('./Controllers/ControllerCuidador')
const ControllerNotificacao = require('./Controllers/ControllerNotificacao')
const upload = require('../multerConfig');
const testeUpload = require('./Controllers/testeUpload')

Router.use(express.json()); 
Router.use(express.urlencoded({ extended: true })); 

Router.post('/cliente', upload.single('file'), ControllerCliente.criarCliente)
Router.post('/cliente-foto', upload.single('file'), ControllerCliente.uploadFile)
Router.get('/cliente/get-photo/:fileId', ControllerCliente.getPhoto)
Router.get('/cliente/get-user/:cli_email', ControllerCliente.getPerfil)
Router.post('/cliente/login', ControllerCliente.loginCliente)
Router.put('/cliente', ControllerCliente.alterarCliente)
Router.delete('/cliente', ControllerCliente.deleteCliente)
Router.get('/cliente', ControllerCliente.getcliente)


Router.get('/cuidador', ControllerCuidador.getCuidador)
Router.get('/cuidador/get-user/:cui_email', ControllerCuidador.getPerfilCuidador)
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
