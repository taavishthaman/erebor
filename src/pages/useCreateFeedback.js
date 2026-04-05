import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFeedback } from "../services/apiFeedbacks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateFeedback() {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();

  const { mutate: createFeedback, isPending: isLoading } = useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Successfully created new Feedback!");
      naviagte("/feedbacks");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { createFeedback, isLoading };
}
