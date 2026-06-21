'use client';

import { useContext } from 'react';

import { LoginFlowContext } from './LoginFlowContext';

export const useLoginFlow = () => {
  const { flow, changeFlow } = useContext(LoginFlowContext);

  return { flow, changeFlow };
};
