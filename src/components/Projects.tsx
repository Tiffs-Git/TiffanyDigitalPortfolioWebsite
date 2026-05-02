import { useEffect, useRef, useState } from 'react';
import ProjectPipeline from './ProjectPipeline';
import LAMModal from './modals/LAMModal';
import { PAGE_LOAD_TS } from '../lib/pageLoad';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lamOpen, setLamOpen] = useState(false);
  const [lamElapsed, setLamElapsed] = useState(0);

  function openLAM() {
    setLamElapsed(Math.round((performance.now() - PAGE_LOAD_TS) / 1000 * 10) / 10);
    setLamOpen(true);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-teal-500/50" />
            <span className="text-teal-400 text-xs tracking-[0.3em] uppercase font-medium">Work & Projects</span>
          </div>

          <div className="reveal mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight">
              Project Portfolio
            </h2>
            <p className="text-warm-300/60 text-base mt-3 max-w-xl">
              Real work. Real outcomes.
            </p>
          </div>

          <div className="reveal card-base border-teal-700/30 p-6">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-warm-300/60 text-xs tracking-widest uppercase font-medium">
                Process Flow
              </p>
              {/* LAM entry point */}
              <button
                onClick={openLAM}
                className="flex-shrink-0 px-3 py-1 rounded border border-teal-700/50 bg-teal-900/30 hover:bg-teal-800/40 hover:border-teal-600/60 text-teal-400 hover:text-teal-300 text-xs font-mono tracking-widest transition-all duration-200"
                aria-label="Open LAM"
              >
                LAM
              </button>
            </div>

            <ProjectPipeline />
          </div>
        </div>
      </section>

      {lamOpen && (
        <LAMModal
          elapsedSeconds={lamElapsed}
          onClose={() => setLamOpen(false)}
        />
      )}
    </>
  );
}
