const db = require("../database"); 
const { validaCPF } = require("../modules/verificarCPF");
const bycrypt = require('bcrypt')
const fs = require('fs')
const { google } = require('googleapis');
const path = require("path");


module.exports = { 
    async loginCliente(req,res,file){
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

    async criarCliente(req, res) {
        try { 
            const cli_cpf = req.body.cli_cpf;
            const { cli_nome, cli_email, cli_cep, cli_senha, cli_tel } = req.body;
            const file = req.file
    
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

            console.log(file)

            async function UploadFile() {
                try {
                    const auth = new google.auth.GoogleAuth({
                        keyFile: path.resolve(__dirname, '../../maisajuda-441421-55db2a920193.json'),
                        scopes: ['https://www.googleapis.com/auth/drive']
                    });
            
                    const driveService = google.drive({
                        version: 'v3',
                        auth: auth
                    });
            
                    const fileMetaData = {
                        'name': cli_cpf,
                        'parents': [process.env.GOOGLE_API_FOLDER_ID]
                    };
            
                    const media = {
                        mimeType: file.mimeType,
                        body: fs.createReadStream(path.join(file.destination, file.filename))
                    };
            
                    const response = await driveService.files.create({
                        resource: fileMetaData,
                        media: media,
                        fields: 'id'
                    });

                    fs.unlinkSync(path.join(file.destination, file.filename));
            
                    return response.data.id;
            
                } catch (error) {
                    console.error("Erro ao fazer upload:", error);
                    res.status(500).json({
                        msg: "Erro ao fazer upload da foto de perfil",
                        erro: error.message
                    });
                }
            }

            await UploadFile();

            await db('cliente').insert({
                cli_cpf: cli_cpf,
                cli_nome: cli_nome,
                cli_email: cli_email,
                cli_cep: cli_cep,
                cli_senha: cli_senha_encrypt,
                cli_tel: cli_tel
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

