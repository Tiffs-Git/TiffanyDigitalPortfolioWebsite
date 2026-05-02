import { useState } from 'react';

interface SpokeItem {
  label: string;
  type: 'highlight' | 'skill';
}

interface HubProject {
  id: number;
  title: string;
  titleLines: string[];   // for SVG text wrapping
  category: string;
  color: string;
  highlights: string[];
  skills: string[];
  desc: string;
}

const hubProjects: HubProject[] = [
  {
    id: 1,
    title: 'XML/XSD Document Architecture',
    titleLines: ['XML/XSD Document', 'Architecture'],
    category: 'Regulatory Systems Design',
    color: '#c9a04a',
    desc: 'First machine-readable dependency map between regulatory docs at Delta Flight Ops.',
    highlights: [
      'FAA/IOSA Audit-Ready',
      'Dependency Mapping',
      'Zero Manual Tracking',
      'Queryable Interface',
    ],
    skills: [
      'XML / XSD',
      'Structured Authoring',
      'HTML Interface',
      'Compliance Tracing',
    ],
  },
  {
    id: 2,
    title: 'Conversational AI Agent',
    titleLines: ['Conversational', 'AI Agent'],
    category: 'AI & Automation',
    color: '#3bbcbc',
    desc: 'First AI-powered search tool across all Delta Flight Ops documentation.',
    highlights: [
      'NLP Search',
      'First at Delta',
      'Faster Retrieval',
      'Vendor Co-Dev',
    ],
    skills: [
      'AI Agent Design',
      'Requirements Def.',
      'Flight Ops Docs',
      'Acceptance Criteria',
    ],
  },
  {
    id: 3,
    title: 'Fleet Docs Reconstruction',
    titleLines: ['Fleet Docs', 'Reconstruction'],
    category: 'Information Architecture',
    color: '#d4814f',
    desc: '7 fleets, 210+ pages → ~70. 100% adoption in 30 days.',
    highlights: [
      '66% Page Reduction',
      '100% Adoption',
      'Fleet Taxonomy',
      '30-Day Rollout',
    ],
    skills: [
      'SharePoint',
      'Metadata Modeling',
      'Document Governance',
      'Stakeholder Training',
    ],
  },
  {
    id: 4,
    title: 'Training Workflow Automation',
    titleLines: ['Training Workflow', 'Automation'],
    category: 'Compliance & Orchestration',
    color: '#e8cf9a',
    desc: 'Cycle time cut from 20 days → 10 days. Zero missed regulatory deadlines.',
    highlights: [
      '20 → 10 Day Cycle',
      'Zero Missed Deadlines',
      'Auto-Triggered Forms',
      'Structured Feedback',
    ],
    skills: [
      'Power Automate',
      'Workflow Design',
      'Compliance Capture',
      'Smartsheet',
    ],
  },
];

// SVG layout constants
const W = 840;
const H = 460;
const CX = W / 2;      // 420
const CY = H / 2;      // 230
const HUB_W = 210;
const HUB_H = 120;
const HUB_X = CX - HUB_W / 2;   // 315
const HUB_Y = CY - HUB_H / 2;   // 170
const HUB_LEFT_X = HUB_X;        // 315
const HUB_RIGHT_X = HUB_X + HUB_W; // 525
const NODE_Y = [105, 185, 275, 355];

const HIGHLIGHT_X = 115;
const SKILL_X = W - HIGHLIGHT_X;   // 725

function calcHubEdge(nodeX: number, nodeY: number, isLeft: boolean) {
  // Edge point on hub rect boundary for a line going toward nodeX, nodeY
  const edgeX = isLeft ? HUB_LEFT_X : HUB_RIGHT_X;
  // Interpolate y along edge so lines fan out nicely
  const t = (nodeY - NODE_Y[0]) / (NODE_Y[NODE_Y.length - 1] - NODE_Y[0]);
  const edgeY = HUB_Y + 20 + t * (HUB_H - 40);
  return { x: edgeX, y: edgeY };
}

function SpokeLines({ project }: { project: HubProject }) {
  const color = project.color;
  return (
    <>
      {project.highlights.map((_, i) => {
        const nodeX = HIGHLIGHT_X;
        const nodeY = NODE_Y[i];
        const edge = calcHubEdge(nodeX, nodeY, true);
        return (
          <line
            key={`h${i}`}
            x1={edge.x}
            y1={edge.y}
            x2={nodeX}
            y2={nodeY}
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeDasharray="4 3"
          />
        );
      })}
      {project.skills.map((_, i) => {
        const nodeX = SKILL_X;
        const nodeY = NODE_Y[i];
        const edge = calcHubEdge(nodeX, nodeY, false);
        return (
          <line
            key={`s${i}`}
            x1={edge.x}
            y1={edge.y}
            x2={nodeX}
            y2={nodeY}
            stroke="#3bbcbc"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeDasharray="4 3"
          />
        );
      })}
    </>
  );
}

