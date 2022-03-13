 import React from 'react';
 import { RouterContext } from './RouterContext';

type Props = {
  children: React.ReactNode;
  path?: string;
};

export function Route({ path, children }: Props) {
  const { route } = React.useContext(RouterContext);
  if (route.path !== path) {
    return null;
  }
  return <>{children}</>;
}