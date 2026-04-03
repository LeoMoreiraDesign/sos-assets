import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  Laptop, 
  ArrowUpRight,
  Monitor,
  Cpu,
  Sparkles,
  RefreshCw,
  ListFilter
} from 'lucide-react';

const products = [
  {
    id: 12,
    name: "Apple Mac Studio M4 MAX",
    badge: "Novo",
    specs: "Apple M4 Max • 32GB RAM • 1TB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/mac-studio.png",
    category: "desktop"
  },
  {
    id: 1,
    name: "MacBook Pro 16” CHIP M1PRO",
    badge: "Seminovo",
    specs: "Apple M1 Pro • 16GB RAM • 512GB SSD",
    installment: "12x de R$ 816,00",
    cashPrice: "R$ 8.899,00 à vista",
    image: "/products/pro-16-m1.png",
    category: "mac"
  },
  {
    id: 2,
    name: "MacBook Pro 14” CHIP M1PRO",
    badge: "Seminovo",
    specs: "Apple M1 Pro • 16GB RAM • 512GB SSD",
    installment: "12x de R$ 623,00",
    cashPrice: "R$ 6.799,00 à vista",
    image: "/products/pro-14-m1.jpg",
    category: "mac"
  },
  {
    id: 3,
    name: "MacBook Pro 13” CHIP M1",
    badge: "Seminovo",
    specs: "Apple M1 • 8GB RAM • 256GB SSD",
    installment: "12x de R$ 480,00",
    cashPrice: "R$ 5.199,00 à vista",
    image: "/products/pro-13-m1.jpg",
    category: "mac"
  },
  {
    id: 4,
    name: "MacBook Pro 16” 2019 TouchBar",
    badge: "Seminovo",
    specs: "Intel Core i7 • 16GB RAM • 512GB SSD",
    installment: "12x de R$ 460,00",
    cashPrice: "R$ 4.999,00 à vista",
    image: "/products/pro-16-2019.png",
    category: "mac"
  },
  {
    id: 5,
    name: "MacBook Pro 15” 2019 Retina",
    badge: "Seminovo",
    specs: "Intel Core i9 • 16GB RAM • 512GB SSD",
    installment: "12x de R$ 510,00",
    cashPrice: "R$ 5.499,00 à vista",
    image: "/products/pro-15-2019.webp",
    category: "mac"
  },
  {
    id: 6,
    name: "MacBook Air 13” 2020 Retina",
    badge: "Seminovo",
    specs: "Intel Core i3 • 8GB RAM • 256GB SSD",
    installment: "12x de R$ 333,00",
    cashPrice: "R$ 3.499,00 à vista",
    image: "/products/air-2020.png",
    category: "mac"
  },
  {
    id: 7,
    name: "iMac 27” 2019 Retina 5K",
    badge: "Seminovo",
    specs: "Intel Core i5 • 42GB RAM • 1TB HD",
    installment: "12x de R$ 605,00",
    cashPrice: "R$ 6.599,00 à vista",
    image: "/products/imac-27-2019.png",
    category: "desktop"
  },
  {
    id: 8,
    name: "Mac mini 2014",
    badge: "Seminovo",
    specs: "Intel Core i5 • 8GB RAM • 240GB SSD",
    installment: "12x de R$ 149,00",
    cashPrice: "R$ 1.599,00 à vista",
    image: "/products/mini-2014.png",
    category: "desktop"
  },
  {
    id: 9,
    name: "Mac Pro 2013 (Lixeirinha)",
    badge: "Seminovo",
    specs: "Xeon 12 Core • 128GB RAM • 500GB SSD",
    installment: "12x de R$ 696,00",
    cashPrice: "R$ 7.299,00 à vista",
    image: "/products/mac-pro-2013.png",
    category: "desktop"
  },
  {
    id: 10,
    name: "Macbook pro 14\" M4",
    badge: "Novo",
    specs: "Apple M4 • 16GB RAM • 512GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/pro-14-m4.jpg",
    category: "mac"
  },
  {
    id: 11,
    name: "MacBook Air 13” CHIP M3",
    badge: "Novo",
    specs: "Apple M3 • 8GB RAM • 256GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/air-m3.jpeg",
    category: "mac"
  },
  {
    id: 13,
    name: "MacBook Pro 15” 2018 Retina",
    badge: "Seminovo",
    specs: "Intel Core i7 • 16GB RAM • 512GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/pro-15-2019.webp",
    category: "mac"
  },
  {
    id: 14,
    name: "MacBook Pro 13” 2015 Retina",
    badge: "Seminovo",
    specs: "Intel Core i5 • 8GB RAM • 256GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/pro-13-m1.jpg",
    category: "mac"
  },
  {
    id: 15,
    name: "Macbook pro 14\" M3PRO",
    badge: "Novo",
    specs: "Apple M3 Pro • 18GB RAM • 512GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/pro-14-m4.jpg",
    category: "mac"
  },
  {
    id: 16,
    name: "Macbook Pro 13” CHIP M3",
    badge: "Novo",
    specs: "Apple M3 • 8GB RAM • 256GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/pro-13-m1.jpg",
    category: "mac"
  },
  {
    id: 17,
    name: "MacBook Air 13” 2019 Retina",
    badge: "Seminovo",
    specs: "Intel Core i5 • 8GB RAM • 256GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/air-2020.png",
    category: "mac"
  },
  {
    id: 18,
    name: "MacBook Air 13” 2018 Retina",
    badge: "Seminovo",
    specs: "Intel Core i5 • 8GB RAM • 256GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/air-2020.png",
    category: "mac"
  },
  {
    id: 19,
    name: "MacBook Air 13” 2017",
    badge: "Seminovo",
    specs: "Intel Core i5 • 8GB RAM • 128GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/air-2020.png",
    category: "mac"
  },
  {
    id: 20,
    name: "MacBook Air 13” 2015",
    badge: "Seminovo",
    specs: "Intel Core i5 • 8GB RAM • 128GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/air-2020.png",
    category: "mac"
  },
  {
    id: 21,
    name: "Mac Mini M4",
    badge: "Novo",
    specs: "Apple M4 • 16GB RAM • 256GB SSD",
    installment: "Consultar",
    cashPrice: "Sob Consulta",
    image: "/products/mini-2014.png",
    category: "desktop"
  }
];

