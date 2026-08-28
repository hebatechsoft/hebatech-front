import { useEffect } from 'react';

import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '@fontsource/eb-garamond/400-italic.css';
import '@fontsource/eb-garamond/500-italic.css';
import './styles/global.css';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Focus from './components/Focus';
import Services from './components/Services';
import Voices from './components/Voices';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

import { LangProvider } from './i18n/LangProvider';
import { useReveal } from './hooks/useReveal';
import { useSplitLines } from './hooks/useSplitLines';

/**
 * El sitio es una sola pagina con anclas: no hay mas rutas reales que
 * resolver del lado del cliente. Las rutas legacy (`/servicios`, etc.) se
 * redirigen a nivel de edge en `vercel.json`, no aca — un 301 real en el CDN
 * llega mas rapido, funciona sin JS y no depende de react-router-dom para
 * una sola ruta.
 *
 * El scroll al hash tampoco es gratis: cambiar la URL no hace scroll solo,
 * hay que dispararlo a mano una vez montado el contenido.
 */
function App() {
  useSplitLines();
  useReveal();

  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <LangProvider>
      <Loader />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Focus />
        <Services />
        <Voices />
        <Work />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </LangProvider>
  );
}

export default App;
