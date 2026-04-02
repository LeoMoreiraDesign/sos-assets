import React, { useEffect, useRef, useState } from 'react';
import { ListFilter } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CollectionGrid from './components/CollectionGrid';
import Support from './components/Support';

gsap.registerPlugin(ScrollTrigger);

const getImagePath = (path) => {
  const baseUrl = window.ASSETS_BASE_URL || '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : (baseUrl ? baseUrl + '/' : '');
  return `${cleanBase}${cleanPath}`;
};

function App() {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('products'); // 'products' or 'support'

  const handleFooterMouseMove = (e) => {
    if (!footerRef.current) return;
    const { left, top, width, height } = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    footerRef.current.style.setProperty('--mouse-x', `${x}%`);
    footerRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileFilterOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="min-h-screen font-sans text-apple-gray antialiased bg-gradient-to-b from-[#dff2fc] via-[#f1f8fc] to-white">
      {/* Dynamic Navigation Header */}
      <header className="p-6 md:p-8 flex justify-between items-center bg-white/60 backdrop-blur-lg border-b border-white/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('products'); }}
              className="bg-neutral-900 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-black/5 transition-transform hover:scale-105"
              aria-label="Página Inicial - Leo Design"
            >
              <img src={getImagePath("/logo-leo-design.png")} alt="Leo Design Logo" className="h-6 md:h-7 w-auto object-contain brightness-0 invert" />
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500">
            <button 
              onClick={() => navigateTo('products')} 
              className={`transition-colors ${currentPage === 'products' ? 'text-apple-black font-bold' : 'hover:text-apple-black'}`}
            >
              Vitrine
            </button>
            <button 
              onClick={() => navigateTo('support')} 
              className={`transition-colors ${currentPage === 'support' ? 'text-apple-black font-bold' : 'hover:text-apple-black'}`}
            >
              Assistência
            </button>
            <a href="https://api.whatsapp.com/send?phone=5511981765177" target="_blank" rel="noopener noreferrer" className="hover:text-apple-black transition-colors" aria-label="Falar pelo WhatsApp">Fale com Especialista</a>
          </div>

          {/* Quick Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => navigateTo('support')}
              className="px-3 py-1.5 text-xs font-semibold text-[#0071e3] bg-[#0071e3]/5 border border-[#0071e3]/10 rounded-lg"
            >
              Suporte
            </button>
          </div>
        </div>
      </header>

      <main>
        {currentPage === 'products' ? (
          <CollectionGrid 
            isMobileFilterOpen={isMobileFilterOpen} 
            setIsMobileFilterOpen={setIsMobileFilterOpen} 
          />
        ) : (
          <Support />
        )}
      </main>

      <footer 
        ref={footerRef}
        onMouseMove={handleFooterMouseMove}
        className="footer-gradient-interactive py-20 px-6 md:px-12 lg:px-24 border-t border-white/50 bg-white relative z-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-sm">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('products'); }}
              className="mb-8 p-3 bg-neutral-900 rounded-2xl w-fit shadow-xl shadow-black/5 block transition-transform hover:scale-105"
            >
              <img src={getImagePath("/logo-leo-design.png")} alt="Leo Design Logo" className="h-8 w-auto animate-leo-power" />
            </a>
              Especialistas em ecossistema Apple. Qualidade impecável, garantia real e o melhor atendimento para você.
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div>
              <h5 className="font-bold text-sm mb-6 text-neutral-900 uppercase tracking-widest">Shop</h5>
              <ul className="text-sm text-neutral-500 space-y-3 font-medium">
                <li><button onClick={() => navigateTo('products')} className="hover:text-apple-black transition-colors">Produtos</button></li>
                <li><button onClick={() => navigateTo('products')} className="hover:text-apple-black transition-colors">MacBook Pro</button></li>
                <li><button onClick={() => navigateTo('products')} className="hover:text-apple-black transition-colors">MacBook Air</button></li>
                <li><button onClick={() => navigateTo('products')} className="hover:text-apple-black transition-colors">iMac</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-sm mb-6 text-neutral-900 uppercase tracking-widest">Suporte</h5>
              <ul className="text-sm text-neutral-500 space-y-3 font-medium">
                <li><button onClick={() => navigateTo('support')} className="hover:text-apple-black transition-colors">Assistência</button></li>
                <li><button onClick={() => navigateTo('support')} className="hover:text-apple-black transition-colors">Garantia</button></li>
                <li><button onClick={() => navigateTo('support')} className="hover:text-apple-black transition-colors">Trocas</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-sm mb-6 text-neutral-900 uppercase tracking-widest">Social</h5>
              <ul className="text-sm text-neutral-500 space-y-3 font-medium">
                <li><a href="#" className="hover:text-neutral-900 transition-colors" aria-label="Instagram Leo Design">Instagram</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=5511981765177" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors" aria-label="WhatsApp Leo Design">WhatsApp</a></li>
                <li><a href="#" className="hover:text-neutral-900 transition-colors" aria-label="Facebook Leo Design">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-neutral-100 flex flex-col lg:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] lg:order-1 text-center lg:text-left">
            © 2026 LEO DESIGN. TODOS OS DIREITOS RESERVADOS.
          </p>
          
          <div className="flex flex-col items-center gap-3 lg:order-2">
            <a 
              href="https://leodesign.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Leo Design Portfolio"
              className="flex flex-col items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-[0.3em] group-hover:text-neutral-500 transition-colors">Desenvolvido por</span>
              <img src={getImagePath("/logo-leo-design.png")} alt="Leo Design" className="h-7 md:h-8 animate-leo-power" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] lg:order-3">
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
