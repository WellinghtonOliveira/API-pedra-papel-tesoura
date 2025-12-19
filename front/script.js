const API_URL = "http://localhost:3000"

let matchId = null
let playerId = crypto.randomUUID()

document.getElementById("createMatch").addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/match/create`, {
        method: "POST"
    })

    const data = await res.json()
    matchId = data.matchId

    document.getElementById("matchId").innerText = `Partida: ${matchId}`

    document.getElementById("play").style.display = "block"
})

async function play(choice) {
    await fetch(`${API_URL}/match/play`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            matchId,
            playerId,
            choice
        })
    })

    pollResult()
}

function pollResult() {
    const interval = setInterval(async () => {
        const res = await fetch(`${API_URL}/match/result?matchId=${matchId}`)
        const data = await res.json()

        if (data.status === "waiting") return

        clearInterval(interval)

        document.getElementById("result").innerHTML = `
      <h2>Resultado</h2>
      <p>Jogador 1: ${data.jogador1}</p>
      <p>Jogador 2: ${data.jogador2}</p>
      <strong>Vencedor: ${data.vencedor}</strong>
    `
    }, 2000)
}
