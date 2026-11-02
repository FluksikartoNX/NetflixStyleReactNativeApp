import { useQuery } from '@tanstack/react-query';

import { getMovieList } from '../api/services/Movies';

export function useMovies(search: string) {
  return useQuery({
    queryKey: ['movies', search],
    queryFn: () => getMovieList(search),
    select: (data) => data.Search,
  });
}
