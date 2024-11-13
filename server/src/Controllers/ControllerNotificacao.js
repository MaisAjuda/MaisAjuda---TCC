
const db = require('../database');

module.exports = {
    async createNotify(req, res){
        try {
            const { cui_cpf, cli_cpf, cnd_id, not_status, not_status_leitura } = req.body;
        
            console.log("cui_cpf:", cui_cpf, "\ncli_cpf:", cli_cpf, "\ncnd_id:", cnd_id, "\nnot_status:", not_status, "\nnot_status_leitura:", not_status_leitura);
        
            if (!cui_cpf || !cli_cpf || !cnd_id || not_status === undefined || not_status_leitura === undefined) {
                return res.status(400).json({ error: "Preencha todos os campos" });
            }
        
            if (typeof cnd_id !== "number") {
                return res.status(400).send("Os campos estão inválidos, verifique se a tipagem dos dados está correta");
            }
        
            let cpf_cuidador = await db('cuidador').where({ cui_cpf });
            let cpf_cliente = await db('cliente').where({ cli_cpf });
            let id_cuidado = await db('cuidado').where({ cnd_id });
            let cli_cpf_cnd = await db('cuidado').where({ cnd_id }).select('cli_cpf');

        
            if(cli_cpf_cnd[0].cli_cpf != cli_cpf){
                return res.status(400).send("O CPF do cliente informado não corresponde ao CPF registrado no cuidado");
            }

            if (!cpf_cliente || cpf_cliente.length === 0) {
                return res.status(400).send("Cpf do cliente não encontrado");
            }
        
            if (!cpf_cuidador || cpf_cuidador.length === 0) {
                return res.status(400).send("Cpf do cuidador não encontrado");
            }
        
            if (!id_cuidado || id_cuidado.length === 0) {
                return res.status(400).send("Id do cuidado não encontrado");
            }
        
            const notify = await db('notificacao')
                .insert({
                    cui_cpf, 
                    cli_cpf, 
                    cnd_id, 
                    not_status, 
                    not_status_leitura
                })
                .returning('*');
        
            return res.status(200).send("Notificação criada com sucesso");
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao enviar notificação",
                msg: error
            });
        }        
    },
    async getNotify(req, res){
        try {

            const notify = await db('notificacao')

            return res.status(200).send(notify)
        } catch(error) {
            console.error('Erro ao enviar notificação:', error)
            return res.status(500).json({
                error: "Erro ao enviar notificação",
                msg: error
            })
        }
    },
    async alterarNotificacao(req, res) {
        try {
            const { not_id, cui_cpf, cli_cpf, cnd_id, not_status, not_status_leitura } = req.body;
    
            if (!not_id) {
                return res.status(400).send('A ID da notificação é obrigatória');
            }
    
            if (!cui_cpf && !cli_cpf && !cnd_id && not_status === undefined && not_status_leitura === undefined) {
                return res.status(400).json({ error: "Preencha pelo menos um campo" });
            }
    
            if (cui_cpf) {
                const verifyCPF = await db('cuidador').where({ cui_cpf });  // Nome da tabela corrigido
                if (verifyCPF.length == 0) {
                    return res.status(400).json({ error: "O cuidador com o CPF informado não existe" });
                }
            }
    
            if (cli_cpf) {
                const verifyCPF = await db('cliente').where({ cli_cpf });
                if (verifyCPF.length == 0) {
                    return res.status(400).json({ error: "O cliente com o CPF informado não existe" });
                }
            }
    
            if (cnd_id) {
                const cli_cpf_cnd = await db('cuidado').where({ cnd_id }).select('cli_cpf');
                if (cli_cpf_cnd.length > 0 && cli_cpf_cnd[0].cli_cpf != cli_cpf) {
                    return res.status(400).send("O CPF do cliente informado não corresponde ao CPF registrado no cuidado");
                }
            }
    
            const alterNotify = await db('notificacao').where({ not_id }).update({
                cui_cpf: cui_cpf,
                cli_cpf: cli_cpf,
                cnd_id: cnd_id,
                not_status: not_status,
                not_status_leitura: not_status_leitura
            });
    
            return res.status(200).send("Notificação foi alterada com sucesso!");
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao enviar notificação",
                msg: error
            });
        }
    },    
    async deletarNotificação(req,res){
        try {
            const {not_id} = req.body

            const deleteNot = await db('notificacao').where({not_id}).delete()

            return res.status(200).send("Notificação deletada com sucesso")
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao enviar notificação",
                msg: error
            })
        }
    }
}
