import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "../services/apiFeedbacks";

export default function useComments() {
  const { id: feedbackId } = useParams();

  const {
    isLoading,
    data: comments,
    error,
  } = useQuery({
    queryKey: ["comments", feedbackId],
    queryFn: () => getComments({ feedbackId }),
    enabled: !!feedbackId,
  });

  return { isLoading, error, comments };
}
