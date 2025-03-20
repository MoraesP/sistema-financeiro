import { useState } from "react";
import { Button } from "@/components/atoms/button/Button";
import Image from "next/image";
// import http from "@http";

interface FormRegisterProps {
  onRegister: () => void;
}

export const FormRegister = ({ onRegister }: FormRegisterProps) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(evt.target.checked);
  };

  const registerUser = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // http.post("/users", user).then(() => onRegister());
    onRegister();
  };

  return (
    <section>
      <Image
        src="/Register.png"
        className="mx-auto"
        alt="Registro"
        width={354}
        height={261}
      />
      <h2 className="my-8 text-2xl font-bold text-center">
        Preencha os campos abaixo para criar sua conta corrente!
      </h2>
      <form className="flex flex-col items-start gap-6" onSubmit={registerUser}>
        <fieldset className="border-none p-0 m-0 w-full">
          <label className="block font-bold text-lg mb-2">Nome</label>
          <input
            className="w-full text-lg p-4 border border-[#DEE9EA] rounded-lg"
            name="email"
            type="text"
            placeholder="Digite seu nome completo"
            value={user.name}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="border-none p-0 m-0 w-full">
          <label className="block font-bold text-lg mb-2">Email</label>
          <input
            className="w-full text-lg p-4 border border-[#DEE9EA] rounded-lg"
            name="email"
            type="email"
            placeholder="Digite seu email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="border-none p-0 m-0 w-full">
          <label className="block font-bold text-lg mb-2">Senha</label>
          <input
            className="w-[50%] text-lg p-4 border border-[#DEE9EA] rounded-lg"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={user.password}
            onChange={handleChange}
            required
          />
        </fieldset>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accept"
            className="h-4 w-4 accent-secondary-400 rounded"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="accept" className="text-sm">
            Li e estou ciente quanto às condições de tratamento dos meus dados
            conforme descrito na Política de Privacidade do banco.
          </label>
        </div>
        <footer className="w-full flex justify-center gap-4">
          <Button
            variant={isChecked ? "tertiary" : "primary"}
            buttonType={"regular"}
            disabled={!isChecked}
            type="submit"
          >
            Criar conta
          </Button>
        </footer>
      </form>
    </section>
  );
};
