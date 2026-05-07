/**
 * @file components.js
 * @description Camada de Apresentação (View Layer): Contém funções para gerar e manipular elementos HTML.
 *              Estas funções recebem dados processados da camada de lógica e os transformam em UI.
 *              O objetivo é manter o home.html o mais limpo possível, com o mínimo de HTML estático.
 */

/**
 * Renderiza o ranking das equipes em um elemento HTML específico.
 * Esta é uma função de exemplo para demonstrar a interação entre as camadas.
 * Em um cenário real, você criaria funções mais específicas para cada componente da UI.
 * @param {Array<Object>} teamScores - Dados de pontuação das equipes processados pela lógica.
 * @param {string} targetElementId - O ID do elemento HTML onde o ranking será renderizado.
 */
export function renderTeamRanking(teamScores, targetElementId) {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
        console.error(`Elemento com ID '${targetElementId}' não encontrado para renderizar o ranking.`);
        return;
    }

    let htmlContent = '<h3 class="text-2xl font-bold mb-4">Ranking do Torneio</h3>';
    htmlContent += '<ul class="list-disc pl-5">';
    teamScores.forEach((team, index) => {
        htmlContent += `<li class="mb-2"><strong>${index + 1}. ${team.name}</strong>: ${team.score} cm (${team.fishCount} peixes)</li>`;
    });
    htmlContent += '</ul>';
    targetElement.innerHTML = htmlContent;
}