'use client';

import { Box, useMantineTheme } from '@mantine/core';

const RADIUS = 24;
const MAX_WIDTH = 100;
const MAX_HEIGHT = 100;

export const BrandTile = () => {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        borderRadius: RADIUS,
        boxShadow: 'var(--mantine-shadow-md)',
        lineHeight: 0,
        height: '100%',
        width: '100%',
        maxWidth: MAX_WIDTH,
        maxHeight: MAX_HEIGHT,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        role="img"
        aria-label="Care Circles"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="100%"
          height="100%"
          rx={RADIUS}
          fill={
            theme.colors[theme.primaryColor][Number(theme.primaryShade) ?? 6]
          }
        ></rect>
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke="#FFFFFF"
          strokeWidth="6.5"
          strokeOpacity="0.5"
        ></circle>
        <circle
          cx="50"
          cy="50"
          r="19"
          stroke="#FFFFFF"
          strokeWidth="6.5"
        ></circle>
        <circle cx="50" cy="50" r="8" fill="#FFFFFF"></circle>
      </svg>
    </Box>
  );
};
