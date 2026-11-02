import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';

import type { TMovie } from '../api/services/Movies';

type MoviePosterProps = {
  movie: TMovie;
};

export function MoviePoster({ movie }: MoviePosterProps) {
  const navigation = useNavigation();

  function openDetails() {
    navigation.navigate('MovieDetails', { imdbID: movie.imdbID, title: movie.Title });
  }

  return (
    <Pressable onPress={openDetails} className="active:opacity-70">
      <PosterImage movie={movie} />
    </Pressable>
  );
}

function PosterImage({ movie }: MoviePosterProps) {
  // OMDb returns "N/A" when a movie has no poster.
  if (movie.Poster === 'N/A') {
    return (
      <View className="h-40 w-28 items-center justify-center rounded-md bg-neutral-800 p-2">
        <Text className="text-center text-xs text-neutral-300" numberOfLines={4}>
          {movie.Title}
        </Text>
      </View>
    );
  }

  return (
    <Image source={{ uri: movie.Poster }} className="h-40 w-28 rounded-md" resizeMode="cover" />
  );
}
