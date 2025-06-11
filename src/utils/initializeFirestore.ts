import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { hotWheelsCars } from '../data/cars';

export const initializeFirestoreProducts = async (): Promise<void> => {
    try {
        console.log('🔄 Verificando se produtos já existem no Firestore...');

        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        if (!snapshot.empty) {
            console.log('✅ Produtos já existem no Firestore. Total:', snapshot.size);
            return;
        }

        console.log('📦 Inicializando produtos no Firestore...');

        // Use batch write for better performance
        const batch = writeBatch(db);

        hotWheelsCars.forEach((car) => {
            const docRef = doc(productsCollection);
            batch.set(docRef, {
                ...car,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        });

        await batch.commit();

        console.log('✅ Produtos inicializados com sucesso no Firestore!');
        console.log(`📊 Total de produtos adicionados: ${hotWheelsCars.length}`);

    } catch (error) {
        console.error('❌ Erro ao inicializar produtos no Firestore:', error);
        throw error;
    }
};

export const checkFirestoreConnection = async (): Promise<boolean> => {
    try {
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        console.log('✅ Conexão com Firestore estabelecida com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro na conexão com Firestore:', error);
        return false;
    }
}; 