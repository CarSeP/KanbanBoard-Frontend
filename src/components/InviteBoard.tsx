import type { Board } from "../interfaces/board.interface";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { authErrorHandler } from "@/lib/auth";

interface Props {
  onClose: () => void;
  board: Board | undefined;
}

type TabMode = "user" | "link";

const ROLES = ["ADMIN", "EDITOR", "VIEWER"] as const;
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

function InviteBoardComponent({ onClose, board }: Props) {
  const [tab, setTab] = useState<TabMode>("user");
  const [copied, setCopied] = useState(false);

  const userForm = useForm({
    defaultValues: {
      userId: "",
      role: "EDITOR" as string,
    },
    onSubmit: async ({ value }) => {
      inviteUserMutation.mutate(value);
    },
  });

  const linkForm = useForm({
    defaultValues: {
      role: "EDITOR" as string,
      expiresIn: "",
    },
    onSubmit: async ({ value }) => {
      inviteLinkMutation.mutate(value);
    },
  });

  const onCloseModal = () => {
    userForm.reset();
    linkForm.reset();
    setCopied(false);
    onClose();
  };

  const inviteUserMutation = useMutation({
    mutationFn: async (payload: { userId: string; role: string }) => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/board/${board?.id}/invite/user`,
          {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
          },
        );

        if (authErrorHandler(response.status)) return;

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message?.[0] || "Error inviting user");
          return;
        }

        toast.success("User has been invited to the board.");
        onCloseModal();
        return data;
      } catch {
        toast.error("An error occurred while inviting the user.");
      }
    },
  });

  const inviteLinkMutation = useMutation({
    mutationFn: async (payload: { role: string; expiresIn: string }) => {
      try {
        const body: Record<string, unknown> = { role: payload.role };
        const hours = Number(payload.expiresIn);
        if (hours > 0) {
          body.expiresIn = hours;
        }

        const response = await fetch(
          `${BACKEND_URL}/board/${board?.id}/invite/link`,
          {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
          },
        );

        if (authErrorHandler(response.status)) return;

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message?.[0] || "Error creating invitation link");
          return;
        }

        const inviteUrl = `${window.location.origin}/invite/${data.invitation.token}`;
        await navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        toast.success("Invitation link copied to clipboard.");
        return data;
      } catch {
        toast.error("An error occurred while creating the invitation link.");
      }
    },
  });

  const onUserSubmit = (e: FormEvent) => {
    e.preventDefault();
    userForm.handleSubmit();
  };

  const onLinkSubmit = (e: FormEvent) => {
    e.preventDefault();
    linkForm.handleSubmit();
  };

  return (
    <>
      <DialogHeader className="pt-4">
        <DialogTitle>Board Invitations</DialogTitle>
        <DialogDescription />
      </DialogHeader>

      <div className="flex gap-2 border-b mb-4">
        <button
          type="button"
          className={`px-3 py-2 text-sm font-medium cursor-pointer border-b-2 transition-colors ${
            tab === "user"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setTab("user")}
        >
          Invite User
        </button>
        <button
          type="button"
          className={`px-3 py-2 text-sm font-medium cursor-pointer border-b-2 transition-colors ${
            tab === "link"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setTab("link")}
        >
          Create Link
        </button>
      </div>

      {tab === "user" ? (
        <form onSubmit={onUserSubmit}>
          <div className="py-2">
            <userForm.Field
              name="userId"
              validators={{
                onChange: ({ value }) =>
                  !value ? "User ID is required" : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>User ID</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Enter user ID"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            </userForm.Field>
          </div>
          <div className="py-2">
            <userForm.Field name="role">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Role</Label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm cursor-pointer"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </userForm.Field>
          </div>
          <DialogFooter className="pt-10">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={onCloseModal}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={inviteUserMutation.isPending}
            >
              Invite
              {inviteUserMutation.isPending && (
                <LoaderCircle className="animate-spin" />
              )}
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <form onSubmit={onLinkSubmit}>
          <div className="py-2">
            <linkForm.Field name="role">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Role</Label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm cursor-pointer"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </linkForm.Field>
          </div>
          <div className="py-2">
            <linkForm.Field
              name="expiresIn"
              validators={{
                onChange: ({ value }) => {
                  if (value && (isNaN(Number(value)) || Number(value) < 1)) {
                    return "Must be a positive number";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>
                    Expires in (hours, optional)
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="e.g. 24"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            </linkForm.Field>
          </div>
          <DialogFooter className="pt-10">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={onCloseModal}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={inviteLinkMutation.isPending || copied}
            >
              {copied ? "Copied!" : "Create Link"}
              {inviteLinkMutation.isPending && (
                <LoaderCircle className="animate-spin" />
              )}
            </Button>
          </DialogFooter>
        </form>
      )}
    </>
  );
}

export default InviteBoardComponent;
