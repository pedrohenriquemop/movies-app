import { NextRequest, NextResponse } from "next/server";
import { getListById, deleteList } from "@/lib/mock-data";

export function generateStaticParams() {
  return Array.from({ length: 1000 }, (_, index) => index).map((index) => ({
    list_id: index.toString(),
  }));
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ list_id: string }> },
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 401 },
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

  return NextResponse.json(list, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ list_id: string }> },
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 401 },
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

  const success = deleteList(list_id);

  if (success) {
    return NextResponse.json(
      { message: "List deleted successfully" },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { message: "Failed to delete list" },
      { status: 500 },
    );
  }
}
