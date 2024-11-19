const db = require("../database"); 
const { validaCPF } = require("../modules/verificarCPF");
const bycrypt = require('bcrypt')
const fs = require('fs')
const { google } = require('googleapis');
const knex = require("knex");
const path = require("path");


module.exports = { 
    async loginCliente(req,res){
        try {
            console.log("requisição feita")
            const { cli_email, cli_senha  } = req.body

            if (!cli_email || !cli_senha) {
                return res.status(400).send('Email e senha são obrigatórios');
            }

            const cliente = await db('cliente')
                .where({ cli_email })
                .first();

            if (!cliente) {
                return res.status(404).send('cliente não encontrado');
            }



            const senhaCorreta = await bycrypt.compare(cli_senha, cliente.cli_senha);

            if (!senhaCorreta) {
                return res.status(401).send('Senha incorreta');
            }

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso',
                cliente: {
                    cli_cpf: cliente.cli_cpf,
                    cli_nome: cliente.cli_nome,
                    cli_email: cliente.cli_email
                }
            });
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error,
            });
            console.log(error);
        }
    },
    async getcliente(req, res) {
        try {
            const listacliente = await db('cliente');
            console.log(listacliente);
            res.status(200).send(listacliente);
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    },

    async getPerfil(req, res) {
        try {
            const { cli_email } = req.params; // Verifica se está nos parâmetros da rota
    
            if (!cli_email) {
                return res.status(400).json({
                    error: "Email não fornecido",
                    message: "O campo 'cli_email' é obrigatório"
                });
            }
    
            const cliente = await db('cliente').where({ cli_email }).first(); // Busca apenas um cliente
    
            if (!cliente) {
                return res.status(404).json({
                    error: "Cliente não encontrado",
                    message: `Nenhum cliente encontrado com o email: ${cli_email}`
                });
            }

            console.log(cliente)
    
            res.status(200).json(cliente); // Retorna os dados do cliente
        } catch (error) {
            console.error("Erro ao buscar cliente:", error);
            return res.status(500).json({
                error: "Erro interno do servidor",
                message: error.message
            });
        }
    },
    
    async getPhoto(req, res) {
        try {

            console.log("FileID: ",req.params);
    
            // Verificando se o fileId foi fornecido na URL
            if (!fileId) {
                return res.status(400).json({ msg: "fileId não fornecido." });
            }
    
            console.log('Procurando pelo fileId:', fileId); // Log para depuração
    
            // Inicializando autenticação do Google Drive
            const auth = new google.auth.GoogleAuth({
                keyFile: path.resolve(__dirname, '../../maisajuda-441421-55db2a920193.json'),
                scopes: ['https://www.googleapis.com/auth/drive.readonly']
            });
    
            const driveService = google.drive({
                version: 'v3',
                auth
            });
    
            // Consultando o arquivo usando a API do Google Drive
            const file = await driveService.files.get({
                fileId: fileId,
                fields: 'id, name, webViewLink, webContentLink',
                timeout: 60000 // Aumenta o timeout para 60 segundos
            });
    
            console.log('Arquivo encontrado:', file.data); // Log para verificar a resposta
    
            // Retornando os links de visualização e download do arquivo
            res.json({
                viewLink: file.data.webViewLink,
                downloadLink: file.data.webContentLink,
            });
    
        } catch (error) {
            console.error('Erro ao buscar o arquivo:', error);
            return res.status(500).json({
                error: "Erro ao buscar o arquivo",
                msg: error.message,
            });
        }
    },    

    async uploadFile(req, res) {
        const cli_cpf = req.body.cli_cpf; 
        const file = req.file;

        if (!cli_cpf) {
            return res.status(400).json({ msg: "CPF não fornecido" });
        }
        const cliente = await db('cliente').where({ cli_cpf }).first();
        if (!cliente) {
            return res.status(404).json({ msg: "CPF não registrado" });
        }

        if (!file) {
            return res.status(400).json({ msg: "Arquivo não fornecido" });
        }

        try {
            // Inicializando autenticação do Google Drive
            const auth = new google.auth.GoogleAuth({
                keyFile: path.resolve(__dirname, '../../maisajuda-441421-55db2a920193.json'),
                scopes: ['https://www.googleapis.com/auth/drive']
            });

            const driveService = google.drive({
                version: 'v3',
                auth
            });

            

            // Configurando os metadados do arquivo
            const fileMetaData = {
                name: `${cli_cpf}-${file.originalname}`, // Nome único baseado no CPF e no nome original do arquivo
                parents: [process.env.GOOGLE_API_FOLDER_ID] // Certifique-se de que esta variável de ambiente está configurada
            };

            const media = {
                mimeType: file.mimetype, // Propriedade correta do objeto file
                body: fs.createReadStream(file.path)
            };

            // Fazendo upload para o Google Drive
            const response = await driveService.files.create({
                resource: fileMetaData,
                media,
                fields: 'id'
            });

            // Removendo o arquivo do sistema após upload
            fs.unlinkSync(file.path);

            // await knex('cliente').where({cli_cpf}).update({cli_foto_id: response.data.id})

            // Retornando ID do arquivo para o cliente
            return res.status(200).json({
                msg: "Upload realizado com sucesso",
                fileId: response.data.id
            });
        } catch (error) {
            console.error("Erro ao fazer upload:", error);

            // Tratamento de erro detalhado
            return res.status(500).json({
                msg: "Erro ao fazer upload da foto de perfil",
                erro: error.message
            });
        }
    },

    async criarCliente(req, res) {
        try { 
            const cli_cpf = req.body.cli_cpf;
            const { cli_nome, cli_email, cli_cep, cli_senha, cli_tel, cli_foto_id } = req.body;
    
            if (!cli_cpf || !cli_nome || !cli_email || !cli_senha || !cli_cep) {
                return res.status(400).send('Campos obrigatórios faltando');
            }
    
            if (!validaCPF(cli_cpf)) {
                return res.status(400).send("CPF inválido");
            }
    
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cli_cep}/json/`);
                const data = await response.json();
                if (data.erro) {
                    return res.status(400).send('CEP não encontrado');
                }
            } catch (error) {
                return res.status(500).send('Erro ao consultar o CEP');
            }
    
            const verificarEmail = await db('cliente').where({ cli_email }).first();
            const verificarCPF = await db('cliente').where({ cli_cpf }).first();
    
            if (verificarEmail || verificarCPF) {
                console.log(verificarCPF)
                console.log(verificarEmail)
                return res.status(400).send('CPF ou Email já existente');
            }
    
            const cli_senha_encrypt = await bycrypt.hash(cli_senha, 10);

            await db('cliente').insert({
                cli_cpf: cli_cpf,
                cli_nome: cli_nome,
                cli_email: cli_email,
                cli_cep: cli_cep,
                cli_senha: cli_senha_encrypt,
                cli_tel: cli_tel,
                cli_foto_id: cli_foto_id
            });

            return res.status(201).send('Usuário cadastrado com sucesso');

        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            return res.status(500).json({
                error: "Erro ao criar cliente",
                msg: error.message
            });
        }
    },    

    async alterarCliente(req, res) {
        try {
            const { cli_cpf, cli_nome, cli_email, cli_cep, cli_senha, cli_tel } = req.body;
    
            
            if (!cli_cpf) {
                return res.status(400).send('CPF do cliente é obrigatório');
            }
    
            if (!cli_nome && !cli_email && !cli_cep && !cli_senha && !cli_tel) {
                return res.status(400).send('Pelo menos um campo de atualização deve ser fornecido');
            }
    
            
            const resultado = await db('cliente')
                .where({ cli_cpf })
                .update({
                    cli_nome: cli_nome,
                    cli_email: cli_email,
                    cli_cep: cli_cep,
                    cli_senha: cli_senha,
                    cli_tel: cli_tel
                });
    
            
            if (resultado === 0) {
                return res.status(404).send('Cliente não encontrado');
            }
    
            res.status(200).send('Cliente atualizado com sucesso');
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    },

    async deleteCliente(req,res){
        try {

            const { cli_cpf } = req.body
            const resut = await db('cliente').where({ cli_cpf }).del()
        
            return res.status(200).send("Cliente deletado com sucesso!!!")
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    }
    
}

