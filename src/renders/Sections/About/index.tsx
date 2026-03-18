import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { siteContent } from '../../../moocks/content';
import './styles.css';

// Subcomponente Acordeão para organizar o conteúdo de forma expansível
interface AccordionProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionProps> = ({ title, isOpen, onClick, children }) => {
  return (
    <div className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
      <button 
        className="accordion-header" 
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h5 className="accordion-title">{title}</h5>
        <span className="accordion-icon">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div className="accordion-content-wrapper">
        <div className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const { about } = siteContent;
  
  // Estados para controlar quais acordeões estão abertos
  // Permite abrir múltiplos simultaneamente. Se preferir abrir apenas um por vez, 
  // pode mudar o estado para guardar apenas a string do título aberto.
  const [openAdultDisorders, setOpenAdultDisorders] = useState<Record<number, boolean>>({});
  const [openKidDisorders, setOpenKidDisorders] = useState<Record<number, boolean>>({});

  const toggleAdultAccordion = (index: number) => {
    setOpenAdultDisorders(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleKidAccordion = (index: number) => {
    setOpenKidDisorders(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="page-fade-in about-editorial page-top-padding" aria-labelledby="about-title">
      <div className="container">
        
        {/* Cabeçalho Principal da Página */}
        <div className="about-header-grid">
          <div>
            <h1 id="about-title" className="massive-title">{about.title}</h1>
          </div>
          <div className="intro-text-block">
            {about.intro.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        <div className="editorial-line"></div>

        <div className="psychiatry-blocks">
          {/* SECÇÃO: Adultos */}
          <div className="psy-block">
            <div className="block-header">
              <span className="block-number">01</span>
              <h2>{about.adults.title}</h2>
            </div>
            
            <div className="block-content">
              <p className="block-desc">{about.adults.description}</p>
              
              {/* Pilares do Tratamento */}
              <ul className="elegant-list mb-4">
                {about.adults.pillars.map((pillar, idx) => (
                  <li key={idx}>
                    <span className="list-marker"></span>
                    <div>
                      <strong>{pillar.strong}</strong>{pillar.text}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Perfil do Paciente */}
              <h4 className="small-heading mt-5">O meu trabalho é para si que:</h4>
              <ul className="elegant-list mb-5">
                {about.adults.target.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="list-marker"></span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Acordeões de Transtornos (Adultos) */}
              <div className="disorders-accordion-section">
                <h4 className="small-heading">Transtornos Tratados</h4>
                <div className="accordion-container">
                  {about.adults.disorders.map((cat, idx) => (
                    <AccordionItem 
                      key={idx} 
                      title={cat.category}
                      isOpen={!!openAdultDisorders[idx]}
                      onClick={() => toggleAdultAccordion(idx)}
                    >
                      <ul className="accordion-list">
                        {cat.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </AccordionItem>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="editorial-line"></div>

          {/* SECÇÃO: Infantil */}
          <div className="psy-block">
            <div className="block-header">
              <span className="block-number">02</span>
              <h2>{about.kids.title}</h2>
            </div>
            
            <div className="block-content">
              <p className="block-desc">{about.kids.subtitle}</p>
              
              {/* Acordeões de Transtornos (Infantil) */}
              <div className="disorders-accordion-section mt-4">
                <div className="accordion-container">
                  {about.kids.disorders.map((cat, idx) => (
                    <AccordionItem 
                      key={idx} 
                      title={cat.category}
                      isOpen={!!openKidDisorders[idx]}
                      onClick={() => toggleKidAccordion(idx)}
                    >
                      <ul className="accordion-list">
                        {cat.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </AccordionItem>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;