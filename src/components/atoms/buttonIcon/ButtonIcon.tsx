type ButtonIconProps = {
  Icon(): JSX.Element;
  onClickIcon?: () => void;
};

export function ButtonIcon({ Icon, onClickIcon }: ButtonIconProps) {
  return (
    <button
      className={`
      w-[30px]
      h-[30px]
      flex
      items-center
      justify-center
      text-white
      bg-primary-400
      rounded-full 
      hover:bg-primary-600
    `}
      onClick={onClickIcon}
    >
      <Icon />
    </button>
  );
}
