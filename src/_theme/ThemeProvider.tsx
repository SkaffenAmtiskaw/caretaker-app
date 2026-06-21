'use client';

import { MantineProvider } from '@mantine/core';

import { resolver, theme } from '@/_theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider theme={theme} cssVariablesResolver={resolver}>
    {children}
  </MantineProvider>
);
