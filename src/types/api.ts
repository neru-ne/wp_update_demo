export type postsType = {
  id: string;
  title: { rendered: string };
  content: { rendered: string, protected: boolean },
  categories: string[]
};

export type categoryType = {
  id: string;
  link: string;
  name: string;
  slug: string;
}
