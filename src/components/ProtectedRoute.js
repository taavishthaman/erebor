import { useEffect } from "react";
import { useIsLoggedIn } from "../pages/useIsLoggedIn";

function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useIsLoggedIn();
  useEffect(() => {
    function checkIsLoggedIn() {
      isLoggedIn();
    }
    checkIsLoggedIn();
  }, [isLoggedIn]);

  if (isLoading) return <></>;
  return children;
}

export default ProtectedRoute;
