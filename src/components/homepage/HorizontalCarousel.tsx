import React from 'react';
import { FlatList, View } from 'react-native';
import { spacing } from '../../constants/theme';

interface Props<T> {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactElement;
  gap?: number;
  contentPaddingLeft?: number;
  contentPaddingRight?: number;
  disableOverscroll?: boolean;
}

function HorizontalCarousel<T>({
  data,
  keyExtractor,
  renderItem,
  gap = spacing.md,
  contentPaddingLeft = spacing.lg,
  contentPaddingRight = spacing.lg,
}: Props<T>) {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: contentPaddingLeft,
        paddingRight: contentPaddingRight,
      }}
      ItemSeparatorComponent={() => <View style={{ width: gap }} />}
      renderItem={({ item, index }) => renderItem(item, index)}
    />
  );
}

export default HorizontalCarousel;
