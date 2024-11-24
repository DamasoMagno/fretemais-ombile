import { useQueryClient } from "@tanstack/react-query";

export function useRevalidate(key: string) {
  const client = useQueryClient();

  function revalidateCache() {
    client.invalidateQueries({
      queryKey: [key],
    });
  }

  return {
    revalidateCache,
  };
}
