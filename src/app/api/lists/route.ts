import { NextRequest, NextResponse } from "next/server";
import { createList, getListsByUser } from "@/lib/mock-data"; //

export async function POST(req: NextRequest) {
  const { name, userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 401 },
    );
  }
  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { message: "List name is required" },
      { status: 400 },
    );
  }

  const newList = createList(userId, name);

  return NextResponse.json(newList, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 401 },
    );
  }

  const userLists = getListsByUser(userId);

  return NextResponse.json(userLists, { status: 200 });
}
