export interface IFetchImages {
  total: number;
  total_pages: number;
  results: IImage[];
}

export interface IImage {
  alt_description: string;
  id: string;
  likes: number;
  urls: {
    regular: string;
    small: string;
  };
  user: {
    social: { instagram_username: string };
    name: string;
  };
}

export interface IModalImage {
  alt: string;
  urlRegular: string;
}
