import './HomeCliente.css';
import { Header } from '../../components/Header/Header';
import idosa_com_cuidadora from '../../assets/idosa-com-cuidadora.png';
import { Footer } from '../../components/Footer/Footer';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import espSlice from '../../Slice/espSlice/espSlice';

// Tipagem para o botão de tipo de cuidado
interface CareTypeButtonProps {
  label: string;
}

// Componente de botão de tipo de cuidado
const CareTypeButton: React.FC<CareTypeButtonProps> = ({ label }) => {
  return <button className="care-type-button">{label}</button>;
};

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
      <div className="provider-icon"><img src={source} alt="" /></div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{avalation}</p>
      </div>
    </div>
  );
};

export function HomeCliente() {
  const [loading, setLoading] = useState(true);
  const { tipo, email, senha } = useSelector((state: RootState) => state.user);
  const { esp_code } = useSelector((state: RootState) => state.esp);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [responseData, setResponseData] = useState<any[]>([]); // Estado para armazenar os dados dos cuidadores

  useEffect(() => {
    // Função de verificação de estado de login
    async function verifyState() {
      if (!email || !senha || tipo === 'cuidador') {
        nav('/login-selecao');
      }
    }

    verifyState(); // Chama a função de verificação ao carregar o componente

    // Função para obter cuidadores
    async function getCuidadores() {
      try {
        const response = await axios.get('http://localhost:3344/cuidador');
        setResponseData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    getCuidadores(); // Chama a função para obter cuidadores quando o componente é montado
  }, [email, senha, tipo, esp_code, nav]); // Dependências para garantir que o efeito só seja chamado quando os dados do usuário mudarem

  console.log({ tipo, email, senha });

  return (
    <>
      <Header />
      <div className="app-container">
        <aside className="sidebar">
          <img src={idosa_com_cuidadora} id="img-idosa-com-cuidadora" alt="idosa-com-cuidadora" />
          <h2 id="h2-cuidado">Qual cuidado você procura?</h2>
          <CareTypeButton label="PCD" />
          <CareTypeButton label="Idosos" />
          <CareTypeButton label="Pós-Operatório" />
          <CareTypeButton label="Recém Nascidos" />
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
            responseData.length > 0 && responseData.map((data) => {
              // Verifique se os dados e as propriedades existem
              if (data && data.cui_status !== undefined) {
                if (esp_code > 0) {
                  if (data.cui_status === 1 && esp_code === data.esp_id) {
                    return (
                      <CareProviderCard
                        key={data.cui_cpf} // Adiciona uma chave única para o componente
                        source={data.img}
                        name={data.cui_nome}
                        description={data.cui_descri}
                        avalation={data.cui_aval}
                      />
                    );
                  }
                } else if (esp_code === 0) {
                  if (data.cui_status === 1) {
                    return (
                      <CareProviderCard
                        key={data.cui_cpf} // Adiciona uma chave única para o componente
                        source={data.img}
                        name={data.cui_nome}
                        description={data.cui_descri}
                        avalation={data.cui_aval}
                      />
                    );
                  }
                }
              }
              return null; // Retorna null caso nada seja renderizado
            })
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
