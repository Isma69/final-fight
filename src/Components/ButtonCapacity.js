import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt, faBolt, faHeartCirclePlus, faHandFist } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { hitMonster, hitBack, checkAllPlayersDead, checkMonsterIsDead, checkPlayerIsAlive, healRandomPlayer, restoreMana, nextTurn, luckyStrike, specialJutsu, rageAttack} from '../features/fight/fightSlice';

const ButtonCapacity = ({ playerId }) => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.fight.players);
  const currentPlayer = useSelector(state => state.fight.players.find(player => player.id === playerId));
  const state = useSelector(state => state.fight);
  const playersWithoutMana = useMemo(() => {
    return players.filter(player => player.mana <= 0 && player.status === 'alive');
  }, [players]);  const activePlayerId = state.turn;

  const isButtonActive = (manaRequired, currentPlayerId) => {
    return currentPlayer.status === 'alive' && currentPlayer.mana >= manaRequired && currentPlayerId === activePlayerId;
  };
  

  const combat = () => {
    dispatch(hitMonster(5));
    dispatch(hitBack({ playerId, damage: 5}));
    dispatch(rageAttack(5));
    dispatch(checkAllPlayersDead());
    dispatch(checkMonsterIsDead());
    dispatch(checkPlayerIsAlive({ players }));
    dispatch(nextTurn());
  };

  

  const handlePlayerTurn = () => {
    if (currentPlayer.status === 'alive' && currentPlayer.mana > 0) {
      combat();
    }
  };

  const handleHealRandomPlayer = () => {
    dispatch(healRandomPlayer({ playerId }));
    dispatch(hitBack({ playerId, damage: 5 }));
    dispatch(nextTurn());
  };

  const handleRestoreMana = () => {
    dispatch(restoreMana({ playerId }));
    dispatch(hitBack({ playerId, damage: 5 }));
    dispatch(nextTurn());
  };

  const handleLuckyStrike = () => {
    dispatch(luckyStrike({ playerId }));
    dispatch(hitBack({ playerId, damage: 5 }));
    dispatch(rageAttack(5));
    dispatch(checkPlayerIsAlive({ players }));
    dispatch(nextTurn());
  };

  const handleSpecialJutsu = () => {
    dispatch(specialJutsu({ playerId }));
    dispatch(hitBack({ playerId, damage: 10 }));
    dispatch(rageAttack(5));
    dispatch(checkAllPlayersDead());
    dispatch(checkMonsterIsDead());
    dispatch(checkPlayerIsAlive({ players }));
    dispatch(nextTurn());
  };




  if (state.isGameOver) {
    return (
      <div className="fullscreen-modal">
        <img src="/assets/gameover.jpeg" alt="All players are dead" />
      </div>
    );
  }

  if (state.isGameWin) {
    return (
      <div className="fullscreen-modal">
        <img src="/assets/victory.jpg" alt="All players are dead" />
      </div>
    );
  }

  return (
    <div className={`player-card ${currentPlayer.status === 'alive' && state.turn === state.playerOrder[0] ? 'active-turn' : ''}`}>
      <div className="row mt-2">
        <div className="col-4">
          <button
            type="button"
            onClick={handlePlayerTurn}
            className={`btn btn-success btn-sm material-tooltip-main ${isButtonActive(5, playerId) ? '' : 'non-clickable'}`}
            disabled={!isButtonActive(5, playerId)}
          >
            HIT
            <FontAwesomeIcon icon={faHandFist} style={{ marginLeft: '7px' }} />
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            onClick={handleRestoreMana}
            className={`btn btn-info btn-sm material-tooltip-main ${isButtonActive(5, playerId) || playersWithoutMana.some(p => p.id === playerId) ? '' : 'non-clickable'}`}
            disabled={!(isButtonActive(5, playerId) || playersWithoutMana.some(p => p.id === playerId))}
          >
            Mana+
            <FontAwesomeIcon icon={faBolt} style={{ marginLeft: '5px' }} />
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            onClick={handleHealRandomPlayer}
            className={`btn btn-warning btn-sm material-tooltip-main ${isButtonActive(5, playerId) ? '' : 'non-clickable'}`}
            disabled={!isButtonActive(5, playerId)}
          >
            Heal
            <FontAwesomeIcon icon={faHeartCirclePlus} style={{ marginLeft: '5px' }} /> 
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-6">
          <button
            type="button"
            onClick={handleLuckyStrike}
            className={`btn btn-danger btn-sm material-tooltip-main1 ${isButtonActive(10, playerId) ? '' : 'non-clickable'}`}
            disabled={!isButtonActive(10, playerId)}
          >
            LuckyStrike
            <FontAwesomeIcon icon={faFireAlt} style={{ marginLeft: '5px' }} />
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            onClick={handleSpecialJutsu}
            className={`btn btn-dark btn-sm material-tooltip-main1 ${isButtonActive(30, playerId) ? '' : 'non-clickable'}`}
            disabled={!isButtonActive(30, playerId)}
          >
            {currentPlayer.specialJutsu}
          </button>
        </div>
      </div>
    </div>
  );
};
  
  export default ButtonCapacity;