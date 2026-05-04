import { useEffect, useRef } from 'react';
import { Mail, Linkedin, MessageSquare, Clock, Briefcase } from 'lucide-react';

const availableFor = [
  'AI Agent design and multi-step workflow automation',
  'Compliance engineering — from mapping requirements to deployable solutions',
  'Digital transformation for legacy systems integration',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-teal-500/50" />
          <span className="text-teal-400 text-xs tracking-[0.3em] uppercase font-medium">Get In Touch</span>
        </div>

        <div className="reveal mb-10">
          <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight mb-4">
            Let's Build Something<br />
            <span className="text-gradient-teal">Futuristic</span>
          </h2>
          <p className="text-warm-300/70 text-lg leading-relaxed max-w-xl">
            Whether you need a framework built, a messy system untangled, or a perspective on compliance and digital transformation—let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact card */}
          <div className="reveal card-base border-gold-700/30 space-y-5">
            <a
              href="mailto:tiffanycastro83@yahoo.com?subject=Inquiry Request for Tiffany"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gold-800/40 border border-gold-700/40 flex items-center justify-center group-hover:bg-gold-700/50 transition-colors">
                <Mail size={16} className="text-gold-300" />
              </div>
              <div>
                <p className="text-warm-300/60 text-xs tracking-widest uppercase mb-0.5">Email</p>
                <p className="text-gold-300 text-sm group-hover:text-gold-200 transition-colors">
                  tiffanycastro83@yahoo.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/tiffany-castro-00679a1a1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-800/40 border border-teal-700/40 flex items-center justify-center group-hover:bg-teal-700/50 transition-colors">
                <Linkedin size={16} className="text-teal-300" />
              </div>
              <div>
                <p className="text-warm-300/60 text-xs tracking-widest uppercase mb-0.5">LinkedIn</p>
                <p className="text-teal-300 text-sm group-hover:text-teal-200 transition-colors">
                  Connect on LinkedIn
                </p>
              </div>
            </a>

            <div className="pt-2 border-t border-gold-800/20 space-y-3">
              
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy-800/60 border border-warm-300/10 flex items-center justify-center">
                  <Briefcase size={16} className="text-warm-300/50" />
                </div>
                <div>
                  <p className="text-warm-300/60 text-xs tracking-widest uppercase mb-0.5">Work Format</p>
                  <p className="text-warm-200 text-sm">Remote · Contract · Full-time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy-800/60 border border-warm-300/10 flex items-center justify-center">
                  <Clock size={16} className="text-warm-300/50" />
                </div>
                <div>
                  <p className="text-warm-300/60 text-xs tracking-widest uppercase mb-0.5">Response Time</p>
                  <p className="text-warm-200 text-sm">Typically within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Available for */}
          <div className="reveal card-base border-teal-700/30">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare size={16} className="text-teal-400" />
              <p className="text-teal-400 text-xs tracking-[0.2em] uppercase font-medium">Available For</p>
            </div>
            <div className="space-y-3">
              {availableFor.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 mt-2" />
                  <p className="text-warm-300/80 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-teal-800/30">
              <a
                href="mailto:tiffanycastro83@yahoo.com"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-sm tracking-widest uppercase rounded transition-all duration-200 glow-gold"
              >
                <Mail size={15} />
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
