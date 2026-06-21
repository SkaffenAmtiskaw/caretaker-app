'use client';

import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import type { LoginFlow } from './LoginFlow';
import { useLoginFlow } from './LoginFlow';

type Props = ButtonProps & {
  flow: LoginFlow;
};

export const FlowButton = ({ flow, ...props }: Props) => {
  const { changeFlow } = useLoginFlow();

  const handleClick = () => {
    changeFlow(flow);
  };

  return <Button {...props} onClick={handleClick} />;
};
