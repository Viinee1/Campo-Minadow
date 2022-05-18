var linhas = 8; 
var colunas = 10;
var tabuleiro = [];
var minas = 10;
var minastab = [];
var descobertos = 0
var fim = false
var bandeiraligada = false
var inicio = 0
var jogadas = 0
var bandeiras = 10

    window.onload = function(){
        iniciante()        
}

    function geradordeminas() {
    
        let minasrestantes = minas
        while(minasrestantes > 0 ){
            let l = Math.floor(Math.random() * linhas)
            let c = Math.floor(Math.random() * colunas)
            let id = l.toString() + "-" + c.toString()

        if(!minastab.includes(id)){
            minastab.push(id)
            minasrestantes -= 1;
        }
    }
}

    function iniciante() {
        document.getElementById("minassobrando").innerText = `${minas}`
        geradordeminas()
        console.log(minastab)
        
        for (let li = 0; li < linhas; li++){
            var linha = [];
            for (let ci = 0; ci < colunas; ci++){
                var quad = document.createElement("div");
                quad.id = li.toString() + "-" + ci.toString();
                quad.addEventListener("click", clickquad);
                quad.addEventListener("contextmenu", bandeirada)
                document.getElementById("tabuleiro").append(quad)
                linha.push(quad);
            }
            tabuleiro.push(linha)
    }
        
}

function clickquad() {

    if(fim == true || this.classList.contains("quadselect")){
            return
        }
        let quad = this;
    if(quad.innerText == "B" && bandeiraligada == true){
            return;
        }
    if(minastab.includes(quad.id) && jogadas != 0){
        fim = true;
        mostrarminas()
        alert(`Você perdeu!`)
        location.href = 'menu.html'
            return;
        }else if(minastab.includes(quad.id) && jogadas == 0){
            minastab = [];
            geradordeminas()
        }
        jogadas++

    let numeros = quad.id.split("-")
    let l = parseInt(numeros[0])
    let c = parseInt(numeros[1])
    checarMina(l, c)

    inicio++
    if(inicio == 1){
        cronometro()
    }
}

function mostrarminas() {
    for (let li = 0; li < linhas; li++){
        for (let ci = 0; ci < colunas; ci++){
            let quad = tabuleiro[li][ci]
            if(minastab.includes(quad.id)){
                quad.innerText = "M"
                quad.style.backgroundColor = "red"
            }
        }
    }
}
function checarMina(l, c) {
    if(l < 0 || l >= linhas || c < 0 || c >= colunas){
        return
    }if(tabuleiro[l][c].classList.contains("quadselect")){
        return
    }

    tabuleiro[l][c].classList.add("quadselect")
    descobertos += 1
    
    let minasencontradas = 0

    minasencontradas += checarQuad(l-1, c-1)
    minasencontradas += checarQuad(l-1, c)
    minasencontradas += checarQuad(l-1, c+1)
    minasencontradas += checarQuad(l, c-1)
    minasencontradas += checarQuad(l, c+1)
    minasencontradas += checarQuad(l+1, c-1)
    minasencontradas += checarQuad(l+1, c)
    minasencontradas += checarQuad(l+1, c+1)
    
    if(minasencontradas > 0){
        tabuleiro[l][c].innerText = minasencontradas
        tabuleiro[l][c].classList.add("q" + minasencontradas.toString())
    }else if(minasencontradas == 0){
        
        checarMina(l-1, c-1)
        checarMina(l-1, c)
        checarMina(l-1, c+1)

        checarMina(l, c-1)
        checarMina(l, c+1)

        checarMina(l+1, c-1)
        checarMina(l+1, c)
        checarMina(l+1, c+1)
    }

    if(descobertos == linhas * colunas - minas){
        document.getElementById("minassobrando").innerText = "Acabou"
        alert("Você venceu!")
        fim = true
        location.href = 'menu.html'
    }
    
}

function checarQuad(l, c) {
    if(l < 0 || l >= linhas || c < 0 || c >= colunas){
        return 0;
    }
    if(minastab.includes(l.toString() + "-" + c.toString())){
        return 1;
    }
    return 0;
}

function cronometro() {
    
    var tempo = document.getElementById("tempo")
    var quebra = 1
    var segundos = 1
    var cronometro = setInterval(()=>{
        tempo.innerText = segundos
        if(fim == false){
            segundos++
            
        }else if(fim == true && quebra == 1){
            
            alert(`A partida durou: ${segundos} segundo(s)!`)
            quebra++ 
        }
        
    }, 1000)
   
}

function bandeirada() {

    bandeiraligada = true;
    let quad = this;


    if(bandeiraligada){
        if(quad.innerText == ""){
            quad.innerText = "B"
            bandeiras--
            document.getElementById("bandeiras").innerText = bandeiras
        }else if(quad.innerText == "B"){
            quad.innerText = ""
            bandeiras++
            document.getElementById("bandeiras").innerText = bandeiras
        }
        return;
    }
}

