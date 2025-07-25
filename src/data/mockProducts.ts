import type { HotWheelsCar } from '../types';

// Dados de exemplo para migração e testes
export const mockProducts: HotWheelsCar[] = [
    // HOT WHEELS PRODUCTS
    {
        id: '1',
        name: 'Toyota Supra',
        brand: 'Hot Wheels',
        series: 'Velozes e Furiosos',
        year: 1995,
        price: 149.90,
        originalPrice: 179.90,
        image: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400',
        description: 'Icônico Toyota Supra dos filmes Velozes e Furiosos, com detalhes autênticos e acabamento premium.',
        condition: 'Novo',
        category: 'Premium',
        color: 'Laranja',
        inStock: true,
        stock: 15,
        featured: true,
        rarity: 'Raro'
    },
    {
        id: '2',
        name: 'Chevrolet Camaro SS',
        brand: 'Hot Wheels',
        series: 'Muscle Cars',
        year: 2020,
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        description: 'Camaro SS com pintura metálica e rodas especiais. Um clássico americano em miniatura.',
        condition: 'Novo',
        category: 'Mainline',
        color: 'Amarelo',
        inStock: true,
        stock: 25,
        featured: false,
        rarity: 'Comum'
    },

    // MINI GT PRODUCTS
    {
        id: '3',
        name: 'Nissan GT-R R35',
        brand: 'Mini GT',
        series: 'JDM Collection',
        year: 2022,
        price: 299.90,
        originalPrice: 349.90,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
        description: 'Nissan GT-R R35 da Mini GT com detalhes ultra-realistas e interior detalhado.',
        condition: 'Novo',
        category: 'Premium',
        color: 'Azul',
        inStock: true,
        stock: 8,
        featured: true,
        rarity: 'Super Raro'
    },

    // MAJORETTE PRODUCTS
    {
        id: '4',
        name: 'Ford Mustang GT',
        brand: 'Majorette',
        series: 'American Classics',
        year: 2018,
        price: 125.90,
        image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400',
        description: 'Ford Mustang GT com acabamento fosco e detalhes cromados.',
        condition: 'Novo',
        category: 'Mainline',
        color: 'Vermelho',
        inStock: true,
        stock: 12,
        featured: false,
        rarity: 'Comum'
    },

    // TARMAC PRODUCTS
    {
        id: '5',
        name: 'Lamborghini Huracán',
        brand: 'Tarmac',
        series: 'Supercars',
        year: 2021,
        price: 399.90,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400',
        description: 'Lamborghini Huracán com detalhes incríveis e portas funcionais.',
        condition: 'Novo',
        category: 'Premium',
        color: 'Verde',
        inStock: false,
        stock: 0,
        featured: true,
        rarity: 'Super Raro'
    },

    // MATCHBOX PRODUCTS
    {
        id: '6',
        name: 'Volkswagen Beetle Classic',
        brand: 'Matchbox',
        series: 'Classic Cars',
        year: 1970,
        price: 79.90,
        originalPrice: 99.90,
        image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=400',
        description: 'Fusca clássico da Matchbox com acabamento vintage autêntico.',
        condition: 'Novo',
        category: 'Mainline',
        color: 'Azul',
        inStock: true,
        stock: 20,
        featured: false,
        rarity: 'Comum'
    },

    // MINI GT PRODUCTS (segundo produto)
    {
        id: '7',
        name: 'McLaren P1',
        brand: 'Mini GT',
        series: 'Hypercars',
        year: 2023,
        price: 599.90,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        description: 'McLaren P1 da Mini GT com detalhes de motor e interior completo.',
        condition: 'Novo',
        category: 'Premium',
        color: 'Prata',
        inStock: true,
        stock: 3,
        featured: true,
        rarity: 'Treasure Hunt'
    },

    // HOT WHEELS PRODUCTS (segundo produto)
    {
        id: '8',
        name: 'Dodge Charger R/T',
        brand: 'Hot Wheels',
        series: 'American Muscle',
        year: 2019,
        price: 159.90,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        description: 'Dodge Charger R/T com detalhes autênticos e pintura metálica.',
        condition: 'Novo',
        category: 'Mainline',
        color: 'Preto',
        inStock: true,
        stock: 18,
        featured: false,
        rarity: 'Raro'
    }
]; 