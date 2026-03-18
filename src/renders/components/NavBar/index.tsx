import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteContent } from '../../../moocks/content';
import './styles.css';

import logoPsi from '../../../assets/logo_psi_002.png';

const NavBar: React.FC = () => {
  const { nav } = siteContent;
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`editorial-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <nav className="container nav-container" aria-label="Menu principal">
        
        {/* Área da Marca: Substituímos o texto pela imagem do logotipo */}
        <div className="nav-brand">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img 
              src={logoPsi} 
              alt="Logotipo Dra. Paula Teixeira Pacheco" 
              className="nav-logo" 
            />
          </Link>
        </div>
        
        <div className="nav-links desktop-menu">
          {nav.links.map((link, index) => (
            <Link 
              key={index} 
              to={link.href}
              className={location.pathname === link.href ? 'active-link' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button 
          className="mobile-trigger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {mobileMenuOpen && (
          <div className="mobile-dropdown">
            {nav.links.map((link, index) => (
              <Link 
                key={index} 
                to={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={location.pathname === link.href ? 'active-link-mobile' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;