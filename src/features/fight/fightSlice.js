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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      hp: 700,
      maxHp: 700,
      status: "alive",
      rage: 0,
      rageMax: 100,
    },
  ],
  turn: 1,
  playerWhoPlay: [],
  playerDead: [],

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
    checkAllPlayersDead: (state) => {
      const isAllPlayersDead = state.players.every((player) => player.pv <= 0);
      if (isAllPlayersDead) {
        console.log("all players are dead");
        //Logique équipe dead
      }
    },
    checkMonsterIsDead: (state) => {
      if (state.monsters[0].hp <= 0) {
        console.log("monster is dead");
        // Logique victoire
      }
    },
    checkPlayerIsAlive: (state) => {
      state.players.forEach((player) => {
        if (player.pv <= 0) {
          player.pv = 0;
          console.log(`Player ${player.id} is dead`);
        }
      });
    },
    nextTurn: (state) => {
      const currentPlayerIndex = state.players.findIndex(
        (player) => player.id === state.turn
      );
    
      let nextPlayerIndex = (currentPlayerIndex + 1) % state.players.length;
      let nextPlayer = state.players[nextPlayerIndex];
    
      // Tant que le joueur suivant est décédé, continuez à avancer dans la liste des joueurs
      while (nextPlayer.pv <= 0) {
        nextPlayerIndex = (nextPlayerIndex + 1) % state.players.length;
        nextPlayer = state.players[nextPlayerIndex];
      }
    
      // Si le prochain joueur est le premier joueur de l'équipe, revenez au premier joueur actif
      if ((nextPlayerIndex + 1) % 5 === 0) {
        nextPlayerIndex = nextPlayerIndex - 4;
        while (nextPlayerIndex !== currentPlayerIndex) {
          nextPlayer = state.players[nextPlayerIndex];
          if (nextPlayer.pv > 0) {
            break;
          }
          nextPlayerIndex = (nextPlayerIndex + 1) % state.players.length;
        }
      }
    
      state.turn = nextPlayer.id;
      console.log(`Next turn is for player ${nextPlayer.id}`);
    },

    healRandomPlayer: (state, action) => {
      const alivePlayers = state.players.filter(
        (player) => player.status === "alive"
      );
      const randomPlayerIndex = Math.floor(Math.random() * alivePlayers.length);
      alivePlayers[randomPlayerIndex].pv += 20;

      const { playerId } = action.payload;
      const playerIndex = state.players.findIndex(
        (player) => player.id === playerId
      );

      if (playerIndex !== -1) {
        state.players[playerIndex].mana -= 5;
      }

      if (
        alivePlayers[randomPlayerIndex].pv >
        alivePlayers[randomPlayerIndex].pvMax
      ) {
        alivePlayers[randomPlayerIndex].pv =
          alivePlayers[randomPlayerIndex].pvMax;
      }
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
              const audio = new Audio("/assets/chidorii.mp3");
              audio.play();
            
              setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
              }, 2000);
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
          default:
            damage = Math.floor(Math.random() * 56) + 5;
            break;
        }

        state.monsters[0].hp -= damage; // Appliquer les dégâts au monstre
        currentPlayer.mana -= 30; // Réduire la mana du joueur
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
  },
});

// Supposons que vos joueurs aient un champ `team` pour leur numéro d'équipe
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
} = fightSlice.actions;
export default fightSlice.reducer;
