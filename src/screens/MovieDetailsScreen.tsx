import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import type { TMovieDetails } from '../api/services/Movies';
import { useMovie } from '../hooks/useMovie';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

export function MovieDetailsScreen({ route }: Props) {
  const { data: movie, error, isPending } = useMovie(route.params.imdbID);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#E50914" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-center text-red-400">{error.message}</Text>
      </View>
    );
  }

  return <MovieDetails movie={movie} />;
}

function MovieDetails({ movie }: { movie: TMovieDetails }) {
  const meta = [movie.Year, movie.Rated, movie.Runtime].filter(isAvailable).join('  •  ');
  const genres = movie.Genre.split(', ').filter(isAvailable);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="pb-10">
      {isAvailable(movie.Poster) && (
        <Image source={{ uri: movie.Poster }} className="aspect-[2/3] w-full" resizeMode="cover" />
      )}

      <View className="gap-4 px-4 pt-4">
        <View className="gap-1">
          <Text className="text-3xl font-bold text-white">{movie.Title}</Text>
          <Text className="text-neutral-400">{meta}</Text>
        </View>

        {isAvailable(movie.imdbRating) && (
          <Text className="text-lg font-semibold text-yellow-400">
            ★ {movie.imdbRating}/10
            <Text className="text-sm font-normal text-neutral-400"> ({movie.imdbVotes} votes)</Text>
          </Text>
        )}

        <View className="flex-row flex-wrap gap-2">
          {genres.map((genre) => (
            <Text key={genre} className="rounded-full bg-neutral-800 px-3 py-1 text-neutral-200">
              {genre}
            </Text>
          ))}
        </View>

        {isAvailable(movie.Plot) && (
          <Text className="leading-6 text-neutral-200">{movie.Plot}</Text>
        )}

        <View className="gap-2">
          <InfoRow label="Director" value={movie.Director} />
          <InfoRow label="Writer" value={movie.Writer} />
          <InfoRow label="Cast" value={movie.Actors} />
          <InfoRow label="Released" value={movie.Released} />
          <InfoRow label="Language" value={movie.Language} />
          <InfoRow label="Country" value={movie.Country} />
          <InfoRow label="Box office" value={movie.BoxOffice} />
          <InfoRow label="Awards" value={movie.Awards} />
          {movie.Ratings.map((rating) => (
            <InfoRow key={rating.Source} label={rating.Source} value={rating.Value} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!isAvailable(value)) {
    return null;
  }

  return (
    <Text className="text-neutral-400">
      {label}: <Text className="text-neutral-100">{value}</Text>
    </Text>
  );
}

// OMDb uses "N/A" for missing values.
function isAvailable(value: string | undefined): value is string {
  return !!value && value !== 'N/A';
}
