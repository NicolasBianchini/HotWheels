import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { HotWheelsCar } from '../types';
import { useNotifications } from './NotificationContext';
import { useAuth } from './AuthContext';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface FavoritesContextType {
    favorites: HotWheelsCar[];
    addToFavorites: (product: HotWheelsCar) => Promise<void>;
    removeFromFavorites: (productId: string) => Promise<void>;
    isFavorite: (productId: string) => boolean;
    favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
    const [favorites, setFavorites] = useState<HotWheelsCar[]>([]);
    const { success, info } = useNotifications();
    const { user } = useAuth();

    // Carregar favoritos do Firebase ou localStorage ao inicializar
    useEffect(() => {
        const loadFavorites = async () => {
            if (user) {
                try {
                    // Carregar favoritos do Firebase se usuário estiver logado
                    const userFavoritesRef = doc(db, 'favorites', user.id);
                    const favoritesDoc = await getDoc(userFavoritesRef);

                    if (favoritesDoc.exists()) {
                        const favoritesData = favoritesDoc.data();
                        setFavorites(favoritesData.products || []);
                    } else {
                        // Se não existe documento, verificar se há favoritos no localStorage para migrar
                        const localFavorites = loadFromLocalStorage();
                        await setDoc(userFavoritesRef, {
                            products: localFavorites,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        });
                        setFavorites(localFavorites);

                        if (localFavorites.length > 0) {
                            success('Favoritos sincronizados!', `${localFavorites.length} produtos foram sincronizados com sua conta`);
                        }
                    }
                } catch (error) {
                    console.error('Erro ao carregar favoritos do Firebase:', error);
                    // Fallback para localStorage
                    const localFavorites = loadFromLocalStorage();
                    setFavorites(localFavorites);
                }
            } else {
                // Se não estiver logado, usar localStorage
                const localFavorites = loadFromLocalStorage();
                setFavorites(localFavorites);
            }
        };

        const loadFromLocalStorage = (): HotWheelsCar[] => {
            const savedFavorites = localStorage.getItem('hotwheels-favorites');
            if (savedFavorites) {
                try {
                    return JSON.parse(savedFavorites);
                } catch (error) {
                    console.error('Erro ao carregar favoritos do localStorage:', error);
                }
            }
            return [];
        };

        loadFavorites();
    }, [user, success]);

    // Salvar favoritos no localStorage sempre que mudar (backup local)
    useEffect(() => {
        localStorage.setItem('hotwheels-favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = async (product: HotWheelsCar) => {
        // Verifica se o produto já está nos favoritos antes de fazer qualquer coisa
        const isAlreadyFavorite = favorites.some(item => item.id === product.id);
        if (isAlreadyFavorite) {
            return; // Não faz nada se já estiver nos favoritos
        }

        // Adiciona aos favoritos localmente
        const newFavorites = [...favorites, product];
        setFavorites(newFavorites);

        // Se usuário estiver logado, salvar imediatamente no Firebase
        if (user) {
            try {
                const userFavoritesRef = doc(db, 'favorites', user.id);

                // Filtrar dados para remover campos undefined
                const cleanProducts = newFavorites.map(product => {
                    const cleanProduct: Partial<HotWheelsCar> = {};
                    Object.keys(product).forEach(key => {
                        const value = product[key as keyof HotWheelsCar];
                        if (value !== undefined) {
                            (cleanProduct as Record<string, unknown>)[key] = value;
                        }
                    });
                    return cleanProduct as HotWheelsCar;
                });

                await updateDoc(userFavoritesRef, {
                    products: cleanProducts,
                    updatedAt: new Date().toISOString()
                });
            } catch (error) {
                console.error('Erro ao salvar favorito no Firebase:', error);
            }
        }

        // Mostra a notificação
        success('Adicionado aos favoritos!', product.name);
    };

    const removeFromFavorites = async (productId: string) => {
        // Verifica se o produto está nos favoritos antes de fazer qualquer coisa
        const product = favorites.find(item => item.id === productId);
        if (!product) {
            return; // Produto não está nos favoritos
        }

        // Remove dos favoritos localmente
        const newFavorites = favorites.filter(item => item.id !== productId);
        setFavorites(newFavorites);

        // Se usuário estiver logado, salvar imediatamente no Firebase
        if (user) {
            try {
                const userFavoritesRef = doc(db, 'favorites', user.id);

                // Filtrar dados para remover campos undefined
                const cleanProducts = newFavorites.map(product => {
                    const cleanProduct: Partial<HotWheelsCar> = {};
                    Object.keys(product).forEach(key => {
                        const value = product[key as keyof HotWheelsCar];
                        if (value !== undefined) {
                            (cleanProduct as Record<string, unknown>)[key] = value;
                        }
                    });
                    return cleanProduct as HotWheelsCar;
                });

                await updateDoc(userFavoritesRef, {
                    products: cleanProducts,
                    updatedAt: new Date().toISOString()
                });
            } catch (error) {
                console.error('Erro ao remover favorito do Firebase:', error);
            }
        }

        // Mostra a notificação
        info('Removido dos favoritos', product.name);
    };

    const isFavorite = (productId: string) => {
        return favorites.some(item => item.id === productId);
    };

    const favoritesCount = favorites.length;

    const value: FavoritesContextType = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        favoritesCount,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}; 