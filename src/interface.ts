export interface IQuest {
  title: string;
  description: string;
  level: string;
  people: string;
  time: string;
  picture: string;
}

export interface IQuestByQuery {
  title?: string;
  description?: string;
  people?: string
}
