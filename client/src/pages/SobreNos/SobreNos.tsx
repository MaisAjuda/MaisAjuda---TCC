    import './SobreNos.css';
    import idosos from '../../assets/idosos21.jpg';
    import bebe from '../../assets/bebezinha.jpg';
    import pcd from '../../assets/pcd.jpg';
    import pos from '../../assets/pos.jpg';
    import { Footer } from '../../components/Footer/Footer';
    import { Header } from '../../components/Header/Header';

    export function SobreNos() {
        return (
            <>
                <Header />
                <main id="main-sobre-nos">
                    <section id="sobre-nos-section">
                        <h1 className="titulo">Sobre nós</h1>
                        <p className="descricao">
                            Somos uma plataforma que conecta de forma segura e eficiente familiares a cuidadores de pessoas dependentes
                            facilitando o acesso mútuo.
                        </p>
                    </section>

                    <section id="nossos-cuidados-section">
                        <h2 className="titulo">Nossos Cuidados</h2>
                        <div id="categorias-container">
                            <button className="categoria-botao">PCD</button>
                            <button className="categoria-botao">Pós-operatório</button>
                            <button className="categoria-botao">Idosos</button>
                            <button className="categoria-botao">Recém-nascidos</button>
                        </div>
                        <div id="cuidados-container">
                            <div className="card">
                                <img src={pcd} alt="PCD" className="card-img" />
                                <p className="card-title">PCD</p>
                            </div>
                            <div className="card">
                                <img src={pos} alt="Pós-operatório" className="card-img" />
                                <p className="card-title">Pós-operatório</p>
                            </div>
                            <div className="card">
                                <img src={idosos} alt="Idosos" className="card-img" />
                                <p className="card-title">Idosos</p>
                            </div>
                            <div className="card">
                                <img src={bebe} alt="Recém-nascidos" className="card-img" />
                                <p className="card-title">Recém-nascidos</p>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }
