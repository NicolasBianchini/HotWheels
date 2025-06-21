import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Promotion } from '../types';
// If you haven't installed uuid, run: npm install uuid
import { v4 as uuidv4 } from 'uuid';

interface PromotionsContextType {
    promotions: Promotion[];
    addPromotion: (promotion: Omit<Promotion, 'id'>) => Promise<void>;
    updatePromotion: (id: string, promotion: Omit<Promotion, 'id'>) => Promise<void>;
    deletePromotion: (id: string) => Promise<void>;
    getPromotionById: (id: string) => Promotion | undefined;
}

const PromotionsContext = createContext<PromotionsContextType | undefined>(undefined);

const initialPromotions: Promotion[] = [
    {
        id: '1',
        title: 'Promoção de Verão',
        description: 'Desconto de 20% em produtos selecionados.',
        discountPercentage: 20,
        startDate: '2023-06-01',
        endDate: '2023-08-31',
        productIds: [],
    },
    {
        id: '2',
        title: 'Oferta Especial',
        description: 'Desconto de 15% em produtos selecionados.',
        discountPercentage: 15,
        startDate: '2023-07-01',
        endDate: '2023-07-31',
        productIds: [],
    },
];

export const PromotionsProvider = ({ children }: { children: ReactNode }) => {
    const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);

    const addPromotion = async (promotion: Omit<Promotion, 'id'>) => {
        setPromotions((prev) => [
            ...prev,
            { ...promotion, id: uuidv4() },
        ]);
    };

    const updatePromotion = async (id: string, promotion: Omit<Promotion, 'id'>) => {
        setPromotions((prev) =>
            prev.map((p) => (p.id === id ? { ...promotion, id } : p))
        );
    };

    const deletePromotion = async (id: string) => {
        setPromotions((prev) => prev.filter((p) => p.id !== id));
    };

    const getPromotionById = (id: string) => promotions.find((p) => p.id === id);

    return (
        <PromotionsContext.Provider
            value={{ promotions, addPromotion, updatePromotion, deletePromotion, getPromotionById }}
        >
            {children}
        </PromotionsContext.Provider>
    );
};

export const usePromotions = () => {
    const context = useContext(PromotionsContext);
    if (!context) {
        throw new Error('usePromotions must be used within a PromotionsProvider');
    }
    return context;
}; 