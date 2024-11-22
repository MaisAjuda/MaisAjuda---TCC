import './Contato.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import InputMask from 'react-input-mask';

export function Contato() {
    return (
        <>
            <Header />
            <div className="contact-container">
                <h1 className='contact-title'>Está com dúvida? <br /> Então mande um E-mail</h1>
                <p className='contact-description'>
                    É muito simples, preencha o formulário abaixo, sem <br />
                    compromisso, e nossa equipe fará contato com você.
                </p>
                <form className='contact-form'>
                    <input type="text" placeholder="Nome..." className="input-field" />
                    <input type="email" placeholder="Email..." className="input-field" />
                    <InputMask
                        className="input-field"
                        mask="999.999.999-99"
                        type="text"
                        name="cpf"
                        placeholder="CPF..."
                        required
                    />
                    <InputMask
                        className="input-field"
                        mask="(99) 99999-9999"
                        type="tel"
                        name="telefone"
                        placeholder="Telefone..."
                        required
                    />
                    <InputMask
                        className="input-field"
                        mask="99999-999"
                        type="text"
                        name="cep"
                        placeholder="CEP..."
                        required
                    />
                    <textarea
                        className="textarea-field"
                        name="mensagem"
                        placeholder="Escreva sua mensagem aqui..."
                        rows={4}
                    ></textarea>
                    <button type="submit" className="submit-button">Enviar</button>
                </form>
            </div>
            <Footer />
        </>
    );
}
