import { NextRequest, NextResponse } from "next/server";
import { StoryResponse } from "./types";
import imageCompression from "browser-image-compression";

async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1, // Reduz para 1MB
    maxWidthOrHeight: 1000, // Define um tamanho máximo
    useWebWorker: true,
  };
  return await imageCompression(file, options);
}

// Function to handle image uploads and return the URLs
async function uploadImages(images: File[]): Promise<string[]> {
  const compressedImages = await Promise.all(images.map(compressImage));
  const uploadPromises = compressedImages.map(async (image) => {
    try {
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
        const errorText = await response.text();
        throw new Error(
          `Erro ${response.status}: ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      if (!data.url) {
        throw new Error("A resposta da API não contém uma URL válida.");
      }

      return data.url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      throw new Error(
        `Erro ao enviar imagem ${image.name}: ${(error as Error)?.message}`
      );
    }
  });

  try {
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error);
    throw new Error("Falha ao enviar uma ou mais imagens.");
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
