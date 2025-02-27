import React from 'react';

const Loading: React.FC = () => {
  return (
    <div style={loadingContainerStyle}>
      <div style={loadingTextStyle}>読み込み中...</div>
    </div>
  );
};

const loadingContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  width: '100%'
};

const loadingTextStyle = {
  fontSize: '1.2rem',
  color: '#666'
};

export default Loading; 