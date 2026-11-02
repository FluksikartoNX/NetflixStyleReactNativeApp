import { useEffect, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  type LayoutChangeEvent,
  type ScrollViewInstance,
} from 'react-native';

import type { TCategory } from '../constants/categories';

type CategoryChipsProps = {
  categories: TCategory[];
  activeId: string;
  onSelect: (category: TCategory) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export function CategoryChips({ categories, activeId, onSelect, onLayout }: CategoryChipsProps) {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const chipX = useRef<Record<string, number>>({});

  // Keep the active chip visible when it changes (by tap or by scrolling the list).
  useEffect(() => {
    const x = chipX.current[activeId];
    if (x !== undefined) {
      scrollRef.current?.scrollTo({ x: Math.max(x - 16, 0), animated: true });
    }
  }, [activeId]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={onLayout}
      className="bg-background"
      contentContainerClassName="gap-2 px-4 py-3"
    >
      {categories.map((category) => (
        <Chip
          key={category.id}
          title={category.title}
          isActive={category.id === activeId}
          onPress={() => onSelect(category)}
          onLayout={(event) => {
            chipX.current[category.id] = event.nativeEvent.layout.x;
          }}
        />
      ))}
    </ScrollView>
  );
}

type ChipProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

function Chip({ title, isActive, onPress, onLayout }: ChipProps) {
  if (isActive) {
    return (
      <Pressable onPress={onPress} onLayout={onLayout} className="rounded-full bg-brand px-4 py-2">
        <Text className="font-semibold text-white">{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      className="rounded-full border border-neutral-600 px-4 py-2 active:bg-neutral-800"
    >
      <Text className="text-neutral-300">{title}</Text>
    </Pressable>
  );
}
