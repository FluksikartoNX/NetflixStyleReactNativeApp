import { apiClient, type ApiError } from '../client';

export type TMovie = {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type TMovieSearch = {
  Search: TMovie[];
  totalResults: number;
  Response: 'True' | 'False';
  Error?: string;
};

export async function getMovieList(search: string): Promise<TMovieSearch> {
  const { data } = await apiClient.get<TMovieSearch>('/', {
    params: { type: 'movie', y: 2026, page: 1, s: search },
  });

  if (data.Response === 'False') {
    const error: ApiError = { status: null, message: data.Error ?? 'Unknown OMDb error' };
    throw error;
  }

  return data;
}
