// OMDb has no genre filter, only a title search (`s`), so each category is
// approximated with a keyword that commonly appears in titles of that genre.
export type TCategory = {
  id: string;
  title: string;
  search: string;
};

export const MOVIE_CATEGORIES: TCategory[] = [
  { id: 'action', title: 'Action', search: 'mission' },
  { id: 'comedy', title: 'Comedy', search: 'funny' },
  { id: 'drama', title: 'Drama', search: 'life' },
  { id: 'horror', title: 'Horror', search: 'dead' },
  { id: 'romance', title: 'Romance', search: 'love' },
  { id: 'scifi', title: 'Sci-Fi', search: 'space' },
  { id: 'thriller', title: 'Thriller', search: 'night' },
  { id: 'fantasy', title: 'Fantasy', search: 'magic' },
  { id: 'crime', title: 'Crime', search: 'test' },
  { id: 'family', title: 'Family', search: 'christmas' },
];
