import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
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
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                return {
                    id: firebaseUser.uid,
                    name: userData.name || firebaseUser.displayName || 'Usuário',
                    email: firebaseUser.email || '',
                    avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`
                };
            }
        } catch (error) {
            console.warn('Could not fetch user data from Firestore:', error);
        }

        // Fallback: create basic user from Firebase auth only
        return {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Usuário',
            email: firebaseUser.email || '',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`
        };
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userData = await convertFirebaseUser(firebaseUser);
                    setUser(userData);
                } catch (error) {
                    console.error('Error converting Firebase user:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const register = async (name: string, email: string, password: string): Promise<void> => {
        try {
            setLoading(true);
            // Create user with Firebase Auth
            const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

            // Update the user's display name
            await updateProfile(firebaseUser, { displayName: name });

            // Create user document in Firestore
            const userData = {
                name,
                email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                createdAt: new Date().toISOString()
            };

            await setDoc(doc(db, 'users', firebaseUser.uid), userData);

        } catch (error) {
            let message = 'Erro ao criar conta';
            const errorCode = (error as { code?: string }).code;
            if (errorCode === 'auth/email-already-in-use') {
                message = 'Este email já está em uso';
            } else if (errorCode === 'auth/weak-password') {
                message = 'A senha deve ter pelo menos 6 caracteres';
            } else if (errorCode === 'auth/invalid-email') {
                message = 'Email inválido';
            }
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            let message = 'Erro ao fazer login';
            const errorCode = (error as { code?: string }).code;
            if (errorCode === 'auth/user-not-found') {
                message = 'Usuário não encontrado';
            } else if (errorCode === 'auth/wrong-password') {
                message = 'Senha incorreta';
            } else if (errorCode === 'auth/invalid-email') {
                message = 'Email inválido';
            } else if (errorCode === 'auth/too-many-requests') {
                message = 'Muitas tentativas. Tente novamente mais tarde';
            }
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
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

    const value = {
        user,
        login,
        register,
        logout,
        refreshUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 