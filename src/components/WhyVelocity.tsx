import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyVelocity() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // 4 sections
        scrub: 1,
        pin: true,
      }
    });

    // --- Panel 1: Featherweight ---
    tl.to('.p1-tube', { 
        y: -60, 
        x: (i) => (i % 2 === 0 ? 30 : -30), 
        rotation: (i) => (i % 2 === 0 ? 25 : -25),
        opacity: 0, 
        stagger: 0.15, 
        duration: 1 
      }, 0)
      .to('.p1-petal', { opacity: 1, y: -40, x: (i) => (i % 2 === 0 ? 20 : -20), stagger: 0.2, duration: 1 }, 0)
      .to('.panel-1', { opacity: 0, duration: 0.5 }, 1);

    // --- Panel 2: Silent Boost ---
    tl.to(containerRef.current, { backgroundColor: '#fff0e6', duration: 0.5 }, 1)
      .to('.panel-2', { opacity: 1, duration: 0.5 }, 1.5)
      .fromTo('.p2-wheel', { rotation: 0 }, { rotation: 360, duration: 2, ease: "none", transformOrigin: "center" }, 1.5)
      .fromTo('.p2-wind', { strokeDashoffset: 150 }, { strokeDashoffset: -150, duration: 2, ease: "none" }, 1.5)
      .to('.p2-pulse', { scale: 2.5, opacity: 0, duration: 1, repeat: 1, transformOrigin: "center" }, 1.5)
      .to('.panel-2', { opacity: 0, duration: 0.5 }, 3.5);

    // --- Panel 3: Glide ---
    tl.to(containerRef.current, { backgroundColor: '#e6f0f5', duration: 0.5 }, 3.5)
      .to('.panel-3', { opacity: 1, duration: 0.5 }, 4)
      .to('.p3-bumps', { x: -60, duration: 2, ease: "none" }, 4)
      .to('.p3-wheel', { y: -10, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 4)
      .to('.p3-shock', { height: 30, y: -10, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, 4)
      .to('.p3-mist', { opacity: 0.8, scale: 2, duration: 2, transformOrigin: "center" }, 4)
      .to('.panel-3', { opacity: 0, duration: 0.5 }, 6);

    // --- Panel 4: Control ---
    tl.to(containerRef.current, { backgroundColor: '#e8ece1', duration: 0.5 }, 6)
      .to('.panel-4', { opacity: 1, duration: 0.5 }, 6.5)
      .to('.p4-gear', { rotation: 180, duration: 1.5, ease: "power2.out", transformOrigin: "center" }, 6.5)
      .to('.p4-disc', { rotation: 180, duration: 1.5, ease: "power2.out", transformOrigin: "center" }, 6.5)
      .to('.p4-caliper', { scaleY: 0.6, duration: 0.5, yoyo: true, repeat: 1, ease: "power4.in", transformOrigin: "center" }, 7)
      .to('.p4-arrow', { opacity: 1, strokeDashoffset: 0, duration: 1 }, 6.5);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-[#F9F6F0]">
      
      {/* Panel 1: Featherweight */}
      <div className="panel-1 absolute inset-0 flex flex-col md:flex-row items-center justify-center p-10 md:p-24">
        <div className="w-full md:w-1/2 pr-0 md:pr-12 z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-[#5a6b3b] mb-6">Featherweight Craftsmanship</h2>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
            Ride Pure Agility. Our ultra-light frames feel like an extension of yourself. Effortless speed on every path.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full relative flex items-center justify-center mt-8 md:mt-0">
          <svg viewBox="0 0 200 200" className="w-full max-w-md h-auto overflow-visible">
            {/* Abstract bike frame */}
            <g transform="translate(10, 20)">
              <line className="p1-tube" x1="40" y1="120" x2="100" y2="120" stroke="#5a6b3b" strokeWidth="6" strokeLinecap="round"/>
              <line className="p1-tube" x1="100" y1="120" x2="140" y2="60" stroke="#5a6b3b" strokeWidth="6" strokeLinecap="round"/>
              <line className="p1-tube" x1="140" y1="60" x2="60" y2="60" stroke="#5a6b3b" strokeWidth="6" strokeLinecap="round"/>
              <line className="p1-tube" x1="60" y1="60" x2="40" y2="120" stroke="#5a6b3b" strokeWidth="6" strokeLinecap="round"/>
              <line className="p1-tube" x1="60" y1="60" x2="50" y2="30" stroke="#5a6b3b" strokeWidth="6" strokeLinecap="round"/>
              <line className="p1-tube" x1="140" y1="60" x2="150" y2="30" stroke="#5a6b3b" strokeWidth="6" strokeLinecap="round"/>
            </g>
            {/* Feathers / Petals */}
            <path className="p1-petal opacity-0" d="M 120 70 Q 130 50 140 70 Q 130 90 120 70" fill="#d98b54" />
            <path className="p1-petal opacity-0" d="M 60 90 Q 75 75 90 90 Q 75 105 60 90" fill="#6b9eb3" />
            <path className="p1-petal opacity-0" d="M 80 130 Q 90 110 100 130 Q 90 150 80 130" fill="#5a6b3b" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Panel 2: Silent Boost */}
      <div className="panel-2 absolute inset-0 flex flex-col md:flex-row items-center justify-center p-10 md:p-24 opacity-0">
        <div className="w-full md:w-1/2 pr-0 md:pr-12 z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-[#d98b54] mb-6">The Silent, Natural Boost</h2>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
            Power without Noise. Whisper-quiet electric assist that blends seamlessly with the sounds of the journey.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full relative flex items-center justify-center mt-8 md:mt-0">
          <svg viewBox="0 0 200 200" className="w-full max-w-md h-auto overflow-visible">
            {/* Path */}
            <path d="M -20 150 Q 100 180 220 130" stroke="#ffffff" strokeWidth="24" fill="none" strokeLinecap="round"/>
            {/* Wind lines */}
            <path className="p2-wind" d="M 20 80 Q 80 60 140 80" stroke="#6b9eb3" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="150"/>
            <path className="p2-wind" d="M 40 110 Q 100 90 160 110" stroke="#6b9eb3" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="150"/>
            {/* Wheel */}
            <g className="p2-wheel" transform="translate(100, 110)">
              <circle cx="0" cy="0" r="40" stroke="#d98b54" strokeWidth="6" fill="none" />
              <circle cx="0" cy="0" r="30" stroke="#d98b54" strokeWidth="2" strokeDasharray="10 10" fill="none" />
              <circle cx="0" cy="0" r="8" fill="#d98b54" />
              {/* Motor pulse */}
              <circle className="p2-pulse" cx="0" cy="0" r="8" fill="#d98b54" opacity="0.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* Panel 3: Glide */}
      <div className="panel-3 absolute inset-0 flex flex-col md:flex-row items-center justify-center p-10 md:p-24 opacity-0">
        <div className="w-full md:w-1/2 pr-0 md:pr-12 z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-[#6b9eb3] mb-6">Glide Over Any Terrain</h2>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
            Pure Comfort, Everywhere. Precision suspension tuned to smooth out life's rough edges, making every ride feel like gliding on clouds.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full relative flex items-center justify-center mt-8 md:mt-0">
          <svg viewBox="0 0 200 200" className="w-full max-w-md h-auto overflow-visible">
            {/* Bumps */}
            <path className="p3-bumps" d="M -20 160 Q 30 120 80 160 T 180 160 T 280 160" stroke="#ffffff" strokeWidth="12" fill="none" strokeLinecap="round"/>
            {/* Suspension */}
            <g transform="translate(100, 60)">
              <rect x="-8" y="-40" width="16" height="60" fill="#6b9eb3" rx="4" />
              <rect className="p3-shock" x="-4" y="20" width="8" height="40" fill="#cbd5e1" rx="2" />
              {/* Wheel */}
              <g className="p3-wheel" transform="translate(0, 60)">
                <circle cx="0" cy="0" r="35" stroke="#5a6b3b" strokeWidth="6" fill="none" />
                <circle cx="0" cy="0" r="25" stroke="#5a6b3b" strokeWidth="2" strokeDasharray="8 8" fill="none" />
                <circle cx="0" cy="0" r="6" fill="#5a6b3b" />
              </g>
            </g>
            {/* Mist */}
            <circle className="p3-mist" cx="100" cy="140" r="25" fill="#6b9eb3" opacity="0" filter="blur(8px)" />
          </svg>
        </div>
      </div>

      {/* Panel 4: Control */}
      <div className="panel-4 absolute inset-0 flex flex-col md:flex-row items-center justify-center p-10 md:p-24 opacity-0">
        <div className="w-full md:w-1/2 pr-0 md:pr-12 z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-[#5a6b3b] mb-6">Effortless Control</h2>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
            Total Confidence. Intuitive gearing and responsive braking. Power is nothing without absolute control.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full relative flex items-center justify-center mt-8 md:mt-0">
          <svg viewBox="0 0 200 200" className="w-full max-w-md h-auto overflow-visible">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#d98b54" />
              </marker>
            </defs>
            {/* Gears */}
            <g className="p4-gear" transform="translate(70, 100)">
              <circle cx="0" cy="0" r="45" stroke="#5a6b3b" strokeWidth="8" strokeDasharray="12 8" fill="none" />
              <circle cx="0" cy="0" r="25" stroke="#5a6b3b" strokeWidth="4" strokeDasharray="6 4" fill="none" />
              <circle cx="0" cy="0" r="8" fill="#5a6b3b" />
            </g>
            {/* Brake Disc & Caliper */}
            <g transform="translate(150, 100)">
              <circle className="p4-disc" cx="0" cy="0" r="35" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="20 5" fill="none" />
              <path className="p4-caliper" d="M -12 -40 L 12 -40 L 16 -15 L -16 -15 Z" fill="#d98b54" rx="2" />
              <circle cx="0" cy="0" r="5" fill="#cbd5e1" />
            </g>
            {/* Glowing arrows */}
            <path className="p4-arrow" d="M 40 40 A 60 60 0 0 1 100 40" stroke="#d98b54" strokeWidth="4" fill="none" markerEnd="url(#arrowhead)" opacity="0" strokeDasharray="100" strokeDashoffset="100" />
            <path className="p4-arrow" d="M 120 160 A 60 60 0 0 1 60 160" stroke="#d98b54" strokeWidth="4" fill="none" markerEnd="url(#arrowhead)" opacity="0" strokeDasharray="100" strokeDashoffset="100" />
          </svg>
        </div>
      </div>

    </div>
  );
}
