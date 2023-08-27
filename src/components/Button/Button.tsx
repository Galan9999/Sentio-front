import ButtonStyled from "./ButtonStyled";

interface ButtonProps {
  text?: string;
  icon?: JSX.Element;
  action?: () => void | Promise<void>;
  isDisabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Button = ({
  text,
  action,
  ariaLabel,
  className,
  icon,
  isDisabled,
}: ButtonProps): JSX.Element => {
  return (
    <ButtonStyled
      className={className}
      onClick={action}
      aria-label={ariaLabel}
      disabled={isDisabled}
    >
      {text}
      {icon}
    </ButtonStyled>
  );
};

export default Button;
