import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/theme';

interface Props {
  type?: string;
  size?: number;
}

/** Standard square veg / non-veg marker with a centered dot. */
function VegIndicator({ type, size = 14 }: Props) {
  const isVeg = (type ?? '').toLowerCase() === 'veg';
  const color = isVeg ? colors.veg : colors.nonVeg;
  const dot = Math.max(4, Math.round(size * 0.4));

  return (
    <View style={[styles.box, { width: size, height: size, borderColor: color }]}>
      <View
        style={{
          width: dot,
          height: dot,
          borderRadius: dot / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1.5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(VegIndicator);
