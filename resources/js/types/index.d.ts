export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type TArticle = {
  id: number;
  image: object[];
  title: string;
  category: string;
  author: string;
  created_at: string;
  slug: string;
  content: string;
  authors_id?: number;
  category_id?: number;
};

export type TCardGroup = {
  data: {
    articles: {
      data: TArticle[];
    };
  };
};

type Authors = {};
type TCategories = {};
interface PagePropsData {
  categories: TCategories[];
  articles: TArticle & TPagination;
  authors: Authors[];
}

type TPagination = {
  prev_page_url: string;
  next_page_url: string;
  from: number;
  current_page: number;
  last_page: number;
  path: string;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth?: {
    user: User;
  };
  data?: PagePropsData;
};
