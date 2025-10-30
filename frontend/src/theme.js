export const COLORS = {
  primary: '#1E88E5', // A modern blue
  secondary: '#FFC107', // A vibrant yellow
  background: '#F5F5F5', // A light gray background
  text: '#333333',
  white: '#FFFFFF',
  danger: '#D32F2F',
  success: '#388E3C',
  lightGray: '#DDDDDD',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
};

export const FONTS = {
  h1: { fontSize: SIZES.xlarge, fontWeight: 'bold' },
  h2: { fontSize: SIZES.large, fontWeight: 'bold' },
  body1: { fontSize: SIZES.font },
  body2: { fontSize: SIZES.small },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
