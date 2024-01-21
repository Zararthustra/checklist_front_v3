import { IconLoader } from "@assets/index";

interface IButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  primary?: boolean;
  secondary?: boolean;
  style?: object;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "ok" | "ko";
  loading?: boolean;
  onClick?: any;
}

export const Button = ({
  primary,
  secondary,
  loading,
  style,
  disabled,
  type = "button",
  variant,
  className = "",
  onClick,
  children,
}: IButtonProps) => (
  <button
    disabled={disabled}
    type={type}
    style={style}
    className={`
    flex items-center justify-center gap-2
      ${primary && "btn-primary"}
      ${secondary && "btn-secondary"}
      ${variant === "ok" && "btn-variant-ok"}
      ${variant === "ko" && "btn-variant-ko"}
      ${className} 
      `}
    onClick={onClick}
  >
    {loading ? <IconLoader /> : children}
  </button>
);
