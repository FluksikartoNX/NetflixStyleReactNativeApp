import './global.css';

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import type { ApiError } from './src/api/client';
import { getPost, type Post } from './src/api/services/posts';

export default function App() {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPost(1)
      .then(setPost)
      .catch((e: ApiError) => setError(e.message));
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-5xl font-extrabold tracking-widest text-brand">NETFLIX</Text>
          <Text className="mt-4 text-xl text-white">Hello World 👋</Text>

          <View className="mt-10 w-full rounded-xl bg-neutral-800 p-4">
            <Text className="mb-2 text-xs uppercase text-neutral-400">Axios test request</Text>
            {error ? (
              <Text className="text-red-400">{error}</Text>
            ) : post ? (
              <Text className="text-neutral-100">{post.title}</Text>
            ) : (
              <ActivityIndicator color="#E50914" />
            )}
          </View>
        </View>
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
