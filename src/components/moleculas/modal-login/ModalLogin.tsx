import { Button } from "@/components/atoms/button/Button";
import { useState } from "react";
import { FormLogin } from "../form-login/FormLogin";
import Modal from "../modal/Modal";
import { useRouter } from "next/navigation";

export const ModalLogin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Button
        variant={"secondary"}
        buttonType={"outlined"}
        onClick={() => setModalOpen(true)}
      >
        Já tenho conta
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormLogin
          onLogin={() => {
            setModalOpen(false);
            router.push("/dashboard");
          }}
        />
      </Modal>
    </>
  );
};
