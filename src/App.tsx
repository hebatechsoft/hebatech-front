import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

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

import { useReveal } from './hooks/useReveal';
import { useSplitLines } from './hooks/useSplitLines';

/**
 * `useSplitLines`/`useReveal` van aca, no en `App`. Si alguien entra por una
 * ruta vieja (`/servicios`), el primer render de `App` muestra el
 * `<Navigate>` de la ruta legacy, no `Home` todavia: si estos hooks
 * corrieran en `App` con deps `[]`, encontrarian cero elementos `.rv` /
 * `[data-split]` y jamas se re-ejecutarian. Al vivir en `Home`, corren
 * siempre despues de que su propio contenido ya esta montado.
 *
 * El scroll al hash tampoco es gratis: `<Navigate to="/#servicios">` cambia
 * la URL con `history.replaceState`, y eso NO hace scroll solo.
 */
const Home = () => {
  useSplitLines();
  useReveal();

  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <>
      <Hero />
      <Products />
      <Focus />
      <Services />
      <Voices />
      <Work />
      <Contact />
    </>
  );
};

/**
 * El sitio pasa a ser una sola pagina con anclas. Las rutas anteriores no se
 * eliminan: redirigen a la seccion equivalente para no romper enlaces ya
 * publicados ni lo que este indexado. Nadie llega a un 404.
 */
const LEGACY_ROUTES: { from: string; to: string }[] = [
  { from: '/nosotros', to: '/#enfoque' },
  { from: '/servicios', to: '/#servicios' },
  { from: '/contacto', to: '/#contacto' },
  { from: '/faq', to: '/#contacto' },
];

function App() {
  return (
    <Router>
      <Loader />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {LEGACY_ROUTES.map((route) => (
            <Route key={route.from} path={route.from} element={<Navigate to={route.to} replace />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </Router>
  );
}

export default App;
