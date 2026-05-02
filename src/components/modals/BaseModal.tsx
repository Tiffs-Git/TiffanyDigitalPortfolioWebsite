import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Extra class names for the inner modal panel */
  panelClassName?: string;
}

/**
 * Accessible modal wrapper.
 * - Closes on Escape key press.
 * - Closes on backdrop click.
 * - Minimal focus trap: focuses the modal panel on open.
 * - Scrolls body lock while open.
 */
export default function BaseModal({ title, onClose, children, panelClassName = '' }: BaseModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the panel
    panelRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative z-10 w-full max-w-lg rounded-2xl bg-navy-800 border border-teal-700/40 p-8 shadow-2xl outline-none ${panelClassName}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="font-display text-xl text-warm-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-warm-300/40 hover:text-warm-100 transition-colors p-1 -mr-1 rounded"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
