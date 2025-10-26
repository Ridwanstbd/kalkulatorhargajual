interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({
  children,
  className = "",
}: ModalContentProps) => (
  <div
    className={`bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden ${className}`}
  >
    {children}
  </div>
);
