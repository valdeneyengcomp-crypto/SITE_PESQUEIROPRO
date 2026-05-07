/**
 * Calcula o ranking das equipas somando apenas os 5 maiores peixes.
 * @param {Array} catches - Lista de capturas
 * @param {Array} teams - Lista de equipas
 * @returns {Array} Ranking ordenado por pontuação
 */
export function calculateTeamRanking(catches, teams) {
    return teams.map(team => {
        const teamCatches = catches
            .filter(c => c.teamId === team.id)
            .map(c => c.size)
            .sort((a, b) => b - a) // Ordena do maior para o menor
            .slice(0, 5); // Pega apenas os 5 maiores

        const totalScore = teamCatches.reduce((acc, curr) => acc + curr, 0);
        
        return {
            ...team,
            score: totalScore.toFixed(2),
            fishCount: teamCatches.length
        };
    }).sort((a, b) => b.score - a.score);
}

/**
 * Identifica o recorde (maior peixe) e retorna todos os pescadores empatados.
 * @param {Array} catches - Lista de capturas
 * @returns {Object} Medida e lista de pescadores
 */
export function findTopFishWithTies(catches) {
    if (catches.length === 0) return { size: 0, anglers: [] };

    const maxSize = Math.max(...catches.map(c => c.size));
    
    // Filtra todos os que possuem a medida máxima (Desempate Justo)
    const tiedAnglers = catches
        .filter(c => c.size === maxSize)
        .map(c => c.angler);

    // Remove duplicados (mesmo pescador com dois peixes de tamanho recorde)
    const uniqueAnglers = [...new Set(tiedAnglers)];

    return {
        size: maxSize.toFixed(2),
        anglers: uniqueAnglers
    };
}