export interface Device {
    id?: string;
    name: string;
    maker: string;
    created_at?: string;
    updated_at?: string;
}

export interface DeviceCreateInput {
    name: string;
    maker: string;
}

export interface DeviceUpdateInput {
    name: string;
    maker: string;
} 