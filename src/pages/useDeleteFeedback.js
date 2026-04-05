import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeedback as deleteFeedbackApi } from "../services/apiFeedbacks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useDeleteFeedback() {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();

  const { mutate: deleteFeedback, isPending: isLoading } = useMutation({
    mutationFn: deleteFeedbackApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Successfully deleted Feedback!");
      naviagte("/feedbacks");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { deleteFeedback, isLoading };
}
