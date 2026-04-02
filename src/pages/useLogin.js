import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      Cookies.set("jwt", user.token);
      toast.success("Successfully logged in!");
      setTimeout(() => {
        navigate("/feedbacks", { replace: true });
      }, 1000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}
