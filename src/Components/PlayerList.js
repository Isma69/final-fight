import React from 'react';
import PlayerCard from './PlayerCard';
import { useSelector } from 'react-redux';

const PlayerList = ({ teamNumber }) => {
  const players = useSelector((state) =>
    state.fight.players.filter((player) => player.team === parseInt(teamNumber))
  );

  const displayPlayers = () => {
    return players.map((player) => (
      <PlayerCard key={player.id} player={player} />
    ));
  };

  return (
    <div className='row'>
      {displayPlayers()}
    </div>
  );
};

export default PlayerList;