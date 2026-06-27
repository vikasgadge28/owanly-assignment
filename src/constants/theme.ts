/**
 * Central design tokens for the homepage.
 * Keeping colors / spacing / typography in one place so the UI stays
 * consistent and easy to tune against the Figma.
 */

export const colors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#F5F5F7',
  primary: '#E23744',
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#9A9AA0',
  border: '#ECECEE',
  veg: '#1BA672',
  nonVeg: '#C0392B',
  rating: '#1BA672',
  ratingPoor: '#E2A23B',
  star: '#FFFFFF',
  darkBackGround: '#D9D9D9',
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;

export const typography = {
  h1: { fontSize: 22, fontWeight: '700' as const, color: colors.textPrimary },
  h2: { fontSize: 18, fontWeight: '700' as const, color: colors.textPrimary },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: { fontSize: 13, fontWeight: '400' as const, color: colors.textSecondary },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.textTertiary,
  },
  price: { fontSize: 14, fontWeight: '700' as const, color: colors.textPrimary },
} as const;

export const theme = { colors, spacing, radius, typography };

export default theme;
