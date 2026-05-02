import { useState } from 'react';
import MaintenanceHatch from './modals/MaintenanceHatch';

export default function Footer() {
  const [hatchOpen, setHatchOpen] = useState(false);

  return (
    <>
      <footer className="relative z-10 border-t border-teal-800/20 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-gold-300 text-lg">TC</span>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setHatchOpen(true)}
              className="text-red-400/70 hover:text-red-300 text-xs tracking-widest transition-colors duration-300 font-mono px-4 py-2 rounded-lg bg-red-900/20 hover:bg-red-800/30 border border-red-700/50 hover:border-red-600/60"
              aria-label="Open Maintenance Hatch"
            >
              ⌘ Maintenance Hatch
            </button>
          </div>
          <p className="text-warm-300/30 text-xs text-right">
            &copy; {new Date().getFullYear()} Tiffany Castro
          </p>
        </div>
      </footer>

      {hatchOpen && <MaintenanceHatch onClose={() => setHatchOpen(false)} />}
    </>
  );
}
