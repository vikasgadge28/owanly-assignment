import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '../../constants/theme';

type ToggleVariant = 'veg' | 'price';

type CustomToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  variant?: ToggleVariant;
  trackColor?: string;
};

const VARIANTS = {
  veg: {
    trackWidth: 32,
    trackHeight: 16,
    trackPadding: 2,
    trackColors: { on: '#22C55E', off: '#FFFFFF' },
  },
  price: {
    trackWidth: 132,
    trackHeight: 42,
    trackPadding: 2,
    thumbWidth: 92,
    defaultTrackColor: colors.darkBackGround,
  },
} as const;

function CustomToggle({
  value,
  onValueChange,
  variant = 'price',
  trackColor,
}: CustomToggleProps) {
  const config = VARIANTS[variant];
  const thumbSize =
    variant === 'veg'
      ? VARIANTS.veg.trackHeight - VARIANTS.veg.trackPadding * 2
      : VARIANTS.price.thumbWidth;

  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: variant !== 'veg',
    }).start();
  }, [value, progress, variant]);

  const thumbTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      config.trackPadding,
      config.trackWidth - thumbSize - config.trackPadding,
    ],
  });

  const trackBackgroundColor =
    variant === 'veg'
      ? progress.interpolate({
          inputRange: [0, 1],
          outputRange: [VARIANTS.veg.trackColors.off, VARIANTS.veg.trackColors.on],
        })
      : trackColor ?? VARIANTS.price.defaultTrackColor;

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      hitSlop={variant === 'veg' ? 8 : undefined}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: config.trackWidth,
            height: config.trackHeight,
            backgroundColor: trackBackgroundColor,
          },
          variant === 'veg' && styles.vegTrack,
          variant === 'price' && styles.priceTrack,
        ]}
      >
        {variant === 'price' && (
          <Text
            style={[
              styles.statusLabel,
              value ? styles.statusLabelLeft : styles.statusLabelRight,
            ]}
          >
            {value ? 'On' : 'Off'}
          </Text>
        )}

        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: config.trackHeight - config.trackPadding * 2,
              borderRadius:
                variant === 'veg' ? thumbSize / 2 : radius.pill,
              transform: [{ translateX: thumbTranslateX }],
            },
            variant === 'veg' ? styles.vegThumb : styles.priceThumb,
          ]}
        >
          {variant === 'price' && (
            <>
              <Text style={styles.thumbTitle}>LOWEST</Text>
              <Text style={styles.thumbTitle}>PRICE MODE</Text>
            </>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: radius.pill,
    justifyContent: 'center',
  },
  vegTrack: {
    borderWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.14)',
    borderLeftColor: 'rgba(0, 0, 0, 0.14)',
    borderRightColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  priceTrack: {
    overflow: 'hidden',
  },
  statusLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  statusLabelLeft: {
    left: 14,
  },
  statusLabelRight: {
    right: 14,
  },
  thumb: {
    backgroundColor: '#FFFFFF',
  },
  vegThumb: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 3,
  },
  priceThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.3,
    lineHeight: 12,
  },
});

export default React.memo(CustomToggle);
