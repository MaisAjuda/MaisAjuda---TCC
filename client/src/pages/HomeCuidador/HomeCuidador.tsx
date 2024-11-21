
import './HomeCui.css';
import logo from '../../assets/AJUDA.png';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaHome, FaCommentDots, FaUserAlt, FaBell } from 'react-icons/fa';

interface Caregiver {
  name: string;
  profession: string;
  location: string;
  clientsAttended: number;
  rating: number;
  profileImageUrl: string;
}

interface Notification {
  name: string;
  type: string;
  location: string;
  status: 'accept' | 'reject';
}

const caregiver: Caregiver = {
  name: 'Aline Rodrigues',
  profession: 'Cuidadora de Idosos',
  location: 'Volta Redonda, RJ',
  clientsAttended: 30,
  rating: 5,
  profileImageUrl: 'https://via.placeholder.com/100'
};

const notifications: Notification[] = [
  {
    name: 'Laura Oliveira',
    type: 'Idoso',
    location: 'Volta Redonda, RJ',
    status: 'accept'
  }
];

export function HomeCui() {
  return (
    <>
     
     <header className="header">
      <div className="logo-container">
      <img src={logo} className="logo" alt="logo-mais-ajuda" />
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/home" className="nav-item">
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
            <img src={caregiver.profileImageUrl} alt="Caregiver" className="profile-image" />
            <div className="profile-details">
                <h2>{caregiver.name}</h2>
                <p>{caregiver.profession}</p>
                <p>{caregiver.location}</p>
                <p>Clientes atendidos: {caregiver.clientsAttended}</p>
                <div className="rating">
                {[...Array(caregiver.rating)].map((_, i) => (
                    <FaStar key={i} className="star" />
                ))}
                </div>
                <button className="edit-profile">
                <MdEdit /> Editar perfil
                </button>
            </div>
            </div>
        </div>

        <div className="notifications">
            <h3>Notificações</h3>
            {notifications.map((notif, index) => (
            <div className="notification-card" key={index}>
                <div className="notification-details">
                <p><strong>{notif.name}</strong> - {notif.type}</p>
                <p>{notif.location}</p>
                </div>
                <div className="notification-actions">
                {notif.status === 'accept' ? (
                    <button className="accept">✓</button>
                ) : (
                    <button className="reject">✘</button>
                )}
                </div>
            </div>
            ))}
        </div>

        <div className="testimonials">
            <h3>Depoimentos</h3>
            <div className="testimonial">
            <img src={caregiver.profileImageUrl} alt="Depoimento 1" className="testimonial-image" />
            <img src={caregiver.profileImageUrl} alt="Depoimento 2" className="testimonial-image" />
            <img src={caregiver.profileImageUrl} alt="Depoimento 3" className="testimonial-image" />
            </div>
        </div>
        </div>
    </>
  );
};
