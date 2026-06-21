import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

import { manrope } from './fonts';
import { ALERT, GRAY, SLATE, SUCCESS, WARNING } from './palette';

export const theme = createTheme({
  primaryColor: 'slate',
  primaryShade: 6,
  fontFamily: manrope.style.fontFamily,
  headings: {
    fontFamily: manrope.style.fontFamily,
    fontWeight: '800',
  },
  defaultRadius: 'md',
  radius: { sm: '8px', md: '12px', lg: '16px' },
  colors: {
    slate: SLATE,
    gray: GRAY,
    alert: ALERT,
    success: SUCCESS,
    warning: WARNING,
  },
});

export const mantineTheme = mergeMantineTheme(DEFAULT_THEME, theme);
