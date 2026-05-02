import { Puzzle, Settings, ShieldCheck, FileSearch } from 'lucide-react';

const pillars = [
  {
    icon: Puzzle,
    title: 'Process Systematization',
    desc: 'Taking organizational chaos and building methodology to untangle it—step by step, dependency by dependency.',
    color: 'text-gold-400',
    border: 'border-gold-700/40',
    bg: 'bg-gold-900/20',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    desc: 'Reading the requirements others skip. Building FAA-compliant frameworks with audit trails baked in from day one.',
    color: 'text-teal-400',
    border: 'border-teal-700/40',
    bg: 'bg-teal-900/20',
  },
  {
    icon: Settings,
    title: 'Enterprise Integration',
    desc: 'Connecting disparate platforms—SharePoint, Smartsheet, Comply365, HR systems—into unified, trackable workflows.',
    color: 'text-copper-400',
    border: 'border-copper-600/30',
    bg: 'bg-copper-600/10',
  },
  {
    icon: FileSearch,
    title: 'Digital Transformation',
    desc: 'Modernizing legacy systems at enterprise scale. The unglamorous, critical work that everyone postpones—done right.',
    color: 'text-gold-300',
    border: 'border-gold-700/30',
    bg: 'bg-gold-900/10',
  },
];

export default function Pillars() {
  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p) => (
          <div
            key={p.title}
            className={`card-base ${p.border} ${p.bg} flex flex-col gap-3`}
          >
            <div className={`${p.color} mb-1`}>
              <p.icon size={26} strokeWidth={1.5} />
            </div>
            <h3 className={`font-semibold text-sm tracking-wide ${p.color}`}>{p.title}</h3>
            <p className="text-warm-300/70 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
