document.addEventListener('DOMContentLoaded', function() {
    const svgObject = document.getElementById('mapa-svg');
    let activePopup = null;

    svgObject.addEventListener('load', function() {
        const svgDoc = svgObject.contentDocument;
        
        // Mapeamento das regiões pelos números
        const regiaoInfo = {
            '1': {
                nome: 'Norte',
                texto: 'A região Norte é a maior região do Brasil em território, abrangendo a Amazônia brasileira. É conhecida por sua rica biodiversidade, rios extensos e cultura indígena.'
            },
            '2': {
                nome: 'Nordeste',
                texto: 'O Nordeste brasileiro é conhecido por suas belas praias, cultura rica, culinária única e festivais populares. A região tem uma história importante na formação do Brasil.'
            },
            '3': {
                nome: 'Sudeste',
                texto: 'O Sudeste é a região mais populosa e economicamente desenvolvida do Brasil. Abriga as maiores metrópoles do país e importantes centros culturais e históricos.'
            },
            '4': {
                nome: 'Sul',
                texto: 'A região Sul é conhecida por seu clima mais frio, influência europeia na cultura e arquitetura, e pela produção agropecuária significativa.'
            },
            '5': {
                nome: 'Centro-Oeste',
                texto: 'O Centro-Oeste abriga a capital do país e é conhecido pelo cerrado, agronegócio e diversidade do Pantanal.'
            }
        };

        // Adiciona interatividade para cada região e círculo numerado
        for (let numero in regiaoInfo) {
            // Seleciona tanto o path da região quanto o círculo com o número
            const elementos = svgDoc.querySelectorAll(`path, circle, text`);
            
            elementos.forEach(elemento => {
                elemento.style.cursor = 'pointer';
                
                elemento.addEventListener('click', function(e) {
                    const numeroRegiao = e.target.textContent || 
                                       e.target.getAttribute('id') || 
                                       Object.keys(regiaoInfo).find(key => 
                                           e.target.getAttribute('fill') === e.target.getAttribute(`data-color-${key}`));

                    if (!regiaoInfo[numeroRegiao]) return;

                    // Remove popup anterior se existir
                    if (activePopup) {
                        activePopup.remove();
                        activePopup = null;
                    }

                    // Cria novo popup
                    const popup = document.createElement('div');
                    popup.className = 'popup';
                    popup.innerHTML = `
                        <h3>${regiaoInfo[numeroRegiao].nome}</h3>
                        <p>${regiaoInfo[numeroRegiao].texto}</p>
                        <span class="close-btn">×</span>
                    `;

                    // Posiciona o popup
                    const rect = svgObject.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    popup.style.left = (e.clientX + 20) + 'px';
                    popup.style.top = (e.clientY + scrollTop - 40) + 'px';
                    popup.style.display = 'block';

                    document.body.appendChild(popup);
                    activePopup = popup;

                    // Adiciona evento de fechar no botão X
                    popup.querySelector('.close-btn').addEventListener('click', () => {
                        popup.remove();
                        activePopup = null;
                    });
                });

                // Adiciona efeito hover
                elemento.addEventListener('mouseenter', function() {
                    if (elemento.tagName === 'path') {
                        elemento.style.opacity = '0.8';
                    }
                });

                elemento.addEventListener('mouseleave', function() {
                    if (elemento.tagName === 'path') {
                        elemento.style.opacity = '1';
                    }
                });
            });
        }
    });

    // Fecha popup ao clicar fora
    document.addEventListener('click', function(e) {
        if (activePopup && !activePopup.contains(e.target) && 
            e.target.tagName !== 'path' && 
            e.target.tagName !== 'circle' && 
            e.target.tagName !== 'text') {
            activePopup.remove();
            activePopup = null;
        }
    });
});
