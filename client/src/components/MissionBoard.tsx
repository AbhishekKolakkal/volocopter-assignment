// components/MissionBoard.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MissionCard from './MissionCard';
import MoveMissionForm from './MoveMissionForm';
import CreateMissionForm from './CreateMissionForm'; // Import CreateMissionForm
import { useMissionContext } from '../contexts/MissionContext';

const MissionBoard: React.FC = () => {
  const { missions, getMissions, missionStates, getMissionStates } = useMissionContext();
  const [showCreateMissionModal, setShowCreateMissionModal] = useState(false); // State for managing modal visibility

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

  const handleShowCreateMissionModal = () => {
    setShowCreateMissionModal(true);
  };

  const handleCloseCreateMissionModal = () => {
    setShowCreateMissionModal(false);
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4 d-flex align-items-center justify-content-between">
        Flight Mission Control Tool
        <Button variant="primary" className="ms-auto" onClick={handleShowCreateMissionModal}>
          Add Mission
        </Button>
      </h1>

      <Row>
        {missionStates.map((state) => renderMissions(state.state_name, state.display_name))}
      </Row>

      {/* CreateMissionForm modal */}
      <CreateMissionForm show={showCreateMissionModal} onClose={handleCloseCreateMissionModal} />
    </Container>
  );
};

export default MissionBoard;
