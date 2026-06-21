'use client';

import { useToggle } from '@mantine/hooks';
import type { LoginFlow } from './LoginFlowContext';
import { LOGIN_FLOW_OPTIONS, LoginFlowContext } from './LoginFlowContext';

type Props = {
  [Flow in LoginFlow]: React.ReactNode;
};

export const LoginFlowProvider = (props: Props) => {
  const [flow, changeFlow] = useToggle(LOGIN_FLOW_OPTIONS);

  return (
    <LoginFlowContext.Provider value={{ flow, changeFlow }}>
      {props[flow]}
    </LoginFlowContext.Provider>
  );
};
