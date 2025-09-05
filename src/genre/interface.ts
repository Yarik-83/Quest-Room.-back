
export interface QuestGenreLink {
  questId: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreCreate {
  name: string;
}

export interface IGenreQuery {
  name?: string;
}

export interface IGenreWithLink {
  id: number;
  name: string;
  questGenres: QuestGenreLink[];
}
