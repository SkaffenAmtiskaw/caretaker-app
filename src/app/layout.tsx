import '@mantine/core/styles.css';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';

import { fonts, ThemeProvider } from '@/_theme';

export const metadata: Metadata = {
  title: 'Care Circles',
  description: 'Caretaker app',
  appleWebApp: {
    title: 'Care Circles',
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
    </head>
    <body className={fonts.className}>
      <ThemeProvider>{children}</ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
