export type Size = {
  width: number;
  height: number;
};

export type CardProps = {
  id: number;
  name: string;
  image: string;
  tel: string;
  email: string;
  size?: Size;
};

export const cardData: CardProps[] = [
  {
    id: 1,
    name: "Beyonce",
    image: "https://cdn.britannica.com/59/204159-050-5055F2A9/Beyonce-2013.jpg",
    tel: "123-456-7890",
    email: "beyoncdefg@whooper.com",
    size: { width: 150, height: 200 }
  },
  {
    id: 2,
    name: "Bumblebee",
    image: "https://static.wikia.nocookie.net/pure-good-wiki/images/1/12/Xl_transformers-rise-of-the-beasts-movie-poster_5fb92f7f.jpg",
    tel: "678-454-2468",
    email: "bumblenotumbleg@swooper.com",
    size: { width: 150, height: 200 }
  },
  {
    id: 3,
    name: "Ada Lovelace",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg",
    tel: "555-123-4567",
    email: "ada.lovelace@history.com",
    size: { width: 150, height: 200 }
  },
  {
    id: 4,
    name: "Albert Einstein",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
    tel: "987-654-3210",
    email: "albert.einstein@relativity.com",
    size: { width: 150, height: 200 }
  }
];