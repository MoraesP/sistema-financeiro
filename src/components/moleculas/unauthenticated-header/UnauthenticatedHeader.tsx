"use client";

import { HamburgerMenuIcon } from "@/components/icons/HamburgerMenuIcon";
import { Logo } from "@/components/icons/Logo";
import Link from "next/link";
import { ModalLogin } from "../modal-login/ModalLogin";
import { ModalRegister } from "../modal-register/ModalRegister";

export function UnauthenticatedHeader() {
  function handleMenuClick() {
    console.log("click");
  }

  return (
    <>
      {/* Tablet Desktop */}

      <section className="bg-black w-full px-4 flex-col items-center md:block hidden">
        <nav className="w-full max-w-[1200px] mx-auto flex justify-between items-center py-8">
          <ul className="flex items-end gap-8">
            <li>
              <Link href={"/"}>
                <Logo />
              </Link>
            </li>
            <li className="ml-8">
              <Link className="text-secondary-600" href="/sobre">
                Sobre
              </Link>
            </li>
            <li>
              <Link className="text-secondary-600" href="/servicos">
                Serviços
              </Link>
            </li>
          </ul>
          <div className="flex gap-8">
            <ModalRegister />
            <ModalLogin />
          </div>
        </nav>
      </section>

      {/* Mobile */}

      <section className="bg-black w-full px-4 py-6 justify-between flex items-center md:hidden lg:hidden">
        <button
          className="border-none bg-transparent p-0"
          type="button"
          onClick={handleMenuClick}
        >
          <HamburgerMenuIcon />
        </button>
        <Logo />
      </section>
    </>
  );
}
