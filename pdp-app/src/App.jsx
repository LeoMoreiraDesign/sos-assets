import React, { useEffect, useRef, useState } from 'react';
import { ListFilter, Cpu, Laptop, Monitor, Sparkles, RefreshCw } from 'lucide-react';
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

const types = [
  { id: 'all', name: 'Todos Modelos', icon: Cpu },
  { id: 'mac', name: 'MacBook', icon: Laptop },
  { id: 'desktop', name: 'iMac & Mini', icon: Monitor },
];

const conditions = [
  { id: 'all', name: 'Qualquer', icon: ListFilter },
  { id: 'novo', name: 'Novos', icon: Sparkles },
  { id: 'seminovo', name: 'Seminovos', icon: RefreshCw },
];

function App() {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('products'); // 'products' or 'support'
  const [activeType, setActiveType] = useState('all');
  const [activeCondition, setActiveCondition] = useState('all');

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
      <header className="flex flex-col bg-white/70 backdrop-blur-xl border-b border-neutral-100/50 sticky top-0 z-50 transition-all duration-300 shadow-sm">
        <div className="p-4 md:p-6 lg:px-8 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('products'); }}
              className="flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Página Inicial - Leo Design"
            >
              <img src={getImagePath("/Webp_logo_leo_design_web_sites@4x.webp")} alt="Leo Design Logo" className="h-12 md:h-16 w-auto object-contain" />
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500">
            <button 
              onClick={() => navigateTo('products')} 
              className={`transition-colors py-2 ${currentPage === 'products' ? 'text-apple-black font-bold border-b-2 border-apple-black' : 'hover:text-apple-black border-b-2 border-transparent'}`}
            >
              Vitrine
            </button>
            <button 
              onClick={() => navigateTo('support')} 
              className={`transition-colors py-2 ${currentPage === 'support' ? 'text-apple-black font-bold border-b-2 border-apple-black' : 'hover:text-apple-black border-b-2 border-transparent'}`}
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

        {/* Integrated Filter Bar */}
        {currentPage === 'products' && (
          <div className="border-t border-neutral-100/50 bg-white/40">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="flex items-center gap-4 md:gap-8 py-3 overflow-x-auto no-scrollbar scroll-smooth">
                
                {/* Types Group */}
                <div className="flex items-center gap-1.5 md:gap-2 pr-4 md:pr-0">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveType(type.id)}
                      className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300 whitespace-nowrap border ${
                        activeType === type.id
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-black/10'
                          : 'bg-white text-neutral-500 border-neutral-100 hover:border-neutral-300'
                      }`}
                      aria-label={`Filtrar por ${type.name}`}
                    >
                      <type.icon size={14} strokeWidth={activeType === type.id ? 2.5 : 2} />
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                        {type.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="hidden md:block w-px h-5 bg-neutral-200/60"></div>

                {/* Conditions Group */}
                <div className="flex items-center gap-1.5 md:gap-2">
                  {conditions.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => setActiveCondition(cond.id)}
                      className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300 whitespace-nowrap border ${
                        activeCondition === cond.id
                          ? 'bg-[#0071e3] text-white border-[#0071e3] shadow-lg shadow-[#0071e3]/10'
                          : 'bg-white text-neutral-500 border-neutral-100 hover:border-neutral-300'
                      }`}
                      aria-label={`Filtrar por condição ${cond.name}`}
                    >
                      <cond.icon size={14} strokeWidth={activeCondition === cond.id ? 2.5 : 2} />
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                        {cond.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {currentPage === 'products' ? (
          <CollectionGrid 
            isMobileFilterOpen={isMobileFilterOpen} 
            setIsMobileFilterOpen={setIsMobileFilterOpen} 
            activeType={activeType}
            setActiveType={setActiveType}
            activeCondition={activeCondition}
            setActiveCondition={setActiveCondition}
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
          <div className="max-w-sm flex flex-col justify-center">
            <p className="text-neutral-500 font-medium leading-relaxed">
              Especialistas em ecossistema Apple. Qualidade impecável, garantia real e o melhor atendimento para você.
            </p>
          </div>
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
          
          <div className="flex flex-col items-center gap-1 lg:order-2">
            <a 
              href="https://leodesign.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer flex flex-col items-center"
            >
              <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-[0.4em] group-hover:text-neutral-900 transition-all duration-500">Desenvolvido por</span>
              <span className="text-[11px] font-black text-neutral-900 tracking-[0.1em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">LEO DESIGN</span>
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
