export interface Page {
  id: string;
  title: string;
  content: string;
  order: number;
  chapter: string;
}

export interface Chapter {
  id: string;
  title: string;
  pages: Page[];
}