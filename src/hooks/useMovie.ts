import { useQuery } from '@tanstack/react-query';

import { getMovie } from '../api/services/Movies';

export function useMovie(imdbID: string) {
  return useQuery({
    queryKey: ['movie', imdbID],
    queryFn: () => getMovie(imdbID),
  });
}
