document.addEventListener('DOMContentLoaded', function() {
    
    // ------------------------------------------
    // 1. LÓGICA DO MODAL PRINCIPAL (#modalPrincipal)
    // ------------------------------------------
    
    const modalPrincipal = document.getElementById('modalPrincipal');
    const btnPrincipal = document.getElementById('btnPrincipal');
    
    // O botão de fechar do modal principal (se o seu HTML usar a classe 'close')
    const closePrincipal = modalPrincipal ? modalPrincipal.querySelector('.close') : null; 

    // Abrir o modal principal
    if (btnPrincipal && modalPrincipal) {
        btnPrincipal.onclick = function() {
            modalPrincipal.style.display = 'block';
        };
    }

    // Fechar o modal principal
    if (closePrincipal) {
        closePrincipal.onclick = function() {
            modalPrincipal.style.display = 'none';
        };
    }


    // ------------------------------------------
    // 2. LÓGICA DOS MODAIS SECUNDÁRIOS (Instrumentos)
    // ------------------------------------------
    
    // Seleciona todos os botões que abrem um modal secundário
    const botoesInstrumento = document.querySelectorAll('.btn-instrumento');
    
    botoesInstrumento.forEach(button => {
        // Pega o seletor do modal alvo (ex: '#modalSaxAlto') do atributo data-modal-target
        const targetSelector = button.getAttribute('data-modal-target');
        const modalSecundario = document.querySelector(targetSelector);
        
        if (modalSecundario) {
            // Seleciona o botão de fechar dentro do modal secundário
            const closeSecundario = modalSecundario.querySelector('.close');
            
            // Abre o modal secundário
            button.onclick = function(e) {
                // Previne que o clique no botão feche o modal principal (se estiver aberto)
                e.stopPropagation(); 
                modalSecundario.style.display = 'block';
            };
            
            // Fecha o modal secundário
            if (closeSecundario) {
                closeSecundario.onclick = function() {
                    modalSecundario.style.display = 'none';
                };
            }
        }
    });


    // ------------------------------------------
    // 3. FECHAR AO CLICAR FORA (GLOBAL)
    // ------------------------------------------
    
    window.onclick = function(event) {
        // Se o clique foi no fundo do modal principal
        if (event.target === modalPrincipal) {
            modalPrincipal.style.display = 'none';
        }
        
        // Se o clique foi no fundo de qualquer modal secundário
        document.querySelectorAll('.modal-secundario').forEach(modal => {
             if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
});