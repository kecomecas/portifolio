document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // EFEITO DO MOUSE GLOW (BENTO CARDS)
    // ============================================
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Calcula a posição do mouse em relação ao card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Passa as coordenadas para as variáveis no CSS
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ============================================
    // ANIMAÇÃO DE APARECER E CIRCULAR PROGRESS
    // ============================================
    const reveals = document.querySelectorAll('.reveal');

    // Função que preenche o círculo de porcentagem de forma fluida
    function animateCircularProgress(element, targetPercentage) {
        let current = 0;
        const increment = targetPercentage / 40; // Controla a velocidade (passos)
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= targetPercentage) {
                current = targetPercentage;
                clearInterval(interval);
            }
            // Altera a variável CSS que o conic-gradient do CSS está escutando
            element.style.setProperty('--progress', current);
        }, 20); // Tempo em milissegundos por frame
    }

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // Anima o círculo do Python
                if (entry.target.classList.contains('card-python')) {
                    const pyCircle = entry.target.querySelector('.py-circle');
                    if(pyCircle) {
                        setTimeout(() => {
                            animateCircularProgress(pyCircle, 45); // Vai até 45%
                        }, 400); 
                    }
                }
                
                // Anima o círculo do Git & GitHub
                if (entry.target.classList.contains('card-git')) {
                    const gitCircle = entry.target.querySelector('.git-circle');
                    if(gitCircle) {
                        setTimeout(() => {
                            animateCircularProgress(gitCircle, 67); // Vai até 67%
                        }, 600); // Demora 200ms a mais que o python
                    }
                }

                // Para de observar depois da primeira animação para não sobrecarregar
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    if (reveals.length > 0) {
        reveals.forEach(reveal => {
            revealOnScroll.observe(reveal);
        });
    }

});