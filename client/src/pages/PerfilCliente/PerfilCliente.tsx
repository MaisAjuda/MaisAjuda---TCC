import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaUserEdit, FaCog, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PerfilCliente.css";

export function PerfilCliente() {
  return (
    <>
      <Header />
      <Container fluid className="d-flex justify-content-center align-items-center">
        <Row>
          <Col xs={11} sm={9} md={7} lg={5} className="profile-card">
            <div className="profile-image">
              <img src="https://via.placeholder.com/150" alt="Profile" />
            </div>
            <h4 className="profile-name">Priscilla Lopes</h4>
            <p className="profile-description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dignissimos
              suscipit recusandae deserunt dolor consequuntur velit quia, molestias distinctio
              aliquid, tempore fugit voluptas sit eius asperiores quis impedit. Rerum, enim.
            </p>
            <div className="profile-details">
            <h4 className="profile-detail">
            Avaliação: <span>4.5⭐</span>
            </h4>
            <h4 className="profile-detail">
            CEP: <span>99999-999</span>
            </h4>
            <h4 className="profile-detail">
            Email: <span>exemplo@exemplo.com</span>
            </h4>
            <h4 className="profile-detail">
            Senha: <span>senha</span>
            </h4>
            <h4 className="profile-detail">
            Telefone: <span>(99) 99999-9999</span>
            </h4>
            </div>
            <div className="profile-actions">
              <Button variant="link" className="text-light d-flex align-items-center">
                <FaUserEdit className="me-2" />
                Editar Perfil
              </Button>
              <Button variant="link" className="text-light d-flex align-items-center">
                <FaCog className="me-2" />
                Configurar Perfil
              </Button>
              <Button variant="link" className="text-light d-flex align-items-center">
                <FaSignOutAlt className="me-2" />
                Deslogar
              </Button>
              <Button variant="link" className="text-danger d-flex align-items-center">
                <FaTrashAlt className="me-2" />
                Apagar Perfil
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
