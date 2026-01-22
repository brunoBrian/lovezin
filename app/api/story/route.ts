import { NextRequest, NextResponse } from "next/server";
import { StoryResponse } from "./types";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<StoryResponse | { message: string }>> {
  try {
    const body = await request.json();
    console.log("API ROUTE RECEIVED BODY:", JSON.stringify(body, null, 2));

    // Construct JSON Payload for Backend
    const backendPayload: any = {
      coupleName: body.coupleName,
      message: body.message,
      relationshipStartDate: body.relationshipStartDate,
      relationshipStartTime: body.relationshipStartTime,
      youtubeUrl: body.youtubeUrl,
      email: body.email,
      phone: body.phone,
      animation: body.animation,
      // Handle storyImages
      storyImages: body.storyImages || [],
      // Handle specialMoments
      specialMoments: (body.specialMoments || []).map((moment: any) => ({
        ...moment,
        photoFile: moment.photo || moment.photoFile,
      })),
    };

    if (body.selectedPlan && typeof body.selectedPlan !== "string") {
      backendPayload.selectedPlan = JSON.stringify(body.selectedPlan);
    } else if (body.selectedPlan) {
      backendPayload.selectedPlan = body.selectedPlan;
    }

    // 1. Create Story (JSON Request)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/story`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendPayload),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Backend Error /story:", err);
      throw new Error("Erro ao criar a história no backend.");
    }

    const { uuid } = await response.json();

    // 2. Process Payment
    const paymentData = {
      uuid,
      phone: body.phone,
      email: body.email,
      amount: Number(
        body.selectedPlan?.price ||
          JSON.parse(body.selectedPlan || "{}")?.price,
      ),
      description: `Criação de site personalizado - ${body.coupleName}`,
    };

    const paymentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/pagamento/pix`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      },
    );

    if (!paymentResponse.ok) {
      throw new Error("Erro ao processar o pagamento.");
    }

    const paymentResult = (await paymentResponse.json()) as StoryResponse;
    return NextResponse.json(paymentResult);
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: error.message || "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
