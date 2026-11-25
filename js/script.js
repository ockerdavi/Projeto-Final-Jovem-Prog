// 1. Base de Dados: Conteúdo Educativo Obrigatório (Briefing)
const manualEducativo = [
    {
        titulo: "01. O que é IA Generativa?",
        descricao: "Tecnologia capaz de criar textos, imagens, códigos e áudios a partir de padrões estatísticos aprendidos em grandes volumes de dados, sem possuir consciência ou raciocínio humano."
    },
    {
        titulo: "02. Usos e Benefícios",
        descricao: "Acelera a produtividade, auxilia no brainstorming, resume textos longos, apoia os estudos e automatiza tarefas repetitivas no dia a dia."
    },
    {
        titulo: "03. Limitações e Riscos",
        descricao: "Pode gerar 'alucinações' (informações falsas ou inventadas com aparência de verdade), reproduzir vieses preconceituosos dos dados de treino e gerar dependência excessiva."
    },
    {
        titulo: "04. Privacidade e Responsabilidade",
        descricao: "Nunca insira dados pessoais (CPFs, senhas) ou sigilosos em IAs públicas. A revisão humana e a conferência das fontes são obrigatórias."
    }
];

// 2. Base de Dados: 5 cenários práticos
const cenarios = [
    {
        id: 1,
        categoria: "Conceito",
        texto: "CASO 01: Um colega afirma que a IA Generativa 'pensa e tem consciência própria' ao escrever redações. Como você classifica essa afirmação?",
        opcoes: [
            { 
                resposta: "Verdadeira: Modelos modernos já possuem raciocínio humano.", 
                correta: false, 
                consequencia: "INCORRETO! A IA Generativa não pensa. Ela apenas calcula probabilidades estatísticas para prever a próxima palavra ou pixel com base em padrões treinados." 
            },
            { 
                resposta: "Falsa: Ela apenas gera padrões baseados em dados de treino.", 
                correta: true, 
                consequencia: "CORRETO! IAs generativas produzem conteúdos novos a partir de padrões estatísticos aprendidos em grandes volumes de dados, sem compreensão real." 
            }
        ]
    },
    {
        id: 2,
        categoria: "Benefícios",
        texto: "CASO 02: Uma estudante precisa organizar um cronograma de estudos e resumir 3 artigos longos para revisar a matéria mais rápido. O uso de IA aqui é adequado?",
        opcoes: [
            { 
                resposta: "Sim: Excelente uso para produtividade, resumos e apoio à aprendizagem.", 
                correta: true, 
                consequencia: "CORRETO! Automatizar resumos, estruturar ideias e tirar dúvidas são grandes benefícios da IA para acelerar o estudo e o trabalho." 
            },
            { 
                resposta: "Não: Usar IA para estudar é sempre considerado fraude.", 
                correta: false, 
                consequencia: "INCORRETO! Quando usada como tutora ou organizadora de ideias (e não para copiar trabalhos prontos), a IA potencializa o aprendizado." 
            }
        ]
    },
    {
        id: 3,
        categoria: "Privacidade",
        texto: "CASO 03: Um funcionário do RH colou uma planilha com nomes, CPFs e salários da equipe num chat de IA público para gerar gráficos rápidos.",
        opcoes: [
            { 
                resposta: "Aprovar: O chat é privado na conta dele.", 
                correta: false, 
                consequencia: "RISCO CRÍTICO DE PRIVACIDADE! Plataformas públicas podem armazenar prompts para treinar futuros modelos. Dados pessoais e sigilosos nunca devem ser inseridos." 
            },
            { 
                resposta: "Bloquear: Violação grave de segurança e privacidade de dados.", 
                correta: true, 
                consequencia: "CORRETO! O uso responsável exige anonimizar informações e nunca expor dados sensíveis ou corporativos em ferramentas externas." 
            }
        ]
    },
    {
        id: 4,
        categoria: "Riscos",
        texto: "CASO 04: Um advogado pediu à IA para citar leis e processos reais para defender um cliente, e copiou tudo para o documento oficial sem conferir.",
        opcoes: [
            { 
                resposta: "Alertar Risco de Alucinação: A IA pode inventar leis que não existem.", 
                correta: true, 
                consequencia: "CORRETO! IAs sofrem de 'alucinações' — geram respostas falsas ou imprecisas com total confiança. A conferência humana das fontes é obrigatória." 
            },
            { 
                resposta: "Aprovar: A IA tem acesso à internet e nunca inventa dados.", 
                correta: false, 
                consequencia: "ERRO GRAVE! Mesmo conectadas à web, IAs frequentemente fabricam citações, links e fatos falsos para preencher lacunas." 
            }
        ]
    },
    {
        id: 5,
        categoria: "Vieses",
        texto: "CASO 05: Uma empresa treinou uma IA de seleção de currículos apenas com contratações dos últimos 10 anos (90% homens), e a IA passou a descartar candidatas mulheres.",
        opcoes: [
            { 
                resposta: "Manter: Algoritmos são puramente matemáticos e imparciais.", 
                correta: false, 
                consequencia: "INCORRETO! Se os dados históricos contêm preconceitos humanos, a IA vai aprender e amplificar esses vieses automaticamente." 
            },
            { 
                resposta: "Intervir: O algoritmo está reproduzindo viés histórico dos dados.", 
                correta: true, 
                consequencia: "CORRETO! IAs refletem os vieses presentes nos dados de treinamento. Auditoria constante é necessária para evitar discriminação e injustiças." 
            }
        ]
    }
];

