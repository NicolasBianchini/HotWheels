import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    onSnapshot,
    Timestamp
} from 'firebase/firestore';
import { db } from '../../firebase';
import type { HotWheelsCar } from '../types';
import { useNotifications } from './NotificationContext';

interface ProductsContextType {
    products: HotWheelsCar[];
    loading: boolean;
    error: string | null;
    addProduct: (product: Omit<HotWheelsCar, 'id'>) => Promise<void>;
    updateProduct: (id: string, updates: Partial<HotWheelsCar>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    refreshProducts: () => Promise<void>;
    initializeProducts: () => Promise<(() => void) | undefined>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};

interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<HotWheelsCar[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { success, error: showError } = useNotifications();

    const productsCollection = collection(db, 'products');

    // Initialize products with real-time updates
    const initializeProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            // Set up real-time listener - ordered by creation date (newest first)
            const q = query(productsCollection, orderBy('createdAt', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const productsData: HotWheelsCar[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    productsData.push({
                        id: doc.id,
                        ...data,
                        // Ensure timestamp fields are converted to numbers if needed
                        year: typeof data.year === 'number' ? data.year : parseInt(data.year) || 2024,
                        price: typeof data.price === 'number' ? data.price : parseFloat(data.price) || 0,
                        originalPrice: data.originalPrice ?
                            (typeof data.originalPrice === 'number' ? data.originalPrice : parseFloat(data.originalPrice))
                            : undefined,
                        stock: typeof data.stock === 'number' ? data.stock : parseInt(data.stock) || 0,
                    } as HotWheelsCar);
                });
                setProducts(productsData);
                setLoading(false);
            }, (error) => {
                console.error('Error fetching products:', error);
                setError('Erro ao carregar produtos');
                showError('Erro ao carregar produtos', 'Verifique sua conexão e tente novamente');
                setLoading(false);
            });

            // Store unsubscribe function for cleanup
            return unsubscribe;
        } catch (error) {
            console.error('Error initializing products:', error);
            setError('Erro ao inicializar produtos');
            showError('Erro ao inicializar produtos', 'Verifique sua conexão e tente novamente');
            setLoading(false);
        }
    };

    // Load products once on mount
    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const setup = async () => {
            unsubscribe = await initializeProducts();
        };

        setup();

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const addProduct = async (productData: Omit<HotWheelsCar, 'id'>) => {
        try {
            setError(null);
            await addDoc(productsCollection, {
                ...productData,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });
            success('Produto adicionado com sucesso!');
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Erro ao adicionar produto');
            showError('Erro ao adicionar produto', 'Verifique os dados e tente novamente');
            throw error;
        }
    };

    const updateProduct = async (id: string, updates: Partial<HotWheelsCar>) => {
        try {
            setError(null);
            const productRef = doc(db, 'products', id);
            await updateDoc(productRef, {
                ...updates,
                updatedAt: Timestamp.now(),
            });
            success('Produto atualizado com sucesso!');
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Erro ao atualizar produto');
            showError('Erro ao atualizar produto', 'Verifique os dados e tente novamente');
            throw error;
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            setError(null);
            const productRef = doc(db, 'products', id);
            await deleteDoc(productRef);
            success('Produto removido com sucesso!');
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Erro ao deletar produto');
            showError('Erro ao deletar produto', 'Tente novamente');
            throw error;
        }
    };

    const refreshProducts = async () => {
        try {
            setError(null);
            const snapshot = await getDocs(query(productsCollection, orderBy('createdAt', 'desc')));
            const productsData: HotWheelsCar[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                productsData.push({
                    id: doc.id,
                    ...data,
                    year: typeof data.year === 'number' ? data.year : parseInt(data.year) || 2024,
                    price: typeof data.price === 'number' ? data.price : parseFloat(data.price) || 0,
                    originalPrice: data.originalPrice ?
                        (typeof data.originalPrice === 'number' ? data.originalPrice : parseFloat(data.originalPrice))
                        : undefined,
                    stock: typeof data.stock === 'number' ? data.stock : parseInt(data.stock) || 0,
                } as HotWheelsCar);
            });
            setProducts(productsData);
            success('Produtos atualizados!');
        } catch (error) {
            console.error('Error refreshing products:', error);
            setError('Erro ao atualizar produtos');
            showError('Erro ao atualizar produtos', 'Verifique sua conexão e tente novamente');
        }
    };

    const value = {
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        initializeProducts,
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}; 