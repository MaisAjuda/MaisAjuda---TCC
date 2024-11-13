const db = require("../database"); 
const bycrypt = require('bcrypt');
const { validaCPF } = require('../modules/verificarCPF')

module.exports = {
    async loginCuidador(req,res){
        try {
            const { cui_email, cui_senha  } = req.body

            if (!cui_email || !cui_senha) {
                return res.status(400).send('Email e senha são obrigatórios');
            }

            const cuidador = await db('cuidador')
                .where({ cui_email })
                .first();

            if (!cuidador) {
                return res.status(404).send('cuidador não encontrado');
            }



            const senhaCorreta = await bycrypt.compare(cui_senha, cuidador.cui_senha);

            if (!senhaCorreta) {
                return res.status(401).send('Senha incorreta');
            }

            return res.status(200).json({
                mensagem: 'Login realizado com sucesso',
                cuidador: {
                    cui_cpf: cuidador.ci_cpf,
                    cui_nome: cuidador.ci_nome,
                    cui_email: cuidador.cui_email
                }
            });
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
            console.log(error);
        }
    },
    async getCuidador(req, res) {
        try {
            const listCuids = await db('cuidador').select('*');
            
            if (!listCuids || listCuids.length === 0) {
                return res.status(404).json({
                    message: "Nenhum cuidador encontrado"
                });
            }

            return res.status(200).json(listCuids);

        } catch (error) {
            console.error('Erro ao buscar cuidadores:', error);
            return res.status(500).json({
                error: "Erro interno do servidor",
                message: error.message
            });
        }
    },
    async criarCuidador(req, res) {
        try {
            const {
                cui_cpf, cui_nome, cui_email, cui_cep, cui_senha, cui_tel, 
                esp_id, cui_descri, cui_sexo, cui_data_nasc
            } = req.body;
    
            if (!cui_cpf || !cui_nome || !cui_email || !cui_cep || 
                !cui_senha || !cui_tel || !esp_id || !cui_descri || 
                !cui_sexo || !cui_data_nasc) {
                return res.status(400).send('Todos os campos devem ser preenchidos');
            }
            if (!validaCPF(cui_cpf)) {
                return res.status(400).send("CPF inválido");
            }
    
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cui_cep}/json/`);
                const data = await response.json();
                if (data.erro) {
                    return res.status(400).send('CEP não encontrado');
                }
            } catch (error) {
                return res.status(500).send('Erro ao consultar o CEP');
            }
    
            const verificarEmail = await db('cuidador').where({ cui_email }).first();
            const verificarCPF = await db('cuidador').where({ cui_cpf }).first();
    
            if (verificarEmail || verificarCPF) {
                return res.status(400).send('CPF ou Email já existente');
            }
    
            const cui_senha_encrypt = await bycrypt.hash(cui_senha, 10);
    
            await db('cuidador').insert({
                cui_cpf: cui_cpf,
                esp_id: esp_id,
                cui_nome: cui_nome,
                cui_email: cui_email,
                cui_descri: cui_descri,
                cui_senha: cui_senha_encrypt,
                cui_sexo: cui_sexo,
                cui_data_nasc: cui_data_nasc,
                cui_tel: cui_tel,
                cui_cep: cui_cep
            });
    
            return res.status(201).send('Cuidador criado com sucesso!');
    
        } catch (error) {
            console.error("Erro ao criar cuidador:", error);
            return res.status(500).json({
                error: "Erro ao criar cuidador",
                msg: error.message
            });
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
            
            
            const resultado = await db('cuidador')
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
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    },
    async deletarCuidador(req,res){
        try {
            const {cui_cpf} = req.body

            await db('cuidador').where({cui_cpf}).delete()

            return res.status(201).send('Cuidador deletado com sucesso!')
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    }
    
}
