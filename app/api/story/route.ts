import { NextRequest, NextResponse } from "next/server";
import { StoryResponse } from "./types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<StoryResponse | { message: string }>> {
  const formData = await request.formData();

  // Converte FormData para objeto
  const body: Record<string, any> = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });

  try {
    // Primeira chamada: Envia os dados para criar a história
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/story`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao criar a história.");
    }

    const { uuid } = await response.json();

    // Dados para a segunda chamada
    const paymentData = {
      uuid,
      phone: body.phone,
      email: body.email,
      amount: Number(JSON.parse(body.selectedPlan)?.price),
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
      }
    );

    if (!paymentResponse.ok) {
      throw new Error("Erro ao processar o pagamento.");
    }

    const paymentResult = (await paymentResponse.json()) as StoryResponse;

    return NextResponse.json(paymentResult);
  } catch (error: any) {
    console.error("Erro:", error);
    return NextResponse.json(
      { message: error.message, error: error },
      { status: 500 }
    );
  }
}
