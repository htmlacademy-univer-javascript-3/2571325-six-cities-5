import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Router from './router/router';

interface AppProps { }

const App: React.FC<AppProps> = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
