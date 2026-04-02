import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getImagePath = (path) => {
  const baseUrl = window.ASSETS_BASE_URL || '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : (baseUrl ? baseUrl + '/' : '');
  return `${cleanBase}${cleanPath}`;
};

const ScrollSequenceBanner = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const frameCount = 82;
  const currentFrame = (index) => 
    getImagePath(`/hero_Banner_Leo_design_apple/frame__${index.toString().padStart(3, '0')}.webp`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Preload images
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          render(0); // Initial frame
        }
      };
      loadedImages[i] = img;
    }

    const render = (index) => {
      if (!loadedImages[index]) return;
      
      // Calculate aspect ratio to cover canvas
      const img = loadedImages[index];
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgAspect;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      render(Math.floor(progress * (frameCount - 1)));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // GSAP ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Smooth scrubbing
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (frameCount - 1));
          setProgress(self.progress);
          render(frameIndex);
        }
      }
    });

    // Animate text overlay - Gone exactly by frame 21 (25% scroll)
    gsap.to(".hero-text-overlay", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "25% top", // Ends exactly at 25% of the container scroll (Frame 21)
        scrub: true, // No delay for precision
      },
      opacity: 0,
      y: -150,
      ease: "power1.in"
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, [images.length === 0]); // Only run once on mount

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block object-cover"
        />
        
        {/* Floating Text Overlay */}
        <div className="hero-text-overlay absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <span className="inline-block text-[#0071e3] text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4 opacity-0 animate-fade-in-down">
            Potência sem Limites
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
            LEO DESIGN<span className="text-[#0071e3]">.</span>
          </h1>
          <p className="text-neutral-400 text-base md:text-xl max-w-xl font-medium tracking-tight">
            A excelência do ecossistema Apple com a curadoria impecável de quem entende de design.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
          <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default ScrollSequenceBanner;
