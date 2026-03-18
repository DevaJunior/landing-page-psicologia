import React from 'react';
import { siteContent } from '../../../moocks/content';
import './styles.css';

const Hero: React.FC = () => {
  const { hero } = siteContent;

  return (
    <section id="hero" className="hero-editorial" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text-content">
            <div className="editorial-accent-line"></div>
            <h1 id="hero-title">{hero.title}</h1>
            <h2 className="hero-sub">{hero.subtitle}</h2>
            
            <div className="hero-paragraphs">
              {hero.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p className="hero-emphasis">{hero.strong}</p>
            </div>
            
            <a href="#contato" className="btn-editorial">
              {hero.cta}
            </a>
          </div>
          <div className="hero-visual-placeholder">
            {/* Espaço reservado para uma futura imagem fotográfica de alta qualidade ou textura */}
            <div className="abstract-shape"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;