import { WeddingData } from "../types";

export const createFormData = (
  data: WeddingData,
  email: string,
  phone: string,
) => {
  const formData = new FormData();

  formData.append("coupleName", data.coupleName);
  formData.append("message", data.message);
  formData.append("relationshipStartDate", data.relationshipStartDate);
  formData.append("relationshipStartTime", data.relationshipStartTime);
  formData.append("selectedPlan", JSON.stringify(data.selectedPlan));
  formData.append("youtubeUrl", data.youtubeUrl);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("animation", data.animation === "none" ? "" : data.animation);

  data?.couplePhotos?.forEach((image) => {
    formData.append("storyImages", image as File);
  });

  if (data?.specialMoments.length) {
    data.specialMoments.forEach((moment, index) => {
      // Adiciona os dados do momento (sem o arquivo)
      formData.append(
        `specialMoments`,
        JSON.stringify({
          id: moment.id,
          title: moment.title,
          date: moment.date,
          description: moment.description,
        }),
      );

      if (moment.photoFile) {
        // Use indexed notation to bind the file to the specific moment
        formData.append(
          `specialMoments[${index}][photoFile]`,
          moment.photoFile,
        );
      }
    });
  }

  return formData;
};