function HubRect({ project }: { project: HubProject }) {
  const col = project.color;
  // Parse hex to RGB for gradients
  const r = parseInt(col.slice(1, 3), 16);
  const g = parseInt(col.slice(3, 5), 16);
  const b = parseInt(col.slice(5, 7), 16);
  const gradId = `hub-grad-${project.id}`;
  const glowId = `hub-glow-${project.id}`;

  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`rgba(${r},${g},${b},0.20)`} />
          <stop offset="100%" stopColor="rgba(10,22,40,0.70)" />
        </linearGradient>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow shadow */}
      <rect
        x={HUB_X - 6}
        y={HUB_Y - 6}
        width={HUB_W + 12}
        height={HUB_H + 12}
        rx="22"
        fill={`rgba(${r},${g},${b},0.12)`}
        filter={`url(#${glowId})`}
      />

      {/* Main hub rectangle */}
      <rect
        x={HUB_X}
        y={HUB_Y}
        width={HUB_W}
        height={HUB_H}
        rx="16"
        fill={`url(#${gradId})`}
        stroke={col}
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />

      {/* Category label */}
      <text
        x={CX}
        y={HUB_Y + 22}
        textAnchor="middle"
        fontSize="9"
        fill={col}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.12em"
        opacity="0.85"
        style={{ textTransform: 'uppercase' }}
      >
        {project.category}
      </text>

      {/* Title lines */}
      {project.titleLines.map((line, i) => (
        <text
          key={i}
          x={CX}
          y={HUB_Y + 45 + i * 20}
          textAnchor="middle"
          fontSize="15"
          fontWeight="600"
          fill="#f7f3ee"
          fontFamily="'Playfair Display', Georgia, serif"
        >
          {line}
        </text>
      ))}

      {/* Description (truncated) */}
      <text
        x={CX}
        y={HUB_Y + 99}
        textAnchor="middle"
        fontSize="9.5"
        fill="rgba(221,208,191,0.65)"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {project.desc.length > 52 ? project.desc.slice(0, 52) + '…' : project.desc}
      </text>
    </>
  );
}

function NodeDot({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <circle cx={x} cy={y} r="5" fill={color} fillOpacity="0.9" />
  );
}

export default function HubSpoke() {
  const [activeId, setActiveId] = useState(1);
  const project = hubProjects.find((p) => p.id === activeId) ?? hubProjects[0];

  return (
    <div className="w-full">
      {/* Project selector tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {hubProjects.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 border ${
              p.id === activeId
                ? 'border-transparent text-navy-950 font-semibold'
                : 'border-warm-300/20 text-warm-300/70 hover:border-warm-300/40 hover:text-warm-200 bg-transparent'
            }`}
            style={
              p.id === activeId
                ? { background: p.color }
                : {}
            }
          >
            {p.title.split('→')[0].trim().split(' ').slice(0, 3).join(' ')}
            {p.title.includes('→') ? ' →…' : ''}
          </button>
        ))}
      </div>

      {/* SVG visualization */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 320, maxWidth: '100%' }}
          aria-label={`Hub-and-spoke diagram for ${project.title}`}
          role="img"
        >
          {/* Spoke lines */}
          <SpokeLines project={project} />

          {/* Left highlight nodes */}
          {project.highlights.map((label, i) => (
            <g key={`hl${i}`}>
              <NodeDot x={HIGHLIGHT_X} y={NODE_Y[i]} color={project.color} />
              <text
                x={HIGHLIGHT_X - 12}
                y={NODE_Y[i] + 4}
                textAnchor="end"
                fontSize="11.5"
                fontFamily="Inter, system-ui, sans-serif"
                fill={project.color}
                fontWeight="500"
              >
                {label}
              </text>
            </g>
          ))}

          {/* Right skill nodes */}
          {project.skills.map((label, i) => (
            <g key={`sk${i}`}>
              <NodeDot x={SKILL_X} y={NODE_Y[i]} color="#3bbcbc" />
              <text
                x={SKILL_X + 12}
                y={NODE_Y[i] + 4}
                textAnchor="start"
                fontSize="11.5"
                fontFamily="Inter, system-ui, sans-serif"
                fill="#3bbcbc"
                fontWeight="500"
              >
                {label}
              </text>
            </g>
          ))}

          {/* Hub */}
          <HubRect project={project} />
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-3 pl-1">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
            style={{ background: project.color }}
          />
          <span className="text-xs text-warm-300/60 tracking-wide">Highlights</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full inline-block bg-teal-400 flex-shrink-0" />
          <span className="text-xs text-warm-300/60 tracking-wide">Skills</span>
        </div>
      </div>
    </div>
  );
}
