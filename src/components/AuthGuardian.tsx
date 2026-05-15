import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const URL = import.meta.env.VITE_BACKEND_API_URL + "/auth/validate";

function AuthGuardian({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const path = window.location.pathname;

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error();
        }
      } catch {
        navigate("/auth");
      }
    },
  });

  useEffect(() => {
    if (path !== "/auth") {
      mutate();
    }
  }, [path, mutate]);

  return <>{children}</>;
}

export default AuthGuardian;
