import * as types from "./types";

export async function setStoryRequest(formData: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/story`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}

export async function getStoryByIdRequest(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RECORDAR_API_URL}/story/${id}`
  );

  const data = await response.json();

  return {
    ...data,
    selectedPlan: JSON.stringify(data.selectedPlan),
  } as types.StoryResponse;
}
