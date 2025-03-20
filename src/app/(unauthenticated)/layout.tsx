import { UnauthenticatedFooter } from "@/components/moleculas/unauthenticated-footer/UnauthenticatedFooter";
import { UnauthenticatedHeader } from "@/components/moleculas/unauthenticated-header/UnauthenticatedHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="
            h-full
            w-full
            flex
            flex-col
            antialiased
            bg-gradient-to-b
            from-primary-400
            from-5%
            to-secondary-200
            to-70%
            bg-no-repeat
            bg-cover
          "
    >
      <UnauthenticatedHeader />
      <div className="w-full mx-auto mb-auto px-4 relative">{children}</div>
      <UnauthenticatedFooter />
    </main>
  );
}
