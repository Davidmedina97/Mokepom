
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const desactivarReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMJ = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const sectionMensajes = document.getElementById('resultado')
const activarReiniciar = document.getElementById('reiniciar')

const resultadoPartida = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-targetas')
const contenedorAtaque = document.getElementById('contenedor-ataque')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let intervalo
let jugadorId = null
let ataqueJugador = []
let ataqueEnemigo = []
let input1 
let input2
let input3
let botonAgua 
let botonFuego 
let botonTierra
let vidaJugador = 3
let vidaEnemigo = 3
let opcionDeMokepones 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepom
let ataquesMokepomEnemigo
let botonAtaque = []
let mokeponesEnemigos = []

let alturaBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaBuscamos

let indexAtaqueEnemigo
let indexAtaqueJugador

let victoriasJugador = 0
let victoriasEnemigos = 0

let mokepones = []

let lienzo = mapa.getContext("2d")

let mapaFondo = new Image()
mapaFondo.src = ('./assets/mokemap.png')

class Mokepom {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.acho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.acho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.speedX = 0
        this.speedY = 0
        
    }

    pintarMokepom(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.acho,
            this.alto,
        )
    }
}

let hipodoge = new Mokepom('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.webp')

let capipego = new Mokepom('Capipego', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp')

let ratigueya = new Mokepom('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.webp')

const Hipodoge_ataques = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '⌛', id: 'boton-tierra'}
]

hipodoge.ataques.push(...Hipodoge_ataques)

const Capipego_ataques = [
    {nombre: '⌛', id: 'boton-tierra'},
    {nombre: '⌛', id: 'boton-tierra'},
    {nombre: '⌛', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
]
capipego.ataques.push(...Capipego_ataques)

const Ratigueya_ataques = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '⌛', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'}
]

ratigueya.ataques.push(...Ratigueya_ataques)

