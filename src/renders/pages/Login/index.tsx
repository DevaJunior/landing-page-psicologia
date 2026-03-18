import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Se já estiver logado, redireciona direto para o painel
  useEffect(() => {
    const isAuth = localStorage.getItem('draPaulaAdminAuth');
    if (isAuth === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ATENÇÃO: Coloque aqui o email e a senha exatos que você deseja usar (deixei um de exemplo)
    const EMAIL_PERMITIDO = "drapaulapsiquiatria@gmail.com";
    const SENHA_PERMITIDA = "5b0TBP!f4g!0L@hhKyUB";

    if (email === EMAIL_PERMITIDO && password === SENHA_PERMITIDA) {
      localStorage.setItem('draPaulaAdminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Acesso negado. Credenciais incorretas.');
      setPassword('');
    }
  };

  return (
    <div className="login-container page-fade-in">
      <div className="login-box">
        <h2>Acesso Restrito</h2>
        <p>Painel de Moderação - Dra. Paula</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <p className="login-error">{error}</p>}
          
          <button type="submit" className="btn-login">Entrar</button>
        </form>
        
        <button className="btn-voltar-site" onClick={() => navigate('/')}>
          &larr; Voltar para o site
        </button>
      </div>
    </div>
  );
};

export default Login;