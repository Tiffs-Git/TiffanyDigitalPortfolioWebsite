import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add('visible');
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Coordinate grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,188,188,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,188,188,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(201,160,74,0.6) 0%, rgba(59,188,188,0.3) 40%, transparent 70%)',
          }}
        />
      </div>

      <div ref={titleRef} className="reveal relative z-10 text-center max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-teal-400 text-xs tracking-[0.3em] uppercase font-medium">
            Aviation · Compliance Infrastructure · AI & Automation
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-warm-100 mb-4 leading-tight tracking-tight">
          <span className="block text-5xl md:text-7xl lg:text-8xl">Tiffany Castro</span>
          <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 text-gradient-gold">Regulatory Systems Architect</span>
        </h1>

        {/* Location */}
        <p className="text-teal-300 text-sm md:text-base tracking-wider mb-10 opacity-90">
          Atlanta, GA &nbsp;·&nbsp; Open to relocation
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <a
            href="#projects"
            className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-sm tracking-widest uppercase rounded transition-all duration-200 glow-gold"
          >
            View My Work
          </a>
          <a
            href="#about"
            className="px-8 py-3 border border-teal-500/60 text-teal-300 hover:border-teal-400 hover:text-teal-200 font-medium text-sm tracking-widest uppercase rounded transition-all duration-200"
          >
            About Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warm-300/50 hover:text-gold-300 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
