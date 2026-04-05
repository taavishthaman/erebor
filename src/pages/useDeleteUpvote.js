import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUpvote as deleteUpvoteApi } from "../services/apiFeedbacks";
import toast from "react-hot-toast";

export function useDeleteUpvote() {
  const queryClient = useQueryClient();
  const { mutate: deleteUpvote, isPending: isLoading } = useMutation({
    mutationFn: deleteUpvoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Successfully removed Upvote!");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { deleteUpvote, isLoading };
}
