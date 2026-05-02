interface Props {
  flip?: boolean;
}

export default function SectionDivider({ flip }: Props) {
  return (
    <div className={`relative z-10 flex items-center justify-center py-1 px-6 ${flip ? 'scale-x-[-1]' : ''}`}>
      <div className="max-w-6xl w-full flex items-center gap-2 opacity-30">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-600 to-transparent" />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 1C9 1 5 5 5 9C5 13 9 17 9 17C9 17 13 13 13 9C13 5 9 1 9 1Z"
            fill="none"
            stroke="#c9a04a"
            strokeWidth="1"
            opacity="0.8"
          />
          <circle cx="9" cy="9" r="2" fill="#c9a04a" opacity="0.6" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-600 to-transparent" />
      </div>
    </div>
  );
}
