import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { reviewsMock } from './mocks/reviews.ts';
import { Cities } from './constants/cities.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App reviews={reviewsMock} cities={Object.values(Cities)} ></App>
  </React.StrictMode>
);
