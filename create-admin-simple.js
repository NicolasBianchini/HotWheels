// Script simples para criar usuário administrador
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCg0NAXbddSGwQSy2CqR7ZEojWIdX7RWYc",
    authDomain: "rafa-hotwheels.firebaseapp.com",
    projectId: "rafa-hotwheels",
    storageBucket: "rafa-hotwheels.firebasestorage.app",
    messagingSenderId: "33510959055",
    appId: "1:33510959055:web:124a31b0e20ab4418914ba",
    measurementId: "G-LXPZN8BK1D"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createAdminUser() {
    try {
        // Criar um usuário admin direto no Firestore
        const adminUserId = "admin-test-123";

        const adminData = {
            name: "Admin do Sistema",
            email: "admin@hotwheels.com",
            role: "admin",
            avatar: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const userRef = doc(db, 'users', adminUserId);
        await setDoc(userRef, adminData);

        console.log('✅ Usuário administrador criado com sucesso!');
        console.log('📋 Dados:', adminData);
        console.log('🔑 ID do usuário:', adminUserId);

    } catch (error) {
        console.error('❌ Erro ao criar administrador:', error);
    }
}

// Executar o script
createAdminUser(); 