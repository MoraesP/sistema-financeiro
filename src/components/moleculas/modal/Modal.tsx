import { CloseIcon } from "@/components/icons/CloseIcon";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (isOpen) {
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
    }

    const handleClose = () => onClose();

    dialogNode?.addEventListener("close", handleClose);

    return () => {
      dialogNode?.removeEventListener("close", handleClose);
    };
  }, [isOpen, onClose]);

  return (
    <dialog
      className="w-4/5 max-w-[800px] p-[32px_100px] border-none rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.1)] bg-white"
      ref={dialogRef}
    >
      <header className="flex justify-end">
        <button onClick={() => dialogRef?.current?.close()}>
          <CloseIcon />
        </button>
      </header>
      {children}
    </dialog>
  );
};

export default Modal;
