import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const TeamSelection = () => {
  const navigate = useNavigate();

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

  const handleTeamSelect = (teamNumber) => {
    navigate(`/combat/${teamNumber}`);
  };

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Sélectionnez votre équipe :</h1>
      <Row>
        <TeamButton teamNumber={7} handleTeamSelect={handleTeamSelect} />
      </Row>
      <Row>
        <TeamButton teamNumber={10} handleTeamSelect={handleTeamSelect} />
      </Row>
      <Row>
        <TeamButton teamNumber={9} handleTeamSelect={handleTeamSelect} />
      </Row>
    </div>
  );
};

const TeamButton = ({ teamNumber, handleTeamSelect }) => {
  const players = useSelector((state) =>
    state.fight.players.filter((player) => player.team === parseInt(teamNumber))
  );

  const handleSelectTeam = () => {
    handleTeamSelect(teamNumber);
  };

  const renderPlayerAvatars = () => {
    return players.slice(0, 4).map((player) => (
      <Col key={player.id} className='mb-3' xs={6} md={3}>
        <Card style={{ width: '14rem' }} className='mx-auto'>
          <Card.Img variant='top' src={player.avatar} alt={`Avatar de ${player.name}`} />
          <Card.Body>
            <Card.Title>{player.name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Col key={`team-${teamNumber}`} className='mb-4'>
      <Button variant='primary' onClick={handleSelectTeam} block>
        Voir l'équipe {teamNumber}
      </Button>
      <Row>{renderPlayerAvatars()}</Row>
    </Col>
  );
};

export default TeamSelection;