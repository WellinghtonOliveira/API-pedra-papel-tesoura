const express = require("express")
const { nanoid } = require("nanoid")

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static("./front"))

const matches = new Map()

function vencedor(j1, j2) {
    if (j1 === j2) return "empate"
    if (
        (j1 === "pedra" && j2 === "tesoura") ||
        (j1 === "papel" && j2 === "pedra") ||
        (j1 === "tesoura" && j2 === "papel")
    ) return "jogador1"
    return "jogador2"
}

app.post("/match/create", (req, res) => {
    const matchId = nanoid()

    matches.set(matchId, {
        jogadores: {},
        finalizada: false,
        resultado: null
    })

    res.json({ matchId })
})

app.post("/match/play", (req, res) => {
    const { matchId, playerId, choice } = req.body
    const match = matches.get(matchId)

    if (!match) return res.status(404).json({ error: "partida nao existe" })

    match.jogadores[playerId] = choice

    const ids = Object.keys(match.jogadores)

    if (ids.length === 2 && !match.finalizada) {
        const j1 = match.jogadores[ids[0]]
        const j2 = match.jogadores[ids[1]]

        match.resultado = {
            jogador1: j1,
            jogador2: j2,
            vencedor: vencedor(j1, j2)
        }

        match.finalizada = true
    }

    res.json({ status: "ok" })
})

app.get("/match/result", (req, res) => {
    const { matchId } = req.query
    const match = matches.get(matchId)

    if (!match) return res.status(404).json({ error: "partida nao existe" })

    if (!match.finalizada) {
        return res.json({ status: "waiting" })
    }

    res.json(match.resultado)
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT)
})
