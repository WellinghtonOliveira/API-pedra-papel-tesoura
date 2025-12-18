# 🪨📄✂️ Pedra, Papel e Tesoura — API Multiplayer

API backend desenvolvida em **Node.js** para gerenciar partidas do clássico jogo **Pedra, Papel e Tesoura**, permitindo jogos contra a máquina ou entre jogadores em tempo real.

---

## 🎯 Objetivo do Projeto

Criar uma **API REST** que permita:
- Criar partidas
- Registrar jogadas dos jogadores
- Calcular o resultado automaticamente
- Manter histórico de vitórias

---

## 🧠 Como o Jogo Funciona

1. Um jogador cria uma partida
2. Outro jogador entra **ou** a API joga automaticamente
3. Cada jogador escolhe: `pedra`, `papel` ou `tesoura`
4. A API calcula o vencedor
5. O resultado fica disponível para consulta

---

## 🔗 Endpoints da API

### ▶️ Criar Partida
`POST /match/create`

Cria uma nova partida e retorna o ID do jogo.

**Resposta**
```json
{
  "matchId": "abc123",
  "status": "waiting"
}
