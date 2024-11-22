import './HomeCui.css';
import logo from '../../assets/AJUDA.png';
import { FaHome, FaCommentDots, FaUserAlt, FaBell } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import { clearUser } from '../../Slice/UserSlice/UserSlice';
// import { Notification } from '../../types/Notification';
import InputMask from 'react-input-mask';

// const notifications: Notification[] = [
//   {
//     name: 'Laura Oliveira',
//     type: 'Idoso',
//     location: 'Volta Redonda, RJ',
//     status: 'accept'
//   }
// ];

export function HomeCui() {
  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
  });

  const dispatch = useDispatch();
  const { email } = useSelector((state: any) => state.user);
  const nav = useNavigate()

  const [isEditing, setIsEditing] = useState(false);

  const [nome, setNome] = useState('');
  const [emailUser, setEmail] = useState('');
  const [senhaUser, setSenha] = useState('');
  const [tel, setTel] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [especialidade, setEspecialidade] = useState(0);
  const [statusDisponibilidade, setStatusDisponibilidade] = useState(false);
  const [sexo, setSexo] = useState('');
  const [cpf, setCpf] = useState();
  const [dataNascimento, setDataNascimento] = useState('');

  // Função para atualizar o perfil
  async function updatePerfil() {
    try {
      const response = await axios.put(`https://maisajuda-tcc-backend.onrender.com/cuidador`, {
        "cui_nome": nome,
        "cui_cpf": cpf,
        "cui_email": emailUser,
        "cui_senha": senhaUser,
        "cui_tel": tel,
        "cui_descri": descricao,
        "cui_cep": cep,
        "esp_id": especialidade,
        "cui_status": statusDisponibilidade ? 1 : 0,
        "cui_sexo": sexo,
        "cui_data_nasc": dataNascimento,
      });
      console.log(response.data);
      notyf.success("Perfil atualizado com sucesso!");
      setIsEditing(false);  // Fecha o modo de edição
    } catch (error: any) {
      notyf.error("Erro ao atualizar perfil: " + error.message);
    }
  }

  useEffect(() => {
    console.log("Email do Redux:", email);

    const fetchPerfil = async () => {
      if (email) {
        try {
          console.log("Iniciando requisição com o email:", email);
          const response = await axios.get(`https://maisajuda-tcc-backend.onrender.com/cuidador/get-user/${email}`);
          console.log(response.data);
          setNome(response.data.cui_nome);
          setEmail(response.data.cui_email);
          setSenha(response.data.cui_senha);
          setTel(response.data.cui_tel);
          setCpf(response.data.cui_cpf)
          setDescricao(response.data.cui_descri || '');
          setCep(response.data.cui_cep || '');
          setEspecialidade(response.data.esp_id || 0);
          setStatusDisponibilidade(response.data.cui_status === 1);
          setSexo(response.data.cui_sexo || '');
          setDataNascimento(response.data.cui_data_nasc || '');
        } catch (error: any) {
          console.log(error);
          notyf.error("Erro ao carregar perfil: " + error.message);
        }
      } else {
        console.log("Email não encontrado no Redux");
      }
    };

    fetchPerfil();
  }, [email]);

  const deslogar = async () => {
    try {
      dispatch(clearUser());
      notyf.success("Usuário deslogado com sucesso");
    } catch (error: any) {
      notyf.error("Erro ao deslogar: " + error.message);
    }
  };

  async function apagarConta() {
    const confirmacao = window.confirm(
      "Tem certeza de que deseja excluir seu perfil? Esta ação não pode ser desfeita."
    );

    if (confirmacao) {
      try {
        await axios.delete('https://maisajuda-tcc-backend.onrender.com/cliente', {
          data: { cui_cpf: cpf },
        });
        notyf.success("Perfil excluído com sucesso.");
        dispatch(clearUser()); // Limpa o usuário do Redux
        nav("/"); // Redireciona para a página inicial após exclusão
      } catch (error:any) {
        notyf.error("Erro ao excluir perfil: " + error.message);
      }
    }
  }

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} className="logo" alt="logo-mais-ajuda" />
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/" className="nav-item">
                <FaHome />
                <span>Início</span>
              </Link>
            </li>
            <li>
              <Link to="/depoimentos" className="nav-item">
                <FaCommentDots />
                <span>Depoimentos</span>
              </Link>
            </li>
            <li>
              <Link to="/perfil" className="nav-item">
                <FaUserAlt />
                <span>Perfil</span>
              </Link>
            </li>
            <li>
              <Link to="/notificacoes" className="nav-item">
                <FaBell />
                <span>Notificação</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Caregiver" className="profile-image" />
            <div className="profile-details">
              <h2>{nome}</h2>
              <p id='descri'>Descrição: {descricao}</p>
              <p>CEP: {cep}</p>
              <p>Email: {email}</p>
              <p>Telefone: {tel}</p>
              {sexo === "M" && <p>Sexo: Masculino</p>}
              {sexo === "F" && <p>Sexo: Feminino</p>}
              <p>Data de Nascimento: {new Date(dataNascimento).toLocaleDateString()}</p>
              {especialidade === 1 && <p>Especialidade: PCD</p>}
              {especialidade === 2 && <p>Especialidade: Idoso</p>}
              {especialidade === 3 && <p>Especialidade: Pós-Operatório</p>}
              {especialidade === 4 && <p>Especialidade: Recém-Nascido</p>}
              <p>Status: {statusDisponibilidade ? "Disponível" : "Indisponível"}</p>

              <div className="action-buttons">
                <button className="edit-profile" onClick={() => setIsEditing(true)}>
                  <MdEdit /> Editar perfil
                </button>
                <button className="logout" onClick={deslogar}>Deslogar</button>
                <button className="delete-account" onClick={apagarConta}>Apagar Conta</button>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="edit-profile-form">
            <div>
              <label>Nome</label>
              <input type="text" name="cui_nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="cui_email" value={emailUser} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Senha</label>
              <input type="password" name="cui_senha" value={senhaUser} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <div>
              <label>Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                type="tel"
                required
                name="cui_tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            <div>
              <label>Descrição</label>
              <textarea
                name="cui_descri"
                rows={4}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>CEP</label>
              <InputMask
                mask="99999-999"
                type="text"
                required
                name="cui_cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
            <div>
              <label>Sexo</label>
              <select
                name="cui_sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
            <div>
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="cui_data_nasc"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>

            <div>
              <label>Especialidade</label>
              <select
                name="esp_id"
                value={especialidade}
                onChange={(e) => setEspecialidade(parseInt(e.target.value))}
              >
                <option value={1}>PCD</option>
                <option value={2}>Idoso</option>
                <option value={3}>Pós-Operatório</option>
                <option value={4}>Recém-Nascido</option>
              </select>
            </div>
            <div>
              <label>Status</label>
              <input
                type="checkbox"
                name="cui_status"
                checked={statusDisponibilidade}
                onChange={() => setStatusDisponibilidade(!statusDisponibilidade)}
              />
              <span>{statusDisponibilidade ? "Disponível" : "Indisponível"}</span>
            </div>

            <button className="save-changes" onClick={updatePerfil}>Salvar alterações</button>
          </div>
        )}
      </div>
    </>
  );
}
