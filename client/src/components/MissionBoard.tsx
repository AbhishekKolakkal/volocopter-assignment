import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MissionCard from './MissionCard';
import { useMissionContext } from '../contexts/MissionContext';

const MissionBoard: React.FC = () => {
  const { missions, getMissions } = useMissionContext();

  useEffect(() => {
    getMissions();
  }, []); // Run once when the component mounts

  const renderMissions = (state: 'pre-flight' | 'in-flight' | 'post-flight') => {
    const filteredMissions = missions.filter((mission) => mission.state === state);
    return (
      <Col>
        <h2>{state.replace('-', ' ').toUpperCase()}</h2>
        {filteredMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </Col>
    );
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Mission Board</h1>
      <Row>
        {renderMissions('pre-flight')}
        {renderMissions('in-flight')}
        {renderMissions('post-flight')}
      </Row>
    </Container>
  );
};

export default MissionBoard;
