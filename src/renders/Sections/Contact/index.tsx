import React, { useState } from 'react';
import { siteContent } from '../../../moocks/content';
import './styles.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../services/firebase';

const Contact: React.FC = () => {
  const { contact, global } = siteContent;
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await addDoc(collection(db, 'contatos'), {
        ...formData,
        data: new Date().toISOString()
      });
      setStatus('success');
      setFormData({ nome: '', email: '', telefone: '', mensagem: '' });
    } catch (error) {
      console.error("Erro ao enviar mensagem: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="page-fade-in contact-editorial page-top-padding">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h1>{contact.title}</h1>
            <p className="contact-sub">{contact.subtitle}</p>
            
            <div className="contact-details">
              <div className="detail-line">
                <span className="detail-label">E-mail</span>
                <span className="detail-value">{global.email}</span>
              </div>
              <div className="detail-line">
                <span className="detail-label">WhatsApp</span>
                <span className="detail-value">{global.whatsappNumber}</span>
              </div>
              <div className="detail-line">
                <span className="detail-label">Consultório</span>
                <span className="detail-value">{global.location}</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            {status === 'success' ? (
              <div className="success-message">
                <h3>Mensagem enviada.</h3>
                <p>Retornarei o contato o mais breve possível.</p>
                <button onClick={() => setStatus('idle')} className="btn-link">Enviar nova mensagem</button>
              </div>
            ) : (
              <form className="editorial-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome Completo" 
                    required 
                  />
                </div>
                <div className="form-row split">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail" 
                    required 
                  />
                  <input 
                    type="tel" 
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="Telefone" 
                    required 
                  />
                </div>
                <div className="form-row">
                  <textarea 
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Como posso ajudar?" 
                    required 
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-editorial" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
                
                {status === 'error' && (
                  <p className="error-text">Ocorreu um erro. Tente novamente ou use o WhatsApp.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;