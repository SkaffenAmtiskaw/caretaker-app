'use client';

import { createContext } from 'react';

export const LOGIN_FLOW_OPTIONS = [
  'landing',
  'create',
  'signIn',
  'passkey',
  'verify',
] as const;

export type LoginFlow = (typeof LOGIN_FLOW_OPTIONS)[number];

export type LoginFlowContextType = {
  flow: LoginFlow;
  changeFlow: (flow: LoginFlow) => void;
};

export const LoginFlowContext = createContext<LoginFlowContextType>({
  flow: 'landing',
  changeFlow: () => {},
});
