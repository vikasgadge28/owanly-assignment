import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/theme';

interface Props {
  imageUrl?: string;
}

/** Hero banner rendered from feed_config.restaurant.topBanner. */
function TopBanner({ imageUrl }: Props) {
  if (!imageUrl) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    aspectRatio: 2,
  },
});

export default React.memo(TopBanner);
