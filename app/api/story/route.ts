import { NextRequest, NextResponse } from "next/server";
import { StoryResponse } from "./types";

// Function to handle image uploads and return the URLs
async function uploadImages(images: File[]): Promise<string[]> {
  try {
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/story/upload/image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao fazer upload das imagens.");
      }

      const { url } = await response.json();
      return url;
    });

    return Promise.all(uploadPromises);
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error);
    throw error;
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<StoryResponse | { message: string }>> {
  try {
    const formData = await request.formData();

    // Convert FormData to a plain object
    const body: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== "storyImages" && key !== "specialMomentsPhotos") {
        body[key] = value;
      }
    });

    // Handle story images upload
    const storyImages = formData.getAll("storyImages") as File[];
    const uploadedImageUrls = await uploadImages(storyImages);

    // Handle special moments images upload
    const specialMoments = formData
      .getAll("specialMoments")
      .map((moment) => JSON.parse(moment as string));
    const specialMomentsPhotos = formData.getAll(
      "specialMomentsPhotos"
    ) as File[];
    const uploadedMomentsImagesUrl = await uploadImages(specialMomentsPhotos);

    // Format special moments with uploaded image URLs
    const specialMomentsFormatted = specialMoments.map((moment, index) => ({
      ...moment,
      photo: uploadedMomentsImagesUrl[index] || null,
    }));

    // First API call: Create the story
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/story`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          storyImages: uploadedImageUrls,
          specialMoments: specialMomentsFormatted,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao criar a história.");
    }

    const { uuid } = await response.json();

    // Second API call: Process payment
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
      { message: error.message || "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
