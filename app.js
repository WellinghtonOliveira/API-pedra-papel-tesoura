const express = require("express")
const { nanoid } = require("nanoid")

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static("./front"))

const matches = new Map()

function vencedor(player, bot) {
  if (player === bot) return "empate"
  if (
    (player === "pedra" && bot === "tesoura") ||
    (player === "papel" && bot === "pedra") ||
    (player === "tesoura" && bot === "papel")
  ) return "player"
  return "bot"
}

app.post("/match/create", (req, res) => {
  const matchId = nanoid()

  matches.set(matchId, {
    jogador: null,
    bot: null,
    finalizada: false,
    resultado: null
  })

  res.json({ matchId })
})

app.post("/match/play", (req, res) => {
  const { matchId, choice } = req.body
  const match = matches.get(matchId)

  if (!match) return res.status(404).json({ error: "partida nao existe" })
  if (match.finalizada) return res.json({ status: "finalizada" })
  if (match.jogador) return res.json({ status: "ja jogou" })

  match.jogador = choice

  const escolhas = ["pedra", "papel", "tesoura"]
  match.bot = escolhas[Math.floor(Math.random() * escolhas.length)]

  match.resultado = {
    player: match.jogador,
    bot: match.bot,
    vencedor: vencedor(match.jogador, match.bot)
  }

  match.finalizada = true

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
