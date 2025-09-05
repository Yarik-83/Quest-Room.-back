export interface IQuest {
  title: string;
  description: string;
  level: string;
  people: string;
  time: string;
  picture: string;
  minPlayers: number;
  maxPlayers: number;
}
export interface IQuestByQuery {
  title?: string;
  description?: string;
  people?: string;
}
export interface IJwtPeyload {
  id: number;
  iat: number;
  exp: number;
}
