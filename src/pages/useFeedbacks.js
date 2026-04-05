import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFeedbacks } from "../services/apiFeedbacks";

export default function useFeedbacks() {
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");
  const sort = searchParams.get("sort");

  const {
    isLoading,
    data: feedbacks,
    error,
  } = useQuery({
    queryKey: ["feedbacks", category_id, sort],
    queryFn: () => getFeedbacks({ category_id, sort }),
  });

  return { isLoading, error, feedbacks };
}
