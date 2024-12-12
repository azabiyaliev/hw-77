export interface INote {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

export type INoteWithId = Omit<INote, "id">