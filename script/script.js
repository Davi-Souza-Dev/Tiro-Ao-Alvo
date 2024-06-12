let musica = new Audio("game.mp3");
musica.currentTime = 0;
//Dificuldade e menu
const menu = document.getElementById("menu");
const btnFacil = document.getElementById("btnFacil");
const btnMedio = document.getElementById("btnMedio");
const btnDificil = document.getElementById("btnDificil");
const btnInfinito = document.getElementById("btnInfinito")
const container = document.getElementById("container");
const txtTime = document.getElementById("time");
const popup = document.getElementById("dialog");
const txtscore = document.getElementById("score");
const btnReset = document.getElementById("btnReset");
let larguraContainer = container.offsetWidth; //offsetWidth = pega o valor da largura atual da caixa
let alturaContainer = container.offsetHeight; // offsetHeight = pega o valor da altura atual da caixa
console.log(alturaContainer)
let score = 0;
let minutos = 0;
let segundos = 59;
let game = true;
let bonus = 0;//Quantidade para saber se e para criar alvo bonus
let som = new Audio("tiro.mp3");
let fim = new Audio("win.mp3");
let velo; //velocidade da criação de alvos
fim.currentTime = 0;
fim.volume = 0.1;
let dificuldade;
let infinito = false;
const playMusica = setInterval((evt) => {
  musica.play();
  if (segundos == 0 && minutos == 0) {
    musica.pause();
    clearInterval(playMusica);
  }else if(infinito == true){
    musica.pause();
    clearInterval(playMusica);
  }
  if(infinito == true){
    musica.play();
  }
}, velo);

//Cronometro
const iniciar = (velo,infinito) => {
  const timer = setInterval((evt) => {
    if(infinito == false){
      txtTime.innerHTML = `${minutos}:${segundos}`;
      criarAlvos();
      if (segundos > 0) {
        segundos--;
        segundos = segundos < 10 ? "0" + segundos : segundos;
      } else if (segundos == 0 && minutos > 0) {
        minutos--;
        segundos = 59;
        minutos = minutos < 10 ? "0" + minutos : minutos;
      } else if (segundos == 0 && minutos == 0) {
        popup.style.display = "flex";
        txtscore.innerHTML = `Score: ${score}`;
        fim.play();
        clearInterval(timer);
      }
    }else{
      txtTime.innerHTML = `${score}`;
      criarAlvos();
    }
  }, velo);
};

//Caso a caixa seja redimensionada
window.addEventListener("resize", (evt) => {
  larguraContainer = container.offsetWidth; //offsetWidth = pega o valor da largura atual da caixa
  alturaContainer = container.offsetHeight;
});

//Classe do alvo
class Alvo {
  constructor(container) {
    //Definindo propriedades básicas
    this.tam = Math.floor(Math.random() * 150) + 50;
    this.X = Math.floor(Math.random() * (larguraContainer - this.tam));
    this.Y = Math.floor(Math.random() * (alturaContainer - this.tam));
    this.id = Date.now() + "_" + Math.floor(Math.random() * 10000);
    this.box = container;
    this.valor = 10;
    //Criando o objeto ao instanciar
    this.desenhar();
    this.me = document.getElementById(`${this.id}`);
    //Remover após 1 segundos.
    let sumir = setInterval(() => {
      this.remove();
    }, 1000);
  }

  desenhar = () => {
    const div = document.createElement("div");
    div.setAttribute("class", "alvo");
    div.setAttribute("id", this.id);
    div.setAttribute(
      "style",
      `top:${this.Y}px;left:${this.X}px;width:${this.tam}px;height:${this.tam}px`
    );
    this.box.appendChild(div);
  };

  remove = () => {
    this.me.remove();
  };
}

//Classe alvo bonus
class AlvoBonus {
  constructor(container) {
    //Definindo propriedades básicas
    this.tam = Math.floor(Math.random() * 150) + 50;
    this.X = Math.floor(Math.random() * (larguraContainer - this.tam));
    this.Y = Math.floor(Math.random() * (alturaContainer - this.tam));
    this.id = Date.now() + "_" + Math.floor(Math.random() * 10000);
    this.box = container;
    this.valor = 100;
    //Criando o objeto ao instanciar
    this.desenhar();
    this.me = document.getElementById(`${this.id}`);
    //Remover após 3 segundos.
    let sumir = setInterval(() => {
      this.remove();
    }, 3000);
  }

