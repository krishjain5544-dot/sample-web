import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import Scene from './components/Scene';
import Hero from './components/Hero';
import WhyVelocity from './components/WhyVelocity';
import Collection from './components/Collection';
import Contact from './components/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export type BikeType = 'city' | 'mountain' | 'electric';

export default function App() {
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!bgRef.current || !canvasContainerRef.current) return;
    
    // Intro Animation: Start sharp, then blur after the 360 spin (2.5s)
    gsap.fromTo(canvasContainerRef.current, 
      { filter: 'blur(0px)' },
      { 
        filter: 'blur(10px)', 
        duration: 1.5, 
        delay: 2.5,
        ease: "power2.inOut"
      }
    );

    // Fade out the 3D canvas when entering the WhyVelocity section
    const fadeOutTween = gsap.to(canvasContainerRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: '.why-velocity-container',
        start: 'top bottom',
        end: 'top center',
        scrub: true,
      }
    });

    return () => {
      fadeOutTween.scrollTrigger?.kill();
      fadeOutTween.kill();
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden text-slate-800 font-sans selection:bg-sage-200">
      <div ref={bgRef} className="fixed inset-0 z-[-1] bg-[#F9F6F0]" />
      
      {/* 3D Canvas fixed in background, initially sharp */}
      <div 
        ref={canvasContainerRef} 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{ filter: 'blur(0px)' }}
      >
        <Canvas shadows camera={{ position: [0, 0, 12], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene bikeType="mountain" />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Section */}
      <div className="hero-container relative z-10 w-full">
        <Hero />
      </div>

      {/* Scrollytelling Features Section */}
      <div className="why-velocity-container relative z-10 w-full">
        <WhyVelocity />
      </div>

      {/* Collection Section */}
      <Collection />

      {/* Contact Section */}
      <Contact />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl transition-all duration-300 hover:bg-slate-800 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
