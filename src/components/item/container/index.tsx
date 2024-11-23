import { ReactNode } from "react";
import { Container as ItemContainer } from "./styles";

interface ContentProps {
  children: ReactNode;
}

export function Container({ children }: ContentProps) {
  return <ItemContainer>{children}</ItemContainer>;
}
