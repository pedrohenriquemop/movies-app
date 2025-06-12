import { NextRequest, NextResponse } from "next/server";
import {
  getListById,
  addMovieToList,
  removeMovieFromList,
} from "@/lib/mock-data";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ list_id: string }> },
) {
  const { movieId, userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 401 },
    );
  }
  if (!movieId) {
    return NextResponse.json(
      { message: "Movie ID is required" },
      { status: 400 },
    );
  }

  const { list_id } = await params;
  const list = getListById(list_id);

  if (!list || list.userId !== userId) {
    return NextResponse.json(
      { message: "List not found or unauthorized" },
      { status: 404 },
    );
  }

  const updatedList = addMovieToList(list_id, movieId);

  return NextResponse.json(updatedList, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ list_id: string }> },
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const movieId = searchParams.get("movieId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 401 },
    );
  }
  if (!movieId) {
    return NextResponse.json(
      { message: "Movie ID is required" },
      { status: 400 },
    );
  }

  const { list_id } = await params;
  const list = getListById(list_id);

  if (!list || list.userId !== userId) {
    return NextResponse.json(
      { message: "List not found or unauthorized" },
      { status: 404 },
    );
  }

  const updatedList = removeMovieFromList(list_id, movieId);

  return NextResponse.json(updatedList, { status: 200 });
}
