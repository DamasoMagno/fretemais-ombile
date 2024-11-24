import { Description, Enphase, ItemContent } from "./styles";

interface ContentProps {
  enphase: string;
  description: string;
}

export function Item({ description, enphase }: ContentProps) {
  return (
    <ItemContent>
      <Enphase>{enphase}</Enphase>
      <Description>{description}</Description>
    </ItemContent>
  );
}

