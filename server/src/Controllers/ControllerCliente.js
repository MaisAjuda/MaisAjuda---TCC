const knex = require("../database"); 

module.exports = {
    async loginCliente(req, res) {
        try {
            console.log('Request body:', req.body);
            const { cli_email, cli_senha } = req.body;
    
           
            if (!cli_email || !cli_senha) {
                return res.status(400).send('Email e senha são obrigatórios');
            }
    
            
            const cliente = await knex('clientes')
                .select('cli_email', 'cli_senha')
                .where({ cli_email, cli_senha })
                .first();
    
            if (cliente) {
              
                res.status(200).send('Login bem-sucedido');
            } else {
               
                res.status(400).send('Email ou senha incorretos');
            }
    
        } catch (err) {
            console.error(err); 
        
            res.status(500).send('Erro no servidor');
        }
    },    

    async getClientes(req, res) {
        try {
            const listacliente = await knex('clientes');
            console.log(listacliente);
            res.status(200).send(listacliente);
        } catch (error) {
            console.error(error); 
            res.status(500).send({ error: 'Erro ao buscar clientes' });
        }
    },

    async criarCliente(req, res) {
        try {
            const { cli_cpf, cli_nome, cli_email, cli_cep, cli_senha, cli_tel } = req.body;
    
            if (!cli_nome || !cli_email || !cli_senha) {
                return res.status(400).send('Campos obrigatórios faltando');
            }
    
            await knex('clientes').insert({
                cli_cpf: cli_cpf,       
                cli_nome: cli_nome,
                cli_email: cli_email,
                cli_cep: cli_cep,
                cli_senha: cli_senha,
                cli_tel: cli_tel
            });
    
            res.status(200).send('Usuário cadastrado com sucesso');
        } catch (error) {
            console.error(error); 
            res.status(500).send({ error: 'Erro ao criar usuário' });
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
    
            
            const resultado = await knex('clientes')
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
            console.error(error);
            res.status(500).send({ error: 'Erro ao atualizar cliente' });
        }
    },

    async deleteCliente(req,res){
        try {

            const { cli_cpf } = req.body
            const resut = await knex('clientes').where({ cli_cpf }).del()
        
            return res.status(200).send("Cliente deletado com sucesso!!!")
        } catch (error) {
            console.log(error)
            return res.status(400).send('Erro ao deletar cliente')
        }
    }
    
}
