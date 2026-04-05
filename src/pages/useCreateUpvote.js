import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUpvote } from "../services/apiFeedbacks";
import toast from "react-hot-toast";

export function useCreateUpvote() {
  const queryClient = useQueryClient();
  const { mutate: createUpvote, isPending: isLoading } = useMutation({
    mutationFn: postUpvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Successfully upvoted feedback!");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { createUpvote, isLoading };
}
