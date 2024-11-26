import React, { useState } from 'react';
import './CadCuid.css';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notyf } from 'notyf';

export function CadCuidador() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [descri, setDescri] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    
    const notyf = new Notyf({
        duration: 3000,
        dismissible: true,
    });

    const nav = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Removendo máscara do CPF e telefone
        const formattedCpf = cpf.replace(/[^\d]/g, ''); // Remove os caracteres que não são dígitos
        const formattedTelefone = telefone.replace(/[^\d]/g, '');

        const cuidadorData = {
            cui_nome: nome,
            cui_senha: senha,
            cui_cpf: formattedCpf,
            cui_tel: formattedTelefone,
            cui_email: email,
            cui_data_nasc: dataNascimento,
            cui_sexo: sexo,
            esp_id: especialidade,
            cui_status: 1, // Valor fixo, pois o setter foi removido
            cui_cep: cep,
            cui_aval: 0, // Valor fixo, pois o setter foi removido
            cui_descri: descri,
            cui_foto_id: '', // Valor fixo, pois o setter foi removido
        };

        try {
            const response = await axios.post('https://maisajuda-tcc-backend.onrender.com/cuidador', cuidadorData);
            notyf.success(response.data.mensagem || 'Cadastrado com sucesso');
            nav('/login-cuidador');
        } catch (error: any) {
            notyf.error(error.response?.data || 'Erro ao cadastrar cuidador');
            console.error('Erro ao cadastrar cuidador:', error);
        }
    };

    return (
        <>
            <header id="header">
                <h1>Torne-se um Cuidador</h1>
            </header>
            <main className="main">
                <form onSubmit={handleSubmit}>
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

                    <label htmlFor="espec" title="Selecione a especialidade que você possui">
                        Especialidade(s)
                    </label>
                    <select
                        className="input-form"
                        name="espec"
                        id="form-espec"
                        required
                        value={especialidade}
                        onChange={(e) => setEspecialidade(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="1">PCD</option>
                        <option value="2">Idoso</option>
                        <option value="3">Pós Operatório</option>
                        <option value="4">Recém nascido</option>
                    </select>

                    <textarea
                        onChange={(e) => setDescri(e.target.value)}
                        className="textarea-field"
                        name="mensagem"
                        placeholder="Escreva a descrição do seu perfil aqui..."
                        rows={10}
                        cols={99}
                    ></textarea>

                    <input className="input-form" type="submit" value="CADASTRAR" />
                    <input
                        className="input-form"
                        type="reset"
                        value="Limpar Campos"
                        onClick={() => {
                            setNome('');
                            setSenha('');
                            setCpf('');
                            setTelefone('');
                            setEmail('');
                            setDataNascimento('');
                            setSexo('');
                            setEspecialidade('');
                            setCep('');
                            setDescri('');
                        }}
                    />
                </form>
            </main>
        </>
    );
}
