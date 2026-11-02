import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MovieRow } from '../components/MovieRow';
import { MOVIE_CATEGORIES } from '../constants/categories';

export function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text className="px-4 py-3 text-3xl font-extrabold tracking-widest text-brand">
        NETFLIX MOVIE LIST
      </Text>

      <ScrollView>
        {MOVIE_CATEGORIES.map((category) => (
          <MovieRow key={category.id} category={category} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
