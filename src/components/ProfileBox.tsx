import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const ProfileBox = () => {
  return (
    <div>
      <Avatar>
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileBox;
