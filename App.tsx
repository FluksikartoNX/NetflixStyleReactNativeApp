import './global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { queryClient } from './src/api/queryClient';
import { useMovies } from './src/hooks/useMovies';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-5xl font-extrabold tracking-widest text-brand">NETFLIX</Text>
            <Text className="mt-4 text-xl text-white">Hello World 👋</Text>

            <View className="mt-10 w-full rounded-xl bg-neutral-800 p-4">
              <Text className="mb-2 text-xs uppercase text-neutral-400">Axios test request</Text>
              <MovieListContent />
            </View>
          </View>
          <StatusBar style="light" />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

function MovieListContent() {
  // Hooks using useQuery must be called below QueryClientProvider, hence not in App itself.
  const { data: movies, error, isPending } = useMovies('dark');

  if (isPending) {
    return <ActivityIndicator color="#E50914" />;
  }

  if (error) {
    return <Text className="text-red-400">{error.message}</Text>;
  }

  return movies.map((movie) => (
    <Text key={movie.imdbID} className="text-neutral-100">
      {movie.Title}
    </Text>
  ));
}
