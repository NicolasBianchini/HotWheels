import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const initializeFirestoreProducts = async (): Promise<void> => {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    if (!snapshot.empty) {
        return;
    }
};

export const checkFirestoreConnection = async (): Promise<boolean> => {
    try {
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        return true;
    } catch {
        return false;
    }
}; 