export interface HotWheelsCar {
    id: string;
    name: string;
    series: string;
    year: number;
    price: number;
    originalPrice?: number;
    image: string;
    description: string;
    condition: 'Novo' | 'Usado - Excelente' | 'Usado - Bom' | 'Colecionador';
    category: 'Mainline' | 'Super Treasure Hunt' | 'Treasure Hunt' | 'Premium' | 'Team Transport' | 'Cargo Carriers';
    color: string;
    inStock: boolean;
    featured?: boolean;
    rarity: 'Comum' | 'Raro' | 'Super Raro' | 'Treasure Hunt';
}

export interface CartItem extends HotWheelsCar {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';
    createdAt: Date;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

export interface SearchFilters {
    category?: string;
    condition?: string;
    priceRange?: [number, number];
    rarity?: string;
    series?: string;
    inStock?: boolean;
}

// Auth types
export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterFormData) => Promise<void>;
    logout: () => void;
    loading: boolean;
} 