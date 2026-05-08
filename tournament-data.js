/**
 * Mock Data: Fonte da verdade do torneio.
 * Estrutura preparada para ser substituída por uma chamada de API (fetch/axios).
 */
export const tournamentData = {
    plans: {
        BASIC: { id: 'basic', name: 'Básico', price: '1.000', hasGeolocation: false, hasAdvancedLogic: true },
        PRO: { id: 'pro', name: 'Pro', price: '1.200', hasGeolocation: true, hasAdvancedLogic: true }
    },
    currentPlan: 'pro',
    teams: [
        { id: 1, name: "Tucuna Master", color: "blue" },
        { id: 2, name: "Pira Amigos", color: "green" },
        { id: 3, name: "Barcarena Fishing", color: "orange" }
    ],
    catches: [
        // Exemplo de capturas para teste de ranking e desempate
        { id: 101, teamId: 1, angler: "Ricardo Silva", size: 45.5, species: "Tucunaré" },
        { id: 102, teamId: 1, angler: "Ricardo Silva", size: 38.0, species: "Tucunaré" },
        { id: 103, teamId: 1, angler: "André Santos", size: 42.0, species: "Tucunaré" },
        { id: 104, teamId: 1, angler: "André Santos", size: 35.5, species: "Tucunaré" },
        { id: 105, teamId: 1, angler: "André Santos", size: 40.0, species: "Tucunaré" },
        { id: 106, teamId: 1, angler: "André Santos", size: 30.0, species: "Tucunaré" }, // 6º peixe (deve ser ignorado)
        
        { id: 201, teamId: 2, angler: "Carlos Pira", size: 45.5, species: "Piraíba" }, // Empate com Ricardo
        { id: 202, teamId: 2, angler: "Carlos Pira", size: 41.0, species: "Piraíba" },
        
        { id: 301, teamId: 3, angler: "João Pará", size: 45.5, species: "Tucunaré" }, // Tríplice empate
        { id: 302, teamId: 3, angler: "João Pará", size: 39.5, species: "Tucunaré" }
    ]
};