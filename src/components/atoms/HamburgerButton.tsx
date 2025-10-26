interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => (
  <button
    onClick={onClick}
    className="text-gray-700 hover:text-indigo-600 focus:outline-none"
    aria-label="Toggle menu"
  >
    <svg
      className={`h-6 w-6 transform transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);
