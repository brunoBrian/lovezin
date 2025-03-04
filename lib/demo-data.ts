import { WeddingData } from "./types";

export function getDemoData(): WeddingData {
  return {
    coupleName: "João & Maria",
    message:
      "Nossa história de amor começou em um lindo dia de verão. Desde o primeiro olhar, soubemos que era algo especial. Cada momento juntos tem sido uma aventura incrível, cheia de sorrisos, sonhos compartilhados e muito amor.",
    photos: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
      "https://images.unsplash.com/photo-1600299637171-d174627135ee?w=800",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
      "https://images.unsplash.com/photo-1719937206094-8de79c912f40?w=800",
    ],
    relationshipStartDate: "2024-02-14",
    relationshipStartTime: "19:00",
    animation: "hearts",
    couplePhotos: [],
    specialMoments: [
      {
        id: "1",
        title: "Primeiro Encontro",
        date: "2020-02-14",
        description:
          "Nosso primeiro encontro foi em um café aconchegante no centro da cidade.",
        photo:
          "https://images.unsplash.com/photo-1529022805552-1c88a713c1c5?w=800",
      },
      {
        id: "2",
        title: "Pedido de Namoro",
        date: "2020-08-14",
        description: "Em um passeio maravilhoso, oficializamos nosso amor.",
        photo:
          "https://images.unsplash.com/photo-1600299637171-d174627135ee?w=800",
      },
      {
        id: "3",
        title: "Nosso casamento",
        date: "2024-04-14",
        description: "Oficializando nosso casamento, que será para sempre",
        photo:
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
      },
      {
        id: "4",
        title: "Viagem em família",
        date: "2024-08-01",
        description:
          "Viajando com nossa familia, nos reunimos em um lugar lindo para celebrar nosso amor.",
        photo:
          "https://images.unsplash.com/photo-1719937206094-8de79c912f40?w=800",
      },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  };
}
