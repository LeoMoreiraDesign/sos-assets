import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  ShieldCheck, 
  Truck, 
  History, 
  Laptop, 
  Monitor, 
  Cpu, 
  CheckCircle2, 
  Wrench,
  Zap,
  Award
} from 'lucide-react';

const getImagePath = (path) => {
  const baseUrl = window.ASSETS_BASE_URL || '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : (baseUrl ? baseUrl + '/' : '');
  return `${cleanBase}${cleanPath}`;
};

const ServiceCategory = ({ title, icon: Icon, services, image, index }) => {
  const categoryRef = useRef(null);
  const listRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Card Entrance
    gsap.fromTo(categoryRef.current,
      { opacity: 0, y: 60, scale: 0.95, filter: 'blur(15px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        delay: (index % 2) * 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: categoryRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );

    // List Items Stagger
    if (listRef.current) {
      gsap.fromTo(listRef.current.children,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.4 + (index % 2) * 0.1,
          scrollTrigger: {
            trigger: categoryRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [index]);

  return (
    <div ref={categoryRef} className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-neutral-100/50 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,113,227,0.15)] transition-all duration-700 flex flex-col overflow-hidden group h-full">
      {/* Image Area */}
      <div className="relative h-64 md:h-80 overflow-hidden shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
          <Icon className="text-white" size={24} />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 md:p-12 flex flex-col flex-grow">
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 tracking-tight group-hover:text-[#0071e3] transition-colors">{title}</h3>
        <ul ref={listRef} className="space-y-4 flex-grow mb-10">
          {services.map((service, i) => (
            <li key={i} className="flex items-start gap-3 group/item">
              <CheckCircle2 size={18} className="text-[#0071e3] mt-0.5 shrink-0 opacity-40 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all font-bold" />
              <span className="text-neutral-600 text-[15px] font-medium leading-relaxed group-hover/item:text-neutral-900 transition-colors">
                {service}
              </span>
            </li>
          ))}
        </ul>
        <div className="pt-8 border-t border-neutral-50 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Peças de Qualidade A+</span>
            <div className="flex -space-x-2">
               <Zap size={16} className="text-amber-400 opacity-20 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 relative z-20" />
               <Zap size={16} className="text-amber-400 opacity-0 group-hover:opacity-40 blur-sm transition-all duration-1000 group-hover:scale-150" />
            </div>
          </div>
          <a 
            href={`https://api.whatsapp.com/send?phone=5511981765177&text=${encodeURIComponent(`Olá! Gostaria de um orçamento para assistência técnica em meu ${title}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit mx-auto md:mx-0 py-3 px-10 bg-[#0071e3] hover:bg-neutral-900 text-white rounded-full text-xs font-bold transition-all duration-500 flex items-center justify-center gap-2 group/btn shadow-lg shadow-[#0071e3]/20"
            aria-label={`Solicitar orçamento para ${title} pelo WhatsApp`}
          >
            <img src={getImagePath("/logo azul WhatsAppWebP.webp")} alt="WhatsApp" className="w-5 h-5 object-cover rounded-full group-hover/btn:scale-110 transition-transform" />
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Hero Title Animation
      gsap.fromTo(heroRef.current.querySelector('h1'),
        { opacity: 0, y: 100, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: "expo.out" }
      );

      // Hero Subtitle & Badge
      gsap.fromTo([heroRef.current.querySelector('span'), heroRef.current.querySelector('p')],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.5, ease: "power3.out" }
      );

      // Stats Cards
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 40, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.2, 
          stagger: 0.15, 
          ease: "elastic.out(1, 0.8)", 
          delay: 0.8 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const serviceData = [
    {
      title: "MacBook Air",
      icon: Laptop,
      image: "https://static.wixstatic.com/media/995518_3878c6687a044234b301da5d43b751c8~mv2.jpg",
      services: [
        "Upgrade de SSD Macbook Air",
        "Troca de Teclado & Trackpad",
        "Substituição de Tela Retina",
        "Troca de Bateria Macbook Air",
        "Reparo Especializado de Placa Mãe",
        "Limpeza Preventiva & Pasta Térmica",
        "Suporte Linha Vintage Apple"
      ]
    },
    {
      title: "MacBook Pro",
      icon: Laptop,
      image: "https://static.wixstatic.com/media/995518_8a3f64f1a59744649870440bb5c31f3a~mv2.png",
      services: [
        "Upgrade de SSD & Memória RAM",
        "Troca de Teclado & Touchbar",
        "Reparo de Backlight & Vídeo",
        "Troca de Bateria & Alto-falantes",
        "Soluções em Chip Gráfico (BGA)",
        "Banho Químico Macbook Pro",
        "Reparo de Placa Lógica"
      ]
    },
    {
      title: "iMac",
      icon: Monitor,
      image: "https://static.wixstatic.com/media/995518_5af60c5893b846eb810eef627f46162e~mv2.png",
      services: [
        "Upgrade Extreme (SSD + RAM)",
        "Reparo de Fontes de Alimentação",
        "Troca de Display & Vidro Frontal",
        "Reparo de Placa Lógica e BGA",
        "Limpeza Preventiva iMac",
        "Troca de Pasta Térmica Premium",
        "Formatação & Otimização OS"
      ]
    },
    {
      title: "Mac Pro & Mac Mini",
      icon: Cpu,
      image: "https://static.wixstatic.com/media/995518_ebe878b660c543caa6f76a5f1cd84f5f~mv2.png",
      services: [
        "Upgrade de Processadores Xeon",
        "Upgrade de Placas de Vídeo",
        "Suporte para Mac Pro (Lixeirinha)",
        "Expansão de Armazenamento NVMe",
        "Reparo de Fontes & Placas Mac Mini",
        "Manutenção Linha Workstation",
        "Limpeza e Banho Químico Retirada"
      ]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-50 selection:bg-[#0071e3] selection:text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-[#0071e3] mb-8">
            Experiência de Elite • Leo Design
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-neutral-900 mb-8 md:mb-10 leading-[0.9] font-inter">
            Assistência <br /> que inspira <span className="text-neutral-300">confiança.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-12 md:mb-16 font-medium px-4 md:px-0">
            Anos de experiência dedicados exclusivamente ao ecossistema Apple. 
            Reparos precisos, peças selecionadas e garantia real de qualidade.
          </p>
          
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 flex flex-col items-center gap-4 transition-transform hover:scale-[1.02]">
              <Truck className="text-[#0071e3]" size={36} strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-neutral-900 text-lg">Retirada Gratuita</h4>
                <p className="text-sm text-neutral-400">Em toda a região, sem custos adicionais.</p>
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 flex flex-col items-center gap-4 transition-transform hover:scale-[1.02]">
              <ShieldCheck className="text-emerald-500" size={36} strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-neutral-900 text-lg">Garantia Técnica</h4>
                <p className="text-sm text-neutral-400">3 meses de cobertura total em serviços.</p>
              </div>
            </div>
            <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 flex flex-col items-center gap-4 transition-transform hover:scale-[1.02]">
              <History className="text-neutral-400" size={36} strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-neutral-900 text-lg">Expertise</h4>
                <p className="text-sm text-neutral-400">Excelência técnica comprovada no mercado.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#dff2fc]/30 to-transparent -z-10 blur-3xl rounded-full opacity-60"></div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 font-inter">Serviços Especializados</h2>
              <p className="text-lg text-neutral-500 font-medium leading-relaxed">
                Temos a solução para qualquer desafio técnico, desde upgrades de performance até reparos complexos em placas eletrônicas.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Award className="text-amber-500 shrink-0" size={24} />
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest leading-tight">
                Certificação <br /> Técnica
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {serviceData.map((data, index) => (
              <ServiceCategory 
                key={index}
                index={index}
                title={data.title}
                icon={data.icon}
                image={data.image}
                services={data.services}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 lg:px-24 mb-24 overflow-hidden">
        <div 
          ref={(el) => {
            if (el) {
              gsap.fromTo(el,
                { opacity: 0, scale: 0.95 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 1.5,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                  }
                }
              );
            }
          }}
          className="max-w-6xl mx-auto bg-neutral-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center flex flex-col items-center"
        >
          <div className="relative z-10 flex flex-col items-center">
            <Wrench className="text-white mb-8 opacity-20" size={64} strokeWidth={1} />
            <h2 className="text-3xl md:text-7xl font-bold text-white mb-8 md:mb-10 tracking-tighter leading-tight font-inter">
              Seu dispositivo Apple <br /> em boas mãos.
            </h2>
            <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 md:mb-16 font-medium leading-relaxed px-4 md:px-0">
              Solicite um orçamento sem compromisso e recupere a performance original do seu Mac hoje mesmo.
            </p>
            <a 
              href="https://api.whatsapp.com/send?phone=5511981765177&text=Olá! Gostaria de um orçamento para assistência técnica em meu dispositivo Apple."
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0071e3] text-white hover:bg-white hover:text-[#0071e3] transition-all duration-500 px-12 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base flex items-center gap-2.5 md:gap-3 shadow-xl hover:shadow-[#0071e3]/40"
              aria-label="Solicitar orçamento gratuito pelo WhatsApp"
            >
              <img src={getImagePath("/logo azul WhatsAppWebP.webp")} alt="WhatsApp" className="w-6 h-6 md:w-7 md:h-7 object-cover rounded-full transition-all duration-500 transform group-hover:scale-110" />
              <span>Solicitar Orçamento Grátis</span>
            </a>
          </div>
          
          {/* Subtle Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] opacity-50"></div>
        </div>
      </section>
    </div>
  );
};

export default Support;
