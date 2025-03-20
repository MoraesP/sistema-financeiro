import { Button } from "@/components/atoms/button/Button";
import { useState } from "react";
import { FormRegister } from "../form-register/FormRegister";
import Modal from "../modal/Modal";

export const ModalRegister = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        variant={"secondary"}
        buttonType={"regular"}
        onClick={() => setModalOpen(true)}
      >
        Abrir minha conta
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormRegister
          onRegister={() => {
            setModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
