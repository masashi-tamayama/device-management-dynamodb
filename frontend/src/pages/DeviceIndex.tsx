import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { deviceApi, Device } from '../api/deviceApi';
import Loading from '../components/common/Loading';

const DeviceIndex: React.FC = () => {
  const location = useLocation();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, [location.state]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const data = await deviceApi.getAllDevices();
      // created_atで降順ソート（新しい順）
      const sortedData = [...data].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
      setDevices(sortedData);
      setError(null);
    } catch (err) {
      setError('デバイス一覧の取得に失敗しました。');
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div style={{ padding: '20px' }}>
      <h1>機器一覧</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/devices/create" style={{ ...buttonStyle, backgroundColor: '#2196F3' }}>
          新規登録
        </Link>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>機器</th>
            <th style={tableHeaderStyle}>メーカー</th>
            <th style={tableHeaderStyle}>操作</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td style={tableCellStyle}>{device.id}</td>
              <td style={tableCellStyle}>{device.name}</td>
              <td style={tableCellStyle}>{device.maker}</td>
              <td style={tableCellStyle}>
                <Link 
                  to={`/devices/${device.id}/edit`}
                  style={buttonStyle}
                >
                  編集
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// スタイル定義
const tableHeaderStyle = {
  backgroundColor: '#f5f5f5',
  padding: '12px',
  borderBottom: '2px solid #ddd',
  textAlign: 'left' as const
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '4px',
  textDecoration: 'none',
  display: 'inline-block',
  marginRight: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px'
};

export default DeviceIndex; 