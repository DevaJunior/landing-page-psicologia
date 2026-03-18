import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { siteContent } from '../../../moocks/content';
import './styles.css';

interface Review {
  id?: string;
  text: string;
  author: string;
}

const Testimonials: React.FC = () => {
  const { testimonials } = siteContent;
  
  // Estados para os comentários exibidos e para o formulário
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para o Carrossel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const [formData, setFormData] = useState({
    author: '',
    text: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Nova Query de segurança: Busca apenas status == 'aprovado'
        const q = query(collection(db, 'depoimentos'), where('status', '==', 'aprovado'));
        const querySnapshot = await getDocs(q);
        const firebaseReviews: Review[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          firebaseReviews.push({
            id: doc.id,
            author: data.author,
            text: data.text
          });
        });

        // Junta os depoimentos estáticos com os dinâmicos aprovados
        setReviews([...testimonials.list, ...firebaseReviews]);
      } catch (error) {
        console.error("Erro ao buscar depoimentos:", error);
        setReviews([...testimonials.list]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [testimonials.list]);

  // Lógica de Responsividade para o Carrossel (Ajustado para 750px)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 750);
    handleResize(); // Executa na montagem
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Variáveis matemáticas do Carrossel adaptado (2400px mostra 3, senão mobile 1, senão 2)
  const getItemsToShow = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 2400) return 3;
    return isMobile ? 1 : 2;
  };
  
  const itemsToShow = getItemsToShow();
  const maxIndex = Math.max(0, reviews.length - itemsToShow);

  // Lógica de Rotação Automática
  useEffect(() => {
    // Se o mouse estiver em cima ou houver poucos itens, não roda
    if (isPaused || reviews.length <= itemsToShow) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); // Troca de slide a cada 5 segundos
    
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, reviews.length, itemsToShow]);

  // Lida com a digitação no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envia o novo comentário para o Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      await addDoc(collection(db, 'depoimentos'), {
        author: formData.author,
        text: formData.text,
        date: new Date().toISOString(),
        status: 'pendente'
      });
      
      setFormStatus('success');
      setFormData({ author: '', text: '' });
    } catch (error) {
      console.error("Erro ao enviar depoimento: ", error);
      setFormStatus('error');
    }
  };

  return (
    <section className="testimo-editorial section-padding" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title" className="text-center mb-5">{testimonials.title}</h2>
        
        {/* CARROSSEL DE COMENTÁRIOS */}
        {loading ? (
          <p className="text-center">Carregando depoimentos...</p>
        ) : (
          <div 
            className="carousel-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="carousel-viewport">
              <div 
                className="carousel-track" 
                style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
              >
                {reviews.map((item, idx) => (
                  <div key={item.id || idx} className="carousel-slide">
                    <div className="testimo-item">
                      <span className="quote-mark">"</span>
                      <p className="testimo-text">{item.text}</p>
                      <cite className="testimo-author">— {item.author}</cite>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navegação por Pontos (Dots) */}
            {maxIndex > 0 && (
              <div className="carousel-dots">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button 
                    key={idx}
                    className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Ir para depoimento ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="editorial-line"></div>

        {/* FORMULÁRIO DE NOVO COMENTÁRIO */}
        <div className="review-form-container">
          <h3 className="review-form-title">Deixe sua avaliação</h3>
          <p className="review-form-sub">Seu relato ajuda outras pessoas a encontrarem o acolhimento que precisam.</p>

          {formStatus === 'success' ? (
            <div className="success-message-review">
              <h4>Obrigado pelo seu relato!</h4>
              <p>Sua avaliação foi enviada com sucesso e será publicada em breve após a revisão da nossa equipe.</p>
              <button onClick={() => setFormStatus('idle')} className="btn-link">Enviar outro relato</button>
            </div>
          ) : (
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input 
                  type="text" 
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Seu nome ou Iniciais (Ex: Maria S.)" 
                  required 
                  maxLength={50}
                />
              </div>
              <div className="form-row">
                <textarea 
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  placeholder="Como foi sua experiência com a Dra. Paula?" 
                  required 
                  rows={4}
                  maxLength={400}
                ></textarea>
              </div>
              
              <button type="submit" className="btn-editorial" disabled={formStatus === 'loading'}>
                {formStatus === 'loading' ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
              
              {formStatus === 'error' && (
                <p className="error-text">Ocorreu um erro ao enviar. Tente novamente mais tarde.</p>
              )}
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;