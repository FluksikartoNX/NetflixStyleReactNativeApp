import { Pressable, ScrollView, Text, type LayoutChangeEvent } from 'react-native';

import type { TCategory } from '../constants/categories';

type CategoryChipsProps = {
  categories: TCategory[];
  onSelect: (category: TCategory) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export function CategoryChips({ categories, onSelect, onLayout }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={onLayout}
      className="bg-background"
      contentContainerClassName="gap-2 px-4 py-3"
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onSelect(category)}
          className="rounded-full border border-neutral-600 px-4 py-2 active:bg-neutral-800"
        >
          <Text className="text-neutral-300">{category.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
