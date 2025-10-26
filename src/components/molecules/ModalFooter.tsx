interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps) => (
  <div className="flex shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
    {children}
  </div>
);
