import React from 'react';
import { AppRoutes } from '../../constants/routers';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../constants/auth';
import LoadingScreen from '../loading-screen/loading-screen';

interface PrivateRouterProps {
  children: JSX.Element;
}

const PrivateRouter: React.FC<PrivateRouterProps> = (props) => {
  const { children } = props;
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const authСondition = (authorizationStatus === AuthorizationStatus.Auth);

  if(authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return authСondition ? children : <Navigate to={AppRoutes.Login} />;
};

export default PrivateRouter;
