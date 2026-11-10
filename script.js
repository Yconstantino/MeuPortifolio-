/* =========================================================
   Interações do portfólio
   ========================================================= */

document.documentElement.classList.remove("no-js");

const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Ícones dos links dos projetos ---------- */
const ICONES = {
    planilha:
        '<path d="M3 3h18v18H3V3Zm2 2v4h6V5H5Zm8 0v4h6V5h-6Zm-8 6v4h6v-4H5Zm8 0v4h6v-4h-6Zm-8 6v2h6v-2H5Zm8 0v2h6v-2h-6Z"/>',
    dashboard:
        '<path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"/>',
    github:
        '<path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3Z"/>',
    site:
        '<path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7ZM19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z"/>',
    video:
        '<path d="M8 5v14l11-7L8 5Z"/>',
    doc:
        '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm4 18H6V4h7v5h5v11ZM8 12h8v2H8v-2Zm0 4h8v2H8v-2Z"/>',
    apresentacao:
        '<path d="M2 3h20v2h-1v11a2 2 0 0 1-2 2h-5.6l2.3 3.3-1.6 1.2L11.4 18h-.8l-2.7 4.5-1.6-1.2L8.6 18H5a2 2 0 0 1-2-2V5H2V3Zm3 2v11h14V5H5Zm3 8 3-3 2 2 4-4 1.4 1.4L13 14.8l-2-2-1.6 1.6L8 13Z"/>',
    download:
        '<path d="M11 3h2v9.17l3.59-3.58L18 10l-6 6-6-6 1.41-1.41L11 12.17V3ZM4 18h16v2H4v-2Z"/>',
};

const icone = (tipo) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONES[tipo] || ICONES.site}</svg>`;

/* Evita que texto do projetos.js quebre o HTML */
const esc = (txt = "") =>
    String(txt).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Monta os botões de link (1 a 3) ---------- */
function montarLinks(links = []) {
    return links
        .slice(0, 3)
        .map(
            (l, i) => `
            <a class="btn ${i === 0 ? "btn--primario" : "btn--contorno"} btn--pequeno"
               href="${esc(l.url)}" ${l.baixar ? "download" : 'target="_blank" rel="noopener"'}>
                ${icone(l.tipo)}<span>${esc(l.texto)}</span>
            </a>`
        )
        .join("");
}

/* ---------- Renderiza os cards ---------- */
const lista = document.getElementById("lista-projetos");
const filtrosEl = document.querySelector(".filtros");

function montarCard(p, indice) {
    const imagem = p.imagem
        ? `<img src="${esc(p.imagem)}" alt="${esc(p.titulo)}" loading="lazy">`
        : `<div class="card__placeholder" aria-hidden="true"><span></span><span></span><span></span></div>`;

    const tags = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
    const temDetalhes = !p.emBreve && p.destaques && p.destaques.length;

    return `
    <article class="card ${p.emBreve ? "card--embreve" : ""} reveal" data-categoria="${esc(p.categoria)}">
        <div class="card__img">
            ${imagem}
            <span class="card__categoria">${esc(p.categoria)}</span>
        </div>
        <div class="card__corpo">
            <p class="card__subtitulo">${esc(p.subtitulo)}</p>
            <h3 class="card__titulo">${esc(p.titulo)}</h3>
            <p class="card__descricao">${esc(p.descricao)}</p>
            <ul class="tags">${tags}</ul>
            <div class="card__acoes">
                ${montarLinks(p.links)}
                ${temDetalhes ? `<button class="btn btn--texto btn--pequeno" type="button" data-detalhes="${indice}">Detalhes +</button>` : ""}
            </div>
        </div>
    </article>`;
}

function renderizarProjetos() {
    if (!lista || typeof PROJETOS === "undefined") return;

    lista.innerHTML = PROJETOS.map(montarCard).join("");

    // Filtros: "Todos" + categorias únicas (ignora "Em breve")
    const categorias = [...new Set(PROJETOS.filter((p) => !p.emBreve).map((p) => p.categoria))];
    if (categorias.length > 1) {
        filtrosEl.innerHTML = ["Todos", ...categorias]
            .map(
                (c, i) =>
                    `<button class="filtro ${i === 0 ? "ativo" : ""}" type="button" role="tab" aria-selected="${i === 0}" data-filtro="${esc(c)}">${esc(c)}</button>`
            )
            .join("");
    } else {
        filtrosEl.remove(); // com uma categoria só, filtro não faz sentido
    }
}

renderizarProjetos();

/* ---------- Filtro de projetos ---------- */
document.addEventListener("click", (e) => {
    const botao = e.target.closest(".filtro");
    if (!botao) return;

    const filtro = botao.dataset.filtro;
    document.querySelectorAll(".filtro").forEach((b) => {
        b.classList.toggle("ativo", b === botao);
        b.setAttribute("aria-selected", b === botao);
    });

    lista.querySelectorAll(".card").forEach((card) => {
        const mostrar = filtro === "Todos" || card.dataset.categoria === filtro || card.classList.contains("card--embreve");
        card.classList.toggle("escondido", !mostrar);
    });
});

/* ---------- Modal de detalhes ---------- */
const modal = document.getElementById("modal");
const modalConteudo = modal.querySelector(".modal__conteudo");
let ultimoFoco = null;

let galeriaAtual = [];
let fotoAtual = 0;

function mostrarFoto(i) {
    if (!galeriaAtual.length) return;
    fotoAtual = (i + galeriaAtual.length) % galeriaAtual.length;
    modalConteudo.querySelector(".modal__img").src = galeriaAtual[fotoAtual];
    modalConteudo.querySelector(".galeria__contador").textContent = `${fotoAtual + 1} / ${galeriaAtual.length}`;
    modalConteudo.querySelectorAll(".galeria__thumb").forEach((t, n) => t.classList.toggle("ativo", n === fotoAtual));
}

function montarGaleria(p) {
    galeriaAtual = p.galeria || [];
    fotoAtual = 0;
    if (!galeriaAtual.length) {
        return p.imagem ? `<img class="modal__img" src="${esc(p.imagem)}" alt="${esc(p.titulo)}">` : "";
    }
    return `
        <div class="galeria">
            <div class="galeria__principal">
                <img class="modal__img" src="${esc(galeriaAtual[0])}" alt="${esc(p.titulo)}">
                <button class="galeria__seta galeria__seta--ant" type="button" data-foto="-1" aria-label="Imagem anterior">&#8249;</button>
                <button class="galeria__seta galeria__seta--prox" type="button" data-foto="1" aria-label="Próxima imagem">&#8250;</button>
                <span class="galeria__contador">1 / ${galeriaAtual.length}</span>
            </div>
            <div class="galeria__thumbs">
                ${galeriaAtual
                    .map((src, n) => `<button class="galeria__thumb ${n === 0 ? "ativo" : ""}" type="button" data-thumb="${n}" aria-label="Ver imagem ${n + 1}"><img src="${esc(src)}" alt="" loading="lazy"></button>`)
                    .join("")}
            </div>
        </div>`;
}

function abrirModal(p) {
    ultimoFoco = document.activeElement;
    modal.classList.toggle("modal--largo", Boolean(p.galeria && p.galeria.length));
    modalConteudo.innerHTML = `
        ${montarGaleria(p)}
        <p class="card__subtitulo">${esc(p.subtitulo)}</p>
        <h3 id="modal-titulo">${esc(p.titulo)}</h3>
        <p>${esc(p.descricao)}</p>
        <ul class="modal__lista">${(p.destaques || []).map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="card__acoes">${montarLinks(p.links)}</div>`;
    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("travado");
    modal.querySelector(".modal__fechar").focus();
}

function fecharModal() {
    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("travado");
    if (ultimoFoco) ultimoFoco.focus();
}

document.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-detalhes]");
    if (botao) abrirModal(PROJETOS[Number(botao.dataset.detalhes)]);
    if (e.target.closest("[data-fechar]")) fecharModal();

    const seta = e.target.closest("[data-foto]");
    if (seta) mostrarFoto(fotoAtual + Number(seta.dataset.foto));

    const thumb = e.target.closest("[data-thumb]");
    if (thumb) mostrarFoto(Number(thumb.dataset.thumb));
});

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("aberto")) return;
    if (e.key === "Escape") fecharModal();
    if (e.key === "ArrowRight") mostrarFoto(fotoAtual + 1);
    if (e.key === "ArrowLeft") mostrarFoto(fotoAtual - 1);
});

/* ---------- Menu mobile ---------- */
const menuBotao = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

function alternarMenu(abrir) {
    const aberto = abrir ?? !menu.classList.contains("aberto");
    menu.classList.toggle("aberto", aberto);
    menuBotao.classList.toggle("aberto", aberto);
    menuBotao.setAttribute("aria-expanded", aberto);
    menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

menuBotao.addEventListener("click", () => alternarMenu());
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => alternarMenu(false)));
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) alternarMenu(false);
});

/* ---------- Cabeçalho, link ativo e botão "topo" ao rolar ---------- */
const header = document.querySelector(".header");
const botaoTopo = document.querySelector(".topo");
const secoes = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".menu__link");

function aoRolar() {
    const y = window.scrollY;
    header.classList.toggle("rolado", y > 20);
    botaoTopo.classList.toggle("visivel", y > 500);

    let atual = "inicio";
    secoes.forEach((s) => {
        if (y + 120 >= s.offsetTop) atual = s.id;
    });
    // no fim da página, marca a última seção
    if (window.innerHeight + y >= document.body.scrollHeight - 4) atual = secoes[secoes.length - 1].id;

    links.forEach((l) => l.classList.toggle("ativo", l.getAttribute("href") === `#${atual}`));
}

