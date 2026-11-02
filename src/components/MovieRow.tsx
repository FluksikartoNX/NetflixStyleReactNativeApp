import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import type { TCategory } from '../constants/categories';
import { useMovies } from '../hooks/useMovies';

import { MoviePoster } from './MoviePoster';

type MovieRowProps = {
  category: TCategory;
};

export function MovieRow({ category }: MovieRowProps) {
  return (
    <View className="mb-6">
      <Text className="mb-2 px-4 text-lg font-bold text-white">{category.title}</Text>
      <MovieRowContent search={category.search} />
    </View>
  );
}

function MovieRowContent({ search }: { search: string }) {
  const { data: movies, error, isPending } = useMovies(search);

  if (isPending) {
    return (
      <View className="h-40 justify-center">
        <ActivityIndicator color="#E50914" />
      </View>
    );
  }

  if (error) {
    return <Text className="px-4 text-red-400">{error.message}</Text>;
  }

  return (
    <FlatList
      horizontal
      data={movies}
      keyExtractor={(movie) => movie.imdbID}
      renderItem={({ item }) => <MoviePoster movie={item} />}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-4"
    />
  );
}
