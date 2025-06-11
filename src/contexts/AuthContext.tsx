import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import type { User } from '../types';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAdmin: () => boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Convert Firebase User to our User type
    const convertFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
        try {
            // Try to get additional user data from Firestore
            console.log('🔍 Buscando dados do usuário no Firestore:', firebaseUser.uid);
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('✅ Dados do usuário encontrados no Firestore:', {
                    uid: firebaseUser.uid,
                    name: userData.name,
                    role: userData.role
                });
                return {
                    id: firebaseUser.uid,
                    name: userData.name || firebaseUser.displayName || 'Usuário',
                    email: firebaseUser.email || '',
                    avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
                    role: userData.role || 'user',
                    createdAt: userData.createdAt,
                    updatedAt: userData.updatedAt
                };
            } else {
                console.warn('⚠️ Usuário não encontrado no Firestore, criando dados básicos');
            }
        } catch (error) {
            console.warn('❌ Erro ao buscar dados do usuário no Firestore:', error);
        }

        // Fallback: create basic user from Firebase auth only
        console.log('🔄 Usando dados básicos do Firebase Auth');
        return {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Usuário',
            email: firebaseUser.email || '',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
            role: 'user'
        };
    };

    // Restaurar usuário do localStorage ao iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem('hw_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    const register = async (name: string, email: string, password: string): Promise<void> => {
        try {
            setLoading(true);
            console.log('🔄 Iniciando registro de usuário (Firestore only)...');

            // Gerar um ID único para o usuário
            const userId = crypto.randomUUID();

            // Criar usuário no Firestore
            const userData = {
                name,
                email,
                password, // ATENÇÃO: senha em texto puro, só para testes!
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await setDoc(doc(db, 'users', userId), userData);
            console.log('✅ Usuário salvo no Firestore:', {
                userId,
                name,
                email,
                role: 'user'
            });

            // Atualiza o estado local e salva no localStorage
            const userObj = {
                id: userId,
                name,
                email,
                avatar: userData.avatar,
                role: 'user',
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt
            } as const;
            setUser(userObj);
            localStorage.setItem('hw_user', JSON.stringify(userObj));
        } catch (error) {
            console.error('❌ Erro no registro:', error);
            throw new Error('Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    // Novo login manual (Firestore only)
    const login = async (email: string, password: string): Promise<void> => {
        try {
            setLoading(true);
            // Buscar usuário pelo email
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                throw new Error('Usuário não encontrado');
            }
            const userDoc = snapshot.docs[0];
            const userData = userDoc.data();
            if (userData.password !== password) {
                throw new Error('Senha incorreta');
            }
            const userObj = {
                id: userDoc.id,
                name: userData.name,
                email: userData.email,
                avatar: userData.avatar,
                role: (userData.role === 'admin' ? 'admin' : 'user'),
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt
            } as const;
            setUser(userObj);
            localStorage.setItem('hw_user', JSON.stringify(userObj));
        } catch (error) {
            console.error('❌ Erro no login:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            setUser(null);
            localStorage.removeItem('hw_user');
        } catch (error) {
            console.error('Error signing out:', error);
            throw new Error('Erro ao fazer logout');
        }
    };

    const refreshUser = async (): Promise<void> => {
        if (auth.currentUser) {
            try {
                const userData = await convertFirebaseUser(auth.currentUser);
                setUser(userData);
            } catch (error) {
                console.error('Error refreshing user:', error);
            }
        }
    };

    const isAdmin = (): boolean => {
        return user?.role === 'admin';
    };

    const value = {
        user,
        login,
        register,
        logout,
        refreshUser,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 