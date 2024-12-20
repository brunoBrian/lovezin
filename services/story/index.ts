import * as types from "./types";

export async function setStoryRequest(formData: FormData) {
  const response = await fetch("http://localhost:3000/story", {
    method: "POST",
    body: formData,
  });

  return response.json();
}

export async function getStoryByIdRequest(id: string) {
  const response = await fetch(`http://localhost:3000/story/${id}`);

  const data = await response.json();

  return {
    ...data,
    selectedPlan: JSON.stringify(data.selectedPlan),
  } as types.StoryResponse;
}
