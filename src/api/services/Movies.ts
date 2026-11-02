import { apiClient, type ApiError } from '../client';

// OMDb returns every value as a string (including numbers like Year), and "N/A" when missing.
export type TMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type TMovieSearch = {
  Search: TMovie[];
  totalResults: string;
};

export type TRating = {
  Source: string;
  Value: string;
};

export type TMovieDetails = TMovie & {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: TRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
};

type OmdbResponse<T> = (T & { Response: 'True' }) | { Response: 'False'; Error: string };

// OMDb answers "not found" / "invalid key" with HTTP 200 and Response: "False".
function unwrapOmdb<T>(data: OmdbResponse<T>): T {
  if (data.Response === 'False') {
    const error: ApiError = { status: null, message: data.Error ?? 'Unknown OMDb error' };
    throw error;
  }
  return data;
}

export async function getMovieList(search: string): Promise<TMovieSearch> {
  const { data } = await apiClient.get<OmdbResponse<TMovieSearch>>('/', {
    params: { type: 'movie', y: 2026, page: 1, s: search },
  });
  return unwrapOmdb(data);
}

export async function getMovie(imdbID: string): Promise<TMovieDetails> {
  const { data } = await apiClient.get<OmdbResponse<TMovieDetails>>('/', {
    params: { i: imdbID, plot: 'full' },
  });
  return unwrapOmdb(data);
}
