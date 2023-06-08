const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepom(mokepom){
        this.mokepom = mokepom
    }
    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepom {
    constructor(nombre){
        this.nombre = nombre
    }  
}

const jugadores = []

app.get("/unirse", (req, res) =>{
    const id = `${Math.random()}`
    
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepom/:jugadorId", (req,res) =>{
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepom || ""
    const mokepom = new Mokepom(nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepom(mokepom)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepom/:jugadorId/ataques", (req,res) =>{
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

app.post("/mokepom/:jugadorId/pocision", (req,res) =>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.listen(8080, () => {
    console.log("ya esta funcionando")
})