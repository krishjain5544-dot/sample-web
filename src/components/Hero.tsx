import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const introRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introRef.current || !scrollRef.current) return;
    
    // Intro Pop-up Animation
    gsap.fromTo(introRef.current,
      { opacity: 0, scale: 0.8, y: 30 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 2.5, 
        ease: "back.out(1.5)" 
      }
    );

    // Scroll Animation - fades out and moves up on scroll, reverses on scroll up
    const tween = gsap.to(scrollRef.current, {
      opacity: 0,
      y: -100,
      scrollTrigger: {
        trigger: '.hero-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="h-screen w-full flex items-center justify-center relative pointer-events-none">
      <div ref={scrollRef} className="w-full">
        <div ref={introRef} className="text-center px-4 max-w-4xl mx-auto mt-[-10vh] opacity-0">
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-[#5A6B3B]"
            style={{
              textShadow: '0 10px 30px rgba(30, 41, 59, 0.2)'
            }}
          >
            VELOCITY
          </h1>
          <p className="text-xl md:text-3xl font-bold text-slate-800 drop-shadow-lg tracking-wide">
            Ride Nature. Precision engineering for every path.
          </p>
        </div>
      </div>
    </section>
  );
}
