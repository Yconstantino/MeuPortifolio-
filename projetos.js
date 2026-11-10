/* =========================================================
   MEUS PROJETOS — edite SÓ este arquivo para mudar os projetos
   =========================================================

   Cada projeto é um objeto { ... } dentro da lista abaixo.
   Para adicionar um novo, copie um bloco inteiro, cole e troque os textos.

   Campos:
   - titulo      → nome do projeto
   - subtitulo   → frase curta (aparece em cima do título)
   - categoria   → usado nos botões de filtro (ex: "Excel", "Power BI", "SQL")
   - imagem      → caminho da imagem (coloque o arquivo na pasta img/)
   - descricao   → texto resumido do card
   - destaques   → lista de pontos que aparecem no "Detalhes"
   - tags        → ferramentas usadas
   - links       → de 1 a 3 links. Cada link tem:
                     texto: o que aparece no botão
                     url:   o endereço
                     tipo:  muda o ícone → "planilha", "dashboard", "apresentacao",
                            "github", "site", "video", "doc", "download"
                     baixar: true  → (opcional) o arquivo é baixado em vez de abrir
                   O PRIMEIRO link vira o botão principal (destacado).
   - galeria     → (opcional) lista de imagens que aparecem no "Detalhes +"
   - emBreve     → true para mostrar um card de "em breve" (sem links)
*/

const PROJETOS = [
    {
        titulo: "Insights E-commerce Amazon",
        subtitulo: "O que os dados de 51 mil vendas revelam",
        categoria: "Power BI",
        imagem: "img/Amazon_PNG13-1920x1024.png",
        descricao:
            "Dashboard interativo no Power BI com 51.290 pedidos de 2018. Analisa o tipo de login dos clientes, a data e a hora das compras e o lucro por unidade, e termina com recomendações de negócio.",
        destaques: [
            "51.290 vendas, 38.997 clientes, R$ 78,1 mi de faturamento e R$ 36,1 mi de lucro",
            "95,7% das vendas vêm de clientes Member. Os Guest (3,9%) são uma oportunidade de conversão",
            "81% das vendas acontecem entre 10h e 22h, com pico às 11h",
            "Novembro é o melhor mês (R$ 8,8 mi) e fevereiro o pior (R$ 3,3 mi)",
            "Apple Laptop tem o maior lucro por unidade (67,12)",
            "4 páginas, medidas em DAX e 7 filtros sincronizados com o tema da Amazon",
        ],
        tags: ["Power BI", "DAX", "SQL Server", "Excel"],
        galeria: [
            "img/amazon/slide-1.webp",
            "img/amazon/slide-2.webp",
            "img/amazon/slide-3.webp",
            "img/amazon/slide-4.webp",
            "img/amazon/slide-5.webp",
            "img/amazon/slide-6.webp",
            "img/amazon/slide-7.webp",
            "img/amazon/slide-8.webp",
        ],
        links: [
            { texto: "Ver apresentação", url: "projetos/amazon/Insights_E-commerce_Amazon.pdf", tipo: "apresentacao" },
            { texto: "Baixar Power BI", url: "projetos/amazon/Dashboard_Amazon.pbix", tipo: "dashboard", baixar: true },
            { texto: "Baixar PPT", url: "projetos/amazon/Insights_E-commerce_Amazon.pptx", tipo: "download", baixar: true },
        ],
    },

    {
        titulo: "Ligeirinho Transportes",
        subtitulo: "Gastos com manutenção de frota",
        categoria: "Excel",
        imagem: "img/ligeirinho.webp",
        descricao:
            "Projeto em Excel que simula a gestão de uma transportadora, controlando os custos operacionais de toda a frota com um dashboard interativo para apoiar decisões.",
        destaques: [
            "Cadastro de todos os veículos da frota",
            "Controle de gastos com pneus, manutenções preventivas e corretivas",
            "Dashboard interativo com tabelas dinâmicas, gráficos e indicadores",
        ],
        tags: ["Excel", "Tabelas Dinâmicas", "Dashboard"],
        links: [
            {
                texto: "Ver planilha",
                url: "https://1drv.ms/x/c/4b5aaa1a8d3090d7/IQC80RCcLtbJRoPq625_x5QpAR6NHl_0On-qsMvjBUj09mI?e=PaBjtJ",
                tipo: "planilha",
            },
        ],
    },

    /* ----- EXEMPLO COM 2 LINKS (apague as barras /* e * / para usar) -----
    {
        titulo: "Nome do Projeto",
        subtitulo: "Frase curta",
        categoria: "Power BI",
        imagem: "img/sua-imagem.png",
        descricao: "Resumo do projeto.",
        destaques: ["Ponto 1", "Ponto 2"],
        tags: ["Power BI", "DAX"],
        links: [
            { texto: "Ver dashboard", url: "https://...", tipo: "dashboard" },
            { texto: "GitHub", url: "https://github.com/Yconstantino/...", tipo: "github" },
        ],
    },
    */

    /* ----- EXEMPLO COM 3 LINKS -----
    {
        titulo: "Nome do Projeto",
        subtitulo: "Frase curta",
        categoria: "SQL",
        imagem: "img/sua-imagem.png",
        descricao: "Resumo do projeto.",
        destaques: ["Ponto 1", "Ponto 2"],
        tags: ["SQL", "Power BI"],
        links: [
            { texto: "Ver dashboard", url: "https://...", tipo: "dashboard" },
            { texto: "Código SQL", url: "https://github.com/...", tipo: "github" },
            { texto: "Documentação", url: "https://...", tipo: "doc" },
        ],
    },
    */

    {
        titulo: "Novos projetos em breve",
        subtitulo: "Em desenvolvimento",
        categoria: "Em breve",
        descricao: "Estou trabalhando em novos projetos de Power BI e SQL. Volte em breve!",
        tags: ["Power BI", "SQL"],
        emBreve: true,
        links: [],
    },
];
