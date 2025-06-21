import { collection, addDoc, getDocs, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { mockProducts } from '../data/mockProducts';

export const checkIfDataExists = async (): Promise<boolean> => {
    try {
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        return !snapshot.empty;
    } catch (error) {
        console.error('Error checking existing data:', error);
        return false;
    }
};

export const migrateProductsToFirebase = async (): Promise<void> => {
    try {
        console.log('🚀 Iniciando migração de produtos para Firebase...');

        // Check if data already exists
        const dataExists = await checkIfDataExists();
        if (dataExists) {
            console.log('⚠️ Produtos já existem no Firebase. Migração cancelada.');
            return;
        }

        const productsCollection = collection(db, 'products');
        let successCount = 0;
        let errorCount = 0;

        for (const product of mockProducts) {
            try {
                // Remove the 'id' field since Firestore will generate its own and add timestamps
                const productToSave = {
                    name: product.name,
                    brand: product.brand,
                    series: product.series,
                    year: product.year,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: product.image,
                    description: product.description,
                    condition: product.condition,
                    category: product.category,
                    color: product.color,
                    inStock: product.inStock,
                    stock: product.stock,
                    featured: product.featured,
                    rarity: product.rarity,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                };

                await addDoc(productsCollection, productToSave);
                successCount++;
                console.log(`✅ Produto "${product.name}" migrado com sucesso`);
            } catch (error) {
                errorCount++;
                console.error(`❌ Erro ao migrar produto "${product.name}":`, error);
            }
        }

        console.log(`\n📊 Migração concluída:`);
        console.log(`✅ Sucessos: ${successCount}`);
        console.log(`❌ Erros: ${errorCount}`);
        console.log(`📦 Total: ${mockProducts.length}`);

        if (successCount > 0) {
            console.log('\n🎉 Dados migrados com sucesso para o Firebase!');
            console.log('💡 Você pode agora remover os dados mockados do código.');
        }
    } catch (error) {
        console.error('❌ Erro geral na migração:', error);
        throw error;
    }
};

// Helper function to clear all products (use with caution!)
export const clearAllProducts = async (): Promise<void> => {
    try {
        console.log('🗑️ Removendo todos os produtos do Firebase...');

        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        const deletePromises = snapshot.docs.map(doc => {
            return import('firebase/firestore').then(({ deleteDoc, doc: docRef }) =>
                deleteDoc(docRef(db, 'products', doc.id))
            );
        });

        await Promise.all(deletePromises);
        console.log(`✅ ${snapshot.size} produtos removidos com sucesso`);
    } catch (error) {
        console.error('❌ Erro ao limpar produtos:', error);
        throw error;
    }
};

// Function to add timestamps to existing products
export const addTimestampsToExistingProducts = async (): Promise<void> => {
    try {
        console.log('⏰ Adicionando timestamps aos produtos existentes...');

        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const docSnapshot of snapshot.docs) {
            const data = docSnapshot.data();

            // Check if product already has createdAt
            if (!data.createdAt) {
                try {
                    const productRef = doc(db, 'products', docSnapshot.id);
                    await updateDoc(productRef, {
                        createdAt: Timestamp.now(),
                        updatedAt: Timestamp.now(),
                    });
                    updatedCount++;
                    console.log(`✅ Timestamps adicionados ao produto: ${data.name}`);
                } catch (error) {
                    console.error(`❌ Erro ao atualizar produto ${data.name}:`, error);
                }
            } else {
                skippedCount++;
            }
        }

        console.log(`\n📊 Atualização de timestamps concluída:`);
        console.log(`✅ Atualizados: ${updatedCount}`);
        console.log(`⏭️ Ignorados (já tinham timestamp): ${skippedCount}`);
        console.log(`📦 Total: ${snapshot.size}`);
    } catch (error) {
        console.error('❌ Erro ao adicionar timestamps:', error);
        throw error;
    }
};

// Function to validate Firebase connection
export const testFirebaseConnection = async (): Promise<boolean> => {
    try {
        console.log('🔗 Testando conexão com Firebase...');

        const testCollection = collection(db, 'test');
        await getDocs(testCollection);

        console.log('✅ Conexão com Firebase OK');
        return true;
    } catch (error) {
        console.error('❌ Erro de conexão com Firebase:', error);
        return false;
    }
}; 