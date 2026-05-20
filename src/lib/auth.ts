import { toast } from "sonner";

export const authErrorHandler = (status: number): boolean => {
  if (status === 401) {
    window.location.href = "/auth";
    return true;
  }

  if (status === 403) {
    toast.error("You do not have permission to perform this action.");
    return true;
  }

  return false;
};
