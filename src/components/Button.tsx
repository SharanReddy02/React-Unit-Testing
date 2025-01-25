import { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default Button;
