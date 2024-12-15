import React from 'react';
import { AppRoutes } from '../../constants/routers';
import { Navigate } from 'react-router-dom';

type PrivateRouterProps = {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const PrivateRouter: React.FC<PrivateRouterProps> = (props) => {
  const { isAuthenticated, children } = props;
  return isAuthenticated ? children : <Navigate to={AppRoutes.Login} />;
};

export default PrivateRouter;
