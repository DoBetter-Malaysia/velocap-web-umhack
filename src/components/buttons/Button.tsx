import { ButtonProps, Button as MantineButton, clsx } from "@mantine/core";
import { MouseEventHandler } from "react";

interface MyButtonProps extends ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
  children,
  variant = "filled",
  onClick,
  ...props
}: MyButtonProps) => {
  return (
    <MantineButton
      onClick={onClick}
      {...props}
      className={clsx(props.className, "rounded-full transition-all", {
        "bg-blue-500 hover:bg-blue-600 active:bg-blue-700": variant == "filled",
        "!bg-transparent text-black hover:border-blue-600 hover:text-blue-600 active:text-blue-700":
          variant == "subtle",
        "border-blue-600 bg-transparent text-blue-500 hover:border-blue-600 hover:bg-blue-500/20 active:bg-blue-600/20":
          variant == "outline",
      })}
      variant={variant}
      classNames={{ root: "!h-[unset] py-1" }}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
