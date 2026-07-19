document.addEventListener('DOMContentLoaded', () => {
    
    const reveals = document.querySelectorAll('.reveal');

    // Threshold de 15% para que dispare de forma suave
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
                
                // Anima a barra do Python apenas se ela existir na tela
                if (entry.target.classList.contains('card-python')) {
                    const pyBar = document.getElementById('py-bar');
                    if(pyBar) {
                        setTimeout(() => {
                            pyBar.style.width = '45%';
                        }, 500); 
                    }
                }
                
                // Anima a barra do Git & GitHub
                if (entry.target.classList.contains('card-git')) {
                    const gitBar = document.getElementById('git-bar');
                    if(gitBar) {
                        setTimeout(() => {
                            gitBar.style.width = '67%';
                        }, 600); // 100ms depois do Python para criar uma cascata visual
                    }
                }

                // Para de observar depois da primeira animação (Performance Otimizada)
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