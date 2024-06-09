const container = document.getElementById("container");
const txtTime = document.getElementById("time");
const popup = document.getElementById("dialog");
const txtscore = document.getElementById("score");
const btnReset = document.getElementById("btnReset");
let larguraContainer = container.offsetWidth; //offsetWidth = pega o valor da largura atual da caixa
let alturaContainer = container.offsetHeight; // offsetHeight = pega o valor da altura atual da caixa
let musica = new Audio("musica.mp3");
musica.play();
let score = 0;
let minutos = 0;
let segundos = 59;
let game = true;
let som = new Audio("tiro.mp3");
let fim = new Audio("win.mp3");
fim.currentTime = 0;
let rodar = 500;
//Cronometro
const timer = setInterval((evt) => {
    txtTime.innerHTML = `${minutos}:${segundos}`;
    criarAlvos();
    if (segundos > 0) {
      segundos--;
      segundos = segundos < 10 ? "0" + segundos : segundos;
    }else if (segundos == 0 && minutos > 0) {
      minutos--;
      segundos = 59;
      minutos = minutos < 10 ? "0" + minutos : minutos;
    }else if(segundos == 0 && minutos == 0){
        popup.style.display = "flex";
        txtscore.innerHTML = `Score: ${score}`;
        musica.pause();
        fim.play();
        clearInterval(timer);
    }
}, 500);

//Caso a caixa seja redimensionada
window.addEventListener("resize", (evt) => {
  larguraContainer = container.offsetWidth; //offsetWidth = pega o valor da largura atual da caixa
  alturaContainer = container.offsetHeight;
});

//Classe do alvo
class Alvo {
  constructor(container) {
    //Definindo propriedades básicas
    this.tam = Math.floor(Math.random() * 250) + 50;
    this.X = Math.floor(Math.random() * (larguraContainer - this.tam));
    this.Y = Math.floor(Math.random() * (alturaContainer - this.tam));
    this.id = Date.now() + "_" + Math.floor(Math.random() * 10000);
    this.box = container;
    //Criando o objeto ao instanciar
    this.desenhar();
    this.me = document.getElementById(`${this.id}`);
    //Remover após 3 segundos.
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

criarAlvos = () => {

  const alvo = new Alvo(container);

  const alvoContainer = document.getElementById(alvo.id);
  alvoContainer.addEventListener("click", (evt) => {

    som.play();

    score += 10;
    alvo.remove();
  
  });
  som.pause();
  som.currentTime = 0;
};

btnReset.addEventListener("click",(evt)=>{
    window.location.reload();
});