const { nanoid } = require('nanoid')
const express = require('express')
const { match } = require('node:assert')
const app = express()
const PORT = 3000
const id = nanoid()

let ultimoJogador = {
    idVencedor: null,
    idJogador: null,
    jogada: null
}
let fimPartida = null

app.use(express.static("./front/"))
app.use(express.json())

app.post("/match/create", (req, res) => {
    const userId = Math.floor(Math.random() * (9999 - 1000) + 1000)
    res.status(200).json({ matchId: id, controleId: userId })
})

app.post("/match/result", (req, res) => {
    const termo = req.query.matchId
    res.status(200).json({  })
})

app.post("/match/play", (req, res) => {
    const { playerChoice, controleId } = req.body

    if (controleId != ultimoJogador.idJogador) {
        switch (playerChoice) {

            case 'pedra':
                if (ultimoJogador.jogada != null) {
                    if (ultimoJogador.jogada == 'tesoura' && ultimoJogador.jogada != 'tesoura') {
                        ultimoJogador.idVencedor = controleId
                        fimPartida = true
                    }

                    ultimoJogador.jogada = null
                }

                ultimoJogador.jogada = playerChoice
                break
            case 'papel':
                if (ultimoJogador.jogada != null) {
                    if (ultimoJogador.jogada == 'pedra' && ultimoJogador.jogada != 'papel') {
                        ultimoJogador.idVencedor = controleId
                        fimPartida = true
                    }
                }

                ultimoJogador.jogada = playerChoice

                break
            case 'tesoura':
                if (ultimoJogador.jogada != null) {
                    if (ultimoJogador.jogada == 'papel' && ultimoJogador.jogada != 'tesoura') {
                        ultimoJogador.idVencedor = controleId
                        fimPartida = true
                    }
                }

                ultimoJogador.jogada = playerChoice

                break
            default:
                break
        }
    }
    ultimoJogador.idJogador = controleId
    if (fimPartida) return res.status(200).json({  })
    console.log('Esperando proximo jogador')
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta: ${PORT}`)
})