  desenhar = () => {
    const div = document.createElement("div");
    div.setAttribute("class", "alvoBonus");
    div.setAttribute("id", this.id);
    div.setAttribute(
      "style",
      `top:${this.Y}px;left:${this.X}px;width:${this.tam}px;height:${this.tam}px`
    );
    this.box.appendChild(div);
  };
  remove = () => {
    this.me.remove();
  };
}

//Classe do alvoErro
class AlvoErro {
  constructor(container) {
    //Definindo propriedades básicas
    this.tam = Math.floor(Math.random() * 150) + 50;
    this.X = Math.floor(Math.random() * (larguraContainer - this.tam));
    this.Y = Math.floor(Math.random() * (alturaContainer - this.tam));
    this.id = Date.now() + "_" + Math.floor(Math.random() * 10000);
    this.box = container;
    //Criando o objeto ao instanciar
    this.desenhar();
    this.me = document.getElementById(`${this.id}`);
    //Remover após 3 segundos.
    let sumir = setInterval(() => {
      this.remove();
    }, 1000);
  }

  desenhar = () => {
    const div = document.createElement("div");
    div.setAttribute("class", "alvoErro");
    div.setAttribute("id", this.id);
    div.setAttribute(
      "style",
      `top:${this.Y}px;left:${this.X}px;width:${this.tam}px;height:${this.tam}px`
    );
    this.box.appendChild(div);
  };

  remove = () => {
    this.me.remove();
  };
}

//Função para criar o ganho de pontos 
criarPts = (valor,posX,posY)=>{
  const div = document.createElement("p");
  const id = Date.now() + "_" + Math.floor(Math.random() * 10000);
  div.setAttribute("id",id);
  div.setAttribute("class","pts");
  div.innerHTML = `+${valor}`;
  let pos = posY + 50;
  div.style.top = `${pos}px`;
  div.style.left = `${posX}px`;
  container.appendChild(div);
  let destruir = setTimeout((e)=>{
    const ptsId = document.getElementById(`${id}`);
    ptsId.remove();
  },500);
}

//Função para criar todos os alvos.
criarAlvos = () => {
  let escolha = Math.floor(Math.random() * dificuldade + 1);
  if (escolha < dificuldade) {
    const alvo = new Alvo(container);
    const alvoContainer = document.getElementById(alvo.id);
    alvoContainer.addEventListener("click", (evt) => {
      som.play();
      criarPts(alvo.valor,alvo.X,alvo.Y);
      score += alvo.valor;
      alvo.remove();
      bonus++;
    });
    som.pause();
    som.currentTime = 0;
  } else {
    const alvoErro = new AlvoErro(container);
    const alvoContainer = document.getElementById(alvoErro.id);
    alvoContainer.addEventListener("click", (evt) => {
      som.play();
      alvoErro.remove();
      popup.style.display = "flex";
      txtscore.innerHTML = `Pontuação: ${score}`;
      musica.pause();
      som.pause();
      fim.play()
      clearInterval(timer);
    });
  }
  if(bonus == 10){
    bonus = 0;
    const alvo = new AlvoBonus(container);
    const alvoContainer = document.getElementById(alvo.id);
    alvoContainer.addEventListener("click", (evt) => {
      som.play();
      criarPts(alvo.valor,alvo.X,alvo.Y);
      score += alvo.valor;
      alvo.remove();
    });
    som.pause();
    som.currentTime = 0;
  }
};

btnReset.addEventListener("click", (evt) => {
  window.location.reload();
});

//Configurar dificuldade do game
btnFacil.addEventListener("click", (evt) => {
  minutos = 1;
  segundos = 59;
  velo = 1000;
  menu.style.display = "none";
  dificuldade = 10;
  iniciar(velo,infinito);
});
btnMedio.addEventListener("click", (evt) => {
  minutos = 0;
  segundos = 59;
  velo = 500;
  menu.style.display = "none";
  dificuldade = 5;
  iniciar(velo,infinito);
});
btnDificil.addEventListener("click", (evt) => {
  minutos = 0;
  segundos = 30;
  velo = 250;
  menu.style.display = "none";
  dificuldade = 2;
  iniciar(velo,infinito);
});

btnInfinito.addEventListener("click", (evt) => {
  minutos = 0;
  segundos = 0;
  velo = 650;
  menu.style.display = "none";
  dificuldade = 10;
  infinito = true;
  iniciar(velo,infinito);
});
