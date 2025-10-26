interface ModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlay = ({ onClick }: ModalOverlayProps) => (
  <div className="fixed inset-0 bg-black/30 z-40" onClick={onClick} />
);
