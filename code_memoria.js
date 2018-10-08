  // Define o tamanho do tabuleiro
  const num_linhas = 4;
  const num_colunas = 3;

  // Tamanho de cada celula
  const tamanho_celula = '100px';

  // Define o número de celulas do tabuleiro
  const num_celulas = num_linhas * num_colunas;

  // Define uma lista de url para imagens que serão colocadas
  // em cada campo. Cada imagem deve ter cerca de 50 x 50px.
  // Obs.: As imagens deve ter suporte a CORS ou estarem hospedadas
  //       neste mesmo projeto.    
  // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS
  const imagens = [
    'https://www.kerlasia-sme.com/wp-files/8f9b8f2cc02366e8a2a/samiemack-1-1.gif',
    'https://www.kerlasia-sme.com/wp-files/8f9b8f2cc02366e8a2a/samiemack-2-1.gif',
    'https://www.kerlasia-sme.com/wp-files/8f9b8f2cc02366e8a2a/samiemack-6-1.gif',
    'https://www.kerlasia-sme.com/wp-files/8f9b8f2cc02366e8a2a/samiemack-5-1.gif',
    'https://www.kerlasia-sme.com/wp-files/8f9b8f2cc02366e8a2a/samiemack-8.gif',
    'https://www.kerlasia-sme.com/wp-files/8f9b8f2cc02366e8a2a/samiemack-11.gif'
  ];

  // Imagem de fundo icones
  const imagenBackground = '';

  // Primeiro passo é verificar se temos a quantidade de imagens suficiente
  // para o número de pares do jogo. Caso não tenhamos paramos a execução
  if(((num_linhas * num_colunas) / 2) > imagens.length){
    console.log('Numero de imagens insuficiente');
    while(true);
  }


    // A tabela irá receber os elementos do tabuleiro
    const tabelaDom = document.createElement('table');

    // Cria um array de dom de celulas
    const celulasDom = [];

    // Cria um array de dom de linhas
    const linhasDom = [];

    // Construção do jogo
    console.log('Construindo tabela');

    // Imagens abertas
    const idImagensAbertas = [
      null,
      null
    ];

    // Numero de solucionados
    let contSolucoes = 0;

    // Contra o número de soluções
    let nCliques = 0;

    // Numero de imagens abertas
    let imagensAbertas = 0;

    // Areas visitadas
    const areasVisitadas = [];

    // Pecas do jogo
    var pecas = [];

    // Adiciona o numero dos cards
    for (let x = 0; x < imagens.length; x++) {
      pecas.push(x);
      pecas.push(x);
    }

    // Embaralha as peças
    function embaralha() {   
      for (let i = pecas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pecas[i], pecas[j]] = [pecas[j], pecas[i]];
      }
    }
    embaralha();

    // Reinicia o jogo
    function reinicia() {
      // Reseta os contadores
      imagensAbertas = 0;
      nCliques = 0;
      contSolucoes = 0;
      idImagensAbertas[0] = null;
      idImagensAbertas[1] = null;
      console.log('Reinicia o jogo!');

      // Embaralha as pecas
      embaralha();

      // Reseta as informações de acesso e o conteúdo do dom
      for (let i = 0; i < num_linhas; i++) {
        for (let j = 0; j < num_colunas; j++) {
          areasVisitadas[i][j] = false;
          celulasDom[i][j].style.backgroundImage = imagenBackground !== '' ? 
            `url('${imagenBackground}')` : '' ;
        }
      }
    }

    // Permite o reinicio de forma global
    window.reinicia = reinicia;

    // Para cada linha
    for (let i = 0; i < num_linhas; i++) {
      console.log('Criando linha');

      // Adiciona array de visitados
      areasVisitadas.push([]);

      // Array de colunas da linha atual
      const colunasDom = [];

      // Cria dom para linha e adiciona este para o array de dom de linhas
      const linhaDom = document.createElement('tr');
      linhasDom.push(linhaDom);

      // Adiciona dom da linha a tabela
      tabelaDom.appendChild(linhaDom);

      // Para cada coluna do documento
      for(let j = 0; j < num_colunas; j++) {
        
        // Adiciona suporte para visita
        areasVisitadas[i].push(false);

        // Cria Dom de celula e adiciona para o array de dom de celulas
        const celulaDom = document.createElement('td');
        colunasDom.push(celulaDom);

        // Adiciona dom de celula a linha
        linhaDom.appendChild(celulaDom);
        
        // TODO adiciona listeners e formatação
        
        // Formatação de cada celula
        celulaDom.style.width = tamanho_celula;
        celulaDom.style.height = tamanho_celula;

        // Registra o evento de clique
        celulaDom.onclick = (evt) => {
          console.log('Clicado ', i, j);

          // Se o botão estiver acionado não faremos nada
          if (areasVisitadas[i][j]) {
            console.log('Botao ja ativo');
            return;
          }

          // Incrementa o numero de cliques
          nCliques++;

          // Ativa o botão
          areasVisitadas[i][j] = true;

          // Checa se as imagens anteriores são válidas  
          if (imagensAbertas === 2) {

            // Pega as celulas
            const cel1 = celulasDom[idImagensAbertas[0][0]][idImagensAbertas[0][1]];
            const cel2 = celulasDom[idImagensAbertas[1][0]][idImagensAbertas[1][1]];
            
            // Reativa as celulas anteriores
            areasVisitadas[idImagensAbertas[0][0]][idImagensAbertas[0][1]] = false;
            areasVisitadas[idImagensAbertas[1][0]][idImagensAbertas[1][1]] = false;

            // Remove o estilo destas
            cel1.style.backgroundImage = imagenBackground;
            cel2.style.backgroundImage = imagenBackground;
            
            // Limpa o contador
            imagensAbertas = 0;
          }

          // Id da imagen
          const idImagen = pecas[((i * num_colunas) + j)];

          // Salva a imagen atual
          idImagensAbertas[imagensAbertas] = [i, j];

          // Incrementa contador 
          imagensAbertas++;

          // Ativa o botão
          celulaDom.style.backgroundImage = `url(${
            imagens[idImagen]
          })`;

          // Se tivermos duas imagens desativamos estas caso
          if (imagensAbertas === 2) {

            // ID das imagens
            const i1 = (idImagensAbertas[0][0] * num_colunas) + idImagensAbertas[0][1];
            const i2 = (idImagensAbertas[1][0] * num_colunas) + idImagensAbertas[1][1];
            const idImg1 = pecas[i1];
            const idImg2 = pecas[i2];

            // Checa se a imagem são iguais se forem travamos estas
            if (idImg1 === idImg2) {
              console.log('Imagens idênticas!',idImg1, idImg2);

              // Limpa o contador
              imagensAbertas = 0;

              // Incrementa o número de respostas
              contSolucoes++;

              // Se chegou ao fim do jogo cria um alert
              if (contSolucoes === ((num_linhas * num_colunas) / 2)) {
                alert(`Meus parabéns você ganhou com ${nCliques} cliques`);
                console.log('Meus parabéns você ganhou com ', nCliques);
              
                // Reinicia o jogo
                reinicia();

                // Termina essa execução
                return;
              } 
            } else {
              console.log('Imagens diferentes! -- ', idImg1, idImg2);
            }
          }
        };
      }

      // Adiciona dom das colunas ao dom das linhas
      celulasDom.push(colunasDom);
    }

    // Pega a referência da div
    const jogoDom = document.getElementById('area-jogo');

    // Adiciona a tabela a interface
    jogoDom.appendChild(tabelaDom);