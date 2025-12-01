document.addEventListener('DOMContentLoaded', function() {
            // Pega o botão e o modal com seus IDs originais
            var meuBotao = document.getElementById("meuBotao");
            var meuModal = document.getElementById("meuModal");
            var spanClose = meuModal.querySelector(".close"); // Pega o botão de fechar

            // Abre o modal ao clicar no botão 'Entrar'
            if (meuBotao) {
                meuBotao.onclick = function() {
                    meuModal.style.display = "block";
                };
            }
            
            // Fecha o modal ao clicar no 'x'
            if (spanClose) {
                spanClose.onclick = function() {
                    meuModal.style.display = "none";
                };
            }

            // Fecha ao clicar fora (global)
            window.onclick = function(event) {
                if (event.target == meuModal) {
                    meuModal.style.display = "none";
                }
            };
        });