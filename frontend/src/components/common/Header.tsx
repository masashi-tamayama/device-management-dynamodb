import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={titleStyle}>
          機器管理システム
        </Link>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#2196F3',
  padding: '1rem 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px'
};

const titleStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold' as const
};

export default Header; 