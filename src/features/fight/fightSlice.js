import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [
    {
      name: "Naruto",
      pv: 200,
      pvMax: 200,
      mana: 30,
      manaMax: 30,
      id: 1,
      status: "alive",
      avatar: "/assets/naruto2.gif",
      specialJutsu: "Rasengan",
      team: 7,
    },
    {
      name: "Sasuke",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 2,
      status: "alive",
      avatar: "/assets/sasuke1.gif",
      specialJutsu: "Chidori",
      team: 7,
    },
    {
      name: "Sakura",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 3,
      status: "alive",
      avatar: "/assets/sakura1.gif",
      specialJutsu: "Byakugo",
      team: 7,
    },
    {
      name: "Kakashi",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 4,
      status: "alive",
      avatar: "/assets/kakashi1.gif",
      specialJutsu: "Kamui",
      team: 7,
    },
    {
      name: "Shikamaru",
      pv: 120,
      pvMax: 120,
      mana: 25,
      manaMax: 25,
      id: 5,
      status: "alive",
      avatar: "/assets/shikamaru.gif",
      specialJutsu: "Shadow Possession",
      team: 10,
    },
    {
      name: "Choji",
      pv: 140,
      pvMax: 140,
      mana: 20,
      manaMax: 20,
      id: 6,
      status: "alive",
      avatar: "/assets/choji.gif",
      specialJutsu: "Human Boulder",
      team: 10,
    },
    {
      name: "Ino",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 7,
      status: "alive",
      avatar: "/assets/ino.gif",
      specialJutsu: "Mind Transfer",
      team: 10,
    },
    {
      name: "Asuma",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 8,
      status: "alive",
      avatar: "/assets/asuma.gif",
      specialJutsu: "Flying Swallow",
      team: 10,
    },
    {
      name: "Rock Lee",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 9,
      status: "alive",
      avatar: "/assets/lee.gif",
      specialJutsu: "Primary Lotus",
      team: 9,
    },
    {
      name: "Neji",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 10,
      status: "alive",
      avatar: "/assets/neji.gif",
      specialJutsu: "Eight Trigrams",
      team: 9,
    },
    {
      name: "Tenten",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 11,
      status: "alive",
      avatar: "/assets/tenten.gif",
      specialJutsu: "Twin Rising Dragons",
      team: 9,
    },
    {
      name: "Gai",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 12,
      status: "alive",
      avatar: "/assets/gai.gif",
      specialJutsu: "Night Guy",
      team: 9,
    },
  ],
  monsters: [
    {
      id: 1,
      name: "Madara Uchiwa",
      hp: 50,
      maxHp: 50,
      status: "alive",
      rage: 0,
      rageMax: 100,
    },
  ],
  turn: 1,
  playerWhoPlay: [],
  playerDead: [],
  playerOrder: [],
  isGameOver: false,
  isGameWin: false,

};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      state.monsters[0].hp -= action.payload;
      const currentPlayer = state.players.find(
        (player) => player.id === state.turn
      );
      if (currentPlayer) {
        currentPlayer.mana -= 5;
      }
    },
    hitBack: (state, action) => {
      const { playerId, damage } = action.payload;
      const playerIndex = state.players.findIndex(
        (player) => player.id === playerId
      );
      if (playerIndex !== -1) {
        state.players[playerIndex].pv -= damage;
      }
    },
    checkMonsterIsDead: (state) => {
      if (state.monsters[0].hp <= 0) {
        state.isGameWin = true;
        console.log("monster is dead");
      }
    },
    checkPlayerIsAlive: (state) => {
      state.players.forEach((player) => {
        if (player.pv <= 0) {
          player.pv = 0;
          player.status = "dead";
          console.log(player.status)
          console.log(`Player ${player.id} is dead`);
        }
      });
    },
    checkAllPlayersDead: (state) => {
      const teamId = state.players.find((player) => player.id === state.turn)?.team;

      if (!teamId) return;

      const teamPlayers = state.players.filter((player) => player.team === teamId);

      const isAllPlayersDead = teamPlayers.every((player) => player.pv <= 0);

      if (isAllPlayersDead) {
        console.log("Tous les joueurs sont morts");
        state.isGameOver = true;
        console.log(state.isGameOver);
      }
    },


    healRandomPlayer: (state, action) => {
      const { playerId } = action.payload;
      const player = state.players.find((p) => p.id === playerId);
    
      if (player && player.status === "alive") {
        const teamPlayers = state.players.filter((p) => p.team === player.team && p.status === "alive");
    
        if (teamPlayers.length > 0) {
          const randomPlayerIndex = Math.floor(Math.random() * teamPlayers.length);
          const randomPlayerId = teamPlayers[randomPlayerIndex].id;
    
          state.players = state.players.map((p) => {
            if (p.id === randomPlayerId) {
              p.pv += 20;
    
              if (p.pv > p.pvMax) {
                p.pv = p.pvMax;
              }
            }
            return p;
          });
        }
      }
    },
    
    nextTurn: (state) => {
      const currentPlayer = state.players.find((player) => player.id === state.turn);
      if (!currentPlayer) return;
    
      const teamId = currentPlayer.team;
      const teamPlayers = state.players.filter((player) => player.team === teamId);
    
      const allDead = teamPlayers.every(player => player.status === 'dead');
      if (allDead) {
        console.log("Tous les joueurs de l'équipe sont morts.");
        state.isGameOver = true;
        return; 
      }
    
      let nextPlayerIndex = (teamPlayers.findIndex((player) => player.id === state.turn) + 1) % teamPlayers.length;
      let nextPlayer = teamPlayers[nextPlayerIndex];
    
      while (nextPlayer.status !== "alive") {
        nextPlayerIndex = (nextPlayerIndex + 1) % teamPlayers.length;
        nextPlayer = teamPlayers[nextPlayerIndex];
      }
    
      state.turn = nextPlayer.id;
      console.log(`Next turn is for player ${nextPlayer.id}`);
    },

    restoreMana: (state, action) => {
      const playerIndex = state.players.findIndex(
        (player) => player.id === action.payload.playerId
      );

      if (playerIndex !== -1) {
        state.players[playerIndex].mana += 10;

        if (
          state.players[playerIndex].mana > state.players[playerIndex].manaMax
        ) {
          state.players[playerIndex].mana = state.players[playerIndex].manaMax;
        }
      }
    },
    luckyStrike: (state, action) => {
      const currentPlayer = state.players.find(
        (player) => player.id === action.payload.playerId
      );
      if (currentPlayer && currentPlayer.mana >= 10) {
        const damage = Math.floor(Math.random() * 26) + 5;
        state.monsters[0].hp -= damage;
        currentPlayer.mana -= 10;
      }
    },
    specialJutsu: (state, action) => {

      const currentPlayer = state.players.find(
        (player) => player.id === action.payload.playerId
      );

      if (currentPlayer && currentPlayer.mana >= 30) {
        let damage = 0;

        switch (currentPlayer.name) {
          case "Naruto":
            damage = Math.floor(Math.random() * 90) + 15;
            break;
            case "Sasuke":
              damage = Math.floor(Math.random() * 81) + 20;
              break;
          case "Sakura":
            state.players.forEach((player) => {
              player.pv += 30;
              if (player.pv > player.pvMax) {
                player.pv = player.pvMax;
              }
            });
            break;
          case "Kakashi":
            damage = Math.floor(Math.random() * 71) + 30;
            break;
          case "Shikamaru":
            damage = Math.floor(Math.random() * 61) + 30;
            break;
          default:
            damage = Math.floor(Math.random() * 56) + 5;
            break;
        }

        state.monsters[0].hp -= damage;
        currentPlayer.mana -= 30; 
      }
    },
    rageAttack: (state, action) => {
      const monster = state.monsters[0];
      monster.rage += action.payload;
      if (monster.rage >= 100) {
        monster.rage = 100;
        const damage = 50;
        state.players.forEach((player) => (player.pv -= damage));
        monster.rage = 0;
      }
    },
    setTurn: (state, action) => {
      state.turn = action.payload;
    },
    setPlayerOrder: (state, action) => {
      state.playerOrder = action.payload;
    },
  },
});

export const selectPlayersByTeam = (state, teamNumber) => {
  return state.fight.players.filter(
    (player) => player.team === parseInt(teamNumber)
  );
};

export const {
  hitMonster,
  hitBack,
  checkAllPlayersDead,
  checkMonsterIsDead,
  checkPlayerIsAlive,
  nextTurn,
  healRandomPlayer,
  restoreMana,
  luckyStrike,
  specialJutsu,
  rageAttack,
  setTurn,
  setPlayerOrder,
} = fightSlice.actions;
export default fightSlice.reducer;
