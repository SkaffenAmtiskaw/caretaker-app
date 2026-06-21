'use client';

import { Button } from '@mantine/core';
import { KeyIcon } from '@phosphor-icons/react';

// TODO: Add passkey support
export const PasskeyButton = () => (
  <Button disabled leftSection={<KeyIcon />} size="lg" variant="outline">
    Sign in with a passkey
  </Button>
);
