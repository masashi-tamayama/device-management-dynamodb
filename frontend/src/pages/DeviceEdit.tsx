import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deviceApi } from '../api/deviceApi';

const DeviceEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState({
    name: '',
    maker: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevice = async () => {
      if (!id) return;
      try {
        const deviceData = await deviceApi.getDevice(id);
        setDevice(deviceData);
      } catch (err) {
        setError('デバイスの取得に失敗しました。');
        console.error('Error fetching device:', err);
      }
    };
    fetchDevice();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await deviceApi.updateDevice(id, device);
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/devices', { state: { refresh: true } });
    } catch (err) {
      setError('デバイスの更新に失敗しました。');
      console.error('Error updating device:', err);
    }
  };

  const handleCancel = () => {
    navigate('/devices');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>機器編集</h1>
      <p>編集対象ID: {id}</p>
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
            更新
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

export default DeviceEdit; 