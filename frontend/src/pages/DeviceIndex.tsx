import React from 'react';
import { Link } from 'react-router-dom';

// 仮のデータ（DynamoDBの構造に合わせて更新）
const mockDevices = [
  { 
    id: '1', 
    name: '温度センサー1', 
    maker: 'センサー株式会社'
  },
  { 
    id: '2', 
    name: '監視カメラA', 
    maker: 'カメラ工業'
  }
];

const DeviceIndex: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>機器一覧</h1>
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
          {mockDevices.map(device => (
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