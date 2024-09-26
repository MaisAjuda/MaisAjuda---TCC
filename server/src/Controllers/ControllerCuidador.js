const knex = require("../database"); 

module.exports = {
    async loginCuidador(req, res) {
        try {
            console.log('Request body:', req.body);
            const { cui_email, cui_senha } = req.body

            if (!cui_email || !cui_senha) {
                return res.status(400).send('Email e senha são obrigatórios');
            }

            const cliente = await knex('cuidador')
            .select('cui_email', 'cui_senha')
            .where({ cui_email, cui_senha })
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
    async getCuidador(req,res){
        try {
            
            const listCuids = await knex('cuidador')

            res.status(200).send(listCuids)

        } catch (error) {
            console.log(error)
        }
    }, 
    async criarCuidador(req,res){
        try {
            
            const { cui_cpf, cui_nome, cui_email, cui_cep, cui_senha, cui_tel, esp_id, cui_descri, cui_sexo, cui_data_nasc} = req.body;

            await knex('cuidador').insert({
                cui_cpf,
                esp_id,
                cui_nome,
                cui_email,
                cui_descri, 
                cui_senha, 
                cui_sexo, 
                cui_data_nasc, 
                cui_tel,
                cui_cep
            })

            return res.status(201).send('Cuidador criado!')

        } catch (error) {
            console.log(error)
        }
    }
    
}
