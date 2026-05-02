import { useEffect, useRef, useState, useMemo } from 'react';
import BaseModal from './BaseModal';

interface Props {
  onClose: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle';
}

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useMemo<Particle[]>(() => {
    const colors = ['#c9a04a', '#3bbcbc', '#f7f3ee', '#d9b86a', '#d4814f', '#e8cf9a'];
    return Array.from({ length: 60 }, (_, id) => ({
      id,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 9 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.45 ? 'rect' : 'circle',
    }));
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pts = particles.map((p) => ({ ...p }));
    const MAX_FRAMES = 90;
    let frame = 0;
    let raf: number;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const opacity = Math.max(0, 1 - frame / MAX_FRAMES);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        ctx.restore();
      });

      frame++;
      if (frame < MAX_FRAMES) {
        raf = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      aria-hidden="true"
    />
  );
}

export default function MaintenanceHatch({ onClose }: Props) {
  const [alarming, setAlarming] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasFlashed = useRef(false);

  useEffect(() => {
    if (hasFlashed.current) return;
    hasFlashed.current = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      setAlarming(true);
      setShowConfetti(true);
      const alarmTimer = setTimeout(() => setAlarming(false), 1600);
      const confettiTimer = setTimeout(() => setShowConfetti(false), 1800);
      return () => {
        clearTimeout(alarmTimer);
        clearTimeout(confettiTimer);
      };
    }
  }, []);

  return (
    <>
      {showConfetti && <ConfettiCanvas />}
      <BaseModal
        title="Maintenance Hatch"
        onClose={onClose}
        panelClassName={alarming ? 'hatch-alarm' : ''}
      >
        <div className="space-y-3 mb-8">
          <p className="text-warm-300 leading-relaxed">
            You couldn't leave it alone, could you?
          </p>
          <p className="text-warm-300 leading-relaxed">
            I respect that.
          </p>
          <p className="text-warm-300 leading-relaxed">
            I design systems for people like you who can't help but explore how things work.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-teal-700/40 hover:bg-teal-600/50 border border-teal-600/40 hover:border-teal-500/60 text-teal-300 hover:text-teal-200 text-sm font-medium tracking-wide transition-all duration-200"
          >
            Close Hatch
          </button>
        </div>
      </BaseModal>
    </>
  );
}
