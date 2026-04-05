import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedback as updateFeedbackApi } from "../services/apiFeedbacks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateFeedback() {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();

  const { mutate: updateFeedback, isPending: isLoading } = useMutation({
    mutationFn: updateFeedbackApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Successfully updated Feedback!");
      naviagte("/feedbacks");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { updateFeedback, isLoading };
}
