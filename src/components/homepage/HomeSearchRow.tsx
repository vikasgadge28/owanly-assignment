import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { CustomToggle } from '../common';
import { icons } from '../../constants/assets';
import { colors, radius, spacing } from '../../constants/theme';

function HomeSearchRow() {
  const [lowestPrice, setLowestPrice] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          source={icons.search}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B8B8BE"
          style={styles.searchInput}
        />
      </View>
      <CustomToggle value={lowestPrice} onValueChange={setLowestPrice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xxl,
    gap: spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xxl,
    height: 42,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
});

export default React.memo(HomeSearchRow);
