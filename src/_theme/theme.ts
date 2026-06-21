import {
  type CSSVariablesResolver,
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
} from '@mantine/core';

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
    key: GRAY,
  },
  components: {
    Title: {
      defaultProps: { c: 'gray.9' },
    },
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-body': theme.colors.gray[0],
    '--mantine-color-text': theme.colors.gray[7],
    '--mantine-color-dimmed': theme.colors.gray[5],
    '--mantine-color-key-text': theme.colors.gray[9],
    '--mantine-color-default-border': theme.colors.gray[2],
  },
  dark: {
    '--mantine-color-body': theme.colors.gray[0],
    '--mantine-color-text': theme.colors.gray[7],
    '--mantine-color-dimmed': theme.colors.gray[5],
    '--mantine-color-key-text': theme.colors.gray[9],
    '--mantine-color-default-border': theme.colors.gray[2],
  },
});

export const mantineTheme = mergeMantineTheme(DEFAULT_THEME, theme);
