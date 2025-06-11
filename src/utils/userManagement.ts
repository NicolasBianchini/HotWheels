import { collection, getDocs, doc, getDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import type { User } from '../types';

export const getAllUsers = async (): Promise<User[]> => {
    try {
        console.log('🔍 Buscando todos os usuários no Firestore...');
        const usersCollection = collection(db, 'users');
        const usersQuery = query(usersCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(usersQuery);

        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as User[];

        console.log('✅ Usuários encontrados:', users.length);
        return users;
    } catch (error) {
        console.error('❌ Erro ao buscar usuários:', error);
        throw error;
    }
};

export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        console.log('🔍 Buscando usuário por ID:', userId);
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
            const user = { id: userDoc.id, ...userDoc.data() } as User;
            console.log('✅ Usuário encontrado:', user.name);
            return user;
        } else {
            console.warn('⚠️ Usuário não encontrado');
            return null;
        }
    } catch (error) {
        console.error('❌ Erro ao buscar usuário:', error);
        throw error;
    }
};

export const promoteUserToAdmin = async (userId: string): Promise<void> => {
    try {
        console.log('🔄 Promovendo usuário a administrador:', userId);
        const userRef = doc(db, 'users', userId);

        // Verificar se o usuário existe
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw new Error('Usuário não encontrado');
        }

        await updateDoc(userRef, {
            role: 'admin',
            updatedAt: new Date().toISOString()
        });

        console.log('✅ Usuário promovido a administrador com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao promover usuário:', error);
        throw error;
    }
};

export const demoteUserFromAdmin = async (userId: string): Promise<void> => {
    try {
        console.log('🔄 Removendo privilégios de administrador:', userId);
        const userRef = doc(db, 'users', userId);

        // Verificar se o usuário existe
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            throw new Error('Usuário não encontrado');
        }

        await updateDoc(userRef, {
            role: 'user',
            updatedAt: new Date().toISOString()
        });

        console.log('✅ Privilégios de administrador removidos com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao remover privilégios:', error);
        throw error;
    }
};

export const checkUserStats = async (): Promise<{
    totalUsers: number;
    admins: number;
    regularUsers: number;
}> => {
    try {
        const users = await getAllUsers();
        const admins = users.filter(user => user.role === 'admin');
        const regularUsers = users.filter(user => user.role === 'user');

        const stats = {
            totalUsers: users.length,
            admins: admins.length,
            regularUsers: regularUsers.length
        };

        console.log('📊 Estatísticas de usuários:', stats);
        return stats;
    } catch (error) {
        console.error('❌ Erro ao obter estatísticas:', error);
        throw error;
    }
}; 