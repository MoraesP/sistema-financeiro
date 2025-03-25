"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type ContextualMenuProps = {
  isMenuOpen: boolean;
  onClose: () => void;
};

export function ContextualMenu({ isMenuOpen, onClose }: ContextualMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/dashboard", label: "Início" },
    { href: "/dashboard/exchanges", label: "Transferências" },
    { href: "/dashboard/investments", label: "Investimentos" },
    { href: "/dashboard/other-services", label: "Outros Serviços" },
    { href: "/", label: "Sair" },
  ];

  const onLogout = () => {
    sessionStorage.removeItem("token");
    clearCookies();
    router.push("/");
  };

  function clearCookies() {
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; max-age=0; path=/;`;
    });
  }

  const itemActive = (item: { href: string; label: string }) => {
    if (item.href === "/") {
      return false;
    } else {
      return (
        pathname.startsWith(item.href) && !pathname.startsWith(`${item.href}/`)
      );
    }
  };

  return (
    <div className="relative">
      {isMenuOpen && (
        <ul
          className="absolute top-0 left-0 w-[200px] h-auto bg-secondary-200 p-6 shadow-lg z-10 flex flex-col"
          role="menu"
        >
          {navItems.map((item, index) => {
            const isActive = itemActive(item);

            return (
              <li
                key={index}
                className={`flex text-center w-full flex-1 ${
                  isActive
                    ? "font-bold text-secondary-400 border-b-secondary-400"
                    : ""
                } ${
                  index !== navItems.length - 1
                    ? "border-b border-b-primary-400"
                    : ""
                } hover:text-tertiary-400 hover:font-bold`}
              >
                <Link
                  href={item.href}
                  className="py-4 w-full"
                  onClick={() => {
                    if (item.href === "/") {
                      onLogout();
                    } else {
                      onClose();
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
