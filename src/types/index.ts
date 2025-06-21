export interface HotWheelsCar {
    id: string;
    name: string;
    brand: 'Hot Wheels' | 'Mini GT' | 'Auto World' | 'Tarmac Works' | 'Auto Art' | 'Jada' | 'Burago' | 'Almost Real' | 'Pop Race' | 'Tiny' | 'Inno 64';
    series: string;
    year: number;
    price: number;
    originalPrice?: number;
    image: string;
    description: string;
    condition: 'Novo' | 'Usado - Excelente' | 'Usado - Bom' | 'Colecionador';
    category?: 'Mainline' | 'Super Treasure Hunt' | 'Treasure Hunt' | 'Premium' | 'Team Transport' | 'Cargo Carriers';
    color: string;
    inStock: boolean;
    stock: number;
    featured?: boolean;
    rarity?: 'Comum' | 'Raro' | 'Super Raro' | 'Treasure Hunt';
}

export interface CartItem extends HotWheelsCar {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: 'user' | 'admin';
    createdAt?: string;
    updatedAt?: string;
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
    brand?: string;
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

export interface Promotion {
    id: string;
    title: string;
    description: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
    productIds: string[];
} 