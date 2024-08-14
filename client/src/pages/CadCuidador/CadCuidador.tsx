import './CadCuid.css';
import InputMask from 'react-input-mask';

export function CadCuidador() {
    return(
        <>
            <header>
                <h1>Torne-se um Cuidador</h1>
            </header>
            <main className='main'>
                <form>
                    <label htmlFor="name">Nome Completo</label>
                    <input className="input-form" type="text" name="name" id="form-name" title='Digite seu nome completo' required />

                    <label htmlFor="Senha">Senha</label>
                    <input className="input-form" type="password" name="senha" id="form-senha" title='Digite sua senha' required />

                    <label htmlFor="CPF">CPF</label>
                    <InputMask
                        className="input-form"
                        mask="999.999.999-99"
                        type="text"
                        name="cpf"
                        id="form-cpf"
                        title="Digite um CPF no formato: xxx.xxx.xxx-xx"
                        required
                    />

                    <label htmlFor="tel">Telefone</label>
                    <InputMask
                        className="input-form"
                        mask="(99) 99999-9999"
                        type="tel"
                        title='Digite seu número de telefone'
                        name="tel"
                        id="form-tel"
                        required
                    />

                    <label htmlFor="Email">Email</label>
                    <input className="input-form" type="email" title='Digite seu email' name="email" id="form-email" />

                    <label htmlFor="date">Data de Nascimento</label>
                    <input className="input-form" type="date" title='Digite sua data de nascimento' name="date" id="form-date" required />

                    <label htmlFor="sexo">Sexo</label>
                    <select className="input-form" name="sexo" id="sexo" required>
                        <option value=""></option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                    </select>

                    <label htmlFor="espec" title='Selecione a especialidade que você possui'>Especialidade(s)</label>
                    <select className="input-form" name="espec" id="form-espec" required>
                        <option value="PCD">PCD</option>
                        <option value="Idoso">Idoso</option>
                        <option value="pos_operatório">Pós Operatório</option>
                        <option value="recem-nascido">Recém nascido</option>
                    </select>
                    <input className='input-form' type="submit" value="CADASTRAR" />
                    <input className='input-form' type="reset" value="Limpar Campos" />
                </form>
            </main>
        </>
    );
}
