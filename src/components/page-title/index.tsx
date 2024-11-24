import { ReactNode } from "react";
import { Title } from "./styles";

interface PageTitleProps {
  children: ReactNode;
}

export function PageTitle({ children }: PageTitleProps) {
  return <Title>{children}</Title>;
}
