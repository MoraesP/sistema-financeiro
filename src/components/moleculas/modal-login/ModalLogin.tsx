import { Button } from "@/components/atoms/button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormLogin } from "../form-login/FormLogin";
import Modal from "../modal/Modal";
import http from "@/http";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

export const ModalLogin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserProfile = () => {
    http
      .get("auth/profile")
      .then((response) => {
        dispatch(setUser(response.data));
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Usuário não encontrado", error);
      });
  };

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
            getUserProfile();
          }}
        />
      </Modal>
    </>
  );
};
