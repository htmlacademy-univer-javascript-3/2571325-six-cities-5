import React from 'react';

const styleSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const styleLoader = {
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
};

const Spinner: React.FC = () => (
  <div className="spinner" style={styleSpinner}>
    <div className="loader" style={styleLoader}></div>
  </div>
);

export default Spinner;
