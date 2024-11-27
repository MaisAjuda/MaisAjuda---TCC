import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaUserEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PerfilCliente.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Notyf } from "notyf";
import { clearUser } from "../../Slice/UserSlice/UserSlice"; // Certifique-se que clearUser está configurado corretamente
import { useNavigate } from "react-router-dom";

export function PerfilCliente() {
  const dispatch = useDispatch(); // Usar dispatch para despachar ações do Redux
  const nav = useNavigate();

  const { email, senha } = useSelector((state: any) => state.user);

  const [nome, setNome] = useState('');
  const [emailUser, setEmail] = useState('');
  const [senhaUser, setSenha] = useState('');
  const [tel, setTel] = useState('');
  
  const [perfil, setPerfil] = useState<any>(null); // Estado para armazenar o perfil
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar a edição
  const [newPerfil, setNewPerfil] = useState<any>({}); // Estado para armazenar os dados editados
  const notyf = new Notyf({
    duration: 3000,
    dismissible: true,
  });

  async function getPerfil() {
    try {
      const response = await axios.get(
        `https://maisajuda-tcc-backend.onrender.com/cliente/get-user/${email}`
      );
      setPerfil(response.data); // Armazena os dados no estado
      setNewPerfil(response.data); // Inicializa os dados de edição
      setNome(response.data.cli_nome); // Inicializa o nome no estado
      setEmail(response.data.cli_email); // Inicializa o email no estado
      setSenha(response.data.cli_senha); // Inicializa a senha no estado
      setTel(response.data.cli_tel); // Inicializa o telefone no estado
    } catch (error: any) {
      notyf.error("Erro ao carregar perfil: " + error.message);
    }
  }

  useEffect(() => {
    if (email) {
      getPerfil(); // Chama a função para buscar os dados
    }
  }, [email]);

  // Função para lidar com a mudança dos campos editáveis
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cli_nome') {
      setNome(value);
    } else if (name === 'cli_email') {
      setEmail(value);
    } else if (name === 'cli_senha') {
      setSenha(value);
    } else if (name === 'cli_tel') {
      setTel(value);
    }

    setNewPerfil({
      ...newPerfil,
      [name]: value,
    });
  };

  // Função para salvar as alterações
  const saveChanges = async () => {
    try {
      await axios.put('https://maisajuda-tcc-backend.onrender.com/cliente', {
        cli_cpf: perfil.cli_cpf,
        cli_nome: nome,
        cli_email: emailUser,
        cli_senha: senhaUser,
        cli_tel: tel
      })
      notyf.success("Perfil atualizado com sucesso!");
      setIsEditing(false); // Sai do modo de edição
      setPerfil(newPerfil); // Atualiza o perfil com as novas informações
    } catch (error: any) {
      notyf.error("Erro ao salvar perfil: " + error.message);
    }
  };

  // Função de logout corrigida
  async function deslogar() {
    try {
      console.log("Logout iniciado", email, senha);
      dispatch(clearUser());  // Despachar a ação para limpar o estado do usuário
      console.log("Usuário deslogado com sucesso");
      setIsEditing(false); // Garante que o modo de edição seja fechado
      nav('/'); // Redireciona para a página inicial ou login
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }

  // Função para deletar o perfil com confirmação
  async function deletarPerfil() {
    const confirmacao = window.confirm(
      "Tem certeza de que deseja excluir seu perfil? Esta ação não pode ser desfeita."
    );

    if (confirmacao) {
      try {
        await axios.delete('https://maisajuda-tcc-backend.onrender.com/cliente', {
          data: { cli_cpf: perfil.cli_cpf },
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
      <Header />
      <Container fluid className="d-flex justify-content-center align-items-center">
        <Row>
          <Col xs={11} sm={9} md={7} lg={5} className="profile-card">
            {perfil ? (
              <>
                <div className="profile-image">
                  <img
                    className="photo"
                    src={perfil.cli_foto_id || "/assets/default-user-DF_hG8Cl.png"}
                    alt="Profile"
                  />
                </div>
                <h4 className="profile-name">{perfil.cli_nome}</h4>
                <div className="profile-details">
                  <h4 className="profile-detail">
                    CEP:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="cli_cep"
                        value={newPerfil.cli_cep}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      <span>{perfil.cli_cep}</span>
                    )}
                  </h4>
                  <h4 className="profile-detail">
                    Nome:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="cli_nome"
                        value={nome}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      <span>{perfil.cli_nome}</span>
                    )}
                  </h4>
                  <h4 className="profile-detail">
                    Email:{" "}
                    {isEditing ? (
                      <input
                        type="email"
                        name="cli_email"
                        value={emailUser}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      <span>{perfil.cli_email}</span>
                    )}
                  </h4>
                  <h4 className="profile-detail">
                    Senha:{" "}

                    {isEditing ? (
                      <input
                        type="password"
                        name="cli_senha"
                        value={senhaUser || senha}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      <span>{senha}</span>
                    )}
                  </h4>
                  <h4 className="profile-detail">
                    Telefone:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="cli_tel"
                        value={tel}
                        onChange={handleFieldChange}
                      />
                    ) : (
                      <span>{perfil.cli_tel}</span>
                    )}
                  </h4>
                </div>
              </>
            ) : (
              <p>Carregando perfil...</p>
            )}
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <Button onClick={saveChanges} variant="success" className="me-2">
                    Salvar Alterações
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="secondary"
                    className="me-2"
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="link"
                    className="text-light d-flex align-items-center"
                  >
                    <FaUserEdit className="me-2" />
                    Editar Perfil
                  </Button>
                  <Button onClick={deslogar} variant="link" className="text-light d-flex align-items-center">
                    <FaSignOutAlt className="me-2" />
                    Deslogar
                  </Button>
                  <Button 
                    onClick={deletarPerfil} 
                    variant="link" 
                    className="text-danger d-flex align-items-center"
                  >
                    <FaTrashAlt className="me-2" />
                    Apagar Perfil
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
