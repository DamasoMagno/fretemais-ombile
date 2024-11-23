import { Description, Enphase, ItemContent } from "./styles";

interface ContentProps {
  enphase: string;
  description: string;
}

export function Content({ description, enphase }: ContentProps) {
  return (
    <ItemContent>
      <Enphase>{enphase}</Enphase>
      <Description>{description}</Description>s
    </ItemContent>
  );
}

