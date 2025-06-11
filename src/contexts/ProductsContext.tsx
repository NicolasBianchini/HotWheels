import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { hotWheelsCars } from '../data/cars';
import { initializeFirestoreProducts, checkFirestoreConnection } from '../utils/initializeFirestore';
import type { HotWheelsCar } from '../types';

interface ProductsContextType {
    products: HotWheelsCar[];
    loading: boolean;
    addProduct: (product: Omit<HotWheelsCar, 'id'>) => Promise<void>;
    updateProduct: (id: string, updates: Partial<HotWheelsCar>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    refreshProducts: () => Promise<void>;
    initializeProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts deve ser usado dentro de um ProductsProvider');
    }
    return context;
};

interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<HotWheelsCar[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize products in Firestore (run once)
    const initializeProducts = async (): Promise<void> => {
        try {
            setLoading(true);
            const productsCollection = collection(db, 'products');

            // Check if products already exist
            const snapshot = await getDocs(productsCollection);
            if (snapshot.empty) {
                // Add initial products to Firestore
                for (const car of hotWheelsCars) {
                    await addDoc(productsCollection, car);
                }
                console.log('Products initialized in Firestore');
            }
        } catch (error) {
            console.error('Error initializing products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Load products from Firestore
    const loadProducts = async (): Promise<void> => {
        try {
            setLoading(true);
            const productsCollection = collection(db, 'products');
            const snapshot = await getDocs(productsCollection);

            if (!snapshot.empty) {
                const firestoreProducts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as HotWheelsCar[];
                setProducts(firestoreProducts);
            }
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback to local data
            setProducts(hotWheelsCars);
        } finally {
            setLoading(false);
        }
    };

    // Add new product
    const addProduct = async (product: Omit<HotWheelsCar, 'id'>): Promise<void> => {
        try {
            const productsCollection = collection(db, 'products');
            const docRef = await addDoc(productsCollection, product);

            // Update local state
            const newProduct = { id: docRef.id, ...product };
            setProducts(prev => [...prev, newProduct]);
        } catch (error) {
            console.error('Error adding product:', error);
            throw new Error('Erro ao adicionar produto');
        }
    };

    // Update existing product
    const updateProduct = async (id: string, updates: Partial<HotWheelsCar>): Promise<void> => {
        try {
            const productDoc = doc(db, 'products', id);
            await updateDoc(productDoc, updates);

            // Update local state
            setProducts(prev =>
                prev.map(product =>
                    product.id === id ? { ...product, ...updates } : product
                )
            );
        } catch (error) {
            console.error('Error updating product:', error);
            throw new Error('Erro ao atualizar produto');
        }
    };

    // Delete product
    const deleteProduct = async (id: string): Promise<void> => {
        try {
            const productDoc = doc(db, 'products', id);
            await deleteDoc(productDoc);

            // Update local state
            setProducts(prev => prev.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            throw new Error('Erro ao deletar produto');
        }
    };

    // Refresh products from Firestore
    const refreshProducts = async (): Promise<void> => {
        await loadProducts();
    };

    // Initialize Firestore and listen for real-time updates
    useEffect(() => {
        const initializeAndListen = async () => {
            try {
                // Check connection first
                const isConnected = await checkFirestoreConnection();
                if (!isConnected) {
                    console.warn('⚠️ Firestore não conectado, usando dados locais...');
                    setProducts(hotWheelsCars);
                    setLoading(false);
                    return;
                }

                // Initialize products if needed
                await initializeFirestoreProducts();

                // Set up real-time listener
                const productsCollection = collection(db, 'products');
                const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
                    if (!snapshot.empty) {
                        const firestoreProducts = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })) as HotWheelsCar[];
                        setProducts(firestoreProducts);
                    } else {
                        // If no products in Firestore, use local data
                        setProducts(hotWheelsCars);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error('Error listening to products:', error);
                    // Fallback to local data on error
                    setProducts(hotWheelsCars);
                    setLoading(false);
                });

                return () => unsubscribe();

            } catch (error) {
                console.error('Error initializing products:', error);
                // Fallback to local data
                setProducts(hotWheelsCars);
                setLoading(false);
            }
        };

        initializeAndListen();
    }, []);

    const value = {
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        initializeProducts
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}; 