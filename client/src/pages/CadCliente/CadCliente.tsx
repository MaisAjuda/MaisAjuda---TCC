import { useState } from 'react';
import axios from 'axios';
import './CadCli.css';
import InputMask from 'react-input-mask';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';

export function CadCliente() {
    // Estados para armazenar os valores dos inputs
    const [nome, setNome] = useState('');
    const nav = useNavigate();
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [photoId] = useState(''); // Mantém o valor padrão diretamente
    const notyf = new Notyf({
        duration: 3000,
        dismissible: true,
    });

    // Função de envio
    async function Cadastrar() {
        const clienteData = {
            cli_nome: nome,
            cli_senha: senha,
            cli_cpf: cpf.replace(/[^\d]/g, ''), // Remove máscara do CPF
            cli_cep: cep.replace(/[^\d]/g, ''), // Remove máscara do CEP
            cli_tel: telefone.replace(/[^\d]/g, ''), // Remove máscara do telefone
            cli_email: email,
            cli_data_nasc: dataNascimento,
            cli_sexo: sexo,
            cli_photo_id: photoId,
        };

        try {
            const response = await axios.post('https://maisajuda-tcc-backend.onrender.com/cliente', clienteData);
            notyf.success(response.data.mensagem || 'Cadastrado com sucesso');
            nav('/login-cliente');
        } catch (error: any) {
            notyf.error(error.response?.data || 'Erro ao cadastrar cliente');
            console.error('Erro ao cadastrar cliente:', error);
        }
    }

    return (
        <>
            <header id="headerCli">
                <h1>Cadastro de Cliente</h1>
            </header>
            <main className="mainCLi">
                <form
                    className="formCli"
                    onSubmit={(e) => {
                        e.preventDefault();
                        Cadastrar();
                    }}
                >
                    <label htmlFor="name">Nome Completo</label>
                    <input
                        className="input-form"
                        type="text"
                        name="name"
                        id="form-name"
                        title="Digite seu nome completo"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <label htmlFor="Senha">Senha</label>
                    <input
                        className="input-form"
                        type="password"
                        name="senha"
                        id="form-senha"
                        title="Digite sua senha"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <label htmlFor="CPF">CPF</label>
                    <InputMask
                        className="input-form"
                        mask="999.999.999-99"
                        type="text"
                        name="cpf"
                        id="form-cpf"
                        title="Digite um CPF no formato: xxx.xxx.xxx-xx"
                        required
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />

                    <label htmlFor="CEP">CEP</label>
                    <InputMask
                        className="input-form"
                        mask="99999-999"
                        type="text"
                        name="cep"
                        id="form-cep"
                        title="Digite um CEP no formato: xxxxx-xxx"
                        required
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />

                    <label htmlFor="tel">Telefone</label>
                    <InputMask
                        className="input-form"
                        mask="(99) 99999-9999"
                        type="tel"
                        title="Digite seu número de telefone"
                        name="tel"
                        id="form-tel"
                        required
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />

                    <label htmlFor="Email">Email</label>
                    <input
                        className="input-form"
                        type="email"
                        title="Digite seu email"
                        name="email"
                        id="form-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="date">Data de Nascimento</label>
                    <input
                        className="input-form"
                        type="date"
                        title="Digite sua data de nascimento"
                        name="date"
                        id="form-date"
                        required
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />

                    <label htmlFor="sexo">Sexo</label>
                    <select
                        className="input-form"
                        name="sexo"
                        id="sexo"
                        required
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>

                    <input className="input-form" type="submit" value="CADASTRAR" />
                    <input
                        className="input-form"
                        type="reset"
                        value="Limpar Campos"
                        onClick={() => {
                            setNome('');
                            setSenha('');
                            setCpf('');
                            setCep('');
                            setTelefone('');
                            setEmail('');
                            setDataNascimento('');
                            setSexo('');
                        }}
                    />
                </form>
            </main>
        </>
    );
}
