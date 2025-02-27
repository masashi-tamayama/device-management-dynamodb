import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DeviceCreateInput } from '../../types/device';
import { deviceApi } from '../../api/deviceApi';

export const DeviceForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<DeviceCreateInput>({
        name: '',
        maker: ''
    });

    useEffect(() => {
        const fetchDevice = async () => {
            if (id) {
                try {
                    const device = await deviceApi.getDevice(id);
                    setFormData({
                        name: device.name,
                        maker: device.maker
                    });
                } catch (error) {
                    console.error('デバイスの取得に失敗しました:', error);
                    navigate('/devices');
                }
            }
        };

        fetchDevice();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await deviceApi.updateDevice(id, formData);
            } else {
                await deviceApi.createDevice(formData);
            }
            navigate('/devices');
        } catch (error) {
            console.error('デバイスの保存に失敗しました:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <h1>{id ? 'デバイスの編集' : 'デバイスの新規登録'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        機器名:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        メーカー:
                        <input
                            type="text"
                            name="maker"
                            value={formData.maker}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">
                        {id ? '更新' : '登録'}
                    </button>
                    <button type="button" onClick={() => navigate('/devices')}>
                        キャンセル
                    </button>
                </div>
            </form>
        </div>
    );
}; 