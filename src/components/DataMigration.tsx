import { useState } from 'react';
import { testFirebaseConnection, migrateProductsToFirebase, checkIfDataExists, clearAllProducts, addTimestampsToExistingProducts } from '../utils/migrateData';
import { useNotifications } from '../contexts/NotificationContext';

const DataMigration = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [isMigrating, setIsMigrating] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [isUpdatingTimestamps, setIsUpdatingTimestamps] = useState(false);
    const [dataExists, setDataExists] = useState<boolean | null>(null);
    const [migrationLog, setMigrationLog] = useState<string[]>([]);
    const { success, error: showError, info } = useNotifications();

    const addLog = (message: string) => {
        setMigrationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    const testConnection = async () => {
        addLog('Testando conexão com Firebase...');
        try {
            const connected = await testFirebaseConnection();
            setIsConnected(connected);
            addLog(connected ? '✅ Conexão com Firebase OK' : '❌ Falha na conexão com Firebase');
            if (connected) {
                success('Conexão com Firebase estabelecida!');
            } else {
                showError('Falha na conexão com Firebase');
            }
        } catch (error) {
            setIsConnected(false);
            addLog(`❌ Erro ao testar conexão: ${error}`);
            showError('Erro ao testar conexão', String(error));
        }
    };

    const checkData = async () => {
        addLog('Verificando se dados existem...');
        try {
            const exists = await checkIfDataExists();
            setDataExists(exists);
            addLog(exists ? '📦 Dados já existem no Firebase' : '📭 Nenhum dado encontrado no Firebase');
            info(exists ? 'Dados já existem no Firebase' : 'Nenhum dado encontrado no Firebase');
        } catch (error) {
            addLog(`❌ Erro ao verificar dados: ${error}`);
            showError('Erro ao verificar dados', String(error));
        }
    };

    const runMigration = async () => {
        setIsMigrating(true);
        addLog('🚀 Iniciando migração...');

        try {
            await migrateProductsToFirebase();
            addLog('🎉 Migração concluída com sucesso!');
            setDataExists(true);
            success('Migração concluída com sucesso!', 'Todos os produtos foram migrados para o Firebase');
        } catch (error) {
            addLog(`❌ Erro na migração: ${error}`);
            showError('Erro na migração', String(error));
        } finally {
            setIsMigrating(false);
        }
    };

    const clearData = async () => {
        if (!window.confirm('⚠️ Tem certeza que deseja remover TODOS os produtos do Firebase? Esta ação não pode ser desfeita!')) {
            return;
        }

        setIsClearing(true);
        addLog('🗑️ Removendo todos os dados...');

        try {
            await clearAllProducts();
            addLog('✅ Todos os dados foram removidos');
            setDataExists(false);
            success('Dados removidos com sucesso!', 'Todos os produtos foram removidos do Firebase');
        } catch (error) {
            addLog(`❌ Erro ao remover dados: ${error}`);
            showError('Erro ao remover dados', String(error));
        } finally {
            setIsClearing(false);
        }
    };

    const updateTimestamps = async () => {
        setIsUpdatingTimestamps(true);
        addLog('⏰ Adicionando timestamps aos produtos existentes...');

        try {
            await addTimestampsToExistingProducts();
            addLog('✅ Timestamps adicionados com sucesso!');
            success('Timestamps atualizados!', 'Todos os produtos agora têm timestamps');
        } catch (error) {
            addLog(`❌ Erro ao adicionar timestamps: ${error}`);
            showError('Erro ao adicionar timestamps', String(error));
        } finally {
            setIsUpdatingTimestamps(false);
        }
    };

    const clearLogs = () => {
        setMigrationLog([]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔥 Migração de Dados - Firebase</h2>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Conexão Firebase</h3>
                    <div className="flex items-center gap-2">
                        {isConnected === null && <span className="text-gray-500">Não testado</span>}
                        {isConnected === true && <span className="text-green-600">✅ Conectado</span>}
                        {isConnected === false && <span className="text-red-600">❌ Falha na conexão</span>}
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Status dos Dados</h3>
                    <div className="flex items-center gap-2">
                        {dataExists === null && <span className="text-gray-500">Não verificado</span>}
                        {dataExists === true && <span className="text-green-600">📦 Dados existem</span>}
                        {dataExists === false && <span className="text-orange-600">📭 Sem dados</span>}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <button
                    onClick={testConnection}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    🔗 Testar Conexão
                </button>

                <button
                    onClick={checkData}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    📊 Verificar Dados
                </button>

                <button
                    onClick={runMigration}
                    disabled={isMigrating || dataExists === true}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isMigrating ? '⏳ Migrando...' : '🚀 Migrar Dados'}
                </button>

                <button
                    onClick={updateTimestamps}
                    disabled={isUpdatingTimestamps || dataExists === false}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isUpdatingTimestamps ? '⏳ Atualizando...' : '⏰ Add Timestamps'}
                </button>

                <button
                    onClick={clearData}
                    disabled={isClearing || dataExists === false}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isClearing ? '⏳ Removendo...' : '🗑️ Limpar Dados'}
                </button>
            </div>

            {/* Migration Log */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">📋 Log de Migração</h3>
                    <button
                        onClick={clearLogs}
                        className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                    >
                        Limpar Log
                    </button>
                </div>
                <div className="p-4">
                    {migrationLog.length === 0 ? (
                        <p className="text-gray-500 italic">Nenhum log ainda...</p>
                    ) : (
                        <div className="space-y-1 max-h-96 overflow-y-auto">
                            {migrationLog.map((log, index) => (
                                <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                                    {log}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">📝 Instruções</h3>
                <ol className="text-sm text-yellow-800 space-y-1">
                    <li>1. <strong>Teste a conexão</strong> com Firebase primeiro</li>
                    <li>2. <strong>Verifique se há dados</strong> no Firebase</li>
                    <li>3. Se não houver dados, <strong>execute a migração</strong></li>
                    <li>4. Após migração bem-sucedida, você pode remover dados mockados do código</li>
                    <li>5. Use "Limpar Dados" apenas se precisar resetar tudo</li>
                </ol>
            </div>
        </div>
    );
};

export default DataMigration; 