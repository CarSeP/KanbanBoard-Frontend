import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { authErrorHandler } from "@/lib/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

function InviteAcceptPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const acceptInvitation = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/board/invite/accept/${token}`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (authErrorHandler(response.status)) {
          setStatus("error");
          setMessage("You must be logged in to accept this invitation.");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          setMessage(data.message?.[0] || "Failed to accept invitation.");
          return;
        }

        toast.success("Invitation accepted. Redirecting to the board...");
        navigate(`/board/${data.boardMember.boardId}`, { replace: true });
      } catch {
        setStatus("error");
        setMessage("An error occurred while accepting the invitation.");
      }
    };

    acceptInvitation();
  }, [token, navigate]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoaderCircle className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-lg text-muted-foreground">{message}</p>
        <button
          type="button"
          className="mt-4 text-primary underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default InviteAcceptPage;
