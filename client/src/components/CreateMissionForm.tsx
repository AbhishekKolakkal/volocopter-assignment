import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useMissionContext } from '../contexts/MissionContext';

const CreateMissionForm: React.FC = () => {
  const [newMissionName, setNewMissionName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const { createMission, missionStates } = useMissionContext();

  const handleCreateMission = () => {
    if (newMissionName.trim() !== '' && selectedState.trim() !== '') {
      createMission(newMissionName, selectedState);
      setNewMissionName('');
      setSelectedState('');
    }
  };

  return (
    <Container>
      <h2>Create Mission</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Mission Name"
              value={newMissionName}
              onChange={(e) => setNewMissionName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select State</option>
              {missionStates.map((state) => (
                <option key={state.id} value={state.state_name}>
                  {state.display_name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Button onClick={handleCreateMission}>Create</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateMissionForm;
