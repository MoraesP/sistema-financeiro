"use client";

import { HamburguerIcon } from "@/components/icons/HamburguerIcon";
import { UserIcon } from "@/components/icons/UserIcon";
import { useEffect, useRef, useState } from "react";
import { ContextualMenu } from "../ContextualMenu/ContextualMenu";
import { User } from "@/models/User";
import { Button } from "@/components/atoms/button/Button";
import { useRouter } from "next/navigation";

export type MainHeaderProps = {
  user: User | null;
};

export function MainHeader({ user }: MainHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const onLogout = () => {
    sessionStorage.removeItem("token");
    clearCookies();
    router.push("/");
  };

  function clearCookies() {
    // Itera sobre todos os cookies do document
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; max-age=0; path=/;`;
    });
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="flex justify-center w-full bg-primary-400 h-[96px] lg:px-[60px] md:px-[60px] px-6">
      <nav className="w-full lg:max-w-[1200px] flex justify-between items-center">
        <div className="md:hidden relative">
          <button onClick={toggleMenu} className="focus:outline-none">
            <HamburguerIcon />
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full left-0 mt-2 bg-white shadow-lg z-50"
            >
              <ContextualMenu isMenuOpen={isMenuOpen} onClose={closeMenu} />
            </div>
          )}
        </div>
        <div className="md:ml-auto flex items-center gap-8">
          <p className="hidden text-white md:block">{user ? user.name : ""}</p>
          <Button
            variant={"tertiary"}
            buttonType={"regular"}
            customClass="hidden md:block"
            onClick={onLogout}
          >
            Sair
          </Button>
          <UserIcon size={40} />
        </div>
      </nav>
    </header>
  );
}
