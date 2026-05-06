// Funcionalidade de Alto Contraste
const btnContraste = document.getElementById('alto-contraste');
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Funcionalidade de Tamanho de Fonte
let tamanhoBase = 16;
const htmlElemento = document.documentElement;

document.getElementById('aumentar-fonte').addEventListener('click', () => {
    if (tamanhoBase < 24) {
        tamanhoBase += 2;
        htmlElemento.style.fontSize = tamanhoBase + 'px';
    }
});

document.getElementById('diminuir-fonte').addEventListener('click', () => {
    if (tamanhoBase > 12) {
        tamanhoBase -= 2;
        htmlElemento.style.fontSize = tamanhoBase + 'px';
    }
});

document.getElementById('resetar-fonte').addEventListener('click', () => {
    tamanhoBase = 16;
    htmlElemento.style.fontSize = tamanhoBase + 'px';
});

const btn = document.getElementById('toggle-dark');

btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Troca o ícone conforme o modo
    if (document.body.classList.contains('dark-mode')) {
        btn.innerHTML = '☀️ Modo Claro';
    } else {
        btn.innerHTML = '🌙 Modo Escuro';
    }
});


let pontos = 0, vidas = 3, cobraLocal = 0, jogoAtivo = true;

function iniciarJogo() {
    pontos = 0; vidas = 3; jogoAtivo = true;
    document.getElementById('pontos').innerText = pontos;
    document.getElementById('vidas').innerText = vidas;
    const area = document.getElementById('areaJogo');
    area.innerHTML = '';
    cobraLocal = Math.floor(Math.random() * 12);
    for (let i = 0; i < 12; i++) {
        let div = document.createElement('div');
        div.className = 'arbusto';
        div.innerText = '🌳';
        div.onclick = function() { colher(this, i); };
        area.appendChild(div);
    }
}

function colher(el, i) {
    if(!jogoAtivo || el.innerText !== '🌳') return;
    if(i === cobraLocal) {
        el.innerText = '🐍'; el.style.background = '#ff5252';
        vidas--; document.getElementById('vidas').innerText = vidas;
        if(vidas <= 0) { alert("Fim de jogo!"); jogoAtivo = false; }
        else { alert("Cuidado com a cobra!"); cobraLocal = Math.floor(Math.random() * 12); }
    } else {
        el.innerText = '🍎'; pontos++;
        document.getElementById('pontos').innerText = pontos;
        if(pontos === 11) { alert("Vitória!"); jogoAtivo = false; }
    }
}
window.onload = iniciarJogo;

// Lógica do Carrossel Automático
let slideIndex = 0;
const slides = document.querySelectorAll('#curiosidadesSlides .curiosidade-card');

function mostrarSlides() {
    // 1. Remove a classe 'ativo' de todos os cards
    slides.forEach(slide => {
        slide.classList.remove('ativo');
    });

    // 2. Avança para o próximo slide
    slideIndex++;
    
    // 3. Se chegar no fim, volta pro primeiro
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // 4. Adiciona a classe 'ativo' ao card atual (lembrando que array começa em 0)
    slides[slideIndex - 1].classList.add('ativo');

    // 5. Define o tempo (3000ms = 3 segundos) para rodar de novo
    setTimeout(mostrarSlides, 4000); // Mude para 5000 se o texto for longo
}

// Inicia o carrossel assim que a página carregar
window.addEventListener('load', mostrarSlides);