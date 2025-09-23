import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, role, model } = await req.json();

  if (!id || !role || !model) {
    return NextResponse.json({ error: "Missing id, role, or model" }, { status: 400 });
  }

  // Only allow valid models
  const validModels = ["admin", "student", "teacher", "parent"];
  if (!validModels.includes(model)) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  // Dynamically update the correct model
  await (prisma[model] as any).update({
    where: { id },
    data: { role },
  });

  return NextResponse.json({ message: "Role updated successfully" });
}
