const knex = require("../database"); 

module.exports = {
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
            
            if (!cui_cpf && !cui_nome && !cui_email && !cui_cep && !cui_senha && !cui_tel && !esp_id && !cui_descri && !cui_sexo && !cui_data_nasc) {
                return res.status(400).send('Todos os campos devem ser preenchidos');
            }

            if(!verificarCPF(cui_cpf)){
                return res.status(400).send("CPF inválido")
            }

            await knex('cuidador').insert({
                cui_cpf : cui_cpf,
                esp_id : esp_id,
                cui_nome : cui_nome,
                cui_email : cui_email,
                cui_descri : cui_descri, 
                cui_senha : cui_senha, 
                cui_sexo : cui_sexo, 
                cui_data_nasc : cui_data_nasc, 
                cui_tel : cui_tel,
                cui_cep : cui_cep
            })

            return res.status(201).send('Cuidador criado!')

        } catch (error) {
            console.log(error)
        }
    },
    async alterarCuidador(req,res){
        try {
            
            const { cui_cpf, cui_nome, cui_email, cui_cep, cui_senha, cui_tel, esp_id, cui_descri, cui_sexo, cui_data_nasc} = req.body;


            if (!cui_cpf) {
                return res.status(400).send('CPF do cuidador é obrigatório');
            }
            
            if (!cui_nome && !cui_email && !cui_cep && !cui_senha && !cui_tel && !esp_id && !cui_descri && !cui_sexo && !cui_data_nasc) {
                return res.status(400).send('Pelo menos um campo de atualização deve ser fornecido');
            }
            
            
            const resultado = await knex('cuidador')
            .where({ cui_cpf })
            .update({
                cui_nome: cui_nome,
                cui_email: cui_email,
                cui_cep: cui_cep,
                cui_senha: cui_senha,
                cui_tel: cui_tel,
                esp_id: esp_id,
                cui_descri: cui_descri,
                cui_sexo: cui_sexo,
                cui_data_nasc: cui_data_nasc
            });

            return res.status(201).send('Dados alterados com sucesso!')
        } catch (error) {
            console.log(error)
        }
    },
    async deletarCuidador(req,res){
        try {
            const {cui_cpf} = req.body

            await knex('cuidador').where({cui_cpf}).delete()

            return res.status(201).send('Cuidador deletado com sucesso!')
        } catch (error) {
            console.log(error)
        }
    }
    
}
