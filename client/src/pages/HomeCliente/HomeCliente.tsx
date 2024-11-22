import './HomeCliente.css';
import { Header } from '../../components/Header/Header';
import idosa_com_cuidadora from '../../assets/idosa-com-cuidadora.png';
import default_user from '../../assets/default-user.png';
import { Footer } from '../../components/Footer/Footer';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ReactLoading from 'react-loading';
import { ModalCliente } from '../../components/ModalCliente/ModalCliente';
import { setEspCode } from '../../Slice/espSlice/espSlice';

// Tipagem para o botão de tipo de cuidado
interface CareTypeButtonProps {
  label: string;
  espId: number;
}



// Componente de botão de tipo de cuidado


// Tipagem para o card do provedor de cuidado
interface CareProviderCardProps {
  name: string;
  description: string;
  source: string;
  avalation: number;
}

// Componente de card do provedor de cuidado
const CareProviderCard: React.FC<CareProviderCardProps> = ({ name, description, source, avalation }) => {
  return (
    <div className="care-provider-card">
      <div className="provider-icon"><img id="user-img" src={source || default_user} alt="" /></div>
      <div>
        <h3>{name}</h3>
        <p id="descri">{description}</p>
        <p>{avalation}</p>
      </div>
      <ModalCliente />
    </div>
  );
};

export function HomeCliente() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const { esp_code } = useSelector((state: RootState) => state.esp);
  const [responseData, setResponseData] = useState<any[]>([]); // Estado para armazenar os dados dos cuidadores
  const CareTypeButton: React.FC<CareTypeButtonProps> = ({ label, espId }) => {
    return <button className="care-type-button" onClick={() => dispatch(setEspCode(espId)) }>{label}</button>;
  };

  // Função para obter cuidadores
  async function getCuidadores() {
    try {
      const response = await axios.get('https://maisajuda-tcc-backend.onrender.com/cuidador');
      setResponseData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }


  useEffect(() => {
    getCuidadores(); // Chama a função para obter cuidadores quando o componente é montado
  }, []); // O efeito roda uma vez após o componente ser montado

  // Função para filtrar cuidadores de acordo com o esp_code
  const filteredCuidadores = responseData.filter((data) => {
    return esp_code === 0 || data.esp_id === esp_code; // Filtra pelos cuidadores que correspondem ao esp_id
  });

  return (
    <>
      <Header />
      <div className="app-container">
        <aside className="sidebar">
          <img src={idosa_com_cuidadora} id="img-idosa-com-cuidadora" alt="idosa-com-cuidadora" />
          <h2 id="h2-cuidado">Qual cuidado você procura?</h2>
          <CareTypeButton label="PCD" espId={1} />
          <CareTypeButton label="Idosos" espId={2} />
          <CareTypeButton label="Pós-Operatório" espId={3} />
          <CareTypeButton label="Recém Nascidos" espId={4} />
        </aside>

        <main className="main-content">
          <div className="location-selector">
            <InputMask
              className="input-cep"
              mask="99999-999"
              type="text"
              name="cep"
              id="inp-cep-home-cliente"
              title="Digite um CEP no formato: xxxxx-xxx"
              placeholder="Digite um CEP no formato: xxxxx-xxx"
              required
            />
            <span>📍</span>
          </div>

          {/* Renderiza cards de cuidadores */}
          {loading ? (
            <center><ReactLoading type={'bars'} color={"#3CA6A6"} height={667} width={375} /></center>
          ) : (
            // Verifica se existem cuidadores após filtragem
            filteredCuidadores.length > 0 ? (
              filteredCuidadores.map((data) => (
                <CareProviderCard
                  key={data.cui_cpf} // Adiciona uma chave única para o componente
                  source={data.img}
                  name={data.cui_nome}
                  description={data.cui_descri}
                  avalation={data.cui_aval}
                />
              ))
            ) : (
              <div>
                <h2>Não há cuidadores disponíveis para essa especialidade</h2>
              </div>
            )
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
