import React from 'react';
import Spinner from '../spinner/spinner';

const LoadingScreen: React.FC = () => (
  <div className="loading" style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '50vh' }}>
    Loading...
    <Spinner height='20vh' />
  </div>
);

export default LoadingScreen;
