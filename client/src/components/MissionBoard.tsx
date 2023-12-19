// components/MissionBoard.tsx
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MissionCard from './MissionCard';
import MoveMissionForm from './MoveMissionForm';
import { useMissionContext } from '../contexts/MissionContext';

const MissionBoard: React.FC = () => {
  const { missions, getMissions, missionStates, getMissionStates } = useMissionContext();

  useEffect(() => {
    getMissionStates();
    getMissions();
  }, []); // Run once when the component mounts

  const renderMissions = (state_name: string, display_name: string) => {
    const filteredMissions = missions.filter((mission) => mission.state === state_name);
    return (
      <Col key={state_name}>
        <h2>{display_name} ({filteredMissions.length})</h2>
        {filteredMissions.map((mission) => (
          <div key={mission.id}>
            <MissionCard mission={mission} />
          </div>
        ))}
      </Col>
    );
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Mission Board</h1>
      <Row>
        {missionStates.map((state) => renderMissions(state.state_name, state.display_name))}
      </Row>
    </Container>
  );
};

export default MissionBoard;
