import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomToggle } from '../common';
import { icons } from '../../constants/assets';
import { colors, spacing, typography } from '../../constants/theme';
import HomeSearchRow from './HomeSearchRow';

const PINK = '#FA287B';

function HomeHeader({ locationTitle, locationSubtitle, veg, setVeg }: { locationTitle: string, locationSubtitle: string, veg: boolean, setVeg: (veg: boolean) => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable style={styles.locationBlock} hitSlop={8}>
          <View style={styles.locationTitleRow}>
            <Text style={styles.locationTitle}>{locationTitle}</Text>
            <Image
              source={icons.downArrow}
              style={styles.chevron}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.locationSubtitle} numberOfLines={1}>
            {locationSubtitle}
          </Text>
        </Pressable>

        <View style={styles.rightItems}>
          <View style={styles.vegBlock}>
            <Text style={styles.vegLabel}>VEG</Text>
            <CustomToggle variant="veg" value={veg} onValueChange={setVeg} />
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>🧑🏻</Text>
          </View>
        </View>
      </View>

      <HomeSearchRow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: PINK,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationBlock: {
    flex: 1,
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chevron: {
    width: 14,
    height: 14,
    marginLeft: spacing.xs,
  },
  locationSubtitle: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '400',
    marginTop: spacing.xxs,
  },
  rightItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vegBlock: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  vegLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xxs,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 22,
  },
});

export default React.memo(HomeHeader);
