import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes da pasta components
import NavBar from './renders/components/NavBar';
import FloatingWhatsApp from './renders/components/FloatingWhatsApp';
import RouteTracker from './renders/components/RouteTraker';

// Componentes da pasta Sections (Importados exatamente de onde estão no seu VS Code)
import Footer from './renders/Sections/Footer';
import Testimonials from './renders/Sections/Testimonials';
import Hero from './renders/Sections/Hero';
import About from './renders/Sections/About';
import Contact from './renders/Sections/Contact';
import Hypnotherapy from './renders/Sections/Hypnotherapy';
import MentesFortes from './renders/Sections/MentesFortes';

// Novas Páginas (Acesso Restrito)
import Login from './renders/pages/Login';
import Admin from './renders/pages/Admin';

import './App.css';

const App: React.FC = () => {
  return (
    <>
      <RouteTracker />

      <Routes>
        {/* ROTAS PÚBLICAS DO SITE (Com NavBar e Footer) */}
        <Route path="/*" element={
          <>
            <NavBar />
            <main className="page-content-wrapper">
              <Routes>
                <Route path="/" element={<div className="page-fade-in"> <Hero /> <Testimonials /> </div>} />
                <Route path="/sobre" element={<div className="page-fade-in"> <About /> </div>} />
                <Route path="/hipnoterapia" element={<div className="page-fade-in"> <Hypnotherapy /> </div>} />
                <Route path="/projeto" element={<div className="page-fade-in"> <MentesFortes /> </div>} />
                <Route path="/contato" element={<div className="page-fade-in"> <Contact /> </div>} />
              </Routes>
            </main>
            <Footer />
            <FloatingWhatsApp />
          </>
        } />

        {/* ROTAS ADMINISTRATIVAS (Sem NavBar e sem Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;