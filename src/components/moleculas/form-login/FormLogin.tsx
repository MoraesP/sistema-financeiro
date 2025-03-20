import { useState } from "react";
import { Button } from "@/components/atoms/button/Button";
import Image from "next/image";
import http from "@http";

interface FormLoginProps {
  onLogin: () => void;
}

export const FormLogin = ({ onLogin }: FormLoginProps) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const loginUser = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    http.post("auth/token", credentials).then((response) => {
      sessionStorage.setItem("token", response.data.accessToken);
      document.cookie = `token=${response.data.accessToken}; path=/; max-age=3600`;
      onLogin();
    });
  };

  return (
    <section>
      <Image
        src="/Login.png"
        className="mx-auto"
        alt="Login"
        width={330}
        height={267}
      />
      <h2 className="my-8 text-2xl font-bold text-center">Login</h2>
      <form className="flex flex-col items-start gap-6" onSubmit={loginUser}>
        <fieldset className="border-none p-0 m-0 w-full">
          <label className="block font-bold text-lg mb-2">Email</label>
          <input
            className="w-full text-lg p-4 border border-[#DEE9EA] rounded-lg"
            name="email"
            type="email"
            placeholder="Digite seu email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="border-none p-0 m-0 w-full">
          <label className="block font-bold text-lg mb-2">Senha</label>
          <input
            className="w-full text-lg p-4 border border-[#DEE9EA] rounded-lg"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </fieldset>
        <footer className="w-full flex justify-center gap-4">
          <Button variant={"primary"} buttonType={"regular"} type="submit">
            Acessar
          </Button>
        </footer>
      </form>
    </section>
  );
};
