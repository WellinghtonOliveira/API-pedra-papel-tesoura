const API_URL = "http://localhost:3000"
let userIdControl = null

document.getElementById("createMatch").addEventListener("click", async () => {
    const res = await fetch(`${API_URL}/match/create`, {
        method: "POST"
    });

    const data = await res.json();
    userIdControl = data.controleId

    document.getElementById("matchId").innerText =
        `Partida criada: ${userIdControl}`;

    document.getElementById("play").style.display = "block";
});

async function play(choice) {

    await fetch(`${API_URL}/match/play`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerChoice: choice,
            controleId: userIdControl
        })
    });

    getResult();
}

async function getResult() {
    const res = await fetch(`${API_URL}/match/result?matchId=${userIdControl}`, {
        method: "POST"
    })

    const data = await res.json();

    document.getElementById("result").innerHTML = `
    <h2>Resultado</h2>
    <p>Jogador 1: ${data.player1}</p>
    <p>Jogador 2: ${data.player2}</p>
    <strong>Vencedor: ${data.winner}</strong>
  `;
}
