import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Rola a página para o topo suavemente a cada troca de rota
    window.scrollTo(0, 0);

    // 2. Dispara o evento de page_view para o Google Analytics
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [location]);

  return null; // Este componente não renderiza nada visual na tela
};

export default RouteTracker;