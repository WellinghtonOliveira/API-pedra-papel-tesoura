const express = require("express")
const { nanoid } = require("nanoid")

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static("./front"))

const matches = new Map()

function vencedor(pUm, pDois) {
  if (pUm === pDois) return "empate"
  if (
    (pUm === "pedra" && pDois === "tesoura") ||
    (pUm === "papel" && pDois === "pedra") ||
    (pUm === "tesoura" && pDois === "papel")
  ) return "Jogador - 1"
  return "jogador - 2"
}

app.post("/match/create", (req, res) => {
  const matchId = nanoid()

  matches.set(matchId, {
    primeiroJogador: null,
    segundoJogador: null,
    finalizada: false,
    resultado: null
  })

  res.json({ matchId })
})

app.post("/match/play", (req, res) => {
  const { matchId, choice } = req.body
  const match = matches.get(matchId)

  if (!match) return res.status(404).json({ error: "Partida nao existe" })
  if (match.finalizada) return res.json({ status: "Finalizada" })
  if (match.segundoJogador) return res.json({ status: "Partida finalizada" })

  if (match.primeiroJogador == null) {
    match.primeiroJogador = choice
  }else {
    match.segundoJogador = choice
  }

  // const escolhas = ["pedra", "papel", "tesoura"]
  // match.bot = escolhas[Math.floor(Math.random() * escolhas.length)]

  if (match.segundoJogador != null) {
    match.resultado = {
      playerUm: match.primeiroJogador,
      playerDois: match.segundoJogador,
      vencedor: vencedor(match.primeiroJogador, match.segundoJogador)
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
