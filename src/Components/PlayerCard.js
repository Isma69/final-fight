import React from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';
import './Game.css';

const PlayerCard = ({ player }) => {
  return (
    <div key={player.id} className="col-sm-3 mb-4 d-flex">
      <div className="card text-center custom-card-width">
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{player.name}</h5>
          <img className="img-fluid custom-image-size" src={player.avatar} alt={player.name} />
          <ProgressBar pv={player.pv} pvMax={player.pvMax} faType='fa-heart' barName=' : pv ' bgType='bg-danger' />
          <ProgressBar pv={player.mana} pvMax={player.manaMax} faType='fa-fire-alt' barName=' : mana ' />
          <span className="badge badge-danger ml-2" id="degatSpanJ1"></span>
          <ButtonCapacity playerId={player.id} />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;