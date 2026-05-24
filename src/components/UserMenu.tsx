import { CircleUser, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_API_URL + "/auth";

function UserMenu() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error();
      }
    } catch {
      toast.error("An error occurred while trying to logout.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer p-1 rounded-full hover:bg-accent transition-colors"
        aria-label="User menu"
      >
        <CircleUser className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
