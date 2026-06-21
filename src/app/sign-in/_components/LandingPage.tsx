import { Button, Container, Divider, Stack, Text, Title } from '@mantine/core';

import { BrandTile } from '@/_components';
import { FlowButton } from './FlowButton';
import { PasskeyButton } from './PasskeyButton';

export const LandingPage = () => (
  <Stack h="100dvh" p="xl" justify="space-between">
    <Stack gap="xl">
      <Stack gap="md">
        <Container h={64}>
          <BrandTile />
        </Container>
        <Stack gap="xs" ta="center">
          <Title textWrap="balance">Welcome to Care Circles</Title>
          <Text>A circle of support, around one person.</Text>
        </Stack>
      </Stack>
      <Stack gap="sm">
        <FlowButton flow="create" size="lg">
          Create an account
        </FlowButton>
        <FlowButton flow="signIn" size="lg" variant="outline">
          I already have an account
        </FlowButton>
      </Stack>
      <Divider label="or" />
      <PasskeyButton />
    </Stack>
    <Text size="sm" ta="center">
      Got an invite? Open the link in your email to join.
    </Text>
  </Stack>
);
