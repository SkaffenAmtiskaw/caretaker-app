import '@mantine/core/styles.css';

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import type { Metadata } from 'next';

import { fonts, theme } from '@/_theme';

export const metadata: Metadata = {
  title: 'Care Circles',
  description: 'Caretaker app',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
    </head>
    <body className={fonts.className}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </body>
  </html>
);

export default RootLayout;
