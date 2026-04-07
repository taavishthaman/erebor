import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment as postCommentApi } from "../services/apiFeedbacks";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isLoading } = useMutation({
    mutationFn: postCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Successfully posted Comment!");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { createComment, isLoading };
}
