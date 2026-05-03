import BaseModal from './BaseModal';
import { SYSTEM_ARTIFACT_ARTICLE_URL, SYSTEM_ARTIFACT_LINK_LABEL } from '../../lib/config';

interface Props {
  onClose: () => void;
}

export default function SystemArtifact({ onClose }: Props) {
  return (
    <BaseModal title="System Artifact" onClose={onClose}>
      <div className="space-y-3 mb-8">
        <p className="text-warm-300 leading-relaxed">
          You found the hidden gem!
        </p>
        <p className="text-warm-300 leading-relaxed">
          Not everyone looks this closely — but you did.
        </p>
        <p className="text-warm-300 leading-relaxed">
          And that's exactly the kind of curiosity that separates good operators from great ones.
        </p>
      </div>

      <div className="mb-8">
        <a
          href={SYSTEM_ARTIFACT_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 text-sm underline underline-offset-4 decoration-teal-600/50 hover:decoration-teal-400 transition-colors"
        >
          {SYSTEM_ARTIFACT_LINK_LABEL}
          <span aria-hidden="true" className="text-xs opacity-60">&#8599;</span>
        </a>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg bg-navy-700/60 hover:bg-navy-600/60 border border-navy-600/50 hover:border-navy-500/60 text-warm-300 hover:text-warm-200 text-sm font-medium tracking-wide transition-all duration-200"
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
}
