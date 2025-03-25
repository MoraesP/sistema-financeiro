import ServiceButton from "@/components/organisms/service-button/ServiceButton";
import Image from "next/image";

export default function OtherServices() {
  return (
    <div
      id="new-transaction"
      className="bg-gray-400 rounded-lg py-6 px-6 lg:w-[690px] lg:h-[478px] text-black relative z-0"
    >
      <Image
        src="/Pixels3.png"
        alt="pixels 3"
        width={180}
        height={178}
        className="absolute bottom-0 left-0 -z-10"
      />
      <Image
        src="/Pixels4.png"
        alt="pixels 4"
        width={180}
        height={178}
        className="absolute top-0 right-0 -z-10"
      />
      <h1 className="text-h1 font-bold mt-2 pl-3 pb-3">
        Confira os serviços disponíveis
      </h1>
      <div className="grid py-5 lg:grid-cols-3 place-items-center gap-6 lg:gap-0">
        <div className="grid gap-6">
          <ServiceButton
            link="/dashboard/other-services/loans"
            text="Empréstimo"
            imageLink="/IconLoan.png"
          />
          <ServiceButton
            link="/dashboard/other-services/pix"
            text="Pix"
            imageLink="/IconPix.png"
          />
        </div>
        <div className="grid gap-6">
          <ServiceButton
            link="/dashboard/other-services/my-cards"
            text="Meus Cartões"
            imageLink="/IconCard.png"
          />
          <ServiceButton
            link="/dashboard/other-services/insurance"
            text="Seguros"
            imageLink="/IconInsurance.png"
          />
        </div>
        <div className="grid gap-6">
          <ServiceButton
            link="/dashboard/other-services/donations"
            text="Doações"
            imageLink="/IconDonations.png"
          />
          <ServiceButton
            link="/dashboard/other-services/phone-credits"
            text="Crédito Celular"
            imageLink="/IconPhone.png"
          />
        </div>
      </div>
    </div>
  );
}