const getImagePath = (path) => {
  const baseUrl = window.ASSETS_BASE_URL || '';
  if (path.startsWith('http')) return path;
  // Remove leading slash if baseUrl ends with one or path starts with one
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : (baseUrl ? baseUrl + '/' : '');
  return `${cleanBase}${cleanPath}`;
};

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const magneticRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    
    // Magnetic Effect Logic
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(magneticRef.current, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.to(card, {
        rotateY: x * 0.02,
        rotateX: -y * 0.02,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([magneticRef.current, card], {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Mobile scroll zoom logic
    let trigger = null;
    if (window.innerWidth < 1024) { // Trigger on mobile/tablet
      trigger = ScrollTrigger.create({
        trigger: card,
        start: "top 60%",
        end: "bottom 40%",
        toggleClass: "is-centered",
      });
    }

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="product-card group relative bg-white/80 backdrop-blur-md rounded-[2rem] p-8 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] [&.is-centered]:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-transparent hover:border-neutral-100 [&.is-centered]:border-neutral-100 flex flex-col h-full perspective-1000"
    >
      <div ref={magneticRef} className="flex flex-col h-full transition-transform duration-500 ease-out">
        {/* Badge & Info Header */}
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="flex flex-col gap-1 md:gap-1.5">
            <span className="inline-flex px-3 py-1 bg-[#f5f5f7] text-[10px] font-semibold tracking-widest uppercase rounded-full text-[#0071e3] border border-[#e8e8ed] w-fit shadow-sm shadow-[#0071e3]/5">
              {product.badge}
            </span>
            <span className="text-[9px] uppercase tracking-[0.1em] text-neutral-400 font-medium">
              Imagem ilustrativa
            </span>
          </div>
          <a 
            href={`https://api.whatsapp.com/send?phone=5511981765177&text=${encodeURIComponent(`Olá! Vi o produto *${product.name}* no site e gostaria de mais informações.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white border border-neutral-100 text-[#0071e3] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-[.is-centered]:opacity-100 transition-all duration-500 hover:bg-[#0071e3] group-[.is-centered]:bg-[#0071e3] hover:text-white group-[.is-centered]:text-white transform group-hover:translate-y-0 group-[.is-centered]:translate-y-0 translate-y-2 shadow-sm"
            aria-label={`Comprar ${product.name} pelo WhatsApp`}
          >
            <img src={getImagePath("/logo azul WhatsAppWebP.webp")} alt="WhatsApp" className="w-full h-full object-cover rounded-full transition-all duration-500" />
          </a>
        </div>

        {/* Image Area */}
        <div className="relative aspect-square mb-8 bg-neutral-50 rounded-2xl overflow-hidden group-hover:bg-neutral-100 transition-colors duration-500">
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center">
                <Laptop className="w-10 h-10 text-neutral-300" />
              </div>
            </div>
          )}
          
          {product.image ? (
            <img 
              src={getImagePath(product.image)} 
              alt={product.name}
              className={`w-full h-full object-contain mix-blend-multiply transition-all duration-700 transform group-hover:scale-110 group-[.is-centered]:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <div className="relative z-10 flex flex-col items-center gap-2 text-neutral-200">
              <Laptop size={48} strokeWidth={1} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Visual Preview</span>
            </div>
          )}

          {/* Hover Action */}
          <ArrowUpRight className="absolute bottom-6 right-6 text-neutral-300 opacity-0 group-hover:opacity-100 group-[.is-centered]:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 group-[.is-centered]:translate-y-0" size={24} />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-2 tracking-tight leading-tight font-inter">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-400 font-medium mb-8">
            {product.specs}
          </p>

          {/* Pricing Section */}
          <div className="mt-auto pt-8 border-t border-neutral-50">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Parcelamento em 12x</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-neutral-900 tracking-tighter">
                    {product.installment && product.installment.includes('de') ? product.installment.split('de')[0] : '—'}
                  </span>
                  <span className="text-lg font-medium text-neutral-900">
                    {product.installment && product.installment.includes('de') ? `de ${product.installment.split('de')[1]}` : (product.installment || '—')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {product.cashPrice}
                </span>
                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Estoque Real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CollectionGrid = ({ isMobileFilterOpen, setIsMobileFilterOpen, activeType, setActiveType, activeCondition, setActiveCondition }) => {
  const gridRef = useRef(null);
  const containerRef = useRef(null);

  const getTypeCount = (typeId) => {
    return products.filter(p => {
      const matchType = typeId === 'all' || p.category === typeId;
      const matchCond = activeCondition === 'all' || p.badge?.toLowerCase() === activeCondition;
      return matchType && matchCond;
    }).length;
  };

  const getConditionCount = (condId) => {
    return products.filter(p => {
      const matchType = activeType === 'all' || p.category === activeType;
      const matchCond = condId === 'all' || p.badge?.toLowerCase() === condId;
      return matchType && matchCond;
    }).length;
  };

  const filteredProducts = products.filter(p => {
    const matchType = activeType === 'all' || p.category === activeType;
    const matchCond = activeCondition === 'all' || p.badge?.toLowerCase() === activeCondition;
    return matchType && matchCond;
  });

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.product-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%", // Trigger when top of the grid hits 85% of the viewport height
          once: true // Only trigger once, preventing re-animation if scrolled back up
        },
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        clearProps: "all"
      }
    );
  }, [activeType, activeCondition]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    let ctx = gsap.context(() => {
      const h1 = containerRef.current.querySelector('h1');
      const span = containerRef.current.querySelector('span');
      const p = containerRef.current.querySelector('p'); // Added p tag

      if (h1) {
        gsap.fromTo(h1,
          { opacity: 0, y: 120, clipPath: 'inset(0 0 100% 0)' },
          { 
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true
            },
            opacity: 1, 
            y: 0, 
            clipPath: 'inset(0 0 0% 0)', 
            duration: 1.8, 
            ease: "expo.out",
            delay: 0.1
          }
        );
      }

      if (span) {
        gsap.fromTo(span,
          { opacity: 0, y: 30 },
          { 
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true
            },
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            delay: 0.4, 
            ease: "power3.out" 
          }
        );
      }

      if (p) {
        gsap.fromTo(p,
          { opacity: 0, y: 40 },
          { 
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true
            },
            opacity: 1, 
            y: 0, 
            duration: 1.4, 
            delay: 0.3, 
            ease: "power2.out" 
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-transparent font-['Inter'] selection:bg-neutral-100 selection:text-black antialiased pb-32">
      {/* Dynamic Header - Moved below Banner */}
      <section className="relative pt-20 pb-8 md:pt-32 md:pb-16 px-6 md:px-12 lg:px-24 overflow-hidden text-center bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div ref={containerRef}>
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <span className="inline-block text-xs md:text-sm font-semibold tracking-[1em] uppercase text-neutral-300">
                Catálogo Exclusivo
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 mb-6 md:mb-8 leading-[1.1]">
              Escolha seu novo <br className="hidden md:block" />
              dispositivo Apple.
            </h1>
            <p className="text-neutral-500 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed mb-8">
              Explore nossa seleção cuidadosamente selecionada de equipamentos Apple, garantindo a melhor performance para o seu fluxo de trabalho.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-20"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionGrid;
