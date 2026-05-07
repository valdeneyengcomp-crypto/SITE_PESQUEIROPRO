/**
 * @file tournamentEngine.js
 * @description Camada de Lógica (Business Logic Layer): Contém as regras de negócio do torneio.
 *              As funções aqui são "puras", ou seja, não interagem diretamente com o DOM
 *              e produzem o mesmo output para o mesmo input, facilitando testes e reuso.
 */

/**
 * Calcula a pontuação de cada equipe somando os tamanhos dos seus 5 maiores peixes.
 * @param {Array<Object>} catches - Lista de objetos de captura.
 * @param {Array<Object>} teams - Lista de objetos de equipe.
 * @returns {Array<Object>} Um array de equipes com suas pontuações calculadas, ordenado decrescentemente pela pontuação.
 *                          Cada objeto de equipe inclui 'score' (pontuação total) e 'fishCount' (número de peixes considerados).
 */
export function calculateTeamScores(catches, teams) {
    // Mapeia cada equipe para calcular sua pontuação
    const teamScores = teams.map(team => {
        // Filtra as capturas pertencentes à equipe atual
        const teamCatchesSizes = catches
            .filter(catchItem => catchItem.teamId === team.id)
            .map(catchItem => catchItem.size) // Extrai apenas o tamanho do peixe
            .sort((a, b) => b - a) // Ordena os tamanhos em ordem decrescente (maior para menor)
            .slice(0, 5); // Seleciona apenas os 5 maiores peixes

        // Soma os tamanhos dos 5 maiores peixes para obter a pontuação total da equipe
        const totalScore = teamCatchesSizes.reduce((accumulator, currentSize) => accumulator + currentSize, 0);
        
        return {
            ...team, // Mantém todas as propriedades originais da equipe
            score: parseFloat(totalScore.toFixed(2)), // Pontuação formatada com 2 casas decimais
            fishCount: teamCatchesSizes.length // Quantidade de peixes que contribuíram para a pontuação
        };
    });

    // Ordena as equipes pela pontuação em ordem decrescente
    return teamScores.sort((a, b) => b.score - a.score);
}

/**
 * Identifica o maior peixe capturado no torneio e lista todos os pescadores que atingiram essa medida.
 * Isso é crucial para o "Desempate Justo", mostrando todos os recordistas.
 * @param {Array<Object>} catches - Lista de objetos de captura.
 * @returns {Object} Um objeto contendo o tamanho do maior peixe ('size') e um array de nomes de pescadores ('anglers')
 *                   que capturaram peixes com essa medida. Retorna { size: 0, anglers: [] } se não houver capturas.
 */
export function findRecordFishWithTies(catches) {
    if (catches.length === 0) return { size: 0, anglers: [] };

    const maxSize = Math.max(...catches.map(catchItem => catchItem.size));
    
    // Filtra todas as capturas que têm o tamanho máximo e extrai os nomes dos pescadores
    const tiedAnglers = catches.filter(catchItem => catchItem.size === maxSize).map(catchItem => catchItem.angler);

    // Remove nomes duplicados de pescadores (caso um mesmo pescador tenha múltiplos peixes recordes)
    const uniqueAnglers = [...new Set(tiedAnglers)];

    return {
        size: parseFloat(maxSize.toFixed(2)), // Tamanho do maior peixe formatado
        anglers: uniqueAnglers // Lista de pescadores que atingiram essa medida
    };
}