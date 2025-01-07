import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pixCode } = await req.json();

    // Simulate payment check - in production, check with payment provider
    const isPaid = Math.random() < 0.2; // 20% chance of success for demo

    return NextResponse.json({
      status: isPaid ? "paid" : "pending",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check payment status" },
      { status: 500 }
    );
  }
}
