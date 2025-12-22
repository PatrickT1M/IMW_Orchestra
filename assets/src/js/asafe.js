// --- CHAVE DE API CONFIGURADA ---
        const API_KEY = 'AIzaSyCRez6XYyw-fgvGTaDzmthvxMKZY8glkYY';

        let dataTableInstance = null;

        function carregarPasta(folderId, nomeInstrumento) {
            $('#modalSelecao').modal('hide');
            var modalLista = new bootstrap.Modal(document.getElementById('modalListaArquivos'));
            modalLista.show();

            document.getElementById('tituloLista').innerHTML = `<i class="fas fa-music"></i> ${nomeInstrumento}`;

            const tbody = document.querySelector('#tabelaMateriais tbody');
            tbody.innerHTML = '<tr><td colspan="3" class="text-center py-4">Carregando partituras... <div class="spinner-border spinner-border-sm ms-2"></div></td></tr>';

            if (dataTableInstance) dataTableInstance.destroy();

            const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,webViewLink)&key=${API_KEY}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    tbody.innerHTML = '';

                    if (data.error || !data.files) {
                        tbody.innerHTML = '<tr><td colspan="3" class="text-center">Nenhum arquivo encontrado ou erro de acesso.</td></tr>';
                        return;
                    }

                    data.files.forEach(arquivo => {
                        let botaoVer = '';
                        if (arquivo.mimeType.includes('pdf') || arquivo.mimeType.includes('image')) {
                            // Botão VER (Visualização)
                            botaoVer = `
                                <button class="btn-acao" onclick="abrirPreview('${arquivo.id}', '${arquivo.name}')">
                                    <i class="fas fa-eye"></i> Ver
                                </button>
                            `;
                        }

                        // Botão BAIXAR
                        const botaoBaixar = `
                            <a href="${arquivo.webViewLink}" class="btn-acao btn-download" target="_blank">
                                <i class="fas fa-download"></i> Baixar
                            </a>
                        `;

                        const linha = `
                            <tr>
                                <td class="text-center align-middle col-tipo">${getIcone(arquivo.mimeType)}</td>
                                <td class="align-middle fw-bold">${arquivo.name}</td>
                                <td class="align-middle">
                                    ${botaoVer}
                                    ${botaoBaixar}
                                </td>
                            </tr>
                        `;
                        tbody.innerHTML += linha;
                    });

                    // --- AQUI ESTÁ A MÁGICA DA TRADUÇÃO E ORDENAÇÃO ---
                    dataTableInstance = $('#tabelaMateriais').DataTable({
                        
                        // ADICIONEI ISSO AQUI PARA CORRIGIR A ORDEM (9, 10, 100)
                        columnDefs: [
                            { type: 'natural', targets: 1 } 
                        ],

                        order: [[1, 'asc']], // Ordena pela coluna 1 (Nome)

                        language: {
                            "search": "Pesquisar Hino:",
                            "lengthMenu": "Mostrar _MENU_ hinos",
                            "info": "Mostrando de _START_ até _END_ de _TOTAL_ hinos",
                            "infoEmpty": "Nenhum hino encontrado",
                            "infoFiltered": "(filtrado de _MAX_ hinos no total)",
                            "zeroRecords": "Nada encontrado com esse nome",
                            "paginate": {
                                "first": "Primeiro",
                                "last": "Último",
                                "next": "Próximo",
                                "previous": "Anterior"
                            }
                        },
                        pageLength: 5,
                        lengthMenu: [5, 10, 20],
                        retrieve: true,
                        autoWidth: false,
                        // Configuração do layout (Pesquisa em cima, Paginação em baixo)
                        dom: '<"d-flex justify-content-between mb-3"f>t<"d-flex justify-content-between mt-3"ip>'
                    });
                })
                .catch(err => {
                    console.error(err);
                    tbody.innerHTML = '<tr><td colspan="3" class="text-center text-danger">Erro de conexão.</td></tr>';
                });
        }

        function getIcone(mimeType) {
            if (mimeType.includes('pdf')) return '<i class="fas fa-file-pdf text-danger fa-lg"></i>';
            if (mimeType.includes('audio')) return '<i class="fas fa-music text-info fa-lg"></i>';
            if (mimeType.includes('folder')) return '<i class="fas fa-folder text-warning fa-lg"></i>';
            return '<i class="fas fa-file text-secondary fa-lg"></i>';
        }

        function abrirPreview(fileId, fileName) {
            const linkPreview = `https://drive.google.com/file/d/${fileId}/preview`;
            document.getElementById('iframePreview').src = linkPreview;
            document.getElementById('tituloPreview').innerText = fileName;
            var myModal = new bootstrap.Modal(document.getElementById('modalPreview'));
            myModal.show();
        }

        document.getElementById('modalPreview').addEventListener('hidden.bs.modal', function () {
            document.getElementById('iframePreview').src = "";
        });