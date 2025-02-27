import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DeviceIndex from './pages/DeviceIndex';
import DeviceNew from './pages/DeviceNew';
import DeviceEdit from './pages/DeviceEdit';
import Header from './components/common/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/devices" replace />} />
            <Route path="/devices" element={<DeviceIndex />} />
            <Route path="/devices/create" element={<DeviceNew />} />
            <Route path="/devices/:id/edit" element={<DeviceEdit />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;