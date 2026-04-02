import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/apiCategories";

export default function useCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  return { isLoading, error, categories };
}
