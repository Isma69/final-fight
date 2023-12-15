import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { setPlayerOrder, setTurn } from '../features/fight/fightSlice';

const TeamSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teamNumber = useSelector(state => state.fight.teamNumber);
  const state = useSelector(state => state);

  useEffect(() => {
    const audio = new Audio('/assets/narutos-theme-song.mp3');

    audio.play().catch((error) => {
      console.error("Lecture automatique de l'audio bloquée : ", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleTeamSelect = (selectedTeamNumber, players) => {
    const playerOrder = players
      .filter((player) => player.status === 'alive' && player.mana > 0)
      .map((player) => player.id);
  
    if (playerOrder.length > 0) {
      dispatch(setPlayerOrder(playerOrder));
      dispatch(setTurn(playerOrder[0])); // Mettre le tour au premier joueur de l'équipe sélectionnée
      navigate(`/combat/${selectedTeamNumber}`);
    } else {
      console.log("Aucun joueur en vie pour l'équipe sélectionnée.");
      // Gestion d'aucun joueur disponible
    }
  };

  return (
    <div className='container-fluid'>
      <h1 className='text-center my-4'>Sélectionnez votre équipe :</h1>
      <section className='cadreTeam'>
        <div className='custom-card-width'>
          <Row>
            <TeamButton teamNumber={7} handleTeamSelect={handleTeamSelect} />
          </Row>
        </div>
      </section>
      <section className='cadreTeam'>
        <div className='custom-card-width'>
          <Row>
            <TeamButton teamNumber={10} handleTeamSelect={handleTeamSelect} />
          </Row>
        </div>
      </section>
      <section className='cadreTeam'>
        <div className='custom-card-width'>
          <Row>
            <TeamButton teamNumber={9} handleTeamSelect={handleTeamSelect} />
          </Row>
        </div>
      </section>
    </div>
  );
};

const TeamButton = ({ teamNumber, handleTeamSelect }) => {
  const players = useSelector(state =>
    state.fight.players.filter(player => player.team === parseInt(teamNumber))
  );

  const handleSelectTeam = () => {
    handleTeamSelect(teamNumber, players);
  };

  const renderPlayerAvatars = () => {
    return players.slice(0, 4).map(player => (
      <Col key={player.id} className='mb-3' xs={6} md={3}>
        <Card style={{ width: '14rem' }} className='card-ts mx-auto'>
          <Card.Body>
            <Card.Title className='text-center fw-bold'>{player.name}</Card.Title>
            <Card.Img variant='top' src={player.avatar} alt={`Avatar de ${player.name}`} className='custom-image-ts' />
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Col key={`team-${teamNumber}`} className='mb-4'>
      <Row>
        <Col xs={12} className='m-3'>
          <Row className='justify-content-center'>{renderPlayerAvatars()}</Row>
        </Col>
        <Col xs={12} className='d-flex justify-content-center mb-3'>
          <Button variant='secondary' onClick={handleSelectTeam}>
            Sélectionner l'équipe {teamNumber}
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default TeamSelection;