import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../constants/auth';
import LoadingScreen from '../loading-screen/loading-screen';
import { selectAuthStatus } from '../../store/selectors/selectors';
import { AppRoutes } from '../../constants/routers';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const authorizationStatus = useSelector(selectAuthStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return authorizationStatus === AuthorizationStatus.NoAuth
    ? children
    : <Navigate to={AppRoutes.Default} />;
};

export default PublicRoute;
