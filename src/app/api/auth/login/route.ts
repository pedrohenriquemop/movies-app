import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername } from "@/lib/mock-users";

// MOCKED
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Username and password are required" },
      { status: 400 },
    );
  }

  const user = findUserByUsername(username);

  if (!user || user.password !== password) {
    return NextResponse.json(
      { success: false, message: "Invalid username or password" },
      { status: 401 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Login successful",
      userId: user.id,
      username: user.username,
    },
    { status: 200 },
  );
}
