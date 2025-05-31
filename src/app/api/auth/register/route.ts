import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername, addUser, generateUserId } from "@/lib/mock-users";

// MOCKED
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Username and password are required" },
      { status: 400 },
    );
  }

  if (findUserByUsername(username)) {
    return NextResponse.json(
      { success: false, message: "Username already exists" },
      { status: 409 },
    );
  }

  const newUser = { id: generateUserId(), username, password }; // Storing plain password for mock purposes
  addUser(newUser);

  return NextResponse.json(
    {
      success: true,
      message: "Registration successful",
      userId: newUser.id,
      username: newUser.username,
    },
    { status: 201 },
  );
}
