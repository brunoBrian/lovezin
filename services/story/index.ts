export async function setStoryImagesRequest(formData: FormData) {
  const response = await fetch("http://localhost:3000/story", {
    method: "POST",
    body: formData,
  });

  return response.json();
}

export async function getStoryByIdRequest(id: string) {
  const response = await fetch(`http://localhost:3000/story/${id}`);

  return response.json();
}
