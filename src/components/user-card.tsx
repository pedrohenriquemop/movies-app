import { getUppercaseInitials } from "@/lib/utils";
import { AuthUser } from "./contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserCard = ({ user }: { user: AuthUser }) => {
  return (
    <>
      <Avatar className="size-8 rounded-lg">
        <AvatarImage src={user.avatarUrl || ""} alt={user.username} />
        <AvatarFallback className="rounded-lg">
          {getUppercaseInitials(user.username)}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.username}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  );
};

export default UserCard;
