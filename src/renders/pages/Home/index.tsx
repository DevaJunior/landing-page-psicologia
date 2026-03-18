import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../../moocks/content';
import './styles.css';

const Home: React.FC = () => {
  const { hero, testimonials } = siteContent;

  return (
    <div className="page-fade-in">
      {/* SECTION: HERO */}
      <section className="hero-editorial" aria-labelledby="hero-title">
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
              
              <Link to="/contato" className="btn-editorial">
                {hero.cta}
              </Link>
            </div>
            <div className="hero-visual-placeholder">
              <div className="abstract-shape"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TESTIMONIALS */}
      <section className="testimo-editorial section-padding" aria-labelledby="testimonials-title">
        <div className="container">
          <h2 id="testimonials-title" className="text-center mb-5">{testimonials.title}</h2>
          
          <div className="testimo-grid">
            {testimonials.list.map((item, idx) => (
              <div key={idx} className="testimo-item">
                <span className="quote-mark">"</span>
                <p className="testimo-text">{item.text}</p>
                <cite className="testimo-author">— {item.author}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;