interface INote {
  author: string;
  message: string;
  image: File | null;
}

interface IResponseNote {
  author: string;
  message: string;
  image: string | null;
  id: string;
}