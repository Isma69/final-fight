import React from 'react';
import Monster from './Monster';
import PlayerList from './PlayerList';
import { useParams } from 'react-router-dom';


const Combat = () => {
  const { teamNumber } = useParams();

  let teamNumberInt = parseInt(teamNumber);

  // Si teamNumber n'est pas défini ou n'est pas un nombre valide (autre que 7, 10 ou 9), rediriger vers une page d'erreur par exemple.
  if (isNaN(teamNumberInt) || ![7, 10, 9].includes(teamNumberInt)) {
    // Vous pouvez ici rediriger vers une page d'erreur ou faire une autre action appropriée.
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