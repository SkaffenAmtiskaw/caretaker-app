import type { MetadataRoute } from 'next';

import { mantineTheme } from '@/_theme';

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Care Circles',
  short_name: 'Circles',
  description: 'A caretaking tracking app',
  start_url: '/',
  display: 'standalone',
  background_color: mantineTheme.colors.gray[0],
  theme_color: mantineTheme.colors.slate[6],
  icons: [
    {
      src: '/web-app-manifest-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/web-app-manifest-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
});

export default manifest;
