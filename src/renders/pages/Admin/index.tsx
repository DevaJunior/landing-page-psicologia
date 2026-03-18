import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './styles.css';

interface Review {
  id: string;
  text: string;
  author: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  date?: string;
}

const Admin: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica Autenticação
  useEffect(() => {
    const isAuth = localStorage.getItem('draPaulaAdminAuth');
    if (isAuth !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  // Busca TODOS os depoimentos do Firebase
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'depoimentos'));
      const fetchedReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedReviews.push({
          id: doc.id,
          author: data.author,
          text: data.text,
          status: data.status || 'pendente',
          date: data.date || ''
        });
      });
      // Ordena colocando os pendentes primeiro
      fetchedReviews.sort((a, b) => {
        if (a.status === 'pendente' && b.status !== 'pendente') return -1;
        if (a.status !== 'pendente' && b.status === 'pendente') return 1;
        return 0;
      });
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Erro ao buscar depoimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('draPaulaAdminAuth');
    navigate('/');
  };

  const handleAprovar = async (id: string) => {
    try {
      const reviewRef = doc(db, 'depoimentos', id);
      await updateDoc(reviewRef, { status: 'aprovado' });
      fetchReviews(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao aprovar:", error);
      alert("Erro ao aprovar o comentário.");
    }
  };

  const handleExcluir = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este depoimento permanentemente?")) {
      try {
        await deleteDoc(doc(db, 'depoimentos', id));
        fetchReviews(); // Recarrega a lista
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir o comentário.");
      }
    }
  };

  return (
    <div className="admin-container page-fade-in">
      <header className="admin-header">
        <div className="admin-header-content">
          <h2>Painel de Moderação</h2>
          <button className="btn-logout" onClick={handleLogout}>Sair do Sistema</button>
        </div>
      </header>

      <main className="admin-main">
        <h3>Depoimentos de Pacientes</h3>
        <p className="admin-subtitle">Aprove os relatos para que eles apareçam no site público.</p>

        {loading ? (
          <p>Carregando dados...</p>
        ) : reviews.length === 0 ? (
          <p>Nenhum depoimento encontrado.</p>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Paciente (Autor)</th>
                  <th>Depoimento</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className={review.status === 'pendente' ? 'row-highlight' : ''}>
                    <td>
                      <span className={`status-badge status-${review.status}`}>
                        {review.status}
                      </span>
                    </td>
                    <td><strong>{review.author}</strong></td>
                    <td className="text-cell">"{review.text}"</td>
                    <td className="actions-cell">
                      {review.status !== 'aprovado' && (
                        <button className="btn-action btn-approve" onClick={() => handleAprovar(review.id)}>
                          Aprovar
                        </button>
                      )}
                      <button className="btn-action btn-delete" onClick={() => handleExcluir(review.id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;