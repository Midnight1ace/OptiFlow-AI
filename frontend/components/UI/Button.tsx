import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <button className="primary-button" type="button">
      {children}
    </button>
  );
}
