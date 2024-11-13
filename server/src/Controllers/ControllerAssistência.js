const db  = require("../database");

module.exports = {
    async criarAssistencia(req,res){
        try {
            const { ass_data_fim, not_id } = req.body

            if (ass_data_fim) {
                console.log("data fim existe");
    
            
                let dataInicioObj = new Date();
                let dataFimObj = new Date(ass_data_fim);
    
                
                let formattedDateInicio = dataInicioObj.getDate().toString().padStart(2, '0') + '/' +
                    (dataInicioObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
                    dataInicioObj.getFullYear();
                console.log("Data de Início: ", formattedDateInicio);
    
                if (dataFimObj < dataInicioObj) {
                    console.log('A data de término é menor que a data de início');
                    return res.status(400).send("A data de fim não pode ser menor que a data de início.");
                }
            }

            if(!ass_data_fim || !not_id){
                return res.status(400).send("Preencha todos os campos")
            }
            
                        let notify = await db ('notificacao').where({ not_id  })
                        if(!notify || notify.length == 0){
                            return res.status(400).send("Notificação não encontrada")
                        }
            

            await db ('assistencia').insert({
                ass_data_fim: ass_data_fim,
                not_id: not_id
            })

            res.status(201).send('Assistencia registrada!')
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    },
    async getAssistencia(req,res){
        try {
        
            const listaAssistencia = await db ('assistencia')

            res.status(200).send(listaAssistencia)
            

        } catch (error) {
            console.log(error)
        }
    },

    async alterarAssistencia(req, res) {
        try {
            const { ass_id, ass_data_fim, cui_cpf, cli_cpf, cnd_id } = req.body;
    
            if (!ass_id) {
                return res.status(400).send("O ID da Assistência é obrigatório");
            }
    
            if (!ass_data_fim && !cui_cpf && !cli_cpf && !cnd_id) {
                return res.status(400).send("Preencha no mínimo um dos campos");
            }
    
            
            let dataInicioResult = await db ('assistencia')
                .select("ass_data_inicio")
                .where({ ass_id });
    
            console.log(dataInicioResult)
            if (!dataInicioResult || dataInicioResult.length === 0) {
                return res.status(404).send("Assistência não encontrada.");
            }
    
            let data_incio = dataInicioResult[0].ass_data_inicio;
    
            
            if (ass_data_fim) {
                console.log("data fim existe");
    
            
                let dataInicioObj = new Date(data_incio);
                let dataFimObj = new Date(ass_data_fim);
    
                
                let formattedDateInicio = dataInicioObj.getDate().toString().padStart(2, '0') + '/' +
                    (dataInicioObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
                    dataInicioObj.getFullYear();
                console.log("Data de Início: ", formattedDateInicio);
    
                if (dataFimObj < dataInicioObj) {
                    console.log('A data de término é menor que a data de início');
                    return res.status(400).send("A data de fim não pode ser menor que a data de início.");
                }
            }
    
            
            await db ('assistencia')
                .where({ ass_id: ass_id })
                .update({
                    ass_data_fim: ass_data_fim,
                    cui_cpf: cui_cpf,
                    cli_cpf: cli_cpf,
                    cnd_id: cnd_id
                });
    
            res.status(200).send('Assistência atualizada com sucesso!');
        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    },

    async deletarAssistencia(req,res){
        try {
            const {ass_id} = req.body

            if(!ass_id){
                return res.status(400).send("ID da assistência não informado.");
            }

            await db ('assistencia').where({ass_id}).delete()

            res.status(200).send('Assistencia deletada com sucesso!');

        } catch (error) {
            return res.status(500).json({
                error: "Erro",
                msg: error
            });
        }
    }
}
