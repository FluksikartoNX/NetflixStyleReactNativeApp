import { useRef } from 'react';
import { ScrollView, Text, View, type ScrollViewInstance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryChips } from '../components/CategoryChips';
import { MovieRow } from '../components/MovieRow';
import { MOVIE_CATEGORIES, type TCategory } from '../constants/categories';

// Children of the ScrollView: [0] title (scrolls away), [1] chips (sticky), [2...] rows.
const STICKY_CHIPS_INDEX = 1;

export function HomeScreen() {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const rowY = useRef<Record<string, number>>({});
  const chipsHeight = useRef(0);

  function scrollToCategory(category: TCategory) {
    const y = rowY.current[category.id];
    if (y === undefined) {
      return;
    }

    // Place the row right below the sticky chips bar.
    scrollRef.current?.scrollTo({ y: y - chipsHeight.current, animated: true });
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView ref={scrollRef} stickyHeaderIndices={[STICKY_CHIPS_INDEX]}>
        <Text className="px-4 pt-3 text-3xl font-extrabold tracking-widest text-brand">
          NETFLIX MOVIE LIST
        </Text>

        <CategoryChips
          categories={MOVIE_CATEGORIES}
          onSelect={scrollToCategory}
          onLayout={(event) => {
            chipsHeight.current = event.nativeEvent.layout.height;
          }}
        />

        {MOVIE_CATEGORIES.map((category) => (
          <View
            key={category.id}
            // Re-fires when a row's height changes (e.g. spinner -> posters), keeping positions correct.
            onLayout={(event) => {
              rowY.current[category.id] = event.nativeEvent.layout.y;
            }}
          >
            <MovieRow category={category} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
