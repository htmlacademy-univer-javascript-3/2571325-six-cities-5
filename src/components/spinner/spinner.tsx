import React from 'react';

interface SpinnerProps {
  height?: string;
}

const Spinner: React.FC<SpinnerProps> = ({height}) => {
  const styleSpinner = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height ? height : '100vh',
  };

  const styleLoader = {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  };

  return (
    <div className="spinner" style={styleSpinner}>
      <div className="loader" style={styleLoader}></div>
    </div>
  );
};

export default Spinner;
