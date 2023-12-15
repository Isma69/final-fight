import React from 'react';
import Monster from './Monster';
import PlayerList from './PlayerList';
import { useParams } from 'react-router-dom';


const Combat = () => {
  const { teamNumber } = useParams();

  let teamNumberInt = parseInt(teamNumber);

  if (isNaN(teamNumberInt) || ![7, 10, 9].includes(teamNumberInt)) {
    return <div>Équipe non valide. Redirection vers une page d'erreur...</div>;
  }

  return (
    <div>
      <div className="">
        <Monster />
        <br></br>
        <section className="container-fluid">
          <PlayerList teamNumber={teamNumberInt} />
        </section>
      </div>
    </div>
  );
};

export default Combat;