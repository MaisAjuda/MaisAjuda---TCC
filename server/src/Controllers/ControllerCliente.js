const knex = require("../database"); 
const { validaCPF } = require("../modules/verificarCPF");
const bycrypt = require('bcrypt')

module.exports = { 

    async getcliente(req, res) {
        try {
            const listacliente = await knex('cliente');
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
            const { cli_cpf, cli_nome, cli_email, cli_cep, cli_senha, cli_tel } = req.body;
    
            if (!cli_nome || !cli_email || !cli_senha) {
                return res.status(400).send('Campos obrigatórios faltando');
            }

            if(!validaCPF(cli_cpf)){
                return res.status(400).send("CPF inválido")
            }

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cli_cep}/json/`);
                const data = await response.json();
                if (data.erro) {
                    return { valido: false, mensagem: 'CEP não encontrado' };
                }
            } catch (error) {
                return { valido: false, mensagem: 'Erro ao consultar CEP' };
            }

            const cli_senha_encrypt = await bycrypt.hash(cli_senha, 10)


    
            await knex('cliente').insert({
                cli_cpf: cli_cpf,       
                cli_nome: cli_nome,
                cli_email: cli_email,
                cli_cep: cli_cep,
                cli_senha: cli_senha_encrypt,
                cli_tel: cli_tel
            });
    
            res.status(200).send('Usuário cadastrado com sucesso');
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
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
    
            
            const resultado = await knex('cliente')
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
            const resut = await knex('cliente').where({ cli_cpf }).del()
        
            return res.status(200).send("Cliente deletado com sucesso!!!")
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    }
    
}
