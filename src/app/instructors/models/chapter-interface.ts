import { Topic } from './topic-interface';

export interface Chapter {
  chapterName: string;
  topics: Topic[];
  id: number;
}