mokepones.push(hipodoge, capipego, ratigueya)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'  
    sectionVerMapa.style.display = 'none'


    mokepones.forEach((Mokepom => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepom.nombre} />
                <label class="tarjeta-de-mokepom" for=${Mokepom.nombre}>
                    <p>${Mokepom.nombre}</p>
                    <img src=${Mokepom.foto} alt=${Mokepom.nombre}>
                </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

            input1 = document.getElementById('Hipodoge')
            input2 = document.getElementById('Capipego')
            input3 = document.getElementById('Ratigueya')
    }))

    
    desactivarReiniciar.style.display = 'none' 

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego (){
    fetch("http://localhost:8080/unirse")
        .then(function (res){

            if (res.ok) {
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){

    sectionSeleccionarMascota.style.display = 'none'
    
    if(input1.checked){
        spanMJ.innerHTML = input1.id
        mascotaJugador = input1.id
    }else if(input2.checked){
        spanMJ.innerHTML = input2.id
        mascotaJugador = input2.id
    }else if(input3.checked){
        spanMJ.innerHTML = input3.id
        mascotaJugador = input3.id
    }else{
        alert("Selecciona una mascota")
    }

    seleccionarMokepom(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepom(mascotaJugador){
    fetch(`http://localhost:8080/mokepom/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepom: mascotaJugador
        })
    } )
        
}

function extraerAtaques(mascotaJugador){
    let ataque 
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataque = mokepones[i].ataques
        }
    }
    mostrarAtaque(ataque)
}

function mostrarAtaque(ataque){
    ataque.forEach(ataque => {
        ataquesMokepom = `
        <button id="${ataque.id}"class="boton-ataque boton-nuevoAtaque">${ataque.nombre}</button>
        `  
        contenedorAtaque.innerHTML += ataquesMokepom 
    });

    botonAgua = document.getElementById('boton-agua') 
    botonFuego = document.getElementById('boton-fuego')
    botonTierra = document.getElementById('boton-tierra')


    botonAtaque = document.querySelectorAll('.boton-nuevoAtaque')
    
}

function secuenciaAtaque() {
    botonAtaque.forEach(boton => {
        boton.addEventListener('click', (e)=>{
            if (e.target.textContent == '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviaAtaques()
            }
            
        })
    });

}

function enviaAtaques() {
    fetch(`http://localhost:8080/mokepom/${jugadorId}/ataques`,{
        method: "post",
        headers:{"Conten-Type": "application/json"},
        body: JSON.stringify({
            ataques: ataqueJugador
        })     
    })
}

function aleatorio(max, min){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function crearMensaje (resultado) {
    
    let nuevoAtaqueJugador = document.createElement('p')
    let  nuevoAtaqueEnemigo = document.createElement('p')

    resultadoPartida.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)

}

function crearMensajeFinal (resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal
    activarReiniciar.style.display = 'block'

}

function seleccionarMascotaEnemigo(enemigo){
    
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokepomEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokepomEnemigo.length-1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('AGUA')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('FUEGO')
    }else{
        ataqueEnemigo.push('TIERRA')
    }

    console.log(ataqueEnemigo)
    iniciarPelea()  
}

function iniciarMapa (){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', teclaPresionada)

    window.addEventListener('keyup', detenerMov)
}

function teclaPresionada(event){
   switch (event.key) {
    case 'ArrowUp':
        moverArriba()
        break;
    case 'ArrowDown':
        moverAbajo()
        break;
    case 'ArrowRight':
        moverDerecha()
        break;
    case 'ArrowLeft':
        moverIzquierda()
        break;
    default:
        break;
   }
}

function pintarCanvas (){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.speedX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.speedY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaFondo,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    mascotaJugadorObjeto.pintarMokepom()
        enviarPocision(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

        mokeponesEnemigos.forEach(function (mokepom){
            if(mokepom != undefined){
                mokepom.pintarMokepom()
                revisarColisiones(mokepom)
            }
            
        })
}

function enviarPocision(x,y){
    fetch(`http://localhost:8080/mokepom/${jugadorId}/pocision`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    } )
    .then(function(res){
        if (res.ok) {
            res.json()
                .then(function ({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo){
                        let mokepomEnemigo = null
                        if(enemigo.mokepom != undefined){
                        const mokepomNombre = enemigo.mokepom.nombre || ""
                        if (mokepomNombre === "Hipodoge") {
                            mokepomEnemigo = new Mokepom('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.webp')   
                        }else if(mokepomNombre === "Capipego"){
                            mokepomEnemigo = new Mokepom('Capipego', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp')
                        }else if (mokepomNombre === "Capipego"){
                            mokepomEnemigo = new Mokepom('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.webp')
                        }
                        mokepomEnemigo.x = enemigo.x
                        mokepomEnemigo.y = enemigo.y
                        }
                        return mokepomEnemigo
                    })
                    
                })
        }
    })
}

function obtenerObjetoMascota (){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function moverDerecha (){
    mascotaJugadorObjeto.speedX = 5
}

function moverIzquierda (){
    mascotaJugadorObjeto.speedX = -5
    
}

function moverArriba (){
    mascotaJugadorObjeto.speedY = -5
}

function moverAbajo (){
    mascotaJugadorObjeto.speedY = 5
}

function detenerMov (){
    mascotaJugadorObjeto.speedX = 0
    mascotaJugadorObjeto.speedY = 0
}

function iniciarPelea() {
    if (ataqueJugador.length === 5 ) {
        combate()
    }
}

function ambosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            ambosOponentes(index, index)
            crearMensaje('EMPATE')
        }else if(ataqueEnemigo[index] === 'FUEGO' && ataqueJugador[index] == 'TIERRA'){
            ambosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueEnemigo[index] === 'AGUA' && ataqueJugador[index] == 'FUEGO'){
            ambosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueEnemigo[index] === 'TIERRA' && ataqueJugador[index] == 'AGUA'){
            ambosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else{
            ambosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasEnemigos ++
            spanVidasEnemigo.innerHTML = victoriasEnemigos
        }
        
    }
    
    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador == victoriasEnemigos){
        crearMensajeFinal("esto es un empate")
    }else if (victoriasJugador > victoriasEnemigos){
        crearMensajeFinal("Felicitaciones! Ganaste")
    }else{
        crearMensajeFinal("Lo siento! Perdiste")
    }
        
}

function reiniciarJuego(){
    location.reload()
}

function revisarColisiones (enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.acho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.acho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }

    detenerMov()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    //alert("hay colision" + enemigo.nombre)
    
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)