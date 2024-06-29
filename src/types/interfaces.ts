export interface Story {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  kids: number[];
}

export interface Comment {
  id: number;
  text: string;
  score: number;
  author: string;
  kids: number[];
}
