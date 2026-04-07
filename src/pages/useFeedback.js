import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFeedback } from "../services/apiFeedbacks";

export default function useFeedback() {
  const { id: feedbackId } = useParams();

  const {
    isLoading,
    data: feedback,
    error,
  } = useQuery({
    queryKey: ["feedback", feedbackId],
    queryFn: () => getFeedback({ feedbackId }),
    enabled: !!feedbackId,
  });

  return { isLoading, error, feedback };
}
