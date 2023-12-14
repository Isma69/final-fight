import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faFireAlt, faBolt, faHeartCirclePlus, faHandFist } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { hitMonster, hitBack, checkAllPlayersDead, checkMonsterIsDead, checkPlayerIsAlive, healRandomPlayer, restoreMana, nextTurn, luckyStrike, specialJutsu, rageAttack } from '../features/fight/fightSlice';

const ButtonCapacity = ({ playerId }) => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.fight.players);
  const currentPlayer = useMemo(() => players.find(player => player.id === playerId), [players, playerId]);
  const turn = useSelector(state => state.fight.turn);
  const playersWithoutMana = useMemo(() => players.filter(player => player.mana <= 0 && player.status === 'alive'), [players]);

  const combat = () => {
    dispatch(hitMonster(5));
    dispatch(hitBack({ playerId, damage: 10}));
    dispatch(rageAttack(5));
    dispatch(checkAllPlayersDead());
    dispatch(checkMonsterIsDead());
    dispatch(checkPlayerIsAlive({ players }));
    dispatch(nextTurn());
  };

  const handlePlayerTurn = () => {
    if (currentPlayer.status === 'alive' && currentPlayer.mana >= 5 && playerId === turn) {
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

  return (
    <div className={`player-card ${currentPlayer.status === 'alive' && playerId === turn ? 'active-turn' : ''}`}>
      <div className="row mt-2">
        <div className="col-4">
          <button
            type="button"
            onClick={handlePlayerTurn}
            className={`btn btn-success btn-sm material-tooltip-main ${currentPlayer.status === 'alive' && currentPlayer.mana >= 5 && playerId === turn ? '' : 'non-clickable'}`}
            disabled={!(currentPlayer.status === 'alive' && currentPlayer.mana >= 5 && playerId === turn)}
          >
            HIT
            <FontAwesomeIcon icon={faHandFist} style={{ marginLeft: '7px' }} />
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            onClick={handleRestoreMana}
            className={`btn btn-info btn-sm material-tooltip-main ${currentPlayer.status === 'alive' && (currentPlayer.mana >= 5 || playersWithoutMana.some(p => p.id === playerId)) && playerId === turn ? '' : 'non-clickable'}`}
            disabled={!(currentPlayer.status === 'alive' && (currentPlayer.mana >= 5 || playersWithoutMana.some(p => p.id === playerId)) && playerId === turn)}
          >
            Mana+
            <FontAwesomeIcon icon={faBolt} style={{ marginLeft: '5px' }} />
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            onClick={handleHealRandomPlayer}
            className={`btn btn-warning btn-sm material-tooltip-main ${currentPlayer.status === 'alive' && currentPlayer.mana >= 5 && playerId === turn ? '' : 'non-clickable'}`}
            disabled={!(currentPlayer.status === 'alive' && currentPlayer.mana >= 5 && playerId === turn)}
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
            className={`btn btn-danger btn-sm material-tooltip-main ${currentPlayer.status === 'alive' && currentPlayer.mana >= 10 && playerId === turn ? '' : 'non-clickable'}`}
            disabled={!(currentPlayer.status === 'alive' && currentPlayer.mana >= 10 && playerId === turn)}
          >
            LuckyStrike
            <FontAwesomeIcon icon={faFireAlt} style={{ marginLeft: '5px' }} />
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            onClick={handleSpecialJutsu}
            className={`btn btn-dark btn-sm material-tooltip-main ${currentPlayer.status === 'alive' && currentPlayer.mana >= 30 && playerId === turn ? '' : 'non-clickable'}`}
            disabled={!(currentPlayer.status === 'alive' && currentPlayer.mana >= 30 && playerId === turn)}
          >
            {currentPlayer.specialJutsu}
          </button>
        </div>
      </div>
    </div>
  );
};
  
  export default ButtonCapacity;