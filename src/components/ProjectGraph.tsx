import { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, Clock, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  complexity: number;
  scope: number;
  timeline: number;
  color: string;
  headingColor: string;
  tagColor: string;
  desc: string;
  metrics: { label: string; value: number; icon: JSX.Element }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Document Analysis Framework',
    category: 'Systems Thinking',
    complexity: 78,
    scope: 90,
    timeline: 85,
    color: '#c9a04a',
    headingColor: 'text-gold-400',
    tagColor: 'bg-gold-800/60 text-gold-300',
    desc: 'A repeatable 118-step methodology to untangle any organizational complexity.',
    metrics: [
      { label: 'Complexity', value: 78, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 90, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 85, icon: <Clock size={14} /> },
    ],
  },
  {
    id: 2,
    title: 'Comply365 Document Conversion',
    category: 'Enterprise Integration',
    complexity: 92,
    scope: 70,
    timeline: 60,
    color: '#3bbcbc',
    headingColor: 'text-teal-400',
    tagColor: 'bg-teal-800/60 text-teal-300',
    desc: 'Converting AQP/DIG docs from Word to XTML via automation and version control.',
    metrics: [
      { label: 'Complexity', value: 92, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 70, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 60, icon: <Clock size={14} /> },
    ],
  },
  {
    id: 3,
    title: 'AQP Change Management Integration',
    category: 'Compliance & Orchestration',
    complexity: 85,
    scope: 82,
    timeline: 75,
    color: '#d4814f',
    headingColor: 'text-copper-300',
    tagColor: 'bg-copper-600/30 text-copper-300',
    desc: 'Cross-system compliance integration with audit trails across multiple departments.',
    metrics: [
      { label: 'Complexity', value: 85, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 82, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 75, icon: <Clock size={14} /> },
    ],
  },
  {
    id: 4,
    title: 'N Drive → SharePoint Migration',
    category: 'Digital Transformation',
    complexity: 68,
    scope: 95,
    timeline: 90,
    color: '#e8cf9a',
    headingColor: 'text-warm-200',
    tagColor: 'bg-warm-200/10 text-warm-200',
    desc: 'Legacy 7-year system migration with legal retention compliance and document verification.',
    metrics: [
      { label: 'Complexity', value: 68, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 95, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 90, icon: <Clock size={14} /> },
    ],
  },
];

export default function ProjectGraph() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  const next = () => setActiveIndex((i) => (i + 1) % projects.length);
  const prev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div className="w-full">
      {/* Main carousel card */}
      <div className="relative mb-6 overflow-hidden">
        {/* Card background glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-2xl opacity-20"
          style={{ background: project.color }}
        />

        <div
          className="relative card-base border rounded-2xl p-8 md:p-10 transition-all duration-500"
          style={{
            borderColor: `${project.color}40`,
            background: `linear-gradient(135deg, rgba(${parseInt(project.color.slice(1, 3), 16)},${parseInt(project.color.slice(3, 5), 16)},${parseInt(project.color.slice(5, 7), 16)},0.08) 0%, rgba(10,22,40,0.8) 100%)`,
          }}
        >
          {/* Project number */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-baseline gap-2">
              <span
                className="font-display text-5xl font-bold leading-none"
                style={{ color: project.color }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-warm-300/50 text-sm">/04</span>
            </div>
            <span className={`tag ${project.tagColor} text-[11px]`}>{project.category}</span>
          </div>

          {/* Title */}
          <h3 className={`text-2xl md:text-3xl font-semibold ${project.headingColor} mb-2 leading-tight`}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-warm-300/80 text-base leading-relaxed mb-8 max-w-2xl">{project.desc}</p>

          {/* Metrics grid */}
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: project.color }} className="opacity-70">
                    {m.icon}
                  </span>
                  <span className="text-warm-300/60 text-xs tracking-widest uppercase font-medium">
                    {m.label}
                  </span>
                </div>

                {/* Metric bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-navy-700/60 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${m.value}%`,
                        background: `linear-gradient(90deg, ${project.color}80, ${project.color}cc)`,
                      }}
                    />
                  </div>
                  <span className={`text-xs font-semibold min-w-[28px] text-right`} style={{ color: project.color }}>
                    {m.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation + Indicators */}
      <div className="flex items-center justify-between gap-4">
        {/* Left nav */}
        <button
          onClick={prev}
          className="flex-shrink-0 w-10 h-10 rounded-lg border border-warm-300/20 hover:border-gold-500/50 text-warm-300 hover:text-gold-300 flex items-center justify-center transition-all duration-200 hover:bg-navy-700/50"
          aria-label="Previous project"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 flex-1">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8' : 'w-2 hover:opacity-70'
              }`}
              style={{
                background: i === activeIndex ? p.color : `${p.color}40`,
                opacity: i === activeIndex ? 1 : 0.5,
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Right nav */}
        <button
          onClick={next}
          className="flex-shrink-0 w-10 h-10 rounded-lg border border-warm-300/20 hover:border-gold-500/50 text-warm-300 hover:text-gold-300 flex items-center justify-center transition-all duration-200 hover:bg-navy-700/50"
          aria-label="Next project"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Quick links */}
      <div className="flex gap-2 mt-6 flex-wrap">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(i)}
            className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 border ${
              i === activeIndex
                ? 'border-transparent'
                : 'border-warm-300/20 hover:border-warm-300/40'
            }`}
            style={{
              background: i === activeIndex ? `${p.color}20` : 'transparent',
              color: i === activeIndex ? p.color : 'rgba(232,207,154,0.6)',
            }}
          >
            {p.title.split('—')[0].trim()}
          </button>
        ))}
      </div>
    </div>
  );
}
