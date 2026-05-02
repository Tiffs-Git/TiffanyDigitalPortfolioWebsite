import { useEffect, useRef } from 'react';

// ── Shared data ──────────────────────────────────────────────────────────────

const tagGroups = [
  {
    heading: 'Systems & Compliance',
    color: '#c9a04a',
    textClass: 'text-gold-300',
    borderClass: 'border-gold-700/40',
    bgClass: 'bg-gold-900/20',
    tags: [
      'Process Mapping',
      'Regulatory Compliance (FAA/AQP)',
      'Change Management',
      'Risk Assessment',
      'Enterprise Architecture',
      'Audit Trail Design',
      'Quality Frameworks',
    ],
  },
  {
    heading: 'Digital Platforms',
    color: '#3bbcbc',
    textClass: 'text-teal-300',
    borderClass: 'border-teal-700/40',
    bgClass: 'bg-teal-900/20',
    tags: [
      'SharePoint',
      'M365 Purview',
      'Smartsheet',
      'Comply365 / XTML',
      'Power Automate',
      'Power Apps',
      'XML / XSD',
      'UiPath (RPA)',
    ],
  },
  {
    heading: 'AI & Automation',
    color: '#d4814f',
    textClass: 'text-copper-300',
    borderClass: 'border-copper-600/40',
    bgClass: 'bg-navy-800/40',
    tags: [
      'AI Agent Development',
      'Conversational AI',
      'Workflow Automation',
      'NLP Search Design',
      'RPA (UiPath)',
      'Claude / Anthropic',
      'PowerShell Scripting',
    ],
  },
  {
    heading: 'Leadership & Execution',
    color: '#ede6db',
    textClass: 'text-warm-200',
    borderClass: 'border-warm-300/20',
    bgClass: 'bg-navy-800/30',
    tags: [
      'Cross-Functional Leadership',
      'Stakeholder Management',
      'Technical Writing',
      'Working Session Facilitation',
      'WATS Annual Delegate',
      'IATA Working Groups',
      '3,500+ People Onboarded',
    ],
  },
];

const capabilities = [
  {
    color: '#c9a04a',
    what: 'FAA/IOSA-defensible documentation systems',
    how: 'XML/XSD structured content architecture, dependency mapping, audit trail design',
  },
  {
    color: '#3bbcbc',
    what: 'Compliance infrastructure that runs without manual intervention',
    how: 'Power Automate workflows, auto-triggered forms, RPA (UiPath), Smartsheet orchestration',
  },
  {
    color: '#d4814f',
    what: 'Enterprise knowledge environments that people actually use',
    how: 'SharePoint governance, fleet-wide taxonomy, metadata modeling, document lifecycle management',
  },
  {
    color: '#e8cf9a',
    what: 'AI tools that solve real operational search problems',
    how: 'Conversational AI agent development, NLP search design, requirements & acceptance criteria',
  },
  {
    color: '#ede6db',
    what: 'Cross-functional alignment on systems that were previously siloed',
    how: 'Working sessions across pilots, TechOps, and operational leadership — decisions, not just discussion',
  },
];

// ── Option B: Tag Cloud ──────────────────────────────────────────────────────

function TagCloud() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tagGroups.map((group) => (
        <div key={group.heading} className={`rounded-xl border p-5 ${group.borderClass} bg-navy-900/40`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.color }} />
            <h3 className={`text-xs font-semibold tracking-widest uppercase ${group.textClass}`}>
              {group.heading}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 ${group.borderClass} ${group.bgClass} ${group.textClass}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Option C: Capability Statement ──────────────────────────────────────────

function CapabilityStatement() {
  return (
    <div className="space-y-4">
      {/* Column headers */}
      <div className="grid grid-cols-2 gap-6 px-4 mb-2">
        <p className="text-xs tracking-widest uppercase font-semibold text-teal-400">What I Deliver</p>
        <p className="text-xs tracking-widest uppercase font-semibold text-gold-400">How I Do It</p>
      </div>

      {capabilities.map((cap, i) => (
        <div
          key={i}
          className="grid grid-cols-2 gap-6 rounded-xl border p-4 transition-all duration-200 hover:border-warm-300/20"
          style={{ borderColor: `${cap.color}25`, background: `${cap.color}08` }}
        >
          {/* What */}
          <div className="flex items-start gap-3">
            <span
              className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: cap.color }}
            />
            <p className="text-sm font-medium text-warm-100 leading-snug">{cap.what}</p>
          </div>
          {/* How */}
          <div className="flex items-start gap-3">
            <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-teal-500/60" />
            <p className="text-sm text-warm-300/70 leading-snug">{cap.how}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Skills component ────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
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
    <section id="skills" ref={sectionRef} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-gold-500/50" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Skills & Expertise</span>
        </div>

        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight">
            Areas of Expertise
          </h2>
        </div>

        <div className="reveal">
          <TagCloud />
        </div>
      </div>
    </section>
  );
}