// 3. Variáveis de Estado da Aplicação
let nomeOperador = "";
let cenarioAtual = 0;
let pontuacao = 0;

// 4. Seleção de Elementos do DOM
const telaCenario = document.getElementById("tela-cenario");
const telaBotoes = document.getElementById("tela-botoes");
const statusProgresso = document.getElementById("status-progresso");
const btnIniciar = document.getElementById("btn-iniciar");

// Evento inicial no botão de login
btnIniciar.addEventListener("click", iniciarSistema);

// 5. Função de Validação de Entrada
function iniciarSistema() {
    const inputOperador = document.getElementById("input-operador");
    const msgErro = document.getElementById("msg-erro");
    const valorDigitado = inputOperador.value.trim();

    if (valorDigitado === "") {
        msgErro.innerText = "ERRO: Digite um codinome válido para iniciar a auditoria.";
        return;
    }

    nomeOperador = valorDigitado;
    exibirBriefing();
}

// 6. Nova Função: Exibe o conteúdo educativo antes da prática
function exibirBriefing() {
    statusProgresso.innerText = `Operador: ${nomeOperador} | Leitura de Protocolo`;
    telaBotoes.innerHTML = "";
    
    // Monta o HTML do manual percorrendo o array manualEducativo
    let htmlBriefing = `<h3 style="color: #38bdf8; margin-bottom: 15px;">PROTOCOLO DE OPERAÇÃO: IA GENERATIVA</h3>`;
    
    manualEducativo.forEach((topico) => {
        htmlBriefing += `
            <div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #1e293b;">
                <strong style="color: #4ade80;">${topico.titulo}</strong>
                <p style="font-size: 0.92rem; color: #cbd5e1; margin-top: 4px;">${topico.descricao}</p>
            </div>
        `;
    });

    telaCenario.innerHTML = htmlBriefing;

    // Botão para avançar do manual para o primeiro caso prático
    const btnAvancarBriefing = document.createElement("button");
    btnAvancarBriefing.innerText = "Protocolo Lido >> Iniciar Auditoria Prática";
    btnAvancarBriefing.addEventListener("click", carregarCenario);
    telaBotoes.appendChild(btnAvancarBriefing);
}

// 7. Função para renderizar o cenário na tela
function carregarCenario() {
    telaBotoes.innerHTML = "";
    const caso = cenarios[cenarioAtual];
    
    statusProgresso.innerText = `Operador: ${nomeOperador} | Caso ${cenarioAtual + 1}/${cenarios.length} | Acertos: ${pontuacao}`;
    telaCenario.innerHTML = `<p><span style="color: #38bdf8;">[${caso.categoria.toUpperCase()}]</span> ${caso.texto}</p>`;
    
    caso.opcoes.forEach((opcao) => {
        const botao = document.createElement("button");
        botao.innerText = opcao.resposta;
        botao.addEventListener("click", () => verificarResposta(opcao));
        telaBotoes.appendChild(botao);
    });
}

// 8. Função para avaliar a decisão (Condicional if/else)
function verificarResposta(opcaoEscolhida) {
    telaBotoes.innerHTML = "";
    
    if (opcaoEscolhida.correta) {
        pontuacao++;
        telaCenario.innerHTML = `<p style="color: #4ade80;"><strong>[DECISÃO CORRETA]</strong> ${opcaoEscolhida.consequencia}</p>`;
    } else {
        telaCenario.innerHTML = `<p style="color: #f85149;"><strong>[FALHA DE AUDITORIA]</strong> ${opcaoEscolhida.consequencia}</p>`;
    }
    
    statusProgresso.innerText = `Operador: ${nomeOperador} | Caso ${cenarioAtual + 1}/${cenarios.length} | Acertos: ${pontuacao}`;
    
    const btnProximo = document.createElement("button");
    btnProximo.innerText = "Avançar para o próximo caso >>";
    btnProximo.addEventListener("click", avancarCenario);
    telaBotoes.appendChild(btnProximo);
}

// 9. Função de controle de fluxo
function avancarCenario() {
    cenarioAtual++;
    if (cenarioAtual < cenarios.length) {
        carregarCenario();
    } else {
        finalizarSimulacao();
    }
}

// 10. Função Final utilizando Método de Array (.filter)
function finalizarSimulacao() {
    statusProgresso.innerText = `Sessão Encerrada | Operador: ${nomeOperador}`;
    
    const casosCriticos = cenarios.filter(c => c.categoria === "Privacidade" || c.categoria === "Riscos" || c.categoria === "Vieses");

    telaCenario.innerHTML = `
        <h3 style="color: #38bdf8; margin-bottom: 10px;">Relatório Final — Operador ${nomeOperador}</h3>
        <p>Desempenho Geral: <strong>${pontuacao}</strong> de <strong>${cenarios.length}</strong> casos resolvidos.</p>
        <p style="margin-top: 10px; font-size: 0.95rem;">Nesta sessão, você auditou <strong>${casosCriticos.length} cenários de alto risco</strong> (Privacidade, Alucinações e Vieses).</p>
        <p style="margin-top: 10px; color: #94a3b8; font-size: 0.9rem;">Conclusão: A IA Generativa amplia a produtividade, mas exige verificação factual e proteção rigorosa de dados.</p>
    `;
    
    telaBotoes.innerHTML = "";
    const btnReiniciar = document.createElement("button");
    btnReiniciar.innerText = "Rever Protocolo e Reiniciar";
    btnReiniciar.addEventListener("click", () => {
        cenarioAtual = 0;
        pontuacao = 0;
        exibirBriefing();
    });
    telaBotoes.appendChild(btnReiniciar);
}