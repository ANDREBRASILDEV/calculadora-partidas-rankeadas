
/** Variaveis globais */
var form = document.getElementById('formulario');
let qtdeVitorias = 0;
let qtdeDerrotas = 0;
let nomeJogador = "";
let niveis = {};
let sldRanqueada = 0;
let nivelEncontrado = "";
const lsNiveis = [];

/** Modulo que pega o evento no botao ENVIAR do formulario (submit)
 *  1. carrega os modulos para apresentar a msg *  
 *  
 */
form.addEventListener("submit", function(event) {    

    nomeJogador = document.getElementById("nomeJogador").value;
    qtdeVitorias = parseInt(document.getElementById("qtdeVitoriasJogador").value);
    qtdeDerrotas = parseInt(document.getElementById("qtdeDerrotasJogador").value);
    //console.log("Nome jogador: " +nomeJogador+" xp: "+qtdeXp);
    if (validar()){
        onloadGame();    
    }else{
        alert("Campo vazio");    
        event.preventDefault();
        return (false);          
    }    

    event.preventDefault();
  });


/** Funcao CriarNiveis responsavel por criar os niveis do jogo
 * @param {*} nome : nomenclatura do nivel a ser criado
 * @param {*} condMin : Condicao minima para entrar no nivel 
 * @param {*} condMax : Condicao maxima para entrar no nivel
 */
function criarNiveis(nome, condMin, condMax){
    niveis = {        
        nivel: nome,
        condMin: condMin,
        condMax: condMax        
    }
    return niveis;   
}


function exibriMsgFinal (qtdeVit, qtdeDer, sldRan, nlEncontrado, nomeJog){
    //O Herói tem de saldo de **{saldoVitorias}** está no nível de **{nivel}**
    console.log("O Herói tem saldo de "+sldRan+" está no nível de "+nlEncontrado+"");    
    
}

function calcSaldoRankeada(numVit, numDer){
    return numVit-numDer;
}

//funcao busca o nivel que esta o usuario/jogador confome o saldoRankeada
function buscarNivelRankeada(sldRank){
    let achou = "";         
    lsNiveis.forEach(element => {
        if (sldRank > element.condMin && sldRank <= element.condMax) {                
            achou = element.nivel;
         }        
    });
     return achou;
}

function redirecionarPageResultado(){
    //window.location.assign("http://pt.stackoverflow.com");
    //window.location.assign("resultado.html");
    newPopup();
}

/** Funcao que alimenta a "base de dados" para condicionar o jogador confomr xp/nivel numa lista
 *  @event 1 O metodo: criarNiveis é chamado para alimentar a base de dados
 * 
 * @see criarNiveis()
 */
function onloadGame(){
    //Alimentando os niveis do jogo
    lsNiveis.push(criarNiveis("Ferro", -1000, 10));
    lsNiveis.push(criarNiveis("Bronze", 11, 20));
    lsNiveis.push(criarNiveis("Prata", 21, 50));
    lsNiveis.push(criarNiveis("Ouro", 51, 80));
    lsNiveis.push(criarNiveis("Diamante", 81 , 90));
    lsNiveis.push(criarNiveis("Lendário", 91 , 100));
    lsNiveis.push(criarNiveis("Imortal", 101 , 100));
    

    sldRanqueada = calcSaldoRankeada(qtdeVitorias, qtdeDerrotas);
    nivelEncontrado = buscarNivelRankeada(sldRanqueada); 
    

    //Exibir mensagem final obs: versao 1.0 usando alert ou confirm 
    // versao 1.2 -usando uma nova pagina para apresentação do resultado
    exibriMsgFinal(qtdeVitorias, qtdeDerrotas, sldRanqueada, nivelEncontrado, nomeJogador);
    redirecionarPageResultado();
}

function newPopup(){    
    varWindow = window.open (
        "resultado.html?nomeJogador="+nomeJogador+
                        "&nivelEncontrado="+nivelEncontrado+
                        "&qtdeVitorias="+qtdeVitorias+
                        "&qtdeDerrotas="+qtdeDerrotas+
                        "&sldRanqueada="+sldRanqueada, 
        'popup',
        "width=600, height=600, top=130, left=130, scrollbars=no",        
    )
}

function validar(){
    var campoUsuario = document.getElementById("nomeJogador").value;
    if(campoUsuario ==""){
        alert("O campo usuário esta vazio!");
        return(false);
    }else{
        return(true);
    }
}