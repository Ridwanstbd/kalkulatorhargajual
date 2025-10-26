"use client";

import { useState, useEffect } from "react";
import { ModalOverlay } from "../atoms/ModalOverlay";
import { ModalContent } from "../atoms/ModalContent";
import { ModalHeader } from "@/components/molecules/ModalHeader";
import { ModalBody } from "../molecules/ModalBody";
import { ModalFooter } from "../molecules/ModalFooter";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <ModalContent
          className={`transform transition-transform duration-300 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          <ModalHeader title={title} onClose={onClose} />
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalContent>
      </div>
    </>
  );
};
