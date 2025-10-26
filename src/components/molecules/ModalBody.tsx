interface ModalBodyProps {
  children: React.ReactNode;
}

export const ModalBody = ({ children }: ModalBodyProps) => (
  <div className="px-6 py-4 flex-1 overflow-y-auto">{children}</div>
);
