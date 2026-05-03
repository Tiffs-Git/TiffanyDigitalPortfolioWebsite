import { useEffect, useRef, useState } from 'react';
import { Flame, Heart, Plane } from 'lucide-react';
import SystemArtifact from './modals/SystemArtifact';
import profilePhoto from '../assets/comply365-london.jpeg';
import hangarPhoto from '../assets/hangar.jpeg';

const certs = [
  { label: 'Instructional Systems Design', year: '2025', color: 'text-teal-300 border-teal-700/40 bg-teal-900/20' },
  { label: 'Microsoft Power Platform', year: '2025', color: 'text-teal-300 border-teal-700/40 bg-teal-900/20' },
  { label: 'Lean Six Sigma Black Belt', year: '2024', color: 'text-gold-300 border-gold-700/40 bg-gold-900/20' },
  { label: 'Smartsheet Core', year: '2024', color: 'text-gold-300 border-gold-700/40 bg-gold-900/20' },
  { label: 'Lean Six Sigma Green Belt', year: '2023', color: 'text-gold-300 border-gold-700/40 bg-gold-900/20' },
  { label: 'Dangerous Goods Certified', year: '2022', color: 'text-copper-300 border-copper-600/40 bg-navy-800/40' },
  { label: 'Principles of Leadership', year: '2022', color: 'text-copper-300 border-copper-600/40 bg-navy-800/40' },
  { label: 'TESOL', year: '2021', color: 'text-warm-200 border-warm-300/20 bg-navy-800/30' },
  { label: 'TSSOL', year: '2021', color: 'text-warm-200 border-warm-300/20 bg-navy-800/30' },
  { label: 'AWS CLF-C02', year: 'In Progress', color: 'text-green-300 border-green-700/40 bg-green-900/20' },
];

const industryInvolvement = [
  { label: 'WATS Delegate', sub: 'World Aviation Training Summit' },
  { label: 'IOSA Audit Preparation', sub: 'IATA Operational Safety Audit' },
  { label: 'Cross-Airline Benchmarking', sub: 'Pilot training program comparisons' },
  { label: 'FAA AQP Oversight', sub: 'Advanced Qualification Program' },
  { label: 'Tech Ops Brand Ambassador', sub: 'Internal culture and communications' },
  { label: 'Training Video Production', sub: 'On-camera talent and content for Tech Ops training programs' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [artifactOpen, setArtifactOpen] = useState(false);

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
    <section id="about" ref={sectionRef} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="reveal flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-gold-500/50" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">About Me</span>
        </div>

        <div className="reveal mb-10">
          <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight">
            The Person Who Untangles<br />
            <span className="text-gradient-gold">Your Operational Complexity</span>
          </h2>
        </div>

        {/* Profile Card — two columns */}
        <div className="reveal rounded-2xl border border-gold-700/30 bg-navy-800/60 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT COLUMN: Photo + Bio + Outside the Office */}
            <div className="flex flex-col gap-5">
              {/* Photo + name header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex-shrink-0 border-2 border-gold-500/60 overflow-hidden">
                  <img
                    src={profilePhoto}
                    alt="Tiffany Castro"
                    className="w-full h-full object-cover object-[62%_15%] scale-[1.6] origin-top"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-warm-100 leading-tight">Tiffany Castro</h3>
                  <p className="text-teal-300/80 text-xs mt-0.5 tracking-wide">
                    Regulatory Systems Architect · Aviation · Compliance Infrastructure · AI &amp; Automation
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-warm-300/70 text-sm leading-relaxed">
                I'm the person you bring in when no one knows where to start. I dig into the mess, map what's actually happening, and build systems that are structured, traceable, and defensible. Lately that means adding the automation layer too — RPA, autonomous agents, and workflows that eliminate the manual redundant steps to save you time.
              </p>

              {/* Outside the Office */}
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold text-warm-300/40 mb-3">Outside the Office</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { icon: <Flame size={12} />, label: 'Hot Yoga' },
                    { icon: <Heart size={12} />, label: 'Cat Mom' },
                    { icon: <Plane size={12} />, label: 'Traveling' },
                  ].map((h) => (
                    <span key={h.label} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-fuchsia-600/40 bg-fuchsia-900/20 text-fuchsia-300 font-medium">
                      {h.icon}
                      {h.label}
                    </span>
                  ))}
                </div>
                {/* Hangar photo */}
                <div className="rounded-xl overflow-hidden border border-warm-300/10 h-36">
                  <img
                    src={hangarPhoto}
                    alt="Tiffany Castro in aircraft hangar"
                    className="w-full h-full object-cover object-[50%_30%]"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Certifications + Industry Involvement */}
            <div className="flex flex-col gap-6 lg:border-l lg:border-gold-700/20 lg:pl-8">

              {/* Certifications */}
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold text-warm-300/40 mb-3">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {certs.map((c) => (
                    <span key={c.label} className={`text-xs px-3 py-1.5 rounded-full border font-medium ${c.color}`}>
                      {c.label} · {c.year}
                    </span>
                  ))}
                </div>
              </div>

              {/* Industry Involvement */}
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold text-warm-300/40 mb-3">Industry Involvement</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {industryInvolvement.map((item) => (
                    <div key={item.label} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500/60 flex-shrink-0 mt-1.5" />
                      <div>
                        <p className="text-warm-200 text-xs font-medium leading-snug">{item.label}</p>
                        <p className="text-warm-300/40 text-xs leading-snug">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* System Artifact */}
        <div className="reveal mt-6 flex justify-end">
          <button
            onClick={() => setArtifactOpen(true)}
            className="flex items-center gap-2 text-teal-400/50 hover:text-teal-300 text-xs tracking-widest transition-colors duration-300 font-mono px-4 py-2 rounded-lg hover:bg-teal-900/20 border border-transparent hover:border-teal-800/40"
            title="System Artifact - for the curious"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60 animate-pulse-slow inline-block" />
            System Artifact
          </button>
        </div>
      </div>

      {artifactOpen && <SystemArtifact onClose={() => setArtifactOpen(false)} />}
    </section>
  );
}
