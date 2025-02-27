import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deviceApi } from '../api/deviceApi';

const DeviceNew: React.FC = () => {
  const navigate = useNavigate();
  const [device, setDevice] = useState({
    name: '',
    maker: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deviceApi.createDevice(device);
      // 登録成功後、一覧画面に遷移する前に少し待つ
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/devices', { state: { refresh: true } });
    } catch (err) {
      setError('デバイスの作成に失敗しました。');
      console.error('Error creating device:', err);
    }
  };

  const handleCancel = () => {
    navigate('/devices');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>機器登録</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>
            機器：
            <input
              type="text"
              value={device.name}
              onChange={(e) => setDevice({ ...device, name: e.target.value })}
              style={inputStyle}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>
            メーカー：
            <input
              type="text"
              value={device.maker}
              onChange={(e) => setDevice({ ...device, maker: e.target.value })}
              style={inputStyle}
              required
            />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button type="submit" style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}>
            登録
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{ ...buttonStyle, backgroundColor: '#f44336' }}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

// スタイル定義
const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '16px'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginTop: '5px'
};

const buttonStyle = {
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  minWidth: '100px'
};

export default DeviceNew; 