import { ModalCloseButton } from "../atoms/ModalCloseButton";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => (
  <div className="relative shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    <ModalCloseButton onClick={onClose} />
  </div>
);