window.addEventListener("scroll", aoRolar, { passive: true });
aoRolar();

botaoTopo.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" })
);

/* ---------- Animação ao aparecer na tela ---------- */
const elementos = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduzirMovimento) {
    const observer = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observer.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    elementos.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 3) * 80}ms`;
        observer.observe(el);
    });
} else {
    elementos.forEach((el) => el.classList.add("visivel"));
}

/* ---------- Efeito de digitação no título ---------- */
const alvo = document.querySelector(".digitando");

if (alvo && !reduzirMovimento) {
    const palavras = JSON.parse(alvo.dataset.palavras);
    let p = 0, letra = palavras[0].length, apagando = true;

    (function digitar() {
        const palavra = palavras[p];
        letra += apagando ? -1 : 1;
        alvo.textContent = palavra.slice(0, letra);

        let espera = apagando ? 60 : 110;
        if (!apagando && letra === palavra.length) { apagando = true; espera = 1800; }
        else if (apagando && letra === 0) { apagando = false; p = (p + 1) % palavras.length; espera = 300; }

        setTimeout(digitar, espera);
    })();
}

/* ---------- Copiar email + aviso ---------- */
const toast = document.querySelector(".toast");
let toastTimer;

function mostrarToast(msg) {
    toast.textContent = msg;
    toast.classList.add("visivel");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visivel"), 2500);
}

document.querySelectorAll("[data-copiar]").forEach((botao) =>
    botao.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(botao.dataset.copiar);
            mostrarToast("Email copiado!");
        } catch {
            mostrarToast(botao.dataset.copiar);
        }
    })
);

/* ---------- Ano automático no rodapé ---------- */
document.getElementById("ano").textContent = new Date().getFullYear();
