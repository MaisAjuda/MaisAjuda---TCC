const knex = require("../database");

module.exports = {
    async criarCuidado(req, res) {
        try {
            const { cui_cpf, cli_cpf, cnd_descri, cnd_grau_parent, esp_id } = req.body;

            if (!cui_cpf || !cli_cpf || !cnd_descri || !cnd_grau_parent || !esp_id) {
                return res.status(400).send('Todos os campos devem ser preenchidos');
            }

            await knex('cuidado').insert({
                cui_cpf,
                cli_cpf,
                cnd_descri,
                cnd_grau_parent,
                esp_id
            });

            res.status(201).send('Cuidado registrado');
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    },
    async getCuidados(req,res){
        try {
            const listaCuidados = await knex('cuidado')

            res.status(201).send(listaCuidados);
        } catch (error) {
            console.log(error)
        }
    },
    async alterarCuidado(req, res) {
        try {
            const { cnd_id,cui_cpf, cli_cpf, cnd_descri, cnd_grau_parent, esp_id } = req.body;

            if (!cnd_id) {
                return res.status(400).send('O id do cuidado é obrigatório');
            }

            const result = await knex('cuidado')
                .where({ cnd_id })  
                .update({
                    cui_cpf,
                    cnd_descri,
                    cnd_grau_parent,
                    esp_id
                });

            if (result === 0) {
                return res.status(404).send('Cuidado não encontrado');
            }

            res.status(200).send('Cuidado atualizado com sucesso');
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    }, 
    async deleteCuidado(req,res){
        try {
            const { cnd_id } = req.body

            if(!cnd_id){
                res.send("O id do cuidado é necessário para completar a ação")
            }

            await knex('cuidado').delete()

            res.status(200).send('cuidado deletado com sucesso')
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    }
};
