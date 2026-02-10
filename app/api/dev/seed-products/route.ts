import { NextResponse } from "next/server";
import { seedProducts } from "@/lib/supabase/seeds/products";

const SEED_SECRET = process.env.SEED_SECRET;

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!SEED_SECRET || secret !== SEED_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await seedProducts();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error seeding products", { status: 500 });
  }
}