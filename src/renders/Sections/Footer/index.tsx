import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { siteContent } from '../../../moocks/content';
import logoPsi from '../../../assets/logo_psi_000.png'; // Ajuste a extensão se for .jpg ou .npg
import './styles.css';

const Footer: React.FC = () => {
  const { global, nav } = siteContent;
  const navigate = useNavigate();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img 
              src={logoPsi} 
              alt="Dra. Paula T. Pacheco Logo" 
              className="footer-logo"
            />
            <p className="footer-bio">
              Psiquiatria com Ciência e Alma. Tratamento humanizado para o seu bem-estar mental e emocional.
            </p>
          </div>

          <div className="footer-links">
            <h4>Navegação</h4>
            <ul>
              {/* Tipagem correta para o link e idx eliminando o erro "any" */}
              {nav.links.map((link: { label: string; href: string }, idx: number) => (
                <li key={idx}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contato</h4>
            <ul>
              <li>CRM: {global.crm}</li>
              <li>E-mail: {global.email}</li>
              <li>WhatsApp: {global.whatsappNumber}</li>
              <li>Endereço: {global.location}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          {/* LINK SECRETO: Clicar neste texto leva para a página de Login */}
          <p 
            className="footer-copyright" 
            onClick={() => navigate('/login')} 
            style={{ cursor: 'pointer' }}
            title="Acesso Restrito"
          >
            &copy; {new Date().getFullYear()} {global.doctorName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;