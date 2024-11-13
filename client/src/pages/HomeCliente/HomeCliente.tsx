import './HomeCliente.css'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'
const CareTypeButton = ({ label }) => {
  return <button className="care-type-button">{label}</button>;
};
const CareProviderCard = ({ name, description }) => {
    return (
      <div className="care-provider-card">
        <div className="provider-icon">{}</div>
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  };
  


export function HomeCliente(){
    return(
        <>
            <Header></Header>
            <div className="app-container">
            <aside className="sidebar">
                <h2>Qual cuidado você procura?</h2>
                <CareTypeButton label="PCD" />
                <CareTypeButton label="Idosos" />
                <CareTypeButton label="Pós-Operatório" />
                <CareTypeButton label="Recém Nascidos" />
            </aside>
            
            <main className="main-content">
                <div className="location-selector">
                <button>Alterar local desejado</button> <span>📍</span>
                </div>
                
                <CareProviderCard 
                name="Aurélio Pinto" 
                description="Meu nome é Aurélio, tenho 34 anos e sou formado como enfermeiro pela Universidade X e tenho y anos de experiência como cuidador de idosos."
                />
                <CareProviderCard 
                name="Aurélio Pinto" 
                description="Meu nome é Aurélio, tenho 34 anos e sou formado como enfermeiro pela Universidade X e tenho y anos de experiência como cuidador de idosos."
                />
                <CareProviderCard 
                name="Aurélio Pinto" 
                description="Meu nome é Aurélio, tenho 34 anos e sou formado como enfermeiro pela Universidade X e tenho y anos de experiência como cuidador de idosos."
                />
            </main>
            </div>
            <Footer></Footer>
        </>
    )
}